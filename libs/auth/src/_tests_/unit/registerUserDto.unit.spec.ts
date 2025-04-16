import { validate } from 'class-validator';
import { RegisterUserDto } from '../../application/dto/registerUserDto';

describe('RegisterUserDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new RegisterUserDto();
    dto.username = 'quinn';
    dto.email = 'quinn@example.com';
    dto.password = 'SterkW8woord!';
    dto.bio = 'Filmfan';
    dto.role = 'user'

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if email is invalid', async () => {
    const dto = new RegisterUserDto();
    dto.username = 'quinn';
    dto.email = 'not-an-email';
    dto.password = 'SterkW8woord!';
    dto.bio = 'Filmfan';
    dto.role = 'user'

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'email')).toBe(true);
  });

  it('should fail if password is too weak', async () => {
    const dto = new RegisterUserDto();
    dto.username = 'quinn';
    dto.email = 'quinn@example.com';
    dto.password = 'weakpass';
    dto.bio = 'Filmfan';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'password')).toBe(true);
  });

  it('should fail if required fields are empty', async () => {
    const dto = new RegisterUserDto();
    dto.username = '';
    dto.email = '';
    dto.password = '';
    dto.bio = '';

    const errors = await validate(dto);
    const props = errors.map(e => e.property);

    expect(errors.length).toBeGreaterThan(0);
    expect(props).toContain('username');
    expect(props).toContain('email');
    expect(props).toContain('password');
    expect(props).toContain('bio');
  });
});
