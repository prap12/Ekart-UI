import { Byte } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ProductCard } from '../../catalog.model';
import { CatalogService } from '../../catalog.service';

@Component({
  selector: 'quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss']
})
export class QuickViewComponent implements OnInit {

  @Input() data: ProductCard;
  images: Observable<Byte[]>;
  activeImgIndex: number = 0;

  constructor(private activeModal: NgbActiveModal, private catalogService: CatalogService) {

  }

  ngOnInit(): void {
    this.images = this.catalogService.getProductImagesById(this.data.id);
  }

  closeModal(): void {
    this.activeModal.close();
  }

  changeImage(index: number): void {
    this.activeImgIndex = index;
  }

  getImage(image: number): string {
    const retImage = 'data:image/png;base64,' + image;
    return retImage;
  }

}
