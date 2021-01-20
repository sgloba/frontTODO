import {AppConfigInitService} from "../services/app-config-init.service";

export function AppConfigInitServiceFactory(provider: AppConfigInitService) {
  return () => provider.init();
}
