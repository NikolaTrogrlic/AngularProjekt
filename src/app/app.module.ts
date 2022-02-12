import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';
import { ItemComponent } from './item/item.component';
import { SalesComponent } from './sales/sales.component';
import { SaleFilterPipe } from './pipes/sale-filter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { AddingComponent } from './adding/adding.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    CategoryFilterPipe,
    CategoryComponent,
    FooterComponent,
    ItemComponent,
    SalesComponent,
    SaleFilterPipe,
    ProfileComponent,
    AddingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
