import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CategoryService } from './services/category.service';
import { Category } from './models/category.model';
import { CategorySaveComponent } from './components/category-save/category-save.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  private bsModalRef?: BsModalRef;
  public categories: Category[] = [];

  constructor(private modalService: BsModalService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAll()
      .subscribe(res => this.categories = res.content);
  }

  disableCategory(id: number | undefined): void {
    if (id) {
      this.categoryService.disable(id).subscribe(() => {
        alert('Se inactivo la categoria');
        this.getCategories();
      });
    }
  }

  openSaveModal(category?: Category) {
    const initialState: ModalOptions = {
      initialState: {category}
    };
    this.bsModalRef = this.modalService.show(CategorySaveComponent, initialState);
    this.bsModalRef.onHidden?.subscribe(() => this.getCategories());
  }
}
