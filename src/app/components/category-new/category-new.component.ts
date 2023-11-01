import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit{

  public page_title: string;
  public identity: any; 
  public token: any; 
  public category: Category | any;
  public status: any;

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService


  ){
    this.page_title= "Crear Nueva Categoria";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1,'');
  }
  ngOnInit(){

  }

  onSubmit(form : any){
    console.log(this.category);
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if(response.status == 'succes'){
            this.category = response.category;
            this.status = 'succes';

            this._router.navigate(['/inicio']);
        }else{
            this.status = 'error';
        }

      }, 
      error => {
          this.status = "error"; 
          console.log(<any>error);
      }

    );
  }

}