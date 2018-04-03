import { EmergencyPage } from './../pages/emergency/emergency';
import { GraphPage } from './../pages/graph/graph';
import { GlucosePage } from './../pages/glucose/glucose';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from './../pages/login/login';
import { ExportPage } from './../pages/export/export';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { NotificationPage } from '../pages/notification/notification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public firebaseAuth: AngularFireAuth
  ) {
    platform.ready().then(() => {

      this.firebaseAuth
        .authState
        .subscribe((user) => {
          if (user) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        }
        )
    }

    )
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: ProfilePage },
      { title: 'Menu', component: HomePage },
      { title: 'Glucose', component: GlucosePage },
      { title: 'Graph', component: GraphPage },
      { title: 'Emergency', component: EmergencyPage },
      { title: 'Export', component: ExportPage },
      { title: 'Notification', component: NotificationPage }


    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
