import { Resolver,  Query, Args, Mutation, Int} from "@nestjs/graphql";
import { GetOrderArgs } from "./dto/args/get-order.args";
import { Order } from "../entity/order.entity";
import { OrdersService } from "./orders.service";
import { CreateOrderInput } from "./dto/input/create-order.input";

@Resolver(() => Order)
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) {}

    @Query(() => Order)
    getSingleOrder(@Args('getOrderArgs') getOrderArgs: GetOrderArgs) {
        return this.ordersService.getSingleOrder(getOrderArgs);
    }

    @Query(() => [Order])
    getUserOrders(@Args('userId') userId: string) {
        return this.ordersService.getUserOrders(userId);
    }

    @Query(() => [Order], {name: 'orders', nullable: 'items'})
    getOrders(): Promise<Order[]> {
        return this.ordersService.getOrders();
    }

    @Mutation(() => Order)
    createOrder(@Args('createOrderData') createOrderData: CreateOrderInput, @Args('cartId') cartId: number) {
        return this.ordersService.createOrder(createOrderData, cartId);
    }

    @Mutation(() => Boolean)
    addProductToOrder(@Args('orderId') orderId: number, @Args('prodId') prodId: number) {
        return this.ordersService.addProductToOrder(orderId, prodId);
    }

    @Query(() => Int)
    getOrderPrice(@Args('orderId') orderId: number) {
        return this.ordersService.getOrderPrice(orderId);
    }
}