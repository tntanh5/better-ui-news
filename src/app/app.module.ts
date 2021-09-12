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
import { NgxLoadingModule } from 'ngx-loading';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogOverviewComponent } from './components/dialog-overview/dialog-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsItemComponent,
    NewsListComponent,
    NewsDetailComponent,
    PageNotFoundComponent,
    DialogOverviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'news-list', component: NewsListComponent },
      { path: 'news-detail', component: NewsDetailComponent },
      { path: '', redirectTo: '/news-list', pathMatch: 'full' },
      { path: '404', component: PageNotFoundComponent },
      { path: '**', redirectTo: '404' }
    ]),
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
