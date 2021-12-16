import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NouisliderComponent } from 'ng2-nouislider';
import { Observable } from 'rxjs';

import { Brand, Category, Color, ProductCard, Record, Size, SubCategory } from '../catalog.model';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'catalog-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<Observable<ProductCard[]>>();
  categories: Category[] = [];
  allsubcategories: SubCategory[] = [];
  subcategories: SubCategory[] = [];
  brands: Brand[] = [];
  allbrands: Brand[] = [];
  sizes: Size[] = [];
  allsizes: Size[] = [];
  searchText: string = '';
  brandSearchText: string = '';
  sizeSearchText: string = '';
  rangeSlider: number[] = [0, 3000];
  colors = Color;
  // tslint:disable-next-line: no-any
  rangeSliderConfig: any = {
    behaviour: 'drag',
    connect: true,
    keyboard: true,
    step: 1,
    range: {
      min: 0,
      max: 10000
    },
    pips: {
      mode: 'count',
      values: 5,
      stepped: true
    }
  };

  // tslint:disable-next-line
  trackByIdentity = (index: number, item: any) => item;

  constructor(private catalogService: CatalogService) {

  }

  ngOnInit(): void {
    this.catalogService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });

    this.catalogService.getAllSubCategories().subscribe((data) => {
      this.subcategories = this.allsubcategories = data;
    });

    this.catalogService.getAllBrands().subscribe((data) => {
      this.allbrands = data;
      this.brands = this.allbrands;
    });

    this.catalogService.getAllSizes().subscribe((data) => {
      this.allsizes = data;
      this.sizes = this.allsizes;
    });
  }

  search(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.subcategories = this.allsubcategories.filter((data) => data.name.toLowerCase().includes(input));
  }

  clearSearchText(): void {
    this.searchText = '';
    this.subcategories = this.allsubcategories;
  }

  updateSliderRange(data: number[]) {
    this.rangeSlider = data;
  }

  bindRangeSliderInput(event: Event, index: number, refElement: NouisliderComponent) {
    const input = parseInt((event.target as HTMLInputElement).value, 10);
    if (index === 1 && input > this.rangeSliderConfig.range.max) {
      this.rangeSlider[index] = parseInt(this.rangeSliderConfig.range.max, 10);
    } else if (index === 0 && input > this.rangeSlider[1]){
      this.rangeSlider[0] = input;
      this.rangeSlider[1] = input;
    } else {
      this.rangeSlider[index] = input;
    }
    refElement.writeValue(this.rangeSlider);
  }

  searchBrands(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.brands = this.allbrands.filter((data) => data.name.toLowerCase().includes(input));
  }

  searchSizes(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.sizes = this.allsizes.filter((data) => data.size.toLowerCase().includes(input));
  }

  getColors(): string[] {
    const keys = Object.keys(this.colors);
    return  keys.slice(keys.length / 2);
  }

  filterProductByCategory(id: number): void {
    const filteredProducts: Observable<ProductCard[]> = this.catalogService.filterProductByCategory(id);
    this.filterEvent.emit(filteredProducts);
  }

  filterProductBySubCategory(id: number): void {
    const filteredProducts: Observable<ProductCard[]> = this.catalogService.filterProductBySubCategory(id);
    this.filterEvent.emit(filteredProducts);
  }
}
