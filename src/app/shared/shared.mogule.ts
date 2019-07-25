import { NgModule } from "@angular/core";
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule ({
    imports: [
        CommonModule,
        ReactiveFormsModule, 
],

    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class ShareModule {}