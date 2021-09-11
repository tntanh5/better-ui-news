import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { NewsServiceService } from 'src/app/services/news-service.service';
import { NewsItem } from '../news-item/news-item.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  page: number = 1;
  articles: NewsItem[] = [];


  constructor(private newsServiceService: NewsServiceService) { }

  ngOnInit(): void {

    this.newsServiceService.getArticles(this.page).valueChanges
    .pipe(
      // take(1),
      switchMap(({data}) => {
        const newsItemList: NewsItem[] = data.articles.map((ele: any, index: number) => this.mapToNewsItem(ele, index));
        this.articles = this.articles.concat(newsItemList);

        const source$ = from(newsItemList.filter(newsItem => (newsItem.url && newsItem.url.startsWith('https'))));
        return source$.pipe(
          mergeMap(
            newsItem => {
              return this.newsServiceService.getOneArticle(newsItem.url).valueChanges.pipe(
                map(({data}) => {
                  newsItem.details = this.mapToNewsItem(data.article);
                  return newsItem;
                })
              );
            }
          )
        );
      })
    ).subscribe(newsItem => {
      // this.articles.push(newsItem);
    })

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
