import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from './core/services/login.service';
import { BootstrapService } from './core/services/bootstrap.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { APP_BASE_HREF } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MatDialogModule } from '@angular/material/dialog';

@Component({ selector: 'app-header', template: '' })
class HeaderStubComponent {}

@Component({ selector: 'app-footer', template: '' })
class FooterStubComponent {}

@Component({ selector: 'app-environment-banner', template: '' })
class EnvironmentBannerStubComponent {}

describe('AppComponent', () => {
  let loginService: jasmine.SpyObj<LoginService>;
  let bootstrapService: jasmine.SpyObj<BootstrapService>;
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          OAuthModule.forRoot(),
          NgIdleKeepaliveModule.forRoot(),
          MatDialogModule
        ],
        declarations: [
          AppComponent,
          HeaderStubComponent,
          FooterStubComponent,
          EnvironmentBannerStubComponent
        ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          AppComponent,
          { provides: LoginService, useValue: loginService },
          { provides: BootstrapService, useValue: bootstrapService },
          { provide: APP_BASE_HREF, useValue: '/' }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    component = TestBed.inject(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should display application header', () => {
    const nativeElem: HTMLElement = fixture.debugElement.nativeElement;
    const headerElem = nativeElem.querySelector('app-header');
    expect(headerElem).toBeDefined();
  });

  it('should display application footer', () => {
    const nativeElem: HTMLElement = fixture.debugElement.nativeElement;
    const footerElem = nativeElem.querySelector('app-FOOTER');
    expect(footerElem).toBeDefined();
  });
});
