import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, mergeMap, switchMap, take } from 'rxjs/operators';
import { NewsServiceService } from 'src/app/services/news-service.service';
import { NewsItem } from '../news-item/news-item.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  loading: boolean = false;
  page: number = 0;
  isLoadMore: boolean = true;
  articles: NewsItem[] = [];

  constructor(private newsServiceService: NewsServiceService) { }

  ngOnInit(): void {
    this.articleMapping(this.getArticles(this.page + 1));
  }

  getArticles(page: number) {
    return this.newsServiceService.getArticles(page).valueChanges;
  }

  private articleMapping(articleObs: Observable<any>) {
    let size = 0;
    let count = 0;
    this.loading = true;
    articleObs.pipe(
      take(1),
      switchMap(({ data }) => {
        this.page = this.page + 1;
        this.isLoadMore = !!data.articles.length;
        const newsItemList: NewsItem[] = data.articles.map((ele: any, index: number) => this.mapToNewsItem(ele, index));
        size = newsItemList.length;

        count = newsItemList.filter(newsItem => (!newsItem.url || !newsItem.url.startsWith('https'))).length;
        this.articles = this.articles.concat(newsItemList);
        const source$ = from(newsItemList.filter(newsItem => (newsItem.url && newsItem.url.startsWith('https'))));

        return source$
          .pipe(
            mergeMap(
              newsItem => {
                return this.newsServiceService.getOneArticle(newsItem.url).valueChanges
                  .pipe(
                    map(({ data }) => {
                      newsItem.details = this.mapToNewsItem(data.article);
                      return newsItem;
                    })
                  );
              }
            )
          )
      })
    )
      .subscribe(
        (value) => { count++; console.log('subscribe value', count, size); this.loading = count !== size },
        (error) => { count++; console.log('subscribe error!', count, size); this.loading = false }
      );
  }

  getMoreArticles(event: any) {
    if (this.isLoadMore && (event.currentTarget.scrollTop / event.currentTarget.scrollHeight) * 100 > 80) {

      if (!this.loading) {
        console.log('LOADING PAGE', this.page + 1);
        this.articleMapping(this.getArticles(this.page + 1));
      }
    }

  }

  private mapToNewsItem(article: any, i: number = -1): NewsItem {
    let newsItem: NewsItem = {
      title: article.title,
      coverImageUrl: article.coverImageUrl,
      content: article.content,
      description: article.description,
      subtitle: article.subtitle,
      url: article.url
    }
    newsItem.id = (i !== -1) ? this.articles.length + i : newsItem.id;

    return newsItem;
  }

}
