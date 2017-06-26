import { Component } from '@angular/core';
import { LoginView, AuthenticationService } from '@plone/restapi-angular';
import { Traverser } from 'angular-traversal';
import { NavController, ToastController } from 'ionic-angular';
import { HomePage } from '../pages';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends LoginView {

  constructor(traverser: Traverser, 
              private auth: AuthenticationService, 
              private nav: NavController,
              private toastCtrl: ToastController) {
    super(traverser, auth);
    this.auth.isAuthenticated.subscribe((auth) => {
      console.log(auth);
      if(auth.hasOwnProperty('error')) {
        this.showErrorMsg(auth.error.message);
      }
      else if(auth.state) {
        this.goToHome();
      } 
    })
  }

  onSubmit(form) {
    let data = form.value;
    this.auth.login(data.login, data.password);
    form.reset();
  }

  goToHome() {
    this.nav.setRoot(HomePage);
    this.nav.popToRoot();
  }

  showErrorMsg(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
