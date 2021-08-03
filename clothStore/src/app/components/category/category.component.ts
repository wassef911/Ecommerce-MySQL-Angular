import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from "rxjs/operators";
import { ProductModelServer } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from '../../services/cart.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {
  products: ProductModelServer[];
  name: string;
  loading = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService,
    private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.loading = true;
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.name;
      })
    ).subscribe(categoryName => {
      this.name = categoryName;
      this.productService.getProductsFromCategory(this.name).subscribe(products => {
        this.products = products.products;
      });
    });
    this.loading = false;
  }

  selectProduct(id: number) {
    this.router.navigate(['/product/', id]);
  }
  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }

}
