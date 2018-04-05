import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { BaseChartDirective } from 'ng2-charts';

@IonicPage()
@Component({
  selector: 'page-calendars',
  templateUrl: 'calendars.html',
})
export class CalendarsPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  viewTitle: string;
  selectedDay = new Date();
  redraw = false;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  @ViewChild('chart') private _chart: BaseChartDirective;


  public lineChartData: Array<any> = [
    { data: [], label: 'ระดับน้ำตาลในเลือด' },
    { data: [], label: 'เป้าหมาย' },

    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];

  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
  ) {
  }

  ionViewDidLoad() {


  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



  onViewTitleChanged(title) {
    this.viewTitle = title;
  }



  onTimeSelected(ev) {

    this.selectedDay = ev.selectedTime.toISOString();
    this.viewTitle = ev.selectedTime.toDateString();

    this.firebaseFirestore
      .collection('users')
      .doc(this.firebaseAuth.auth.currentUser.uid)
      .collection('glucose')
      .doc(ev.selectedTime.toDateString())
      .collection('datas', ref => ref.orderBy('time'))
      .valueChanges() //ติดตามข้อมูลเวลาข้อมูลเปลี่ยนแปลง
      .subscribe((data: any) => {

        setTimeout(() => {
          if (this.chart && this.chart.chart && this.chart.chart.config) {
            this.lineChartData[0].data = data.map(item => Number.parseInt(item.bg));
            this.lineChartData[1].data = data.map(item => Number.parseInt(item.targetBg));

            this.lineChartLabels = data.map(item => item.time);

            this.chart.chart.update();
          }
        });
      })

  }
}

