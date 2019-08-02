import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { WFMEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { mergeMap } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit , OnDestroy{
  

  sub1: Subscription;
  sub2: Subscription;

  @Input() categories: Category[];
  
  types=[
    {type: 'income' , label:'Money income'},
    {type: 'outcome', label:'Spending of money'}
  ];

  message: Message;

  constructor( private eventsService: EventService,
               private billService: BillService) { }

  ngOnInit() {
    this.message = new Message ('', '')
  }

  private showMessage(type, text: string){
    this.message.type = type;
    this.message.text = text;
    window.setTimeout (() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm){
    let {amount, description, category, type} = form.value;
    if (amount <0 ) amount *=-1;

    const event =new WFMEvent(
      type, amount, +category, 
      moment().format('DD.MM.YYYY HH:mm:ss'), description
    );
      this.sub1 = this.billService.getBill()
        .subscribe((bill: Bill) =>{
          let value = 0;
          if( type === 'outcome'){
            if(amount > bill.value){ 
              this.showMessage('danger' ,`Not enough money in the account. You lack ${amount - bill.value}`);
              return;
             }
            else{ value = bill.value - amount ; this.showMessage('success', 'Successfly added new enent')}
          }
          else {  value = bill.value + amount; this.showMessage('success', 'Successfly added new enent')}

         this.sub2 = this.billService.updateBill({value, currency: bill.currency})
          .pipe(mergeMap( () => this.eventsService.addEvent(event)))
          .subscribe(() =>{
            form.setValue({
              amount:0,
              description: ' ',
              category: 1,
              type: 'oucome'
            })
          });
        })
    
  }


  ngOnDestroy() {
    if( this.sub1) this.sub1.unsubscribe();
    if( this.sub2) this.sub2.unsubscribe();
  }

  
}
