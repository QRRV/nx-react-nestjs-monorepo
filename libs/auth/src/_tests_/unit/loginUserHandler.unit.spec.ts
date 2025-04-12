import { LoginUserHandler } from '../../application/handlers/loginUserHandler';
import { LoginUserQuery } from '../../application/queries/loginUserQuery';
import * as bcrypt from 'bcrypt';
import { User } from '@moviebuddy/user';

describe('LoginUserHandler', () => {
  let handler: LoginUserHandler;
  let repo: any;
  let jwtService: any;

  beforeEach(() => {
    repo = {
      findByEmail: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mock-jwt-token'),
    };

    handler = new LoginUserHandler(repo, jwtService);
  });

  it('should return token if credentials are valid', async () => {
    const user = new User(
      'user-id',
      'quinn',
      'quinn@example.com',
      await bcrypt.hash('SterkW8woord!', 10),
      'Bio'
    );

    repo.findByEmail.mockResolvedValue(user);

    const result = await handler.execute(
      new LoginUserQuery('quinn@example.com', 'SterkW8woord!')
    );

    expect(result.accessToken).toBe('mock-jwt-token');
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: 'user-id',
      email: 'quinn@example.com',
    });
  });

  it('should throw if email not found', async () => {
    repo.findByEmail.mockResolvedValue(null);

    await expect(
      handler.execute(new LoginUserQuery('notfound@example.com', 'any'))
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw if password is incorrect', async () => {
    const user = new User(
      'user-id',
      'quinn',
      'quinn@example.com',
      await bcrypt.hash('SterkW8woord!', 10),
      'Bio'
    );

    repo.findByEmail.mockResolvedValue(user);

    await expect(
      handler.execute(new LoginUserQuery('quinn@example.com', 'foutwachtwoord'))
    ).rejects.toThrow('Invalid credentials');
  });
});
