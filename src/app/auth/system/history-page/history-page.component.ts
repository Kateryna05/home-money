import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { WFMEvent } from '../shared/models/event.model';
import { zip, Subscription } from 'rxjs';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor( private categoriesService: CategoriesService,
               private eventService: EventService) { }

  isLoaded = false;
  sub1: Subscription;

  categories: Category[] = [];
  events: WFMEvent[] = [];

  charData = [];

  ngOnInit() {
    this.sub1 = zip(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], WFMEvent[]])=>{
      this.categories = data[0];
      this.events = data[1];

      this.calculateCharData();

      this.isLoaded = true;
    })}

    calculateCharData() : void{
      this.charData = [];
      this.categories.forEach((cat) =>{
        const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
        this.charData.push({
          name: cat.name,
          value: catEvent.reduce((total, e)=>{
            total += e.amount;
            return total;
          }, 0)
        })
      })

    }

   ngOnDestroy(){
     if(this.sub1) {this.sub1.unsubscribe()}
   } 
  

}
