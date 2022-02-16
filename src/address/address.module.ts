import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "src/entity/address.entity";
import { User } from "src/entity/user.entity";
import { AddressResolver } from "./address.resolver";
import { AddressService } from "./address.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Address, User]),
    ],
    providers: [AddressService, AddressResolver],
})
export class AddressModule {}