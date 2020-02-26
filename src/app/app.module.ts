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

import { FormsModule } from '@angular/forms'

//Firebase Import
import { environment } from "../../src/environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { MainComponent } from './contents/main/main.component';
import { AboutsComponent } from './contents/abouts/abouts.component';
import { ContactusComponent } from './contents/contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { PollinationComponent } from './contents/pollination/pollination.component';
import { CropCreateComponent } from './contents/pollination/crop-create/crop-create.component'

import { CropListComponent } from './contents/pollination/crop-list/crop-list.component'
import { CropDetailsComponent } from './contents/pollination/crop-details/crop-details.component'

import { ProductComponent } from './contents/pollination/crop-details/products/product.component'
import { ProductTableComponent } from './contents/pollination/crop-details/products/product-table/product-table.component'

//entry component
import { ConfirmDialogComponent } from './contents/pollination/crop-details/confirm-dialog.component'
import { AppConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component'
import { AppProductStatusDialogComponent } from './shared/components/product-status-dialog/product-status-dialog.component' 
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NevigationComponent,
    MainComponent,
    AboutsComponent,
    ContactusComponent,
    FooterComponent,
    PollinationComponent,
    CropCreateComponent,
    ConfirmDialogComponent,
    AppConfirmDialogComponent,
    AppProductStatusDialogComponent,
    CropListComponent,
    CropDetailsComponent,
    ProductComponent,
    ProductTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: FirestoreSettingsToken, useValue: {}}, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent, 
    AppConfirmDialogComponent, 
    AppProductStatusDialogComponent
  ]
})
export class AppModule { }
