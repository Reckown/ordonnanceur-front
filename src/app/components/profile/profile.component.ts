import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { CalendarEventModel } from "src/app/model/CalendarEventModel";
import { ResourceModel } from "src/app/model/resourceModel";
import { UserModel } from "src/app/model/userModel";
import { AuthService } from "src/app/service/auth.service";
import { CalendarService } from "src/app/service/calendar.service";
import { ResourcesService } from "src/app/service/resource.service";
import { UserService } from "src/app/service/user.service";


@Component({
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{
    
    user: UserModel = new UserModel;

    calendarEventList: CalendarEventModel[] = [];

    resourcesList: ResourceModel[] = [];

    isEditingUser: boolean = false;

    ressourcesToDisplay: ResourceModel[] = [];

    constructor(private title: Title,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute, 
        private authService: AuthService, 
        private calendarService: CalendarService, 
        private resourceService: ResourcesService){

    }

    ngOnInit(): void {
        this.isEditingUser = false;
        this.title.setTitle("profil");
        this.userService.getByUsername(this.authService.getUsername()).subscribe((data: UserModel) => {
            this.user = data
            this.resourceService.getAllResources().subscribe((resourceList: ResourceModel[]) => {
                this.resourcesList = resourceList;
                this.calendarService.getResourcesByIdUser(data._id ?? "").subscribe((userList: CalendarEventModel[]) => {
                    this.calendarEventList = userList;
                    for(let i=0; i<this.calendarEventList.length; i++){
                        this.calendarEventList[i].idResource = this.resourcesList.find(
                            (elem) => elem._id === this.calendarEventList[i].idResource
                        )?.name ?? "";
                    }
                });
            });

        });


    }

    onEdit(): void{
        this.isEditingUser = true;
    }

    onBack(): void{
        this.router.navigate(['landing']);
    }

    onSave(): void {
        this.userService.editUser(this.user).subscribe(() => {
            this.ngOnInit();
        });
    }

    onCancelChange(): void{
        this.ngOnInit();
    }
}