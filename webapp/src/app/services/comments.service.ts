import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, take, throwError } from 'rxjs';
import { environment } from '../environment/environment';
import { Comments, CommentsApi } from '../models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  config = environment;

  constructor(private http: HttpClient) { }

  public getComments(): Observable<Comments[]> {
    return this.http
      .get<Comments[]>(this.config.api_url)
      .pipe(
        map((obj) => obj),
        take(1),
        catchError((e) => {
          console.log('Error caught in service');
          console.error(e.message);
          return throwError(() => {
            new Error('Algo deu errado ao carregar os dados...')
          });
        })
      );
  }

  public addComment(newComment: CommentsApi, movieId: string) {
    return this.http.post(`${this.config.api_url}?movieId=${movieId}`, newComment)
    .pipe(
        map((obj) => obj),
        take(1),
        catchError((e) => {
          console.log('Error caught in service');
          console.error(e.message);
          return throwError(e);
        })
      );
  }

  public updateComment(commentId: string, newText: string) {
    return this.http.put(`${this.config.api_url}?commentId=${commentId}&newText=${newText}`, null)
      .pipe(
        map((obj) => obj),
        take(1),
        catchError((e) => {
          console.log('Error caught in service');
          console.error(e.message);
          return throwError(e);
        })
      );
  }

  public deleteComment(commentId: string) {
    return this.http.delete(`${this.config.api_url}?commentId=${commentId}`)
      .pipe(
        map((obj) => obj),
        take(1),
        catchError((e) => {
          console.log('Error caught in service');
          console.error(e.message);
          return throwError(e);
        })
      );
  }
}
