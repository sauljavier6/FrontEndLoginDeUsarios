import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {routing, appRoutingProviders} from './app.routing';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    CategoryNewComponent,
    PostNewComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule, 
    routing, 
    FormsModule, 
    HttpClientModule, 
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(), BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
