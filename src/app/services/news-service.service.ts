import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ARTICLES, GET_ONE_ARTICLE } from '../constants/news-query.constants';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {

  constructor(private apollo: Apollo) { }

  getArticles(pageNumber: number) {
    return this.apollo.watchQuery<any>({
      query: GET_ARTICLES,
      variables: {
        pageNumber
      },
      fetchPolicy: 'cache-and-network'
    });
  }

  getOneArticle(url: string) {
    return this.apollo.watchQuery<any>({
      query: GET_ONE_ARTICLE,
      variables: {
        url
      },
      fetchPolicy: 'network-only',
    });
  }
}
