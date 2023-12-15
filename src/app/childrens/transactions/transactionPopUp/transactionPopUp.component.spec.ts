import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPopUpComponent } from './transactionPopUp.component';

describe('PopUpTransactionComponent', () => {
  let component: TransactionPopUpComponent;
  let fixture: ComponentFixture<TransactionPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
