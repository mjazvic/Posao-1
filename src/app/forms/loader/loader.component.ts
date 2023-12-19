import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../../services/loader.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  public isLoading$:Observable<boolean> = this.loaderService.isLoading$;

  constructor(private loaderService: LoaderService) {}

  ngOnInit():void {}
}
