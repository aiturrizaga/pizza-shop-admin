import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ProductSaveComponent } from './components/product-save/product-save.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit {
  public products: Product[] = [];
  private bsModalRef?: BsModalRef;

  constructor(
    private productService: ProductService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getAll()
      .subscribe((res) => {
        this.products = res.content;
      });
  }

  openSaveModal(product?: Product) {
    const initialState: ModalOptions = {
      initialState: {product}
    }
    this.bsModalRef = this.modalService.show(ProductSaveComponent, initialState);
    this.bsModalRef.onHidden?.subscribe(res => {
      this.getProducts();
    })
  }
}
