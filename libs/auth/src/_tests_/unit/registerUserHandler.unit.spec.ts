import { RegisterUserHandler } from '../../application/handlers/registerUserHandler';
import { RegisterUserCommand } from '../../application/commands/registerUserCommand';
import { User } from '@moviebuddy/user';

describe('RegisterUserHandler', () => {
  let handler: RegisterUserHandler;
  let repo: any;
  let jwtService: any;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mock-jwt-token'),
    };

    handler = new RegisterUserHandler(repo, jwtService);
  });

  it('should create user and return safe user with token', async () => {
    const command = new RegisterUserCommand(
      'quinn',
      'quinn@example.com',
      'SterkW8woord!',
      'Bio',
      'user',
    );

    repo.create.mockImplementation((user: User) => Promise.resolve(user));

    const result = await handler.execute(command);

    expect(result.accessToken).toBe('mock-jwt-token');
    expect(result.user).toMatchObject({
      id: expect.any(String),
      username: 'quinn',
      email: 'quinn@example.com',
      bio: 'Bio',
    });

    expect(result.user).not.toHaveProperty('password', 'SterkW8woord!');
    expect(repo.create).toHaveBeenCalled();
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: expect.any(String),
      email: 'quinn@example.com',
      role: 'user',
    });
  });
});
