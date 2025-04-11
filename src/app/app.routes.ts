import { Routes } from '@angular/router';
import { CalculatorComponent } from './component/calculator/calculator.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path:'calculator', component:CalculatorComponent},
    {path:'**', component: PageNotFoundComponent }
];
