import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GQLCURRENTUSER = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req.user.user;
    }
)

export const GQLCURRENTTOKEN = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req.user.token;
    }
)