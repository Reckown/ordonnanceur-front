import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UserModel } from "src/app/model/userModel";
import { UserService } from "src/app/service/user.service";

declare function getCurrentImage(): string;

@Component({
    templateUrl: "./edit-user.component.html",
    styleUrls: ['./edit-user.component.css'], 
})
export class EditUserComponent implements OnInit{

    user: UserModel = new UserModel;

    isEditingUser: boolean = false;
    error: string = "";

    constructor(private title: Title, 
        private userService: UserService,
        private router: Router,
        private route : ActivatedRoute){

    }

    async ngOnInit(){
        this.isEditingUser = false;
        this.title.setTitle("Editer un utilisateur");
        let id = this.route.snapshot.paramMap.get('id') ?? " ";
        await this.userService.getById(id).subscribe((data: UserModel[]) => {
            this.user = data[0];
        });
    }

    onEdit(): void {
        this.isEditingUser = true;
    }

    onBack(): void{
        this.router.navigate(['user']);
    }

    onSave(): void {

        if(this.user.name && this.user.pseudo && this.user.surname){
            this.userService.editUser(this.user).subscribe(() => {
                this.ngOnInit();
            }, error => {
                if(error){
                    this.error = "L'élèment que vous essayé d'ajouter est déjà dans la base";
                } else {
                    this.error = "Probleme d'accès au serveur";
                }
            });
        } else {
            this.error = "Merci de bien remplir le formulaire"
        }


    }

    onCancelChange(): void {
        this.error = ""
        this.ngOnInit();
    }

    onDelete(): void {
        let id = this.route.snapshot.paramMap.get("id") ?? " ";
        this.userService.deleteById(id).subscribe(() => {
            this.router.navigate(['user']);
        });
    }
    
}