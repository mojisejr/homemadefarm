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
    MatAutocompleteModule,
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
    MatProgressSpinnerModule,
    MatAutocompleteModule,
];

@NgModule ({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
})
export class MaterialModule {}