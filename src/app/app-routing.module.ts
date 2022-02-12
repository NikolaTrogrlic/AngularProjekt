import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddingComponent } from './adding/adding.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  {path:"",component:LandingComponent},
  {path:"auth/login",component:LoginComponent},
  {path:"auth/register",component:RegisterComponent},
  {path:"popusti",component:SalesComponent},
  {path:"kategorija/:category",component:CategoryComponent},
  {path:"unos",component:AddingComponent},
  {path:"predmet/:id",component:ItemComponent},
  {path:"profil/:id",component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
