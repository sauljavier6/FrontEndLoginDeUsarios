import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService]
})
export class CategoryNewComponent implements OnInit{

  public page_title: string;
  public identity: any; 
  public token: any; 
  public category: Category | any;

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private _userService: UserService


  ){
    this.page_title= "Crear Nueva Categoria";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1,'');
  }
  ngOnInit(){

  }
}