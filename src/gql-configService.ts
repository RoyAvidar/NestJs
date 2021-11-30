import { Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
    createGqlOptions(): GqlModuleOptions {
        return {
            autoSchemaFile: true,
            context: ({req}) => ({headers: req.headers}), //graphql context has access to http req
        }
    }
}