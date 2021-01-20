import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { config } from '../config';

if (environment.production) {
  enableProdMode();
}

console.log('CONFIG!!', config);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
