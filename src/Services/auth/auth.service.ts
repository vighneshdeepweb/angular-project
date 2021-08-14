import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../../DatabaseEntity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
    ) { }
    async validateUser(users: User): Promise<any> {
        const user = await this.usersService.AuthenticateUser(users);
        if (user && user.Password === users.Password) {
            const { Password, ...result } = user;
            return result;
        }
        return null;
    }
    async getAuthKey(user: User): Promise<String> {
        const payload = { userid: user.UserId };
        return this.jwtService.sign(payload);
    }
}
