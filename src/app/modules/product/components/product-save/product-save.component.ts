import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/modules/category/models/category.model';
import { Product, ProductDTO } from '../../models/product.model';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-save',
  templateUrl: './product-save.component.html',
  styles: [],
})
export class ProductSaveComponent implements OnInit {
  public product: Product = new Product();
  public categories: Category[] = [];
  public productForm: FormGroup = new FormGroup<any>('');

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private catergoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.initProductForm();
    console.log('Producto:', this.product);
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      rating: [0],
      category: [new Category(), [Validators.required]],
      slug: [''],
      price: [0, [Validators.required]],
    });

    if (this.product && this.product.id) {
      this.productForm.patchValue(this.product);
    }
  }

  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const productDto: ProductDTO = new ProductDTO();
    productDto.name = this.f['name'].value;
    productDto.description = this.f['description'].value;
    productDto.imageUrl = this.f['imageUrl'].value;
    productDto.rating = this.f['rating'].value;
    productDto.slug = this.f['slug'].value;
    productDto.price = this.f['price'].value;
    productDto.categoryId = this.f['category'].value.id;

    if (this.product && this.product.id) {
      // Actualizar producto
      this.productService.update(this.product.id, productDto)
      .subscribe(() => {
        alert('Producto actualizado');
        this.closeModal(true);
      });
    } else {
      // Registrar producto
      this.productService.create(productDto)
      .subscribe(() => {
        alert('Se creo el producto exitosamente');
        this.closeModal(true);
      });
    }
  }

  closeModal(event?: boolean) {
    this.bsModalRef.onHidden?.emit(event);
    this.bsModalRef.hide();
  }

  compareFn(option: any, value: any): boolean {
    return option.id === value.id;
  }

  getCategories() {
    this.catergoryService
      .getAll()
      .subscribe((res) => (this.categories = res.content));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
}
