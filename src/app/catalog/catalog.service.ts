import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Brand, Category, ProductCard, Size, SubCategory } from './catalog.model';

const productUrl = `${environment.apiUrl}/products`;
const categoryUrl = `${environment.apiUrl}/category`;
const brandsUrl = `${environment.apiUrl}/brands`;
const sizesUrl = `${environment.apiUrl}/sizes`;
const subcategoriesUrl = `${environment.apiUrl}/subcategory`;

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductCard[]> {
    return this.http.get<ProductCard[]>(productUrl);
  }

  filterProductByCategory(id: number): Observable<ProductCard[]> {
    const url = `${productUrl}/category/${id}`;
    return this.http.get<ProductCard[]>(url);
  }

  filterProductBySubCategory(id: number): Observable<ProductCard[]> {
    const url = `${productUrl}/subcategory/${id}`;
    return this.http.get<ProductCard[]>(url);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(categoryUrl);
  }

  getAllSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(subcategoriesUrl);
  }

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(brandsUrl);
  }

  getAllSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(sizesUrl);
  }

  getProductImagesById(id: number): Observable<Byte[]> {
    const productImgUrl = `${productUrl}/${id}/images`;
    return this.http.get<Byte[]>(productImgUrl);
  }
}
