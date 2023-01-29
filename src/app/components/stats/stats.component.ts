import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Color, ScaleType } from "@swimlane/ngx-charts";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { StatService } from "src/app/service/stat.service";
import { StatByResourceModel } from "src/app/model/StatByResourceModel";
import { StatByUserModel } from "src/app/model/StatByUserModel";


@Component({
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{
    byRessource: any[] = [];
    byUser: any[] = [];
    view: [number, number] = [1300, 400];
  
    constructor(private title: Title, 
        private statService: StatService){

    }


    ngOnInit(): void {
        this.title.setTitle("stats");
        this.statService.getStatUsageByResources().subscribe((data: StatByResourceModel[]) => {
            for(let i=0; i< data.length; i++){
                this.byRessource.push({
                    "name": data[i].resourceName,
                    "value": data[i].value,
                });
            }
            this.byRessource= [...this.byRessource];
        });

        this.statService.getStatUsageByUser().subscribe((data: StatByUserModel[]) => {
            for(let i=0; i< data.length; i++){
                this.byUser.push({
                    "name": data[i].pseudo,
                    "value": data[i].value,
                });
            }
            this.byUser = [...this.byUser];
        });

    }


    // options
    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
  
    colorScheme: Color = {
        name: "",
        selectable: true,
        group: ScaleType.Linear,
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#31459e', '#ba1dcf', '#ff5733', '#ffBD33'],
    };
}

