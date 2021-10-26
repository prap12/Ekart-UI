import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './catalog.model';

const productUrl = `${environment.apiUrl}/products`;

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get<Product[]>(productUrl);
    }
}
