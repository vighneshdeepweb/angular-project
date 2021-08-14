import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../DatabaseEntity/user.entity';
import { UserFilter } from '../../Models/UserFilter';
import { JsonResponse } from '../../Models/JsonResponse';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {

    constructor(

        @InjectRepository(User)
        private userRepository: Repository<User>

    ) { }
    async AuthenticateUser(user: User): Promise<User> {
        return await this.userRepository.findOne({ where: [{ Email: user.Email, Password: user.Password, Active: 1, RoleId: user.RoleId }] });
    }

    async RegisterUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async GetUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: [{ Email: email }] });
    }
    async GetUserById(userid: number): Promise<User> {
        return await this.userRepository.findOne({ where: [{ UserId: userid }] });
    }
    async DeleteUser(id): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    async UpdateUser(user: User): Promise<UpdateResult> {
        return await this.userRepository.update(user.UserId, user);
    }
    async forgotPassword(email: string, password: string): Promise<JsonResponse> {
        try {
            this.userRepository.query("update user set password='" + password + "' where email='" + email + "' ");
            return new JsonResponse("200", "success", "password changed successfully.", "", "", null);
        }
        catch (error) {
            return new JsonResponse("0", "error", error, "", "", null);
        }

    }

    async searchUser(filters: UserFilter): Promise<User[]> {
        return await this.userRepository.query("CALL GetUserList (" + filters.pageno + "," + filters.pagesize + "," + filters.cityid + "," + filters.stateid + "," + filters.countryid + "," + filters.universityid + "," + "'" + filters.username + "'" + "," + "'" + filters.date + "'" + ");");
    }




}
