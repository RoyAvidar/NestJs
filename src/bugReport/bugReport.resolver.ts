import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import * as nodemailer  from "nodemailer";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";
import { BugReportService } from "./bugReport.service";
var smtpTransport = require('nodemailer-smtp-transport');

@Resolver()
export class BugReportResolver {
  constructor(private readonly bugReportService: BugReportService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => Boolean)
    sendEmail(@GQLCURRENTUSER() user, @Args('content') content:string) {
      return this.bugReportService.sendBugReportEmail(user, content);
    }
}