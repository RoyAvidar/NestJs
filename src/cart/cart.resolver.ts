import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GQLCURRENTUSER } from 'src/decorators/user.decorator';
import { Cart } from 'src/entity/cart.entity';
import { CreateOrderInput } from 'src/orders/dto/input/create-order.input';
import { CartService } from './cart.service';
import { AddToCartInput } from './dto/input/add-cart.input';
import { CreateCartInput } from './dto/input/create-cart.input';

@Resolver(() => Cart)
export class CartResolver {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => Cart)
    getCart(@Args('cartId') cartId: number, @GQLCURRENTUSER() user) {
        return this.cartService.getCart(cartId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Cart)
    createCart(@GQLCURRENTUSER() user) {
        return this.cartService.createCart(user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    addProductToCart(@GQLCURRENTUSER() user, @Args('addToCartInput') addToCartInput: AddToCartInput) {
        return this.cartService.addProductToCart(addToCartInput);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    removeProductFromCart(@GQLCURRENTUSER() user, @Args('cartId') cartId: number, @Args('productId') productId: number) {
        return this.cartService.removeProductFromCart(cartId, productId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    cleanCart(@GQLCURRENTUSER() user, @Args('cartId') cartId: number) {
        return this.cartService.cleanCart(cartId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    submitCartToOrder(@GQLCURRENTUSER() user, @Args('createOrderInput') createOrderInput: CreateOrderInput) {
        console.log(user);
        return this.cartService.submitCartToOrder(createOrderInput);
    }
}
