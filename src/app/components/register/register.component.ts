import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
//import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], 
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_title: string; 
  public user: User;
  public status: string | undefined;

  constructor(  
    private _userService: UserService
  ){
    this.page_title = 'Registrate';
    this.user=new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }
  ngOnInit() {
    console.log('component de registro lanzado!!');
    console.log(this._userService.test());
  }
  onSubmit(form:any) {
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);
        
        if(response.status == "success"){
            this.status = response.status;
            form.reset();
        }else{
            this.status="error";
        }

      }, 
      error => {
        this.status="error";
        console.log(<any>error);
      }
    );
    
    
  }
}
