import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTableFormComponent } from './transaction-table-form.component';

describe('TransactionTableFormComponent', () => {
  let component: TransactionTableFormComponent;
  let fixture: ComponentFixture<TransactionTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTableFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
