import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Cart } from 'src/entity/cart.entity';
import { CartService } from './cart.service';
import { AddToCartInput } from './dto/input/add-cart.input';
import { CreateCartInput } from './dto/input/create-cart.input';

@Resolver(() => Cart)
export class CartResolver {
    constructor(private readonly cartService: CartService) {}

    @Query(() => Cart)
    getCart(@Args('cartId') cartId: number) {
        return this.cartService.getCart(cartId);
    }

    @Mutation(() => Cart)
    createCart(@Args('createCartData') createCartData: CreateCartInput) {
        return this.cartService.createCart(createCartData);
    }

    @Mutation(() => Boolean)
    addProductToCart(@Args('addToCartInput') addToCartInput: AddToCartInput) {
        return this.cartService.addProductToCart(addToCartInput);
    }

    @Mutation(() => Boolean)
    removeProductFromCart(@Args('cartId') cartId: number, @Args('productId') productId: number) {
        return this.cartService.removeProductFromCart(cartId, productId);
    }
}
