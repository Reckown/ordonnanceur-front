import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { UserModel } from "src/app/model/userModel";
import { UserService } from "src/app/service/user.service";

declare function getCurrentImage(): string;

@Component({
    templateUrl: "./add-user.component.html",
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

    user: UserModel = new UserModel;

    error: string = "";

    constructor(private title: Title,
        private userService: UserService,
        private router: Router)
    { }

    ngOnInit(): void {
        this.title.setTitle("Ajouter un utilisateur");
    }

    onSave(): void{

        if(this.user.name && this.user.pseudo && this.user.surname && this.user.password){
            this.userService.addUser(this.user).subscribe(() => {
                this.router.navigate(['user']);
            }, error => {
                if(error){
                    this.error = "Ce pseudo est déjà utilisé";
                } else {
                    this.error = "Probleme d'accès au serveur";
                }
            });
        } else {
            this.error = "Merci de bien remplir le formulaire"
        }


    }

    onBack(): void{
        this.router.navigate(['user']);
    }
    

}