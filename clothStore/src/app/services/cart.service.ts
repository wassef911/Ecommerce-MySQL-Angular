import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductService } from './product.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient, private ProductService: ProductService, private orderService: OrderService) { }
}
