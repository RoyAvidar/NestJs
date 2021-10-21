import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUserArgs } from "./dto/args/get-user.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { User } from "../entity/user.entity";
import { UsersService } from "./users.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Resolver(() => User)
export class UsersResolver{
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User)
    getSingleUser(@Args() getUserArgs: GetUserArgs) {
        return this.usersService.getUser(getUserArgs.userId);
    }

    // @UseGuards(JwtAuthGuard)
    //check if there is a valid JWT attached to our request and will also go with the strategy and add the payload to req object. 
    @Query(() => [User], {name: 'users', nullable: 'items'})
    getUsers() {
        return this.usersService.getUsers();
    }

    @Mutation(() => User)
    createUser(@Args('createUserData') createUserData: CreateUserInput) {
        return this.usersService.createUser(createUserData);
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserData') updateUserData: UpdateUserInput, @Args('userId') userId: number) {
        return this.usersService.updateUser(updateUserData, userId);
    }

    @Mutation(() => User)
    deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput) {
        return this.usersService.deleteUser(deleteUserData);
    }

    @Mutation(() => Boolean)
    addProductToUser(@Args('userId') userId: string, @Args('prodId') prodId: string) {
        return this.usersService.addProductToUser(userId, prodId);
    }

    @Mutation(() => Boolean)
    addOrderToUser(@Args('userId') userId: string, @Args('orderId') orderId: string) {
        return this.usersService.addOrderToUser(userId, orderId);
    }
}