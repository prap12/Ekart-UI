import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductCard } from './catalog.model';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  productCards: Observable<ProductCard[]>;
  productLength: number = 10;
  gridView: boolean = true;

  constructor(private catalogService: CatalogService) {
    this.productCards = this.catalogService.getAllProducts();
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line
  trackById(index: number, data: any) {
    return data.id;
  }
  changeDisplayView(value: string): void {
    this.gridView = value === 'grid';
  }

  receiveFilteredProduct($event) {
    this.productCards = $event;
  }
}
