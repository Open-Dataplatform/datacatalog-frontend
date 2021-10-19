import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressDialogComponent } from './progress-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  declarations: [ProgressDialogComponent],
  exports: [ProgressDialogComponent],
})
export class ProgressDialogModule {}
