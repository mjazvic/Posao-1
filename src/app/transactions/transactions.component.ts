
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionFilter, TransactionProvider } from '../models/transaction.model';
import { UserService } from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import { TransactionType } from '../models/transaction.model';
import { TransactionDirection } from '../models/transaction.model';
import {Grant} from "../models/user.model";
import { players } from '../data/player.data';
import {LoaderService} from "../loader.service";
import {map, Observable, switchMap} from "rxjs";
import {Ticket} from "../models/ticket.model";




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
    this.loaderService.showLoader()
    this.transactions$ = this.route.params.pipe(
      switchMap(params => {
        const id: string = params['id'];
        this.loaderService.hideLoader();
        return this.transactionService.getTransactions({ externalId: id });

      })
    );
  }
  findPlayerById(playerId: string): string {
    const player=players.find(player => player.id === playerId);
    return player.username
  }
}

