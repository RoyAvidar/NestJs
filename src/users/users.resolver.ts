import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUserArgs } from "./dto/args/get-user.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { User } from "../entity/user.entity";
import { UsersService } from "./users.service";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";

@Resolver(() => User)
export class UsersResolver{
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => User)
    getSingleUser(@GQLCURRENTUSER() user) {
        return this.usersService.getUser(user);
    }

    // @UseGuards(JwtAuthGuard)
    //check if there is a valid JWT attached to our request and will also go with the strategy and add the payload to req object.
    @UseGuards(GqlAuthGuard)
    @Query(() => [User], {name: 'users', nullable: 'items'})
    getUsers(@GQLCURRENTUSER() user,) {
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.usersService.getUsers();
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    createUser(@GQLCURRENTUSER() user, @Args('createUserData') createUserData: CreateUserInput) {
        return this.usersService.createUser(createUserData);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    updateUser(@GQLCURRENTUSER() user, @Args('updateUserData') updateUserData: UpdateUserInput, @Args('userId') userId: number) {
        return this.usersService.updateUser(updateUserData, userId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    deleteUser(@GQLCURRENTUSER() user, @Args('deleteUserData') deleteUserData: DeleteUserInput) {
        return this.usersService.deleteUser(deleteUserData);
    }

    @Mutation(() => Boolean)
    addProductToUser(@Args('userId') userId: string, @Args('prodId') prodId: string) {
        return this.usersService.addProductToUser(userId, prodId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    removeProductFromUser(@GQLCURRENTUSER() user, @Args('productId') productId: string) {
        return this.usersService.removeProductFromUser(user, productId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    addOrderToUser(@GQLCURRENTUSER() user, @Args('orderId') orderId: string) {
        return this.usersService.addOrderToUser(user.userId, orderId);
    }
}