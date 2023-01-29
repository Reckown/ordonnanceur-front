import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
    OnInit,
    ChangeDetectorRef,
  } from '@angular/core';
  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
  } from 'date-fns';
  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
  } from 'angular-calendar';
  import { EventColor } from 'calendar-utils';
import { ResourcesService } from 'src/app/service/resource.service';
import { CalendarEventModel } from 'src/app/model/CalendarEventModel';
import { CalendarService } from 'src/app/service/calendar.service';
import { parseISO, format } from 'date-fns';
import { ResourceModel } from 'src/app/model/resourceModel';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/service/user.service';
import { UserModel } from 'src/app/model/userModel';
import { AuthService } from 'src/app/service/auth.service';

declare function refresh(): any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: 'calendar-body.component.html',
})
export class CalendarComponent implements OnInit{
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  currentRessource : ResourceModel = new ResourceModel();

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  username: string = "";

  error: string = "";

  todayDate = new Date();

  // List of all the events we will add when pushing to the back
  eventToAdd: CalendarEventModel[] = [];  

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  // Liste de toutes les ressources dispo : 
  ressourcesList : ResourceModel[] = [];
  constructor(private modal: NgbModal, 
    private calendarService: CalendarService, 
    private changeDetectorRef: ChangeDetectorRef, 
    private ressourcesService: ResourcesService, 
    private title: Title, 
    private userService: UserService, 
    private authService: AuthService) 
  { }
  ngOnInit(): void {
    this.title.setTitle("Calendrier");
    // Inisializing the events to add with an empty event :
    this.eventToAdd = [];  
    this.events = [];  
    this.eventToAdd.push();
    this.username = this.authService.getUsername();

    // Search for the user: 
    this.userService.getByUsername(this.username).subscribe((user: UserModel) => {
      this.username = user._id ?? "";
    });

    // We take the first ressource : 
    this.ressourcesService.getAllResources().subscribe((data: ResourceModel[]) => {
      this.ressourcesList = data;
      this.currentRessource = this.ressourcesList[0];
      this.calendarService.getEventByRessourceId(this.currentRessource._id).subscribe((data: CalendarEventModel[]) => {
        for(let i = 0; i<data.length; i++){
          let color = {
            primary: "#"+data[i].user.slice(-6),
            secondary: "#"+data[i].user.slice(-6)
          }

          this.events = [
            ...this.events,
            {
              idEvent: data[i]._id,
              title: data[i].title,
              start: new Date(data[i].start),
              end: new Date(data[i].end),
              color: color,
              draggable: false,
              resizable: {
                beforeStart: false,
                afterEnd: false,
              },
              user: data[i].user,
            },
          ];
        }
        this.changeDetectorRef.detectChanges();
        refresh();
      });
    });

 
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    console.log(eventToDelete);
    this.calendarService.deleteEventById(eventToDelete.idEvent ?? "").subscribe(() => {
      this.ngOnInit();
    })
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  changeResourceDisplay(resourceId: string){
    // Vider la liste de reservation actuel 
    this.events = [];
    // Reprendre les reservations de la nouvelle ressource,
    this.calendarService.getEventByRessourceId(resourceId).subscribe((data: CalendarEventModel[]) => {
      for(let i = 0; i<data.length; i++){
        let color = {
          primary: "#"+data[i].user.slice(-6),
          secondary: "#"+data[i].user.slice(-6)
        }
        this.events = [
          ...this.events,
          {
            idEvent: data[i]._id,
            title: data[i].title,
            start: new Date(data[i].start),
            end: new Date(data[i].end),
            color: color,
            draggable: false,
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            user: data[i].user,
          },
        ];
      }
      this.ressourcesService.getById(resourceId).subscribe((data: ResourceModel[]) => {
        this.currentRessource = data[0];
        this.changeDetectorRef.detectChanges();
      })      
      // Refresh la page :) 
    }); 
  }

  // Fonctions pour gérer l'ajout de réservation : 
  saveEvents(){

    // Checking if all the data is valid : 
    let valid = true;
    for(let i =0; i<this.eventToAdd.length; i++){
      if(!this.eventToAdd[i].start || !this.eventToAdd[i].end || !this.eventToAdd[i].idResource ){
        valid = false;
        i=this.eventToAdd.length +1 ;
      }
    }

    if(valid){
      // Formating data :
      let username = localStorage.getItem("username") ?? ""; 
      this.userService.getByUsername(username).subscribe((data: UserModel) => {
        for(let i = 0; i< this.eventToAdd.length; i++){
          this.eventToAdd[i].title = "Réservation de "+username;
          this.eventToAdd[i].user = data._id ?? ""; 
        }
        this.calendarService.addCalendarEvent(this.eventToAdd).subscribe(() => {
          this.ngOnInit();
        }, error => {
            if(error){
              console.log(this.error);
              this.error = "L'une de vos réservation a un conflit";
              console.log(this.error);
              } else {
                this.error = "Probleme d'accès au serveur";
            }
            this.changeDetectorRef.detectChanges();
            this.error="";
        });
      });
    } else {
      this.error = "Merci de bien remplir le formulaire"
    }

  }

  // Ajouter une reservation : 
  addReservation(){
    this.eventToAdd.push(new CalendarEventModel);
    this.changeDetectorRef.detectChanges();
    refresh();

  }
  
  // Enlever une réservation de la liste : 
  removeReservation(index: number){
    console.log(index);
    this.eventToAdd.splice(index, 1); // 2nd parameter means remove one item only
  }
  

}
  