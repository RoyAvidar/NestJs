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
import { RemoveFromCartInput } from './dto/input/remove-cart.input';

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

    async getCartTotalPrice(user: User): Promise<number> {
        const cart = await this.cartRepository.findOne({relations: ["products", "user"], where: {user}});
        if (cart == null) {
            throw new Error("couldn't find a cart");
        } else {
            return cart.totalPrice;
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
        if (cart.user.userId != user.userId) {
            throw new UnauthorizedException();
        }
        //if we already have this product in our cart?
        const isProdInCart = cart.cartProducts.find(cp => cp.product.productId == prod.productId);
        const cartProducts = await this.cartProductRepository.findOne(isProdInCart);
        // console.log(cartProducts);
        if (isProdInCart && cartProducts)  {
            await this.cartRepository.update(cart.cartId, {totalPrice: +prod.productPrice + +cart.totalPrice, itemCount: +cart.itemCount + 1});
            await this.cartProductRepository.update(cartProducts.id, {quantity: +cartProducts.quantity + 1});
            return true;
        } else {
            // create a new product.
            await this.cartProductRepository.save({
                cart, 
                product: prod,
                quantity: 1,
            });
            await this.cartRepository.update(cart.cartId, {totalPrice: +prod.productPrice + +cart.totalPrice, itemCount: +cart.itemCount + 1});
        }
        return true;
    }

    async removeProductFromCart(user: User, removeFromCartInput: RemoveFromCartInput) {
        const cart = await this.cartRepository.findOne(removeFromCartInput.cartId, {relations: ["user", "cartProducts", "cartProducts.product"], where: {user}});
        const prod = await this.productRepository.findOne(removeFromCartInput.productId);
        if (cart.user.userId != user.userId) {
            throw new UnauthorizedException();
        }
        const isProdInCart = cart.cartProducts.find(cp => cp.product.productId == prod.productId);
        const cartProducts = await this.cartProductRepository.findOne(isProdInCart);
        // console.log(cartProducts);
        if (isProdInCart && cartProducts) {
            if (isProdInCart.quantity > 1) {
                await this.cartRepository.update(cart.cartId, {totalPrice: +cart.totalPrice - +prod.productPrice, itemCount: +cart.itemCount - 1});
                await this.cartProductRepository.update(cartProducts.id, {quantity: +cartProducts.quantity - 1});
                return true;
            } else {
                await this.cartRepository.update(cart.cartId, {totalPrice: +cart.totalPrice - +prod.productPrice, itemCount: +cart.itemCount - 1});
                await this.cartProductRepository.remove(cartProducts);
                return true; 
            }
        } else {
            throw new Error("No product found.");
        }
       
    }

    async cleanCart(cartId: number, user: User) {
        const cart = await this.cartRepository.findOne(cartId, {relations: ["user", "cartProducts", "cartProducts.product"]});
        if (cart.user.userId != user.userId) {
            throw new UnauthorizedException();
        }
        else {
            cart.itemCount = 0;
            cart.totalPrice = 0;
            cart.products = [];
            await this.cartProductRepository.remove(cart.cartProducts);
            this.cartRepository.save(cart);
            return true;
        }
    }

    async submitCartToOrder(createOrderInput: CreateOrderInput, user: User) {
        const cart = await this.cartRepository.findOne(createOrderInput.cartId, {relations: ["user", "cartProducts", "cartProducts.product"]});
        if (cart.cartProducts.length <= 0) {
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
