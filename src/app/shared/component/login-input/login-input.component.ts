import { Component, Input, OnInit, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.scss'],
})
export class LoginInputComponent  implements OnInit {
@Input() control!: FormControl;
@Input() type!: string;
@Input() label!: string;
@Input() icon!: string;
@Input() value!: string;
@Input() readonly!: boolean;

isPassword!: boolean;
hide: boolean;
  constructor() { }

  ngOnInit() {
    if(this.type == 'password') this.isPassword = true;
  }
  visionPassword(){
    this.hide = !this.hide;
    if(this.hide) this.type = 'password';
    else this.type = 'text';
  }

}
