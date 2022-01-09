import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import * as nodemailer  from "nodemailer";
var smtpTransport = require('nodemailer-smtp-transport');

@Resolver()
export class BugReportResolver {

    @UseGuards(GqlAuthGuard)
    @Query(() => Boolean)
    sendEmail(@Args('content') content:string) {
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
            subject: 'Bug Report',
            text: content,
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          
          return true;
    }
}