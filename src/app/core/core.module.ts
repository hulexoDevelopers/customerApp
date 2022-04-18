import { NgModule } from "@angular/core";
import { ApiService,OtpService } from './services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appModules = [
    FormsModule, ReactiveFormsModule
]

@NgModule({
    imports: [
        appModules],
    exports: [
        appModules],
    providers: [ApiService,OtpService]
})
export class CoreModule { }
