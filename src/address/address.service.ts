import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "src/entity/address.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { CreateAddressInput } from "./dto/create-address.input";
import { UpdateAddressInput } from "./dto/update-address.input";

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private addressRepository: Repository<Address>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getAddressByID(addressId: number): Promise<Address> {
        const dbAddress = await this.addressRepository.findOneOrFail(addressId);
        return dbAddress;
    }

    async getAddressByUser(reqUser: User): Promise<Address[]> {
        const user = await this.userRepository.findOne(reqUser.userId, {relations: ["address"]});
        const addresses = await this.addressRepository.findByIds(user.address);
        return addresses;
    }

    async createAddress(reqUser: User, createAddressInput: CreateAddressInput): Promise<Address> {
        const user = await this.userRepository.findOne(reqUser.userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        let newAddress = this.addressRepository.create();
        newAddress.city = createAddressInput.city;
        newAddress.streetName = createAddressInput.streetName;
        newAddress.streetNumber = createAddressInput.streetNumber;
        newAddress.floorNumber = createAddressInput.floorNumber;
        newAddress.apartmentNumber = createAddressInput.apartmentNumber;
        newAddress.user = user;
        newAddress = await newAddress.save();
        return newAddress;
    }

    async updateAddress(reqUser: User, updateAddressInput: UpdateAddressInput, addressId: number): Promise<Address> {
        const user = await this.userRepository.findOne(reqUser.userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        const address = await this.addressRepository.findOneOrFail(addressId);
        if (address.addressId == addressId) {
            address.city = updateAddressInput.city;
            address.streetName = updateAddressInput.streetName;
            address.streetNumber = updateAddressInput.streetNumber;
            address.floorNumber = updateAddressInput.floorNumber;
            address.apartmentNumber = updateAddressInput.apartmentNumber;
            address.user = user;
            return await address.save();
        }
        throw new Error('Something went wrong.');
    }

    async deleteAddress(reqUser: User, addressId: number): Promise<Boolean> {
        const user = await this.userRepository.findOne(reqUser.userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        const address = await this.addressRepository.findOneOrFail(addressId);
        await this.addressRepository.delete(address);
        return true;
    }

    addressItemToFront(fromSettings: boolean): boolean {
        if (fromSettings == true) {
            return true;
        } else {
            return false;
        }
    }
}