import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { global } from '../../services/global';




@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit{
  
  public page_title:string;
  public user: User;
  public token:any;
  public identity:any;
  public status:any;
  public url:any;

  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  public fileName: string | null = null;



  constructor(
    private _userService: UserService,
    private http: HttpClient

  ){
    this.page_title = 'Ajustes de usuario';
    this.user=new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url=global.url;


    //rellenar objeto usuario
    this.user = new User(
      this.identity.sub, 
      this.identity.name, 
      this.identity.surname, 
      this.identity.role, 
      this.identity.email, '',
      this.identity.description, 
      this.identity.image);
  }

  ngOnInit() {
  
  }
  onSubmit(form: any) {
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if(response && response.status){
          //console.log(response);
          this.status = 'success';

          //Actualizar usuario en session
            this.identity = this.user;
            localStorage.setItem('identity', JSON.stringify(this.identity));
        }
        else{
          this.status = 'error';
        }
      }, 
      error => {
        this.status = 'error';
          console.log(<any>error);
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
        const upload$ = this.http.post(global.url + "user/upload", formData, { headers });
        upload$.subscribe(
            (response:any) => {
              let data = response; 
              this.user.image=data.image;
                
            },
            (error) => {
                // Manejar errores
                console.error("Error al cargar la imagen:", error);
            }
        );
    }
}

  
}
