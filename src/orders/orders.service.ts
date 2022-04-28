import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entity/address.entity';
import { Cart } from 'src/entity/cart.entity';
import { ProductOrder } from 'src/entity/product-order.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { GetOrderArgs } from './dto/args/get-order.args';
import { CreateOrderInput } from './dto/input/create-order.input';
import * as nodemailer  from "nodemailer";
var smtpTransport = require('nodemailer-smtp-transport');

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(ProductOrder)
        private productOrderRepository: Repository<ProductOrder>,
        @InjectRepository(Address)
        private addressRepository: Repository<Address>

    ) {}
    
    async getSingleOrder(getOrderData: GetOrderArgs): Promise<Order> {
        const order = await this.orderRepository.findOne(getOrderData.orderId, {relations: ["user", "productOrder", "productOrder.product"]});
        return order;
    }

    async getUserOrders(user: User): Promise<Order[]> {
        const userKek = await this.userRepository.findOne(user.userId, {relations: ["orders"]});
        const orders = await this.orderRepository.findByIds(userKek.orders, {relations: ["productOrder", "productOrder.product"], order: {createdAt: "DESC"}});
        return orders;
    };

    async getOrders(user: User): Promise<Order[]> {
        if (!user.isAdmin) {
            throw new UnauthorizedException();
        }
        const orders =  await this.orderRepository.find({relations: ["user", "productOrder", "productOrder.product"], order: {createdAt: "DESC"}});
        // console.log(orders[0]);
        return orders;
    }

    async createOrder(createOrderInput: CreateOrderInput, user: User): Promise<Order> {
        const cart = await this.cartRepository.findOne(createOrderInput.cartId, {relations: ["user", "cartProducts", "cartProducts.product"]});
        const address = await this.addressRepository.findOne(createOrderInput.addressId)
        if (cart.user.userId != user.userId) {
            throw new UnauthorizedException();
        }
        let newOrder = this.orderRepository.create();
        newOrder.orderPrice = cart.totalPrice;
        newOrder.createdAt = new Date();
        newOrder.user = cart.user;
        newOrder.address = "City: " + address.city + ", Street: " + address.streetName + ", Number: " + address.streetNumber.toString() + ", Floor: " + address.floorNumber.toString() + ", Apartment: " + address.apartmentNumber.toString();
        newOrder.productOrder = []; 
        newOrder = await newOrder.save();
        for (const pro of cart.cartProducts) {
            let prodOrd = await this.productOrderRepository.save(
            {
                    order: newOrder,
                    quantity: pro.quantity,
                    product: pro.product,
                }
            );
            newOrder.productOrder.push(prodOrd);
        }
        return newOrder;
    }

    async addProductToOrder(orderId: number, productId: number) {
        const order = await this.orderRepository.findOne(orderId);
        await this.orderRepository.createQueryBuilder().relation("products").of(order).add(productId);
        return true;
    }

    async getOrderPrice(orderId: number) {
        const order = await this.orderRepository.findOne(orderId);
        return order.orderPrice;
    }

    async toggleIsReady(user: User, orderId: number): Promise<Boolean> {
        if (!user.isAdmin) {
            throw new UnauthorizedException();
        }
        const order = await this.orderRepository.findOne(orderId);
        if (order.orderId == orderId) {
            order.isReady = true;
            await order.save();
            return true;
        } else {
            throw new Error("Couldn't find order.");
        }
    }

    async sendConfirmOrderEmail(user: User, orderId: number): Promise<Boolean> {
        const order = await this.orderRepository.findOneOrFail(orderId, {relations: ['productOrder', 'productOrder.product', 'user']});
        let mailContent = "Hello " + user.userName + " your order is on the way, here are some details about it: " + "</br>" + ", Total price:" + order.orderPrice;
        for (const prod of order.productOrder) {
         mailContent += ", Products: " + prod.product.productName + "<br>" + ", Quantity: " + prod.quantity;   
        }
        mailContent += " Address:" + order.address + "<br>" + "Received at: " + order.createdAt + " Thank you for your purches, from blabla.";
        if (user) {
            var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                  user: 'roi981av@gmail.com',
                  pass: 'roi981av'
                }
              }));
            
            var mailOptions = {
                from: 'roi981av@gmail.com',
                to: user.userEmail,
                subject: 'Your order is on the way! order number: ' + order.orderId,
                text: mailContent,
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  return false;
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
            return true;
        } else {
            throw UnauthorizedException;
        }
    }
}
