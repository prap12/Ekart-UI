import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Brand, Category, ProductCard, Size } from './catalog.model';

const productUrl = `${environment.apiUrl}/products`;
const categoryUrl = `${environment.apiUrl}/category`;
const brandsUrl = `${environment.apiUrl}/brands`;
const sizesUrl = `${environment.apiUrl}/sizes`;

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductCard[]> {
    return this.http.get<ProductCard[]>(productUrl);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(categoryUrl);
  }

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(brandsUrl);
  }

  getAllSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(sizesUrl);
  }

  getProductImagesById(id: number): Observable<Byte[]> {
    const productImgUrl = `${productUrl}/${id}/images`;
    console.log(productImgUrl);
    return this.http.get<Byte[]>(productImgUrl);
  }
}
