import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
  providers: [PostService, UserService]
})
export class HomeComponent {
  public page_title: string; 
  public url: any;
  public status: any;
  public posts: Array<Post> | any;
  public identity: any;
  public token: any;

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ){
    this.page_title = 'Inicio';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }
  ngOnInit() {
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if(response.status == 'success'){
          this.posts = response.posts;

         //console.log(this.posts);
        }else{
          this.status = 'error';
        }
      },
      error => { 
        this.status = 'error';
        console.log(error);
      }
    );
  }
}