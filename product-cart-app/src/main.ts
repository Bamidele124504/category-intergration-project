import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app';
import { withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { withPreloading, PreloadAllModules } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
});
