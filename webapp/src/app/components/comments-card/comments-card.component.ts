import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Comments } from '../../models/comments.model';

@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrl: './comments-card.component.css'
})
export class CommentsCardComponent {

  @Input() comments: Comments[] = [];
  @Output("getComments") getComments: EventEmitter<any> = new EventEmitter();

  private destroyRef = inject(DestroyRef);

  constructor(private commentsService: CommentsService) { }

  toggleEdit(index: number) {
      this.comments[index].edit = !this.comments[index].edit;
  }

  updateComment(commentId: string, newText: string) {
    const subscription = this.commentsService.updateComment(commentId, newText).subscribe({
      complete: () => {this.getComments.emit();}
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  deleteComment(commentId: string) {
    const subscription = this.commentsService.deleteComment(commentId).subscribe({
      complete: () => {this.getComments.emit();}
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

}
