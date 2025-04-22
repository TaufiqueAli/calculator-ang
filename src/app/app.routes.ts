import { Routes } from '@angular/router';
import { CalculatorComponent } from './component/calculator/calculator.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { CircleGenerateComponent } from './component/circle-generate/circle-generate.component';
import { ChildComponent } from './component/child/child.component';
import { ParentComponent } from './component/parent/parent.component';
import { TextUtilityComponent } from './component/text-utility/text-utility.component';

export const routes: Routes = [
    {path:'', redirectTo:'cirlce-generate', pathMatch:'full'},
    {path:'calculator', component:CalculatorComponent},
    {path:'cirlce-generate', component: CircleGenerateComponent},
    {path:'child', component: ChildComponent},
    {path:'parent', component: ParentComponent},
    {path:'text-utility', component: TextUtilityComponent},
    {path:'**', component: PageNotFoundComponent }
];
