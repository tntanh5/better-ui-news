import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { RouterModule } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsItemComponent,
    NewsListComponent,
    NewsDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'news-list', component: NewsListComponent },
      { path: 'news-detail', component: NewsDetailComponent },
      { path: '', redirectTo: '/news-list', pathMatch: 'full' }
    ]),
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
