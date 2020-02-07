import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
} from '@angular/material';

const MaterialComponents = [
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,    
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule
];

@NgModule ({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
})
export class MaterialModule {}