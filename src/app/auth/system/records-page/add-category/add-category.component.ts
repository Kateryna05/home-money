import { Component, EventEmitter, Output, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';
import { fadeStateTrigger } from '../../shared/animations/fade.animation';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  
  @HostBinding('@fade') a = true;
  
  sub1: Subscription;
  message: Message;


  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.message = new Message('success', '')
  }
  private showMessage( text: string){
    this.message.text = text;
    window.setTimeout (() => this.message.text = '', 5000);
  }


  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;
    if (capacity < 0) capacity *= -1;

    const category = new Category(name, capacity);

   this.sub1 = this.categoriesService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(category);
        this.showMessage('Category is successfully added.')
      });

  }

  ngOnDestroy(){
    if( this.sub1) this.sub1.unsubscribe();
  }
}
