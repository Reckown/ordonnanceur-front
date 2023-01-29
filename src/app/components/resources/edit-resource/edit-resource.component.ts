import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ArchitectureModel } from "src/app/model/architectureModel";
import { ResourceModel } from "src/app/model/resourceModel";
import { ArchitectureService } from "src/app/service/architecture.service";
import { ResourcesService } from "src/app/service/resource.service";

declare function refresh(): any;

declare function delay(): any;

@Component({
    templateUrl: "./edit-resource.component.html",
    styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit{
    
    resource: ResourceModel = new ResourceModel;

    architectureList: ArchitectureModel[] = [];

    // Est ce qu'on est en train d'etider la resource: 
    isEditingResource: boolean = false;

    // id de l'architecture de la resource: 
    idArchitecture: string = "";

    error : string = "";

    constructor(private resourceService: ResourcesService,
        private architectureService: ArchitectureService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title)
    { }
    
    async ngOnInit(): Promise<void> {
        this.title.setTitle("Editer une ressource");
        this.isEditingResource = false;
        let id = this.route.snapshot.paramMap.get('id') ?? " ";
        this.resourceService.getById(id).subscribe((data: ResourceModel[]) => {
            // TODO Gerer le cas ou un mauvaise id est rentré à la mano
            this.resource = data[0];
            this.idArchitecture = this.resource.architecture?._id ?? " " ;
        });

        this.architectureService.getAllArchitecture().subscribe((data: ArchitectureModel[]) => {
            this.architectureList = data;
        });
    }

    async onEdit(): Promise<void>{
        this.isEditingResource = true;
        await delay();
        refresh();
        console.log(this.idArchitecture);
    }

    onBack(): void{
        this.router.navigate(['resources']);
    }

    onSave(){

        if(this.resource.architecture && this.resource.name){
                    // Push de la nouvelle architecture dans la ressource: 
            if(this.resource.architecture){
                this.resource.architecture._id = this.idArchitecture;
                if(this.resource){
                    this.resource.architecture = this.architectureList.find((architecture) => architecture._id === this.idArchitecture);
                }
            }

            this.resourceService.editResource(this.resource).subscribe(() => {
                this.ngOnInit();
            }, error => {
                if(error){
                    this.error = "L'élèment que vous essayé d'ajouter est déjà dans la base";
                } else {
                    this.error = "Probleme d'accès au serveur";
                }
            });
        } else {
            this.error = "Merci de bien remplir le formulaire";
        }
    }

    onCancelChange(): void{
        this.error =""; 
        this.ngOnInit();
    }
    
    onDelete(): void{
        let id = this.route.snapshot.paramMap.get('id') ?? " ";
        this.resourceService.deleteById(id).subscribe(() => {
            this.router.navigate(['resources']);
        }, error => {
            if(error){
                this.error = "La ressource que vous essayé de supprmier possède encode des réservation, merci de les supprimer avant de supprimer la ressource";
            } else {
                this.error = "Probleme d'accès au serveur";
            }
        });
    }
}