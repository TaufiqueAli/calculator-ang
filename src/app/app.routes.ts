import { Routes } from '@angular/router';
import { CalculatorComponent } from './component/calculator/calculator.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { CircleGenerateComponent } from './component/circle-generate/circle-generate.component';

export const routes: Routes = [
    {path:'', redirectTo:'cirlce-generate', pathMatch:'full'},
    {path:'calculator', component:CalculatorComponent},
    {path:'cirlce-generate', component: CircleGenerateComponent},
    {path:'**', component: PageNotFoundComponent }
];
