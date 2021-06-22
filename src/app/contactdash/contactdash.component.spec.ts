import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactdashComponent } from './contactdash.component';

describe('ContactdashComponent', () => {
  let component: ContactdashComponent;
  let fixture: ComponentFixture<ContactdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
