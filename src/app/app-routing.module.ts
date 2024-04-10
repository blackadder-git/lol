import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdventComponent } from './advents/advent.component';
import { AdventDetailComponent } from './advents/advent-detail/advent-detail.component';
import { AdventEditComponent } from './advents/advent-edit/advent-edit.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/advents", pathMatch: "full" },
  { path: "advents", component: AdventComponent, children: [
    { path: "new", component: AdventEditComponent },
    { path: ":id", component: AdventDetailComponent },
    { path: ":id/edit", component: AdventEditComponent },
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes) // register the routes defined above
  ],
  exports: [
    RouterModule
  ]  
})

export class AppRoutingModule { }