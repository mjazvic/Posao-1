import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPopUpComponent } from './ticketPopUp.component';

describe('PopUpComponent', () => {
  let component: TicketPopUpComponent;
  let fixture: ComponentFixture<TicketPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
