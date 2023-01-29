import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ArchitectureModel } from "src/app/model/architectureModel";
import { ArchitectureService } from "src/app/service/architecture.service";


@Component({
    templateUrl: "./edit-architecture.component.html",
    styleUrls: ['./edit-architecture.component.css']
})
export class EditArchitectureComponent implements OnInit{
    
    architecture: ArchitectureModel = new ArchitectureModel;
    
    error: string = "";

    // Est ce qu'on est en train d'éditer notre architecure ? 
    // True = on peut editer
    isEditingArchitecture: boolean = false;

    constructor(private architecureService: ArchitectureService,
        private title: Title,     
        private route: ActivatedRoute,
        private router: Router,
        ){

    }

    ngOnInit(): void {
        this.isEditingArchitecture = false;
        this.title.setTitle("Editer une architecture");
        let id = this.route.snapshot.paramMap.get('id') ?? " ";
        this.architecureService.getOneArchitecture(id).subscribe((data: ArchitectureModel[]) => {
            // TODO : Gerer le cas ou l'utilisateur rentre un mauvaise id dans la barre : 
            this.architecture = data[0];
        });
    }

    // Active le mode édition de l'architecture : 
    onEdit(): void {
        this.isEditingArchitecture = true;
    }

    // Retour au menu précédent : 
    onBack(): void {
        this.router.navigate(['architectures']);
    }

    // Sauvegarder les changements apporté à l'architecture
    onSave(): void {
        if(this.architecture.name){
            this.architecureService.editArchitecture(this.architecture).subscribe(() => {
                this.ngOnInit();
           },error => {
                if(error){
                    this.error = "L'élèment que vous essayé d'ajouter est déjà dans la base";
                } else {
                    this.error = "Probleme d'accès au serveur";
                }
            });
        } else {
            this.error= "Merci de bien remplir le formulaire"
        }

    }

    // Annuler les changements apporté à l'architecture
    onCancelChange(): void {
        this.error ="";
        this.ngOnInit();
    }

    // Delete l'architecture
    onDelete(): void {
        let id = this.route.snapshot.paramMap.get('id') ?? " ";
        this.architecureService.deleteArchitecture(id).subscribe(() => {
            this.router.navigate(['architectures']);
        },error => {
            if(error){
                this.error = "Merci de supprimer l'ensemble des ressources utilisant l'architecture avant de la supprimer";
            } else {
                this.error = "Probleme d'accès au serveur";
            }
        });
    }

}