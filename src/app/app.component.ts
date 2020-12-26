import { Component } from '@angular/core';
import {AppConfigInitService} from "./modules/appCommon/services/app-config-init.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'frontTODO';
  constructor(configService: AppConfigInitService) {
    configService.init();
  }
}
