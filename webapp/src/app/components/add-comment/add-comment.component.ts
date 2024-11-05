import { Component, DestroyRef, inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { CommentsApi } from '../../models/comments.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent {
  @Input() movieIds: string[] = [];

  newCommentForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    movieId: new FormControl('', {
      validators: [Validators.required]
    }),
    comment: new FormControl('', {
      validators: [Validators.required]
    }),
  });

  get invalidName() {
    return (this.newCommentForm.controls.name.touched &&
      this.newCommentForm.controls.name.dirty &&
      this.newCommentForm.controls.name.invalid);
  }

  get invalidEmail() {
    return (this.newCommentForm.controls.email.touched &&
      this.newCommentForm.controls.email.dirty &&
      this.newCommentForm.controls.email.invalid);
  }

  get invalidMovieId() {
    return (this.newCommentForm.controls.movieId.touched &&
      this.newCommentForm.controls.movieId.dirty &&
      this.newCommentForm.controls.movieId.invalid);
  }

  get invalidComment() {
    return (this.newCommentForm.controls.comment.touched &&
      this.newCommentForm.controls.comment.dirty &&
      this.newCommentForm.controls.comment.invalid);
  }

  private destroyRef = inject(DestroyRef);

  constructor(private commentsService: CommentsService) { }

  onSubmit() {
    if (!this.invalidName && !this.invalidEmail && !this.invalidMovieId && !this.invalidComment) {
      let name: string = this.newCommentForm.value.name || '';
      let email: string = this.newCommentForm.value.email || '';
      let movieId: string = this.newCommentForm.value.movieId || '';
      let comment: string = this.newCommentForm.value.comment || '';
      let dateTime = new Date();

      let newComment: CommentsApi = {
        id: '',
        name: name,
        email: email,
        movieId: movieId,
        text: comment,
        date: dateTime
      };

      const subscription = this.commentsService.addComment(newComment, movieId).subscribe();

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });

      this.newCommentForm.reset();
    }
  }
}
