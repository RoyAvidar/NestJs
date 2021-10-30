import { Resolver,  Query, Args, Mutation, Int} from "@nestjs/graphql";
import { GetOrderArgs } from "./dto/args/get-order.args";
import { Order } from "../entity/order.entity";
import { OrdersService } from "./orders.service";
import { CreateOrderInput } from "./dto/input/create-order.input";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";

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

    @UseGuards(GqlAuthGuard)
    @Query(() => [Order], {name: 'orders', nullable: 'items'})
    getOrders(@GQLCURRENTUSER() user): Promise<Order[]> {
        console.log(user);
        return this.ordersService.getOrders();
    }

    @Mutation(() => Order)
    createOrder(@Args('createOrderData') createOrderData: CreateOrderInput) {
        return this.ordersService.createOrder(createOrderData);
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