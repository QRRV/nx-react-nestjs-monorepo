import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { UpdateUserHandler } from '../../application/handlers/updateUserHandler';
import { UserSchema } from '../../infrastructure/mongoose/schemas/userSchema';
import { MongooseUserCommandRepository } from '../../infrastructure/mongoose/repositories/mongooseUserCommandRepository';
import { User } from '../../domain/entities/user';

describe('UpdateUserHandler Integration', () => {
  jest.setTimeout(20000);

  let handler: UpdateUserHandler;
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
        UpdateUserHandler,
        {
          provide: 'UserCommandRepository',
          useClass: MongooseUserCommandRepository,
        },
      ],
    }).compile();

    handler = moduleRef.get(UpdateUserHandler);
    userModel = moduleRef.get(getModelToken('users'));
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  it('should update user data', async () => {
    const createdUser = await userModel.create({
      _id: 'user-id-123',
      username: 'quinn',
      email: 'quinn@example.com',
      password: 'hashedPass',
      bio: 'Filmfan',
    });

    const command = {
      targetUserId: 'user-id-123',
      requestingUserId: 'user-id-123',
      updates: { username: 'updatedQuinn', bio: 'Updated bio' },
    };

    const result = await handler.execute(command);

    expect(result.username).toBe('updatedQuinn');
    expect(result.bio).toBe('Updated bio');
    expect(result.email).toBe(createdUser.email);
  });

  it('should throw error if user is not the owner', async () => {
    const createdUser = await userModel.create({
      _id: 'user-id-123',
      username: 'quinn',
      email: 'quinn@example.com',
      password: 'hashedPass',
      bio: 'Filmfan',
    });

    const command = {
      targetUserId: 'user-id-123',
      requestingUserId: 'wrong-user-id',
      updates: { username: 'updatedQuinn', bio: 'Updated bio' },
    };

    await expect(handler.execute(command)).rejects.toThrowError('Unauthorized to update this user');
  });

  it('should throw error if user not found', async () => {
    const command = {
      targetUserId: 'non-existent-id',
      requestingUserId: 'user-id-123',
      updates: { username: 'updatedQuinn', bio: 'Updated bio' },
    };

    await expect(handler.execute(command)).rejects.toThrowError('User not found');
  });
});
