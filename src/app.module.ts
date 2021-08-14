import { Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Modules/user/user.module';
import { AdminModule } from './Modules/admin/admin.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type: 'mssql',
      // host: 'DESKTOP-VUVG9T6\\SQLEXPRESS',
      // port: 1433,
      // username: 'sa',
      // password: 'server@123',
      // database: 'db_Q1A',
      // connectionTimeout: 15000,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: false,
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'server@123',
      database: 'db_qlaserver',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,

    }),
    MailerModule.forRoot({
      
      transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true ,// upgrade later with STARTTLS
          service: 'Gmail',
          auth: {
              user: "sk1816229@gmail.com",
              pass: "sHyam78@",
          },

      },
      defaults: {
          from: 'sk1816229@gmail.com',
      },
      template: {
          //dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter()
          options: {
              strict: true,
          },
      },
  }),
    UserModule, AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
