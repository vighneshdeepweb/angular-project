import { Injectable } from '@nestjs/common';
import { JsonResponse } from '../../Models/JsonResponse';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class Commonservice {

    
    constructor(private readonly mailerService: MailerService) { }
    public sendMail(to, subject, html): void {
        this
            .mailerService
            .sendMail({
                to: to,
                subject: subject,
                html: html, // HTML body content,
            })
            .then(() => {
                return new JsonResponse("200", "success", "mail sent successfully.", "", null, null);
            })
            .catch((e) => {
                return new JsonResponse("0", "error", e, "", null, null);
            });

    }
    public encrypt(text) {
        var crypto = require('crypto');
        var assert = require('assert');
        var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
        var key = 'qauloxpemnjie';       
        var cipher = crypto.createCipher(algorithm, key);  
        var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
        //var decipher = crypto.createDecipher(algorithm, key);
        //var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
        return  encrypted.toString('hex');
    }
}
