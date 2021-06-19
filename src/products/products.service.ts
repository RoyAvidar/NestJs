import { Injectable } from '@nestjs/common';
import { Product } from './models/product';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    public addProduct(): Product {
        return null;
    }

    public getProduct(): Product {
        return null;
    }

    public getProucts(): Product[] {
        return null;
    }

    public updateProduct(): Product {
        return null;
    }

    public deleteProduct() {

    }
}
