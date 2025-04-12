import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { DeleteUserHandler } from '../../application/handlers/deleteUserHandler';
import { UserSchema } from '../../infrastructure/mongoose/schemas/userSchema';
import { MongooseUserCommandRepository } from '../../infrastructure/mongoose/repositories/mongooseUserCommandRepository';
import { User } from '../../domain/entities/user';

describe('DeleteUserHandler Integration', () => {
  jest.setTimeout(20000);

  let handler: DeleteUserHandler;
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
        DeleteUserHandler,
        {
          provide: 'UserCommandRepository',
          useClass: MongooseUserCommandRepository,
        },
      ],
    }).compile();

    handler = moduleRef.get(DeleteUserHandler);
    userModel = moduleRef.get(getModelToken('users'));
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  it('should delete a user from the database', async () => {
    await userModel.create({
      _id: 'user-id-123',
      username: 'quinn',
      email: 'quinn@example.com',
      password: 'hashedPass',
      bio: 'Filmfan',
    });
    const command = {
      targetUserId: 'user-id-123',
      requestingUserId: 'user-id-123',
    };

    await handler.execute(command);

    const deletedUser = await userModel.findById('user-id-123');
    expect(deletedUser).toBeNull();
  });

  it('should throw error if user not found', async () => {
    const command = {
      targetUserId: 'non-existent-id',
      requestingUserId: 'non-existent-id',
    };

    await expect(handler.execute(command)).rejects.toThrowError('User not found');
  });

  it('should throw error if user is not the owner', async () => {
    await userModel.create({
      _id: 'user-id-123',
      username: 'quinn',
      email: 'quinn@example.com',
      password: 'hashedPass',
      bio: 'Filmfan',
    });
    const command = {
      targetUserId: 'user-id-123',
      requestingUserId: 'wrong-user-id',
    };

    await expect(handler.execute(command)).rejects.toThrowError('Unauthorized to delete this user');
  });
});
