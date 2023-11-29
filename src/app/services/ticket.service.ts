import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Ticket, TicketFilter} from '../models/ticket.model';
import {tickets} from '../data/ticket.data';
import {WebUtils} from '../utils/web.utils';
import {players} from "../data/player.data";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }

  public getTicket(id: string): Observable<Ticket> {
    const ticket = tickets.find(t => t.id === id);
    return WebUtils.mockSuccess('getTicket', {id: id}, ticket);
  }

  public getTickets(filter: TicketFilter,username?: string): Observable<Ticket[]> {
    let filteredTickets = tickets.filter(
      t => (!filter.playerId || t.playerId === filter.playerId) &&
        (!filter.status || t.status === filter.status) &&
        (!filter.createdFrom || t.createdAt >= filter.createdFrom) &&
        (!filter.createdTo || t.createdAt <= filter.createdTo)
    );
    if (username) {
      const player = players.find((p) => p.username === username);
      if (player) {
        filteredTickets = filteredTickets.filter((t) => t.playerId === player.id);
      }
    }
    return WebUtils.mockSuccess('getTickets', filter, filteredTickets);
  }
}
