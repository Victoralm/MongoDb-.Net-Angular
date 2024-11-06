import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { CommentsApi } from '../../models/comments.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent {
  @Input() movieIds: string[] = [];
  @Output("getComments") getComments: EventEmitter<any> = new EventEmitter();

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

  onInit() {
    this.movieIds = [];
  }

  validateNewComment() {
    return !this.invalidName &&
      !this.invalidEmail &&
      !this.invalidMovieId &&
      !this.invalidComment &&
      this.newCommentForm.controls.name.value != '' &&
      this.newCommentForm.controls.email.value != '' &&
      this.newCommentForm.controls.movieId.value != '' &&
      this.newCommentForm.controls.comment.value != '';
  }

  onSubmit() {
    // let isValid = !this.invalidName && !this.invalidEmail && !this.invalidMovieId && !this.invalidComment;
    // console.log(isValid);

    if (this.validateNewComment()) {
      let name: string = this.newCommentForm.controls.name.value || '';
      let email: string = this.newCommentForm.controls.email.value || '';
      let movieId: string = this.newCommentForm.controls.movieId.value || '';
      let comment: string = this.newCommentForm.controls.comment.value || '';
      let dateTime = new Date();

      let newComment: CommentsApi = {
        id: '',
        name: name,
        email: email,
        movieId: movieId,
        text: comment,
        date: dateTime
      };

      const subscription = this.commentsService.addComment(newComment, movieId).subscribe({
        complete: () => {this.getComments.emit();}
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });

      this.newCommentForm.reset();
    }
  }
}
