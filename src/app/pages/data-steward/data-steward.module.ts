import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataStewardRoutingModule } from './data-steward-routing.module';
import { DataStewardComponent } from './data-steward.component';
import { DataSetComponent } from './data-set/data-set.component';
import { DataMetaComponent } from './data-meta/data-meta.component';
import { DataAboutComponent } from './data-about/data-about.component';
import { SharedModule } from "../../shared/shared.module";
import { InputElementsModule } from "../../components/input-elements/input-elements.module";
import { DataFieldComponent } from "../../components/data-field/data-field.component";
import { TransformationSelectorComponent } from "../../components/transformation-selector/transformation-selector.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatasetChangelogComponent } from 'src/app/components/dataset-changelog/dataset-changelog.component';
import { DatasetChangelogItemComponent } from 'src/app/components/dataset-changelog/dataset-changelog-item/dataset-changelog-item.component';

@NgModule({
  declarations: [
    DataStewardComponent,
    DataSetComponent,
    DataMetaComponent,
    DataAboutComponent,
    DataFieldComponent,
    TransformationSelectorComponent,
    DatasetChangelogComponent,
    DatasetChangelogItemComponent
  ],
  exports: [
    DataFieldComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataStewardRoutingModule,
    InputElementsModule,
    DragDropModule
  ]
})
export class DataStewardModule { }
