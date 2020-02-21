import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './contents/main/main.component';
import { ContactusComponent } from './contents/contactus/contactus.component';
import { AboutsComponent } from './contents/abouts/abouts.component';
import { ReserveOrderComponent } from './contents/reserve-order/reserve-order.component';
import { ProductchartsComponent } from './contents/productcharts/productcharts.component';
import { PollinationComponent } from './contents/pollination/pollination.component';
import { CropDetailsComponent } from './contents/pollination/crop-details/crop-details.component';
import { CropCreateComponent } from './contents/pollination/crop-create/crop-create.component';
import { ProductTableComponent } from './contents/pollination/crop-details/products/product-table/product-table.component'

const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'location', component: ContactusComponent},
    { path: 'about', component: AboutsComponent},
    { path: 'order', component: ReserveOrderComponent},
    { path: 'productcharts', component: ProductchartsComponent},
    { path: 'products', component: PollinationComponent},
    { path: 'products/new', component: CropCreateComponent },
    { path: 'products/:id', component: CropDetailsComponent},
    { path: 'products/:id/htable', component: ProductTableComponent}
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {enableTracing: true}),
    ],
    exports: [
        RouterModule,
    ]
})

export class AppRoutingModule {}