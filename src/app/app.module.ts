import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NevigationComponent } from './nevigation/nevigation.component';
import { HttpClientModule } from '@angular/common/http'

//Firebase Import
import { environment } from "../../src/environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { MainComponent } from './contents/main/main.component';
import { AboutsComponent } from './contents/abouts/abouts.component';
import { ContactusComponent } from './contents/contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { ReserveOrderComponent } from './contents/reserve-order/reserve-order.component';
import { ProductchartsComponent } from './contents/productcharts/productcharts.component';
import { PollinationComponent } from './contents/pollination/pollination.component';
import { PollinationCreateComponent } from './contents/pollination/pollination-create/pollination-create.component'
import { PollinationListComponent } from './contents/pollination/pollination-list/pollination-list.component'
import { CropCreateComponent } from './contents/pollination/crop-create/crop-create.component'

import { CropListComponent } from './contents/pollination/crop-list/crop-list.component'

//entry component
import { DeleteDialogComponent } from './contents/pollination/pollination-list/delete-dialog.component' 

@NgModule({
  declarations: [
    AppComponent,
    NevigationComponent,
    MainComponent,
    AboutsComponent,
    ContactusComponent,
    FooterComponent,
    ReserveOrderComponent,
    ProductchartsComponent,
    PollinationComponent,
    PollinationCreateComponent,
    PollinationListComponent,
    CropCreateComponent,
    DeleteDialogComponent,
    CropListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{provide: FirestoreSettingsToken, useValue: {}}],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent]
})
export class AppModule { }
