import { Resolver,  Query, Args} from "@nestjs/graphql";
import { GetOrderArgs } from "./dto/args/get-order.args";
import { Order } from "../entity/order.entity";
import { OrdersService } from "./orders.service";

@Resolver(() => Order)
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) {}

    @Query(() => Order)
    getSingleOrder(@Args('getOrderArgs') getOrderArgs: GetOrderArgs) {
        return this.ordersService.getSingleOrder(getOrderArgs);
    }

    @Query(() => [Order], {name: 'orders', nullable: 'items'})
    getOrders(): Promise<Order[]> {
        return this.ordersService.getOrders();
    }
}