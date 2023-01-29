import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { UserModel } from "src/app/model/userModel";
import { AuthService } from "src/app/service/auth.service";
import { UserService } from "src/app/service/user.service";

declare function getCurrentImage(): string;

@Component({
    templateUrl: "./register.component.html",
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{

    error : string = "";
    user: UserModel = new UserModel;

    constructor(private title: Title, 
        private authService: AuthService,
        private router: Router){
        
    }

    ngOnInit(): void {
        this.title.setTitle("Register");
    }

    onSave(){
        this.authService.register(this.user).subscribe(() => {
            this.router.navigate(['login']);
            },
            error=> {
                if(error.status === 400){
                    this.error = "Le nom d'utilisateur est déjà utilisé";
                }
            }
        
        );
    }

    onBack(){

    }
}