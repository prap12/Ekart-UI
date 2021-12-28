import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Brand, Category, ProductCard, ProductFilter, Size, SubCategory } from './catalog.model';

const productUrl = `${environment.apiUrl}/products`;
const categoryUrl = `${environment.apiUrl}/category`;
const subcategoriesUrl = `${environment.apiUrl}/subcategory`;
const productFilterUrl = `${productUrl}/getProductFilters`;

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }
  

  getAllProducts(filter_products: Object): Observable<ProductCard[]> {
    return this.http.post<ProductCard[]>(productUrl, filter_products);
  }

  getProductFilters(filter_products: object): Observable<ProductFilter> {
    return this.http.post<ProductFilter>(productFilterUrl, filter_products);
  }
  
  getProductImagesById(id: number): Observable<Byte[]> {
    const productImgUrl = `${productUrl}/${id}/images`;
    return this.http.get<Byte[]>(productImgUrl);
  }
}
