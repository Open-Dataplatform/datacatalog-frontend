import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailsPageRoutingModule} from './details-page-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {DetailsPageComponent} from './details-page.component';
import {DataCardsModule} from '../../components/data-cards/data-cards.module';
import {RelationMapperComponent} from '../../components/relation-mapper/relation-mapper.component';
import {DataFieldDisplayComponent} from '../../components/data-field-display/data-field-display.component';
import {AccessListComponent, SearchAdDialog} from '../../components/access-list/access-list.component';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationDialogModule } from 'src/app/components/confirmation-dialog/confirmation-dialog.module';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    DetailsPageComponent,
    RelationMapperComponent,
    DataFieldDisplayComponent,
    AccessListComponent,
    SearchAdDialog
  ],
  entryComponents: [AccessListComponent, SearchAdDialog],
    imports: [
        CommonModule,
        SharedModule,
        DetailsPageRoutingModule,
        DataCardsModule,
        MatListModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        ConfirmationDialogModule,
        MatDatepickerModule
    ],
  bootstrap: [AccessListComponent],
  exports: [
    DetailsPageComponent,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class DetailsPageModule { }
