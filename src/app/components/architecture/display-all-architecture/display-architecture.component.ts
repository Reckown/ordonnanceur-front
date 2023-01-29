import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ArchitectureModel } from "src/app/model/architectureModel";
import { ArchitectureService } from "src/app/service/architecture.service";
import { AuthService } from "src/app/service/auth.service";


@Component({
    templateUrl: "./display-architecture.component.html",
    styleUrls: ['./display-architecture.component.css']
})
export class DisplayArchitectureComponent implements OnInit{

    architectures: ArchitectureModel[] = []; 

    // Filtered Architectures by name : 
    private _filterString: string = '';
    // Filtered Architectures : 
    filteredArchitectures: ArchitectureModel[] = [];

    isAdmin: string = "";

    constructor(private title: Title, 
        private architectureService: ArchitectureService, 
        private authService: AuthService){ }

    ngOnInit(): void{
        this.title.setTitle("Toutes les architectures");
        this.architectureService.getAllArchitecture().subscribe((data: ArchitectureModel[])=> {
            this.architectures = data;
            this.filteredArchitectures = this.architectures;
        });
        this.isAdmin = this.authService.getRole();
    }

    // Differents filter functions 
    performFilter(filterBy: string): ArchitectureModel[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.architectures.filter((architecture: ArchitectureModel) => {
            return architecture.name?.toLocaleLowerCase().includes(filterBy);
        });
    }

    set filterString(value: string){
        this._filterString = value;
        this.filteredArchitectures = this.performFilter(value);
    }

    get filterString(): string{
        return this._filterString;
    }
}