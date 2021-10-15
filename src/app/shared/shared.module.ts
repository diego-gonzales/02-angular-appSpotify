import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MesssageComponent } from './components/messsage/messsage.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    MesssageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    MesssageComponent
  ]
})
export class SharedModule { }
