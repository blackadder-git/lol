import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdventComponent } from './advents/advent.component';
import { AdventListComponent } from './advents/advent-list/advent-list.component';
import { AdventItemComponent } from './advents/advent-item/advent-item.component';
import { AdventEditComponent } from './advents/advent-edit/advent-edit.component';
import { AdventDetailComponent } from './advents/advent-detail/advent-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './advents/advent.pipe';
// import { AdventsFilterPipe } from './advents/advents-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdventComponent,
    AdventListComponent,
    AdventItemComponent,
    AdventEditComponent,
    AdventDetailComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

