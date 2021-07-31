import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private product: ProductResponseModel[] = [];
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  getSingleOrder(orderId: number) {
    return this.http.get<ProductResponseModel[]>(this.SERVER_URL + "/orders/" + orderId).toPromise();
  }
}

interface ProductResponseModel {
  id: number,
  title: string,
  description: string;
  price: number;
  quantityOrdred: number;
  image: string;
}
