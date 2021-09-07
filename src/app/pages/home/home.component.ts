import { Component, OnInit } from "@angular/core";
import { DataHandlerService } from "../../shared/data-handler.service";
import { UserHandlerService } from "../../shared/user/user-handler.service";
import { filter, mergeMap } from "rxjs/operators";
import { ICategory } from "src/app/shared/api/api";
import { CategoryService } from "src/app/shared/services/category.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
})
export class HomeComponent implements OnInit {
  categories: ICategory[];

  constructor(private categoryService: CategoryService) {}
  
  ngOnInit(): void {
    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }
}
