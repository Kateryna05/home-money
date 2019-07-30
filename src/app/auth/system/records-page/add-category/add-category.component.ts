import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';

import { Message } from 'src/app/shared/models/message.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{
  

  @Output() onCategoryAdd = new EventEmitter<Category>();
  
  message: Message;  

  constructor(private categoriesService: CategoriesService) {}


  ngOnInit() { this.message = new Message('success', '') }

  onSubmit(form: NgForm) {
 
  
    let {name, capacity} = form.value;
    if (capacity < 0) capacity *= -1;


    const category = new Category(name, capacity);

   this.categoriesService.updateCategory(category)
    .subscribe((category: Category) =>{
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(category);
        form.reset();
        this.message.text = 'Category succesfly add.';
        window.setTimeout(() => this.message.text='', 5000);
     
    })

  }

}