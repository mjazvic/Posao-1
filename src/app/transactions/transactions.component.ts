
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionFilter, TransactionProvider } from '../models/transaction.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TransactionType } from '../models/transaction.model';
import { TransactionDirection } from '../models/transaction.model';
import {Grant} from "../models/user.model";
import { players } from '../data/player.data';
import {LoaderService} from "../loader.service";




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
  players = players
  userName:string ;

  constructor(
    private loaderService:LoaderService,
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
    this.loaderService.showLoader();
    this.transactionService.getTransactions(this.filter,this.userName).subscribe(
      (transactions) => {
        this.transactions = transactions;
        this.loaderService.hideLoader();
      },
    );
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
    this.loaderService.showLoader();

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

