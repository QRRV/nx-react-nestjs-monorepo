import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { LoginUserHandler } from '../../application/handlers/loginUserHandler';
import { LoginUserQuery } from '../../application/queries/loginUserQuery';
import { AuthUserSchema } from '../../infrastructure/mongoose/schemas/authUserSchema';
import { MongooseAuthQueryRepository } from '../../infrastructure/mongoose/repositories/mongooseAuthQueryRepository';
import { JwtService } from '../../infrastructure/services/jwt.service';
import * as bcrypt from 'bcrypt';
import { JwtModule } from '@nestjs/jwt';
import { User } from '@moviebuddy/user';

describe('LoginUserHandler Integration', () => {
  let handler: LoginUserHandler;
  let userModel: Model<User>;
  let mongoServer: MongoMemoryServer;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    moduleRef = await Test.createTestingModule({
        imports: [
          JwtModule.register({
            secret: 'test-secret',
            signOptions: { expiresIn: '1h' },
          }),
          MongooseModule.forRoot(uri),
          MongooseModule.forFeature([{ name: 'users', schema: AuthUserSchema }]),
        ],
      providers: [
        LoginUserHandler,
        JwtService,
        {
          provide: 'AuthQueryRepository',
          useClass: MongooseAuthQueryRepository,
        },
      ],
    }).compile();

    handler = moduleRef.get(LoginUserHandler);
    userModel = moduleRef.get(getModelToken('users'));
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    await moduleRef.close();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  it('should return a token when login is correct', async () => {
    const hashed = await bcrypt.hash('SterkW8woord!', 10);
    await userModel.create({
      _id: 'abc',
      username: 'quinn',
      email: 'quinn@example.com',
      password: hashed,
      bio: 'Filmgek',
    });

    const query = new LoginUserQuery('quinn@example.com', 'SterkW8woord!');
    const result = await handler.execute(query);

    expect(result.accessToken).toEqual(expect.any(String));
  });

  it('should throw if email not found', async () => {
    const query = new LoginUserQuery('notfound@example.com', 'whatever');
    await expect(handler.execute(query)).rejects.toThrow('Invalid credentials');
  });

  it('should throw if password is incorrect', async () => {
    const hashed = await bcrypt.hash('SterkW8woord!', 10);
    await userModel.create({
      _id: 'abc',
      username: 'quinn',
      email: 'quinn@example.com',
      password: hashed,
      bio: 'Filmgek',
    });

    const query = new LoginUserQuery('quinn@example.com', 'verkeerd!');
    await expect(handler.execute(query)).rejects.toThrow('Invalid credentials');
  });
});
