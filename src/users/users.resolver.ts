import { Resolver, Query, Args } from "@nestjs/graphql";
import { CreateUserArgs } from "./dto/args/create-user.args";
import { User } from "./models/user";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver{
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User)
    createUser(@Args() createUserArgs: CreateUserArgs) {
        return this.usersService.createUser();
    }

    @Query(() => User)
    getSingleUser(@Args() {userId: string}) {
        return this.usersService.getUser();
    }

    @Query(() => User)
    getUsers() {
        return this.usersService.getUsers();
    }
}