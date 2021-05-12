import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {DataHandlerService} from "../../shared/data-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Components } from '../../../types/dataplatform-api'
import IDataset = Components.Schemas.IDataset;
import ITransformation = Components.Schemas.ITransformation;
import ILineageTransformation = Components.Schemas.ILineageTransformation;

@Component({
  selector: 'app-relation-mapper',
  templateUrl: './relation-mapper.component.html',
  styleUrls: ['./relation-mapper.component.less']
})
export class RelationMapperComponent implements OnInit {

  @Input()
  dataCard: IDataset;
  relations: ITransformation;
  currentTransform: IDataset[];
  currentShortTransform: string;

  dynPoints: any[] = [];

  SPACING: number = 150;
  BOX_SIZE: number = 100;
  GUTTER: number = 20;

  constructor(private readonly router:Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly dataHandlerService: DataHandlerService,
              private readonly elementRef: ElementRef) { }

  ngOnInit() {
    this.relations = this.emptyRelations;
    this.currentTransform = [];
    this.activeRoute.params.subscribe(routeParams => {
      this.getLineage(routeParams.id);
    });
    this.getLineage(this.dataCard ? this.dataCard.id : '');
  }

  get emptyRelations(): ITransformation {
    return {
      id: "0",
      description: '',
      shortDescription: '',
      sinkDatasets: [],
      sourceDatasets: []
    }
  }

  getLineage(id: string) {
    this.dataHandlerService.getLineage(`${id}`).subscribe( response => {
      this.dataHandlerService.setCurrentTransformation(response.sourceTransformations);
      this.currentShortTransform = response.name ? response.name : '';

      this.relations.sinkDatasets = this.getSinkData(response.sinkTransformations);
      this.relations.sourceDatasets = this.getSourceData(response.sourceTransformations);
      this.currentTransform = [{id: this.dataCard ? this.dataCard.id : '', description: this.dataCard.description, name: this.dataCard.name}];
    });
  }

  getSourceData(transformations: ILineageTransformation[]): IDataset[] | [] {
    let sourceData = [];
    transformations.forEach(transform => {
      sourceData = [...sourceData, ...transform.datasets];
    });

    return sourceData;
  }

  getSinkData(transformations: ILineageTransformation[]): IDataset[] | [] {
    let sinkData = [];
    transformations.forEach(transform => {
      sinkData = [...sinkData, ...transform.datasets];
    });

    return sinkData;
  }

  goToDataset(id: string) {
    this.router.navigate(['/detail', id]);
  }

  calculateParentStyle(index: number) {
    return {
      top: this.calculateTop(this.relations.sourceDatasets, index + 1) + 'px',
    };
  }

  calculateCurrentStyle() {
    return {
      left: this.getCenter(),
      top: this.calculateTop(this.currentTransform, 1) + 'px'
    };
  }

  calculateChildStyle(index: number) {
    return {
      top: this.calculateTop(this.relations.sinkDatasets, index + 1) + 'px',
    };
  }

  private calculateTop(section: IDataset[], index: number = 0):number {
    let placement: number = 0;
    if (section.length > 1) {
      placement = (index * this.SPACING) + ((this.getBiggestSection() / section.length) * this.SPACING) - this.SPACING * 2;
      return placement + this.GUTTER;
    }
    return this.getVerticalCenter() + this.GUTTER;
  }

  public getBiggestSection(): number {
    return Math.max(this.relations.sourceDatasets.length, this.relations.sinkDatasets.length, this.currentTransform.length);
  }

  private getVerticalCenter(): number {
    let biggestColumn: number = 0;
    biggestColumn = this.getBiggestSection();

    return (((biggestColumn + 1) * this.SPACING) / 2) - 150;
  }

  private centerXChildCurrent(): number {
    const wrapper = this.elementRef.nativeElement.querySelector('#mapper-wrapper');
    const current = this.elementRef.nativeElement.querySelector('#current');
    const child = this.elementRef.nativeElement.querySelector('#child-0');
    if (!current || !child || !wrapper) {
      return 0;
    }
    const wrapperRect = wrapper.getBoundingClientRect();
    const currentRect = current.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    let center: number = 0;

    center = (currentRect.right + childRect.left) / 2;
    center = center - wrapperRect.left;

    return center;
  }

  private centerXParentCurrent(): number {
    const wrapper = this.elementRef.nativeElement.querySelector('#mapper-wrapper');
    const current = this.elementRef.nativeElement.querySelector('#current');
    const parent = this.elementRef.nativeElement.querySelector('#parent-0');
    if (!current || !parent || !wrapper) {
      return 0;
    }
    const wrapperRect = wrapper.getBoundingClientRect();
    const currentRect = current.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    let center: number = 0;

    center = (currentRect.right + parentRect.left) / 2;
    center = center - wrapperRect.left;
    // this.createPoint(center, Math.random() * 300, 10, 10, '#00ff00');

    return center;
  }

  private getCenter():string {
    const wrapper = this.elementRef.nativeElement.querySelector('#mapper-wrapper');
    if (!wrapper) {
      return '0px';
    }

    const wrapperRect = wrapper.getBoundingClientRect();
    const center = (wrapperRect.width / 2) - (this.BOX_SIZE / 2);

    return center + 'px';
  }

  createPoint(x: number, y: number, width: number, height: number, color: string) {
    this.dynPoints.push({x, y, width, height, color});
  }

  parentDividerStyle() {
    const maxRelations = Math.max(this.relations.sourceDatasets.length, this.currentTransform.length);
    const lambda = (this.getBiggestSection() / maxRelations) - 1;
    return {
      left: `${this.centerXParentCurrent()}px`,
      top: `${((this.BOX_SIZE / 2) + (this.SPACING * lambda) + 20)}px`,
      height: `${((maxRelations * this.SPACING) - this.BOX_SIZE - (this.BOX_SIZE / 2))}px`,
    };
  }

  childDividerStyle() {
    const maxRelations = Math.max(this.relations.sinkDatasets.length, this.currentTransform.length);
    const lambda = (this.getBiggestSection() / maxRelations) - 1;

    return {
      left: `${this.centerXChildCurrent()}px`,
      top: `${((this.BOX_SIZE / 2) + (this.SPACING * lambda) + 20)}px`,
      height: `${((maxRelations * this.SPACING) - this.BOX_SIZE - (this.BOX_SIZE / 2))}px`,
    };
  }

  hasChildren(): boolean {
    return !!this.relations.sinkDatasets &&
           !!this.relations.sinkDatasets.length;
  }

  hasParents(): boolean {
    return !!this.relations.sourceDatasets &&
           !!this.relations.sourceDatasets.length;
  }

}
