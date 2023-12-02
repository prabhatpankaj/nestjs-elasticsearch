import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ElasticsearchInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(response => this.serialize(response)),
    );
  }

  private serialize(response: any): any {
    // Customize the serialization logic based on your requirements
    return {
      totalHits: response.hits.total.value,
      hits: response.hits.hits.map(hit => hit._source),
    };
  }
}
