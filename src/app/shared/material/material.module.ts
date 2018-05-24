import {NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatCommonModule,
    MatTableModule,
    MatInputModule
} from '@angular/material';

@NgModule({
    imports:[
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatSelectModule,
        MatToolbarModule,
        MatCardModule,
        MatCommonModule,
        MatTableModule,
        MatInputModule
            ],
    exports:[
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatSelectModule,
        MatToolbarModule,
        MatCardModule,
        MatCommonModule,
        MatTableModule,
        MatInputModule
                ],
    declarations: []

})export class MaterialModule { }