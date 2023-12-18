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


  public closeSidebar():void { this.isOpen = !this.isOpen; }
  public openSidebar():void{ this.isOpen = this.isOpen == false; }
  public hasGrant(grant: Grant | string): boolean {
    const currentUser = this.userService.getCurrentUser();
    if ( !currentUser ) { return false; }
    const grantToCheck = typeof grant === 'string' ? grant as Grant : grant;
    return currentUser.grants.includes( grantToCheck ); }
  public openTickets():void{
    this.router.navigate(['/tickets']);
    this.isOpen=false;
    this.closeSidebar(); }
  public openTransactions():void{
    this.router.navigate(['/transactions']);
    this.isOpen=false;
    this.closeSidebar(); }
  public openPlayers():void {
    this.router.navigate(['/players']);
    this.isOpen=false
    this.closeSidebar(); }
}
