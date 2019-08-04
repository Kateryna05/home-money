import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { WFMEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { mergeMap } from 'rxjs/operators'
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  sub1: Subscription;

  event: WFMEvent;
  category: Category;

  isLoaded = false;

  constructor( private route: ActivatedRoute,
               private evetsService: EventService,
               private categoriesService: CategoriesService) {

  }

  ngOnInit() {
    this.sub1 = this.route.params
    .pipe(mergeMap( (params: Params) => this.evetsService.getEventById(params['id']) ))
    .pipe(mergeMap ((event: WFMEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
    }))
    .subscribe((category: Category)=>{
      this.category = category;
      this.isLoaded = true;
    })
    
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe()
  }

}
