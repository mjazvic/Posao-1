
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionFilter,  } from '../models/transaction.model';
import {ActivatedRoute, Router} from '@angular/router';

import { players } from '../data/player.data';
import {LoaderService} from "../services/loader.service";
import {map, Observable, switchMap} from "rxjs";



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  transactions: Transaction[];
  filter: TransactionFilter = {};
  players = players

  constructor(
    private route: ActivatedRoute,
    private loaderService:LoaderService,
    private transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
  this.loadtransactions()
  }
  loadtransactions(){
    this.loaderService.showLoader()
    this.transactions$ = this.route.params.pipe(
      switchMap(params => {
        const id: string = params['id'];
        this.loaderService.hideLoader();
        return this.transactionService.getTransactions({ externalId: id }); })
    );
  }
  findPlayerById(playerId: string): string {
    const player=players.find(player => player.id === playerId);
    return player.username
  }
}

