import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { Comments } from '../../models/comments.model';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  comments = signal<Comments[] | []>([]);
  isFetching = signal(false);
  error = signal('');
  movieIds: string[] = [];

  private destroyRef = inject(DestroyRef);

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.isFetching.set(true);
    const subscription = this.commentsService.getComments().subscribe({
        next: (response) => {
          response.forEach(comment => {
            comment.edit = false;
            this.movieIds.push(comment.movieId)
          });
          this.comments.set(response);
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (error: Error) => {
          console.log(error)
          this.error.set('Algo deu errado ao carregar os dados...');
        }
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  toggleEdit(index: number) {
      this.comments()[index].edit = !this.comments()[index].edit;
  }

  updateComment(commentId: string, newText: string) {
    const subscription = this.commentsService.updateComment(commentId, newText).subscribe({
      complete: () => {this.getComments();}
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  deleteComment(commentId: string) {
    const subscription = this.commentsService.deleteComment(commentId).subscribe({
      complete: () => {this.getComments();}
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
