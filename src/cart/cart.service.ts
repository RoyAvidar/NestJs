import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from 'src/entity/cart-product.entity';
import { Cart } from 'src/entity/cart.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { CreateOrderInput } from 'src/orders/dto/input/create-order.input';
import { OrdersService } from 'src/orders/orders.service';
import { Repository } from 'typeorm';
import { AddToCartInput } from './dto/input/add-cart.input';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private ordersService: OrdersService,
        @InjectRepository(CartProduct)
        private readonly cartProductRepository: Repository<CartProduct>
    ) {}

    async getCartId(user: User): Promise<number> {
        const cart = await this.cartRepository.findOne({where: {user}});
        if (cart == null) {
            throw new NotFoundException("Couldn't find cartId");
        } 
        return cart.cartId;
    }

    async getCart(user: User): Promise<Cart> {
        const cart = await this.cartRepository.findOne({relations: ["products", "user", "cartProducts", "cartProducts.product"], where: {user}});
        if (cart == null) {
            const newCart = this.cartRepository.create()
            newCart.user = user;
            newCart.totalPrice = 0;
            return this.cartRepository.save(newCart);
        }
        else {
            return cart;
        }
    }

    async getItemCount(user: User): Promise<number> {
        const cart = await this.cartRepository.findOne({relations: ["products", "user"], where: {user}});
        if (cart == null) {
            throw new Error("couldn't find a cart");
        } else {
            return cart.itemCount;
        }
    }

    async createCart(user: User): Promise<Cart> {
        const newCart = this.cartRepository.create();
        newCart.user = user;
        newCart.totalPrice = 0;
        return this.cartRepository.save(newCart);
    }

    // + sign infront of an arg is the same as .toInt();
    async addProductToCart(user: User, addToCartInput: AddToCartInput) {
        const cart = await this.cartRepository.findOne(addToCartInput.cartId, {relations: ["user", "cartProducts", "cartProducts.product"], where: {user}});
        const prod = await this.productRepository.findOne(addToCartInput.productId);
        // const cartProducts = await this.cartProductRepository.find({relations: ["cart", "products"]});
        if (cart.user.userId != user.userId) {
            throw new UnauthorizedException();
        }
        //if we already have this product in our cart?
        console.log(cart.cartProducts);
        const prodCart = cart.cartProducts.find(cp => cp.product.productId == prod.productId);
        if (prodCart)  {
            await this.cartProductRepository.update(prodCart, {quantity: prodCart.quantity + 1});
            return true;
        } else {
            // create a new product.
            await this.cartRepository.update(cart.cartId, {totalPrice: +prod.productPrice + +cart.totalPrice, itemCount: +cart.itemCount + 1});
            await this.cartProductRepository.update(prodCart, {quantity: prodCart.quantity + 1});
            await this.cartProductRepository.save(prodCart);
        }
        return true;
    }

    async removeProductFromCart(cartId: number, productId: number) {
        const cart = await this.cartRepository.findOne(cartId, {relations: ["products", "cartProducts", "cartProducts.product"]});
        if (cart.products.some(p => p.productId == productId)) {
            const prod = await this.productRepository.findOne(productId);
                //remove all of the entries in the join table
                await this.cartRepository.createQueryBuilder().relation("products").of(cart).remove(prod);
                await this.cartRepository.update(cart.cartId, {totalPrice: 0, itemCount: 0});
            
            return true;
        }
        return false;
    }

    async cleanCart(cartId: number, user: User) {
        const cart = await this.cartRepository.findOne(cartId, {relations: ["user", "products"]});
        if (cart.user.userId != user.userId) {
            throw new UnauthorizedException();
        }
        else {
            cart.itemCount = 0;
            cart.totalPrice = 0;
            cart.products = [];
            this.cartRepository.save(cart);
            return true;
        }
    }

    async submitCartToOrder(createOrderInput: CreateOrderInput, user: User) {
        const cart = await this.cartRepository.findOne(createOrderInput.cartId, {relations: ["user", "products"]});
        if (cart.products.length <= 0) {
            throw new NotFoundException("Cart is empty, please provide products to cart.");
        }
        if (!user) {
            throw new UnauthorizedException();
        }
        if (this.cleanCart(createOrderInput.cartId, user)) {
            const newOrder = await this.ordersService.createOrder(createOrderInput, user);
            return true;
        }
        return false;
    }
}
