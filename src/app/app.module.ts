import { AddcallnumPage } from './../pages/addcallnum/addcallnum';
import { CallNumber } from '@ionic-native/call-number';
// import { EventModalPage } from './../pages/event-modal/event-modal';
import { CalendarsPage } from './../pages/calendars/calendars';
import { GraphPage } from './../pages/graph/graph';
import { GlucosePage } from './../pages/glucose/glucose';
import { ExportPage } from './../pages/export/export';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfilePage } from '../pages/profile/profile';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { EmergencyPage } from '../pages/emergency/emergency';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { InsulinPage } from '../pages/insulin/insulin';
import { NgCalendarModule } from 'ionic2-calendar';
// import { EventModalPage } from '../pages/event-modal/event-modal';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NotificationPage } from '../pages/notification/notification';
import { AddNotificationPage } from '../pages/add-notification/add-notification';
import { AddFoodPage } from '../pages/add-food/add-food';
import { ResultPage } from '../pages/result/result';

import { ChartsModule } from 'ng2-charts';
import { SelectDatePage } from '../pages/select-date/select-date';
import { PdfProvider } from './providers/pdf/pdf';
import { DocumentProvider } from '../providers/document/document';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

var config = {
  apiKey: "AIzaSyDr40HSmTxehzzjJO2AfcM0O7b8Lj1dMTg",
  authDomain: "project-301ae.firebaseapp.com",
  databaseURL: "https://project-301ae.firebaseio.com",
  projectId: "project-301ae",
  storageBucket: "project-301ae.appspot.com",
  messagingSenderId: "910634926801"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    EmergencyPage,
    ExportPage,
    LoginPage,
    RegisterPage,
    GlucosePage,
    InsulinPage,
    GraphPage,
    CalendarsPage,
    AddcallnumPage,
    NotificationPage,
    AddNotificationPage,
    AddFoodPage,
    ResultPage,
    SelectDatePage,
    // EventModalPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgCalendarModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    EmergencyPage,
    ExportPage,
    LoginPage,
    RegisterPage,
    GlucosePage,
    InsulinPage,
    GraphPage,
    CalendarsPage,
    AddcallnumPage,
    NotificationPage,
    AddNotificationPage,
    AddFoodPage,
    ResultPage,
    SelectDatePage
    // EventModalPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    LocalNotifications,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DocumentProvider,
    File,
    FileOpener
  ]
})
export class AppModule { }