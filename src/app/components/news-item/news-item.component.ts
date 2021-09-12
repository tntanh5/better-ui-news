import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { NewsItem } from './news-item.model';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
  @Input() item: NewsItem | undefined;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(DialogOverviewComponent, {
      width: '80%',
      data: this.item
    });
  }

}
