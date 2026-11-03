import { ApplicationConfig } from "@angular/core";
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  UrlSerializer,
} from "@angular/router";
import { provideClientHydration } from "@angular/platform-browser";
import { routes } from "./app.routes";
import { TrailingSlashUrlSerializer } from "./services/trailing-slash-url-serializer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
        anchorScrolling: "enabled",
      }),
    ),
    { provide: UrlSerializer, useClass: TrailingSlashUrlSerializer },
  ],
};
