import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentsComponent } from './components/comments/comments.component';
import { provideHttpClient } from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import { featherAirplay, featherPenTool } from '@ng-icons/feather-icons';
import { bootstrapPencil, bootstrapPlusSquareFill, bootstrapSave, bootstrapStopCircleFill, bootstrapXOctagonFill, bootstrapXSquare } from '@ng-icons/bootstrap-icons';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgIconsModule.withIcons({ featherAirplay, featherPenTool, bootstrapPencil, bootstrapXSquare, bootstrapXOctagonFill, bootstrapPlusSquareFill, bootstrapStopCircleFill, bootstrapSave }),
    ReactiveFormsModule,
    NgbTooltipModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
