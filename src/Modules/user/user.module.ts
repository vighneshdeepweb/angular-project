import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UserService } from '../../Services/user/user.service';
import { CountryService } from '../../Services/country/country.service';
import { Commonservice } from '../../Services/commonservice/commonservice.service';

import { AuthService } from '../../Services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../Services/auth/constants';
import { JwtStrategy } from '../../Services/auth/jwt.strategy';
import { LocalStrategy } from '../../Services/auth/local.strategy';

import { UserController } from '../../Controllers/user/user.controller';
import { CountryController } from '../../Controllers/country/country.controller';


import { User } from '../../DatabaseEntity/user.entity';
import { Country } from '../../DatabaseEntity/country.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Country]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '2700s' },
        }),




    ],
    exports: [UserService, AuthService],
    providers: [UserService, AuthService, CountryService, Commonservice, LocalStrategy, JwtStrategy],
    controllers: [UserController, CountryController]
})
export class UserModule { }
