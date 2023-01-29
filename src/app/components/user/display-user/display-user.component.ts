import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { UserModel } from "src/app/model/userModel";
import { AuthService } from "src/app/service/auth.service";
import { UserService } from "src/app/service/user.service";


@Component({
    templateUrl: "./display-user.component.html",
    styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit{

    users: UserModel[] = [];

    // String to perform search : 
    private _filterString: string = "";
    // Filtered users : 
    filteredUsers: UserModel[] = [];

    isAdmin: string ="";

    constructor(private title: Title, 
        private userService: UserService, 
        private authService: AuthService)
    { }


    ngOnInit(): void {
        this.title.setTitle("Tous les utilisateurs");
        this.userService.getAllUser().subscribe((data: UserModel[]) => {
            this.users = data;
            this.filteredUsers = this.users;
        });
        this.isAdmin = this.authService.getRole()
    }

    // Filter : 
    performFilter(filterBy: string){
        filterBy = filterBy.toLocaleLowerCase();
        return this.users.filter((user: UserModel) => {
            return user.pseudo?.toLocaleLowerCase().includes(filterBy);
        });
    }

    set filterString(value: string){
        this._filterString = value;
        this.filteredUsers= this.performFilter(value);
    }

    get filterString(): string{
        return this._filterString;
    }

}