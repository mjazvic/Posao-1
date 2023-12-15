import { Component, OnInit } from '@angular/core';
import {Grant, User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user:User = this.userService.getCurrentUser();
  showTicketDetails:boolean=false;
  showTransactionDetails:boolean=false;
  imageUrl:any='/assets/branding/small-logo.png'
  constructor(private userService:UserService,private router:Router) { }
  isOpen = false;
  ngOnInit(): void {}


  closeSidebar() { this.isOpen = !this.isOpen; }
  openSidebar(){ this.isOpen = this.isOpen == false; }
  public hasGrant(grant: Grant | string): boolean {
    const currentUser = this.userService.getCurrentUser();
    if ( !currentUser ) { return false; }
    const grantToCheck = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes( grantToCheck ); }
  openTickets(){
    this.router.navigate(['/tickets']);
    this.isOpen=false;
    this.closeSidebar(); }
  openTransactions(){
    this.router.navigate(['/transactions']);
    this.isOpen=false;
    this.closeSidebar(); }
  openPlayers() {
    this.router.navigate(['/players']);
    this.isOpen=false
    this.closeSidebar(); }
}
