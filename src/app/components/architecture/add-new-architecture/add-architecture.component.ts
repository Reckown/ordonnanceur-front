import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ArchitectureModel } from "src/app/model/architectureModel";
import { ArchitectureService } from "src/app/service/architecture.service";


@Component({
    templateUrl: "./add-architecture.component.html",
    styleUrls: ['./add-architecture.component.css']
})
export class AddArchitectureComponent implements OnInit{

    architecture: ArchitectureModel = new ArchitectureModel;

    error: string = "";

    constructor(private architectureService: ArchitectureService, 
        private title: Title,
        private route: ActivatedRoute,
        private router: Router)
    { }

    ngOnInit(): void {
        this.title.setTitle("Ajouter une architecture");
    }

    onSave(): void {
        if(this.architecture.name){
            this.architectureService.addArchitecture(this.architecture).subscribe(() => {
                this.router.navigate(['architectures']);
            },
            error => {
                if(error){
                    this.error = "L'élèment que vous essayez d'ajouter est déjà dans la base";
                } else {
                    this.error = "Probleme d'accès au serveur";
                }
            });
        }
        else {
            this.error = "Merci de remplir le formulaire";
        }
    }

    // Retour au menu précédent 
    onBack(): void{
        this.router.navigate(['architectures']);
    }
}