import { Observable } from "rxjs";
import { ProductModelServer } from "./product.model";

export interface CartModelServer {
  total: number;
  data: [{
    product: ProductModelServer,
    numInCart: number
  }]
}

export interface ServerResponse {
  total: number;
  prodData: [{
    id: number;
    inCart: number;
  }]
}
