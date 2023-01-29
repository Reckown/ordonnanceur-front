import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth.service";
import { UserService } from "src/app/service/user.service";

@Component({
    selector: 'login',
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']})
  export class LoginComponent {
      form:FormGroup;
  
      error: string = "";
      loading: boolean = false;

      constructor(private fb:FormBuilder, 
                   private authService: AuthService, 
                   private router: Router, 
                   private userService: UserService) {
  
          this.form = this.fb.group({
              email: ['',Validators.required],
              password: ['',Validators.required]
          });
      }
  
      login() {
        const val = this.form.value;
        if (val.email && val.password) {
            this.loading = true;
            this.authService.login(val.email, val.password)
                .subscribe(
                    (data) => {
                        console.log("User is logged in");
                        this.userService.getByUsername(val.email).subscribe((data) => {
                            this.authService.setRole(data.isAdmin+"" ?? "");
                        });
                        this.router.navigateByUrl('/');
                    }, 
                    error => {
                        if(error){
                            this.error = "Nom de compte ou mot de passe incorrecte";
                            this.loading = false;
                        } else {
                            this.error = "Probleme d'accès au serveur";
                            this.loading = false;
                        }
                    }
                  );
          }
      }
  }