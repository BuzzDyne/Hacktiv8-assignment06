import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserModalComponent } from './components/create-user-modal/create-user-modal.component';
import { UpdateUserModalComponent } from './components/update-user-modal/update-user-modal.component';
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserModalComponent,
    UpdateUserModalComponent,
    EditUserModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
