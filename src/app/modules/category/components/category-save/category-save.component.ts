import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Category } from '../../models/category.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-save',
  templateUrl: './category-save.component.html',
})
export class CategorySaveComponent implements OnInit {
  public category: Category = new Category();
  public categoryForm: FormGroup = new FormGroup<any>('');

  constructor(
    private bsModalRef: BsModalRef,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initCategoryForm();
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      slug: [''],
      shortcut: [false],
    });

    if (this.category && this.category.id) {
      this.categoryForm.patchValue(this.category);
    }
  }

  saveCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    if (this.category && this.category.id) {
      this.updateCategory(this.category.id);
    } else {
      this.registerCategory();
    }
  }

  registerCategory() {
    this.categoryService.create(this.categoryForm.value).subscribe(() => {
      alert('La categoria fue creada exitosamente');
      this.closeModal();
    });
  }

  updateCategory(id: number) {
    this.categoryService.update(id, this.categoryForm.value).subscribe(() => {
      alert('Categoria actualizada exitosamente');
      this.closeModal();
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.categoryForm.controls;
  }
}
