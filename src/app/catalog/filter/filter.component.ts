import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NouisliderComponent, NouisliderModule } from 'ng2-nouislider';

import { Brand, Category, Size, SubCategory } from '../catalog.model';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'catalog-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterComponent implements OnInit {
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
  rangeSlider: number[] = [0, 0];
  colors: string[];
  // tslint:disable-next-line: no-any
  rangeSliderConfig: NouisliderModule = {
    behaviour: 'drag',
    connect: true,
    keyboard: true,
    step: 1,
    pips: {
      mode: 'count',
      values: 5,
      stepped: true
    }
  };

  sliderMin: number = 0;
  sliderMax: number = 10000;
  hasSubcategoryFilter: boolean = false;
  isFilterApplied: boolean = false;
  nonCheckboxFilterApplied: boolean = false;
  brandFilter: boolean = false;
  sizeFilter: boolean = false;
  colorFilter: boolean = false;
  filteredBrands: Set<string> = new Set();
  filteredSizes: Set<string> = new Set();
  filterdColors: Set<string> = new Set();

  @Input() filterProducts: object;
  @Output() filterProductsChange = new EventEmitter();

  // tslint:disable-next-line
  trackByIdentity = (index: number, item: any) => item;

  constructor(private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.fetchProductFilters();
  }

  fetchProductFilters(filterType?: string) {
    this.isFilterApplied = this.nonCheckboxFilterApplied || this.brandFilter || this.sizeFilter || this.colorFilter;
    this.catalogService.getProductFilters(this.filterProducts).subscribe((data) => {
      if (data.max_price && filterType !== 'price') {
        this.rangeSlider = [0, Math.round(data.max_price)];
        this.sliderMax = Math.round(data.max_price);
      }
      if (data.brand && !this.brandFilter) {
        this.allbrands = this.brands = data.brand;
      }
      if (data.size && !this.sizeFilter) {
        this.allsizes = this.sizes = data.size;
      }
      if (data.color && !this.colorFilter) {
        this.colors = data.color;
      }

      this.categories = data.category;

      this.subcategories = this.allsubcategories = data.subcategory;
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

  clearFilterApplied(): void {
    this.isFilterApplied = this.nonCheckboxFilterApplied = this.hasSubcategoryFilter
     = this.brandFilter = this.sizeFilter = this.colorFilter = false;
    this.filteredBrands.clear();
    this.filteredSizes.clear();
    this.filterdColors.clear();
    this.filterProducts['min_price'] = null;
    this.filterProducts['max_price'] = null;
    this.filterProducts['category'] = '';
    this.filterProducts['subcategory'] = '';
    this.filterProducts['brand'] = [];
    this.filterProducts['size'] = [];
    this.filterProducts['color'] = [];
    this.filterProductsChange.emit(this.filterProducts);
    this.fetchProductFilters();
  }

  filterBySelectedBrands(event: Event): void {
    const checkedId = (event.target as HTMLInputElement).id;
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.filteredBrands.add(checkedId);
    } else {
      this.filteredBrands.delete(checkedId);
    }
    this.brandFilter = this.filteredBrands.size > 0;
    this.filterProducts['brand'] = Array.from(this.filteredBrands);
    this.filterProductsChange.emit(this.filterProducts);
    this.fetchProductFilters();
  }

  filterBySelectedSizes(event: Event): void {
    const checkedId = (event.target as HTMLInputElement).id;
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.filteredSizes.add(checkedId);
    } else {
      this.filteredSizes.delete(checkedId);
    }
    this.sizeFilter = this.filteredSizes.size > 0;
    this.filterProducts['size'] = Array.from(this.filteredSizes);
    this.filterProductsChange.emit(this.filterProducts);
    this.fetchProductFilters();
  }

  filterBySelectedColors(event: Event): void {
    const checkedId = (event.target as HTMLInputElement).value;
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.filterdColors.add(checkedId);
    } else {
      this.filterdColors.delete(checkedId);
    }
    this.colorFilter = this.filterdColors.size > 0;
    this.filterProducts['color'] = Array.from(this.filterdColors);
    this.filterProductsChange.emit(this.filterProducts);
    this.fetchProductFilters();
  }

  updateSliderRange(data: number[]) {
    this.rangeSlider = data;
    this.nonCheckboxFilterApplied = true;
    this.filterProducts['min_price'] = this.rangeSlider[0];
    this.filterProducts['max_price'] = this.rangeSlider[1];
    this.filterProductsChange.emit(this.filterProducts);
    this.fetchProductFilters('price');
  }

  bindRangeSliderInput(event: Event, index: number, refElement: NouisliderComponent) {
    const input = parseInt((event.target as HTMLInputElement).value, 10);
    if (index === 1 && input > this.sliderMax) {
      this.rangeSlider[index] = this.sliderMax;
    } else if (index === 0 && input > this.rangeSlider[1]){
      this.rangeSlider[0] = input;
      this.rangeSlider[1] = input;
    } else {
      this.rangeSlider[index] = input;
    }
    refElement.writeValue(this.rangeSlider);
    this.nonCheckboxFilterApplied = true;
    this.filterProducts['min_price'] = this.rangeSlider[0];
    this.filterProducts['max_price'] = this.rangeSlider[1];
    this.filterProductsChange.emit(this.filterProducts);
    this.fetchProductFilters('price');
  }

  searchBrands(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.brands = this.allbrands.filter((data) => data.name.toLowerCase().includes(input));
  }

  searchSizes(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLocaleLowerCase();
    this.sizes = this.allsizes.filter((data) => data.size.toLowerCase().includes(input));
  }

  filterProductByCategory(name: string): void {
    this.nonCheckboxFilterApplied = true;
    this.filterProducts['category'] = name;
    this.filterProductsChange.emit(this.filterProducts);
    this.fetchProductFilters('category');
  }

  filterProductBySubCategory(categoryname: string, subcategoryname: string): void {
    this.nonCheckboxFilterApplied = true;
    this.hasSubcategoryFilter = true;
    this.filterProducts['category'] = categoryname;
    this.filterProducts['subcategory'] = subcategoryname;
    this.filterProductsChange.emit(this.filterProducts);
    this.fetchProductFilters('subcategory');
  }
}
