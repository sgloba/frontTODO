import { Component } from '@angular/core';
import {EnvInitService} from "./modules/appCommon/services/env-init.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'frontTODO';
  constructor(configService: EnvInitService) {
    configService.init();
  }
}
