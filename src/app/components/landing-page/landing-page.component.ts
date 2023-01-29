import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";


@Component({
    templateUrl: "./landing-page.component.html",
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

    constructor(private router: Router,
        private title: Title)
    { }


    ngOnInit(): void {
        this.title.setTitle('landing page');
    }



}