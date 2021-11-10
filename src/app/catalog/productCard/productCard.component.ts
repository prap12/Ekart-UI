import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductCard } from '../catalog.model';
import { QuickViewComponent } from './quick-view/quick-view.component';

@Component({
  selector: 'productCard',
  templateUrl: './productCard.component.html',
  styleUrls: ['./productCard.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() dataSource: ProductCard | undefined;
  image: string;

  @Input() gridView: boolean;

  constructor(private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.image = 'data:image/png;base64,' + this.dataSource.thumbnailImage;
  }

  open(data: ProductCard) {
    const modal = this.modalService.open(QuickViewComponent, {
      centered: true,
      size: 'lg',
    });
    modal.componentInstance.data = data;
  }
}
