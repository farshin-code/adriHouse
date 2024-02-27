import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleLoggedInComponent } from './google-logged-in.component';

describe('GoogleLoggedInComponent', () => {
  let component: GoogleLoggedInComponent;
  let fixture: ComponentFixture<GoogleLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleLoggedInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
