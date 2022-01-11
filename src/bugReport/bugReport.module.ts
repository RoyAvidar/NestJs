import { Module } from "@nestjs/common";
import { BugReportResolver } from "./bugReport.resolver";
import { BugReportService } from "./bugReport.service";

@Module({
    imports: [],
    providers: [BugReportResolver, BugReportService]
})

export class BugReportModule{}
