// cache.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheExpiration = 20 * 60 * 1000; // 20 minutes in milliseconds

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is a GET request
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // Check if the response is already in the cache and not expired
    const cachedData = this.cache.get(req.urlWithParams);
    if (cachedData && Date.now() - cachedData.timestamp < this.cacheExpiration) {
      console.log('CacheInterceptor: Returning cached data for', req.url);
      return of(new HttpResponse({ body: cachedData.data }));
    }

    // Continue with the original request
    return next.handle(req).pipe(
      tap((event) => {
        // Cache only successful GET responses
        if (event instanceof HttpResponse && req.method === 'GET') {
          console.log('CacheInterceptor: Caching data for', req.url);
          this.cache.set(req.urlWithParams, { data: event.body, timestamp: Date.now() });
        }
      })
    );
  }
}
