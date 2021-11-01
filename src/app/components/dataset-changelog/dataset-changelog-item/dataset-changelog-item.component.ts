import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  AccessMemberType,
  AccessType,
  DatasetChangeLog,
  DatasetChangeType,
  PermissionChangeType,
} from "src/app/shared/api/api";

@Component({
  selector: "app-dataset-changelog-item",
  templateUrl: "./dataset-changelog-item.component.html",
  styleUrls: ["./dataset-changelog-item.component.less"],
})
export class DatasetChangelogItemComponent implements OnInit {
  @Input()
  change: DatasetChangeLog;

  constructor(private readonly translateService: TranslateService) {}

  ngOnInit(): void {}

  datasetChangeDescription() {
    switch (this.change.datasetChangeType) {
      case DatasetChangeType.Insert:
        return this.translateService.instant(
          "dataSteward.meta.changeLog.insert"
        );
      case DatasetChangeType.Update:
        return this.translateService.instant(
          "dataSteward.meta.changeLog.update"
        );
      case DatasetChangeType.Delete:
        return this.translateService.instant(
          "dataSteward.meta.changeLog.delete"
        );
      case DatasetChangeType.PermissionChange:
        return this.permissionChangeInfo();
    }
  }

  permissionChangeInfo() {
    if (!this.change.datasetPermissionChange) {
      return "";
    }

    var changeType = this.change.datasetPermissionChange.permissionChangeType == PermissionChangeType.Added
      ? this.translateService.instant("dataSteward.meta.changeLog.granted")
      : this.translateService.instant("dataSteward.meta.changeLog.revoked");
    
    var accessType = AccessType[this.change.datasetPermissionChange.accessType].toLowerCase();
    accessType = this.translateService.instant(`dataSteward.meta.changeLog.${accessType}`);
    
    var memberType = AccessMemberType[this.change.datasetPermissionChange.accessMemberType].toLowerCase();
    memberType = this.translateService.instant(`dataSteward.meta.changeLog.${memberType}`);

    var displayName = this.change.datasetPermissionChange.displayName;

    var toOf = this.change.datasetPermissionChange.permissionChangeType == PermissionChangeType.Added
      ? this.translateService.instant("dataSteward.meta.changeLog.to")
      : this.translateService.instant("dataSteward.meta.changeLog.of");

    return this.translateService.instant("dataSteward.meta.changeLog.permissionChange", {changeType, accessType, toOf, memberType, displayName})
  }
}
