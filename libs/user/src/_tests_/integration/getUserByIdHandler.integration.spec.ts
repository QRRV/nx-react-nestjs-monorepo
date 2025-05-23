import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { GetUserByIdHandler } from '../../application/handlers/getUserByIdHandler';
import { UserSchema, UserModel } from '../../infrastructure/adapters/mongoose/schemas/userSchema';
import { MongooseUserQueryRepository } from '../../infrastructure/adapters/mongoose/repositories/mongooseUserQueryRepository';

describe('GetUserByIdHandler Integration', () => {
  jest.setTimeout(20000);

  let handler: GetUserByIdHandler;
  let userModel: Model<UserModel>;
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
        GetUserByIdHandler,
        {
          provide: 'UserQueryRepository',
          useClass: MongooseUserQueryRepository,
        },
      ],
    }).compile();

    handler = moduleRef.get(GetUserByIdHandler);
    userModel = moduleRef.get<Model<UserModel>>(getModelToken('users'));
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  it('should get user by id', async () => {
    const createdUser = await userModel.create({
      _id: 'user-id-123',
      username: 'quinn',
      email: 'quinn@example.com',
      password: 'hashedPass',
      bio: 'Filmfan',
      role: 'user'
    });

    const result = await handler.execute({ id: 'user-id-123' });

    expect(result.id).toBe(createdUser.id);
    expect(result.username).toBe(createdUser.username);
    expect(result.bio).toBe(createdUser.bio);
  });

  it('should throw error if user not found', async () => {
    await expect(handler.execute({ id: 'non-existent-id' })).rejects.toThrowError('User not found');
  });
});
