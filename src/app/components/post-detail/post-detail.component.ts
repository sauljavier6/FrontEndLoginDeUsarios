import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'], 
  providers: [PostService]
})
export class PostDetailComponent {
  public post: Post | any;

  constructor(
    private postService: PostService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ){

  }

  ngOnInit(){

  }
  
  getPost(){
    //Sacar el id del post de la url

    //peticion ajax para sacar los datos del POST
  }

}
