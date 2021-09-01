import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICategory } from 'src/app/shared/api/api';
import { MessageNotifierService } from 'src/app/shared/message-notifier/message-notifier.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'create-category-page',
  templateUrl: './create-category-page.component.html',
  styleUrls: ['./create-category-page.component.less']
})

export class CreateCategoryPageComponent implements OnInit {
  category: ICategory;
  saving = false;
  categoryId: string;

  constructor(
    private categoryService: CategoryService,
    private readonly router: Router,
    private readonly messageNotifierService: MessageNotifierService,
  private readonly translateService: TranslateService,
    private readonly activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.categoryId = params.get('term');
      this.category = this.categoryService.getCategoryById(this.categoryId);
    });

  }

  onDataChange() {
  }

  publishCategory() {
      this.saving = true;
      this.categoryService.upsertCategory(this.category).subscribe(resp => {
          this.saving = false;
          this.messageNotifierService.sendMessage(this.translateService.instant('createCategory.message.success'), false)
          this.router.navigate(['/']);
      }, error => {
          this.saving = false;
      });
  }

  isDataValid(): boolean {
      return this.category.name !== undefined && this.category.name !== '';
  }
}