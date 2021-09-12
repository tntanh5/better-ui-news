import { fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

describe('AppComponent', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '404', component: PageNotFoundComponent },
          { path: '**', redirectTo: '404' }
        ])
      ],
      declarations: [
        AppComponent,
        PageNotFoundComponent
      ]
    }).compileComponents();

    router = TestBed.get(Router);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.toolbar span')?.textContent).toContain('NEWS');
  });

  // Not found testing
  it('should redirect to 404 page', fakeAsync(() => {
    router.navigate(["/not-existing-url"]).then(() => {
      expect(router.url).toContain("/404");
    });
  }));

});
