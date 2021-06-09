import {NgModule} from "@angular/core";
import {PreloadAllModules, Route, RouterModule} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {AuthGuard} from "./auth/auth.guard";

export const routes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule),
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },

  {
    path: 'category/:term/:cat',
    loadChildren: () => import('./pages/category-page/category-page.module').then(m => m.CategoryPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'category/:term',
    loadChildren: () => import('./pages/category-page/category-page.module').then(m => m.CategoryPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./pages/details-page/details-page.module').then(m => m.DetailsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'datasteward',
    loadChildren: () => import('./pages/data-steward/data-steward.module').then(m => m.DataStewardModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
