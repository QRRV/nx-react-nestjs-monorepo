import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { RegisterUserHandler } from '../../application/handlers/registerUserHandler';
import { RegisterUserCommand } from '../../application/commands/registerUserCommand';
import { AuthUserSchema } from '../../infrastructure/mongoose/schemas/authUserSchema';
import { MongooseAuthCommandRepository } from '../../infrastructure/mongoose/repositories/mongooseAuthCommandRepository';
import { User } from '@moviebuddy/user';
import { JwtService } from '../../infrastructure/services/jwt.service';
import { JwtModule } from '@nestjs/jwt';

describe('RegisterUserHandler Integration', () => {
  let handler: RegisterUserHandler;
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
        RegisterUserHandler,
        JwtService,
        {
          provide: 'AuthCommandRepository',
          useClass: MongooseAuthCommandRepository,
        },
      ],
    }).compile();

    handler = moduleRef.get(RegisterUserHandler);
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

  it('should create a new user and return a token', async () => {
    const command = new RegisterUserCommand(
      'quinn',
      'quinn@example.com',
      'SterkW8woord!',
      'Filmfan',
      'user'
    );

    const result = await handler.execute(command);

    expect(result.user).toMatchObject({
      username: 'quinn',
      email: 'quinn@example.com',
      bio: 'Filmfan',
    });

    expect(result.user).not.toHaveProperty('password');
    expect(result.accessToken).toEqual(expect.any(String));

    const found = await userModel.findOne({ email: 'quinn@example.com' });
    expect(found).not.toBeNull();
  });

  it('should throw if email already exists', async () => {
    await userModel.create({
      _id: 'abc',
      username: 'quinn',
      email: 'quinn@example.com',
      password: 'hashedPass',
      bio: 'Filmfan',
      role: 'user'
    });

    const command = new RegisterUserCommand(
      'quinn',
      'quinn@example.com',
      'SterkW8woord!',
      'Filmfan',
      'user'
    );

    await expect(handler.execute(command)).rejects.toThrow('Email address already in use');
  });
});
