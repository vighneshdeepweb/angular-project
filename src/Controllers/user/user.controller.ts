import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param, Put } from '@nestjs/common';
import { User } from '../../DatabaseEntity/user.entity';
import { UserService } from '../../Services/user/user.service';
import { JsonResponse } from '../../Models/JsonResponse';
import { AuthService } from '../../Services/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserFilter } from '../../Models/UserFilter';
import { Commonservice } from '../../Services/commonservice/commonservice.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService, public commonService: Commonservice) { }
    result: any;

    @Post('authenticateuser')
    async authenticateUser(@Body() user: User): Promise<JsonResponse> {

        let authKey;
        this.authService.getAuthKey(user).then(function (result) {
            authKey = result;
        });
        var encryptpass = this.commonService.encrypt(user.Password);
        user.Password = encryptpass;
        this.result = await this.userService.AuthenticateUser(user);
        if (this.result != undefined && this.result.UserId > 0) {
            return new JsonResponse("200", "success", "Login successfull", authKey, this.result.UserId, this.result);
        }
        else {
            return new JsonResponse("0", "error", "Invalid username or password.", "", "", null);
        }
    }

    @Post('registeruser')
    async registeruser(@Body() user: User): Promise<JsonResponse> {

        this.result = await this.userService.GetUserByEmail(user.Email);
        if (this.result != undefined && this.result.UserId > 0) {
            return new JsonResponse("0", "error", "This user is already registered.", "", this.result.UserId, this.result);
        }
        else {
            var encryptpass = this.commonService.encrypt(user.Password);
            user.Password = encryptpass;
            this.result = await this.userService.RegisterUser(user);
            if (this.result.UserId > 0) {
                //this.commonService.sendMail(user.Email, "Q1A Verification", "Verification Mail.");
                return new JsonResponse("200", "success", "User registered successfully.", "", this.result.UserId, this.result);
            }
            else {
                return new JsonResponse("0", "error", "User not registered.", "", "", null);
            }
        }

    }
    @UseGuards(AuthGuard('jwt'))
    @Get('getuserbyid/:userid')
    async GetUserById(@Param('userid') userid): Promise<User> {
        return await this.userService.GetUserById(userid);
    }

    //@UseGuards(AuthGuard('jwt'))
    @Post('searchUser')
    async SearchUser(@Body() filters: UserFilter): Promise<User[]> {
        return await this.userService.searchUser(filters);
    }
    @Delete('deleteuser/:id')
    async delete(@Param('id') id): Promise<JsonResponse> {
        this.result = this.userService.DeleteUser(id);
        return new JsonResponse("200", "success", "User deleted successfully.", "", this.result.CityId, null);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('updateuser/:id')
    async update(@Param('id') id, @Body() userData: User): Promise<JsonResponse> {
        this.result = this.userService.UpdateUser(userData);
        return new JsonResponse("200", "success", "User updated successfully.", "", this.result.UserId, null);

    }
    //@UseGuards(AuthGuard('jwt'))
    @Get('forgotpassword/:email')
    async forgotPassword(@Param('email') email): Promise<JsonResponse> {
        let data = await this.userService.GetUserByEmail(email);
        if (data == undefined) {
            return new JsonResponse("0", "error", "this user is not registered with us.", "", null, null);
        }
        else {

            var encryptpass = this.commonService.encrypt("123456");
            let result = await this.userService.forgotPassword(data.Email, encryptpass);
            if (result.status_code == "200") {
                this.commonService.sendMail(email, "Q1A Forgot Password", "Your new password for q1a is 123456");
                return new JsonResponse("200", "success", "An email has been sent to your email id.", "", null, null);
            }

        }
    }
}
