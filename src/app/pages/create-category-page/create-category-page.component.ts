import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Category, ICategory } from 'src/app/shared/api/api';
import { MessageNotifierService } from 'src/app/shared/message-notifier/message-notifier.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'create-category-page',
  templateUrl: './create-category-page.component.html',
  styleUrls: ['./create-category-page.component.less']
})

export class CreateCategoryPageComponent implements OnInit {
  category: ICategory
  saving = false;
  categoryId: string;
  color: string = ''

  constructor(
    private categoryService: CategoryService,
    private readonly router: Router,
    private readonly messageNotifierService: MessageNotifierService,
    private readonly translateService: TranslateService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.category = new Category();
    this.category.colour = ''
  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.categoryId = params.get('term');

      this.categoryService.categories$
        .pipe(
          map(categories => categories.find(cat => cat.id === this.categoryId))
        ).subscribe(cat => {
          if (cat !== undefined)
            this.category = cat;
        });
        
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
    const colorRegExp = RegExp('^#[0-9a-f]{6}');

    return this.category.name !== undefined && this.category.name !== '' && colorRegExp.test(this.category.colour);
  }
}