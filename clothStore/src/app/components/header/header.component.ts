import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer | any = {};
  cartTotal: number = 0;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    })
    this.cartService.cartData$.subscribe(data => {
      this.cartData = data
    })
  }

}
