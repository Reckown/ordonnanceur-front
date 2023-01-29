import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth.service";

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html'
})
export class NavBarComponent implements OnInit{    
    isUserLog: boolean = false; 

    pseudo: string = "";

    isUserAdmin: string = "";

    constructor(private authService: AuthService,
        private router: Router,){

    }

    ngOnInit(): void {
        this.authService.getValue().subscribe((value) => {
            this.isUserLog= value;
            this.pseudo = this.authService.getUsername();
            this.isUserAdmin = this.authService.getRole();
        });    
    }

    // Deconnexion : 
    clickDisconnect(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }
    
    clickConnect(): void{
        this.router.navigate(['/login']);
    }
}