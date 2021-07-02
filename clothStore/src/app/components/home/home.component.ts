import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModelServer, ServerResponse } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];


  constructor(private productService: ProductService, private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
    });
  }

  selectProduct(id: number) {
    this.router.navigate(['/product/', id]);
  }
  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }
}
