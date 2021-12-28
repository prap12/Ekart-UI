import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProductCard, ProductFilter } from './catalog.model';

const productUrl = `${environment.apiUrl}/products`;
const productFilterUrl = `${productUrl}/getProductFilters`;

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }


  getAllProducts(filterProducts: object): Observable<ProductCard[]> {
    return this.http.post<ProductCard[]>(productUrl, filterProducts);
  }

  getProductFilters(filterProducts: object): Observable<ProductFilter> {
    return this.http.post<ProductFilter>(productFilterUrl, filterProducts);
  }

  getProductImagesById(id: number): Observable<Byte[]> {
    const productImgUrl = `${productUrl}/${id}/images`;
    return this.http.get<Byte[]>(productImgUrl);
  }
}
