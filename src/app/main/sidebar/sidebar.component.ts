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
  public user:User = this.userService.getCurrentUser();
  public showTicketDetails:boolean=false;
  public showTransactionDetails:boolean=false;
  public imageUrl:any='/assets/branding/small-logo.png';
  public isOpen:boolean = false;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {}


  public closeSidebar():void { this.isOpen = !this.isOpen; }
  public openSidebar():void{ this.isOpen = this.isOpen == false; }
  public hasGrant(grant: Grant | string): boolean {
    const currentUser:User = this.userService.getCurrentUser();
    if ( !currentUser ) { return false; }
    const grantToCheck:Grant = typeof grant === 'string' ? grant as Grant : grant;
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
