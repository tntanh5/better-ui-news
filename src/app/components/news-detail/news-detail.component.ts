import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NewsServiceService } from 'src/app/services/news-service.service';
import { NewsItem } from '../news-item/news-item.model';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  loading: boolean = false;
  newsDetail!: NewsItem;
  constructor(private router: Router, private newsServiceService: NewsServiceService) {
    const navigation = this.router.getCurrentNavigation();
    if (!navigation || !navigation.extras || !navigation.extras.state) {
      return;
    } else {
      const state = navigation.extras.state;
      this.newsDetail = state.newsDetail;
      if (state.newsDetail) {
        this.newsDetail = state.newsDetail;
        sessionStorage.setItem('url', this.newsDetail.url);
      }
    }
  }

  ngOnInit(): void {
    if (!this.newsDetail) {
      const url = sessionStorage.getItem('url');
      if (url) {
        this.loading = true;
        this.newsServiceService.getOneArticle(url).valueChanges
          .subscribe(
            ({ data }) => {
              this.newsDetail = data.article;
              this.loading = false;
            },
            error => {
              this.loading = false;
            });
      } else {
        // do something
      }
    }
  }

}
