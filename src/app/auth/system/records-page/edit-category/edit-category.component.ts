import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, HostBinding } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';
import { fadeStateTrigger } from '../../shared/animations/fade.animation';

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @HostBinding('@fade') a = true;

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  sub1: Subscription;
  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if (capacity < 0) capacity *= -1;

    const category = new Category(name, capacity, +this.currentCategoryId);

   this.sub1 = this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Category is successfully edit.';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }

  ngOnDestroy() {
    if( this.sub1) this.sub1.unsubscribe();
  }
}