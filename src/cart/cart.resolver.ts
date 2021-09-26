import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Cart } from 'src/entity/cart.entity';
import { Product } from 'src/entity/product.entity';
import { CartService } from './cart.service';
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
    addProductToCart(@Args('cartId') cartId: number, @Args('productsId') productsId: string[]) {
        return this.cartService.addProductToCart(cartId, productsId);
    }
}
