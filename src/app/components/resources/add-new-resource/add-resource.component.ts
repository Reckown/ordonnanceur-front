import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ArchitectureModel } from "src/app/model/architectureModel";
import { ResourceModel } from "src/app/model/resourceModel";
import { ArchitectureService } from "src/app/service/architecture.service";
import { ResourcesService } from "src/app/service/resource.service";

declare function refresh() : any; 
declare function delay(): any;  

@Component({
    templateUrl: "./add-resource.component.html",
    styleUrls: ['./add-resource.component.css']
})
export class AddResouceComponent implements OnInit{

    error: string = ""

    resource: ResourceModel = new ResourceModel;

    idArchitecture: String = "";    

    architectureList: ArchitectureModel[] = []

    constructor(private title: Title, 
        private resourceService: ResourcesService, 
        private architectureService: ArchitectureService,
        private router: Router)
    { }

    ngOnInit(): void {
        this.title.setTitle("Ajouter une resource");
        this.resource.architecture = new ArchitectureModel;
        // Load all the possible architectures : 
        this.architectureService.getAllArchitecture().subscribe(async (data: ArchitectureModel[]) => {
            this.architectureList = data;
            console.log(this.architectureList);
            await delay();
            refresh();
        });

    }

    onSave(): void {
        if(this.resource.architecture && this.resource.name){
            if(this.resource.architecture){
                this.resource.architecture = this.architectureList.find(architecture => architecture._id === this.idArchitecture);
            }
            this.resourceService.addResource(this.resource).subscribe(() => {
                this.router.navigate(['resources']);
            }, error => {
                if(error){
                    this.error = "L'élèment que vous essayé d'ajouter est déjà dans la base";
                } else {
                    this.error = "Probleme d'accès au serveur";
                }
            }
            );
        } else {
            this.error ="Merci de bien remplir le formulaire";
        }


    }
    
    onBack(): void {
        this.router.navigate(['resources']);
    }
}