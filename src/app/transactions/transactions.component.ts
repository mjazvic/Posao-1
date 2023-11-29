
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionFilter, TransactionProvider } from '../models/transaction.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TransactionType } from '../models/transaction.model';
import { TransactionDirection } from '../models/transaction.model';
import {Grant} from "../models/user.model";



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  filter: TransactionFilter = {};
  selectedTransactionId: string | null = null;
  transactionTypes = TransactionType;
  transactionDirectons = TransactionDirection;
  transactionProviders = TransactionProvider;

  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    private router: Router,

    ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  public hasGrant(grant: Grant | string): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    const grantToCheck = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes(grantToCheck);
  }
  loadTransactions() {
    this.transactionService.getTransactions(this.filter).subscribe((transactions) => {
      this.transactions = transactions;
    });
  }
  getTransactionTypes(): string[] {
    return Object.values(this.transactionTypes) as string[];
  }
  getTransactionDirections(): string[] {
    return Object.values(this.transactionDirectons) as string[];
  }
  getTransactionProviders(): string[] {
    return Object.values(this.transactionProviders) as string[];
  }

  logout(): void {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
  dashboard(){
    this.router.navigate(['/dashboard'])
  }
  toggleDetails(transactionId: string) {
    this.selectedTransactionId = this.selectedTransactionId === transactionId ? null : transactionId;
  }
}
