import { Component } from '@angular/core';
import { NewsItem } from './components/news-item/news-item.model';
import { NewsServiceService } from './services/news-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'better-ui-newsa';
  articles: NewsItem[] = [];

  constructor(private newsServiceService: NewsServiceService) { }

  ngOnInit(): void {
  }
}
