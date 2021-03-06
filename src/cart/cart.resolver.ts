import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GQLCURRENTUSER } from 'src/decorators/user.decorator';
import { Cart } from 'src/entity/cart.entity';
import { CreateOrderInput } from 'src/orders/dto/input/create-order.input';
import { CartService } from './cart.service';
import { AddToCartInput } from './dto/input/add-cart.input';
import { CreateCartInput } from './dto/input/create-cart.input';
import { RemoveFromCartInput } from './dto/input/remove-cart.input';

@Resolver(() => Cart)
export class CartResolver {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => Cart)
    getCart(@GQLCURRENTUSER() user) {
        return this.cartService.getCart( user);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Number)
    getCartId(@GQLCURRENTUSER() user) {
        return this.cartService.getCartId(user);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Number)
    getItemCount(@GQLCURRENTUSER() user) {
        return this.cartService.getItemCount(user);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Number)
    getCartTotalPrice(@GQLCURRENTUSER() user) {
        return this.cartService.getCartTotalPrice(user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Cart)
    createCart(@GQLCURRENTUSER() user) {
        return this.cartService.createCart(user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    addProductToCart(@GQLCURRENTUSER() user, @Args('addToCartInput') addToCartInput: AddToCartInput) {
        return this.cartService.addProductToCart(user, addToCartInput);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    removeProductFromCart(@GQLCURRENTUSER() user, @Args('removeFromCartInput') removeFromCartInput: RemoveFromCartInput) {
        return this.cartService.removeProductFromCart(user, removeFromCartInput);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    cleanCart(@GQLCURRENTUSER() user, @Args('cartId') cartId: number) {
        return this.cartService.cleanCart(cartId, user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    submitCartToOrder(@GQLCURRENTUSER() user, @Args('createOrderInput') createOrderInput: CreateOrderInput) {
        return this.cartService.submitCartToOrder(createOrderInput, user);
    }
}
