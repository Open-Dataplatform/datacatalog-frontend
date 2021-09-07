import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";

@NgModule({
  imports: [
    MatDialogModule,
    CommonModule,
    MatInputModule
  ],
  declarations: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
