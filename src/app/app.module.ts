import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';

import { AdminService } from './admin/admin.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogService } from './catalog/catalog.service';
import { FilterComponent } from './catalog/filter/filter.component';
import { ProductCardComponent } from './catalog/productCard/productCard.component';
import { QuickViewComponent } from './catalog/productCard/quick-view/quick-view.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { TopbarComponent } from './header/topbar/topbar.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopbarComponent,
    NavbarComponent,
    LoginComponent,
    CatalogComponent,
    ProductCardComponent,
    ProductManagementComponent,
    ProductFormComponent,
    FilterComponent,
    QuickViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    NouisliderModule
  ],
  providers: [
    CatalogService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
