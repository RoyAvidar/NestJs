import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import * as nodemailer  from "nodemailer";
var smtpTransport = require('nodemailer-smtp-transport');

@Injectable()
export class BugReportService {

    async sendEmail(user: User, content: string): Promise<Boolean> {
            if(user) {
              var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                  user: 'roi981av@gmail.com',
                  pass: 'roi981av'
                }
              }));
              
              var mailOptions = {
                from: 'roi981av@gmail.com',
                to: 'roi981av@gmail.com',
                subject: 'A bug report from the App',
                text: "A BUG REPORT RECIVED FROM " + user.userName + ": " + content,
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              return true;
            } else {
              throw UnauthorizedException;
            }
    }
}