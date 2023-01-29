import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ResourceModel } from "src/app/model/resourceModel";
import { AuthService } from "src/app/service/auth.service";
import { ResourcesService } from "src/app/service/resource.service";


@Component({
    templateUrl: "./display-resources.component.html",
    styleUrls: ['./display-resources.component.css']
})
export class DisplayResourcesComponent implements OnInit{

    resources: ResourceModel[] = [];

    // String to perform search
    private _filterString: string = "";
    // Filtered ressources : 
    filteredResources: ResourceModel[] = [];

    isAdmin: string ="";

    constructor(private title: Title, 
        private resourceService: ResourcesService, 
        private authService: AuthService,){ }

    ngOnInit(): void {
        this.title.setTitle("Toutes les resources");
        this.resourceService.getAllResources().subscribe((data: ResourceModel[]) => {
            this.resources = data;
            this.filteredResources = this.resources;
        });
        this.isAdmin = this.authService.getRole();
    }

    // Filter functions : 
    performFilter(filterBy:string){
        filterBy = filterBy.toLocaleLowerCase();
        return this.resources.filter((resource : ResourceModel) => {
            return resource.name?.toLocaleLowerCase().includes(filterBy);
        });
    }

    set filterString(value: string){
        this._filterString = value;
        this.filteredResources = this.performFilter(value);

    }

    get filterString(): string{
        return this._filterString;
    }
}