import { Component, OnInit, SimpleChanges } from '@angular/core';
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

  filter_products: Object = {
    category: '',
    subcategory: '',
    brand: [],
    size: [],
    color: [],
    page_no: 0,
    page_size: 10,
    sort_by: 'name',
    min_price: null,
    max_price: null,
  };

  constructor(private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.productCards = this.catalogService.getAllProducts(this.filter_products);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("inside on changes")
    console.log(changes)
  }

  // tslint:disable-next-line
  trackById(index: number, data: any) {
    return data.id;
  }
  changeDisplayView(value: string): void {
    this.gridView = value === 'grid';
  }

  applyFilters($event) {
    this.productCards = this.catalogService.getAllProducts($event);
  }
}
