import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: String;
  public user: User;
  public status:string | any;
  public token:any;
  public identity:any;


  constructor(
    private _userService: UserService, 
    private _router: Router,
    private _route: ActivatedRoute
   
  ){
    this.page_title='Identificate';
    this.user=new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }
  ngOnInit() {
    //se ejecuta siempre y cierra sesion solo cuando le llega el parametro sure por la url
    this.logout();
  }
  onSubmit(form:any) {
   this._userService.signup(this.user).subscribe(
    response => {
      //token
      if(response.status != 'error'){
        this.status = 'siccess';
        this.token = response;

        //objeto usuario identificado
        this._userService.signup(this.user, <any>true).subscribe(
          response => {
              this.identity = response;

              //persistir datos identificados
              console.log(this.token);
              console.log(this.identity);

              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              //redireccion a inicio
              this._router.navigate(['inicio']);
          }, 
          error => {
              this.status='error';
              console.log(<any>error);
          }
         );

      }else {
        this.status='error';
      }
    }, 
    error => {
      this.status='error';
      console.log(<any>error);
    }
   );
  }

  logout(){
    this._route.params.subscribe( params => {
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //redireccion a inicio
        this._router.navigate(['inicio']);
      }
    });
  }
}
