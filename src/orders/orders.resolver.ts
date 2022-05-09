import { Resolver,  Query, Args, Mutation, Int} from "@nestjs/graphql";
import { GetOrderArgs } from "./dto/args/get-order.args";
import { Order } from "../entity/order.entity";
import { OrdersService } from "./orders.service";
import { CreateOrderInput } from "./dto/input/create-order.input";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";
import { Product } from "src/entity/product.entity";

@Resolver(() => Order)
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => Order)
    getSingleOrder(@GQLCURRENTUSER() user, @Args('getOrderArgs') getOrderArgs: GetOrderArgs) {
        return this.ordersService.getSingleOrder(getOrderArgs);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Order], {nullable: 'items'})
    getUserOrders(@GQLCURRENTUSER() user) {
        return this.ordersService.getUserOrders(user);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Order], {name: 'orders', nullable: 'items'})
    getOrders(@GQLCURRENTUSER() user): Promise<Order[]> {
        return this.ordersService.getOrders(user);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Product])
    getOrderProducts(@GQLCURRENTUSER() user): Promise<Product[]> {
        return this.ordersService.getOrderProducts(user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Order)
    createOrder(@GQLCURRENTUSER() user, @Args('createOrderData') createOrderData: CreateOrderInput) {
        return this.ordersService.createOrder(createOrderData, user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    addProductToOrder(@GQLCURRENTUSER() user, @Args('orderId') orderId: number, @Args('prodId') prodId: number) {
        return this.ordersService.addProductToOrder(orderId, prodId);
    }

    @Query(() => Int)
    getOrderPrice(@Args('orderId') orderId: number) {
        return this.ordersService.getOrderPrice(orderId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    toggleIsReady(@GQLCURRENTUSER() user, @Args('orderId') orderId: number) {
        return this.ordersService.toggleIsReady(user, orderId);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Boolean)
    sendConfirmOrderEmail(@GQLCURRENTUSER() user, @Args('orderId') orderId: number) {
        return this.ordersService.sendConfirmOrderEmail(user, orderId);
    }
}