import { Module } from "@nestjs/common";
import { BugReportResolver } from "./bugReport.resolver";

@Module({
    imports: [],
    providers: [BugReportResolver]
})

export class BugReportModule{}
