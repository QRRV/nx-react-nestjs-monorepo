import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { CreateUserHandler } from '../../application/handlers/createUserHandler';
import { CreateUserCommand } from '../../application/commands/createUserCommand';
import { UserSchema } from '../../infrastructure/mongoose/schemas/userSchema';
import { MongooseUserCommandRepository } from '../../infrastructure/mongoose/repositories/mongooseUserCommandRepository';
import { User } from '../../domain/entities/user';

describe('CreateUserHandler Integration', () => {
  jest.setTimeout(20000);

  let handler: CreateUserHandler;
  let userModel: Model<User>;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
      ],
      providers: [
        CreateUserHandler,
        {
          provide: 'UserCommandRepository',
          useClass: MongooseUserCommandRepository,
        },
      ],
    }).compile();

    handler = moduleRef.get(CreateUserHandler);
    userModel = moduleRef.get(getModelToken('users'));
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  it('should save a user to the database', async () => {
    const command = new CreateUserCommand(
      'quinn',
      'quinn@example.com',
      'SterkW8woord!',
      'Filmfan'
    );

    const result = await handler.execute(command);

    expect(result.id).toBeDefined();
    expect(result.username).toBe('quinn');
    expect(result.email).toBe('quinn@example.com');

    const savedUser = await userModel.findOne({ _id: result.id });

    expect(savedUser).not.toBeNull();
    expect(savedUser?.['username']).toBe('quinn');
    expect(savedUser?.email).toBe('quinn@example.com');
    expect(savedUser?.bio).toBe('Filmfan');
    expect(savedUser?.password).not.toBe('SterkW8woord!');

    expect(savedUser?.password).toMatch(/^(\$2b\$10\$)([A-Za-z0-9$./]{53})/);
  });


  it('should not allow creation with duplicate email', async () => {
    await userModel.create({
      _id: 'user-id-123',
      username: 'quinn',
      email: 'quinn@example.com',
      password: 'hashedPass',
      bio: 'Filmfan',
    });

    const command = new CreateUserCommand(
      'quinn2',
      'quinn@example.com',
      'SterkW8woord2!',
      'Andere filmliefhebber'
    );

    await expect(handler.execute(command)).rejects.toThrowError(
      'Email address already in use'
    );
  });
});
