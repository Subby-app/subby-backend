export class LoginRequestDto {
  email: string;
  password: string;

  constructor(login: LoginRequestDto) {
    this.email = login.email;
    this.password = login.password;
  }

  static from(login: any): LoginRequestDto {
    return new LoginRequestDto({
      email: login.email,
      password: login.password,
    });
  }
}
