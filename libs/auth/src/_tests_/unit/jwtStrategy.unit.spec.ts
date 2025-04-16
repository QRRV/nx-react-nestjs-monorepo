import { JwtStrategy } from '../../infrastructure/strategies/jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '@moviebuddy/user';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let repo: any;

  beforeEach(() => {
    repo = {
      findById: jest.fn(),
    };

    strategy = new JwtStrategy(repo);
  });

  it('should return user if valid id is provided', async () => {
    const mockUser = new User(
      'user-123',
      'quinn',
      'quinn@example.com',
      'hashedpass',
      'Filmgek',
      'user',
    );

    repo.findById.mockResolvedValue(mockUser);

    const result = await strategy.validate({
      sub: 'user-123',
      email: 'quinn@example.com',
    });

    expect(result).toBe(mockUser);
    expect(repo.findById).toHaveBeenCalledWith('user-123');
  });

  it('should throw UnauthorizedException if user not found', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(
      strategy.validate({ sub: 'not-exist', email: 'fake@example.com' })
    ).rejects.toThrow(UnauthorizedException);
  });
});
