import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";
import { Address } from "src/entity/address.entity";
import { AddressService } from "./address.service";
import { CreateAddressInput } from "./dto/create-address.input";
import { UpdateAddressInput } from "./dto/update-address.input";

@Resolver(() => Address)
export class AddressResolver {
    constructor(private readonly addressService: AddressService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => Address)
    getAddressByID(@Args('addressId') addressId: number) {
        return this.addressService.getAddressByID(addressId);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Address])
    getAddressByUser(@GQLCURRENTUSER() user) {
        return this.addressService.getAddressByUser(user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Address)
    createAddress(@GQLCURRENTUSER() user, @Args('createAddressInput') createAddressInput: CreateAddressInput) {
        return this.addressService.createAddress(user, createAddressInput);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Address)
    updateAddress(@GQLCURRENTUSER() user, @Args('updateAddressInput') updateAddressInput: UpdateAddressInput, @Args('addressId') addressId: number) {
        return this.addressService.updateAddress(user, updateAddressInput, addressId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    deleteAddress(@GQLCURRENTUSER() user, @Args('addressId') addressId: number) {
        return this.addressService.deleteAddress(user, addressId);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Boolean)
    addressItemToFront(@Args('fromSetting') fromSettings: boolean) {
        return this.addressService.addressItemToFront(fromSettings);
    }
}