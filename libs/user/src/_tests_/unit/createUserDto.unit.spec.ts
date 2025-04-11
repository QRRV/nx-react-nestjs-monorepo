import { validate } from 'class-validator';
import { CreateUserDto } from '../../application/dto/createUserDto';

describe('CreateUserDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new CreateUserDto();
    dto.username = 'quinn';
    dto.email = 'quinn@example.com';
    dto.password = 'SterkW8woord!';
    dto.bio = 'Filmfan';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if email is invalid', async () => {
    const dto = new CreateUserDto();
    dto.username = 'quinn';
    dto.email = 'invalid-email';
    dto.password = 'SterkW8woord!';
    dto.bio = 'Filmfan';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
    expect(errors[0]?.constraints?.['isEmail']).toBeDefined();
  });

  it('should fail validation if password is too weak', async () => {
    const dto = new CreateUserDto();
    dto.username = 'quinn';
    dto.email = 'quinn@example.com';
    dto.password = 'weakpassword';
    dto.bio = 'Filmfan';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
    expect(errors[0]?.constraints?.['matches']).toBeDefined();
  });

  it('should fail validation if required fields are missing', async () => {
    const dto = new CreateUserDto();
    dto.username = '';
    dto.email = '';
    dto.password = '';
    dto.bio = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const errorProperties = errors.map(err => err.property);
    expect(errorProperties).toContain('username');
    expect(errorProperties).toContain('email');
    expect(errorProperties).toContain('password');
    expect(errorProperties).toContain('bio');
  });
});
