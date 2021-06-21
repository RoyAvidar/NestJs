import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { User } from "./models/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver{
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User)
    getSingleUser(@Args() getUserArgs: GetUserArgs) {
        return this.usersService.getUser(getUserArgs.userId);
    }

    @Query(() => [User], {name: 'users', nullable: 'items'})
    getUsers(@Args() getUsersArgs: GetUsersArgs) {
        return this.usersService.getUsers();
    }

    @Mutation(() => User)
    createUser(@Args('CreateUserInput') createUserInput: CreateUserInput) {
        return this.usersService.createUser(createUserInput);
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
        return this.usersService.updateUser();
    }

    @Mutation(() => User)
    deleteUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput) {
        return this.usersService.deleteUser(deleteUserInput.userId);
    }
}