import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { global } from '../../services/global';



@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent {

  public page_title: string;
  public identity: any;
  public token: any;
  public post : Post | any;
  public categories : any;
  public url:any;
  public category_image: any;
  public status: any;

  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  public fileName: string | null = null;

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private _userService: UserService, 
    private _categoryService: CategoryService,
    private http: HttpClient, 
    private _postService: PostService
  ){
    this.page_title ='Crear una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit(){
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', 'null', 'null');
    
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response =>{
        if(response.status == 'succes'){
          this.categories = response.categories;
          //console.log(this.categories);
        }
      },
      error=>{
        console.log(error);
      }
      )

  }

  onSubmit(form:any) {
    this._postService.create(this.token, this.post).subscribe(
      response =>{
        if(response.status == 'success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);

        }else{
          this.status = 'error';
        }
      }, 
      error=>{
        console.log(error);
        this.status = 'error';
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
        this.fileName = file.name;

        // Crear un objeto FormData para enviar el archivo
        const formData = new FormData();
        formData.append("file0", file);

        // Configurar el encabezado con el token
        const headers = new HttpHeaders({'Authorization': this.token});

        // Realizar la solicitud HTTP con el encabezado
        const upload$ = this.http.post(global.url + "post/upload", formData, { headers });
        upload$.subscribe(
            (response:any) => {
              let data = response; 
              this.post.image=data.image;      
                
            },
            (error) => {
                // Manejar errores
                console.error("Error al cargar la imagen:", error);
              }
          );
      }
  }

}
