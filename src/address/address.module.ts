import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { AddressResolver } from "./address.resolver";
import { AddressService } from "./address.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [AddressService, AddressResolver],
})
export class AddressModule {}