import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const userEmail = localStorage.getItem('userEmail');

  // Only attach header to product-related requests
  if (userEmail && req.url.includes('products')) {

    const modifiedRequest = req.clone({
      setHeaders: {
        'X-User-Email': userEmail
      }
    });

    return next(modifiedRequest);
  }

  return next(req);
};
