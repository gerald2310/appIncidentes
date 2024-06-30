import { Component, Input, OnInit, inject, input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
@Input() title!: string;
@Input() isModal: boolean;

utilsService = inject(UtilsService);

  constructor() { }

  ngOnInit() {}

  dismissModal(){
    this.utilsService.dismisModal();
  }

}
