import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { BaseChartDirective } from 'ng2-charts';
import { SelectDatePage } from '../select-date/select-date';
import { PdfProvider } from '../../app/providers/pdf/pdf';
import { DocumentProvider } from '../../providers/document/document';
import { ResultPage } from '../result/result';
import * as _ from "lodash";
@IonicPage()
@Component({
  selector: 'page-calendars',
  templateUrl: 'calendars.html',
})
export class CalendarsPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @ViewChild('chart') private _chart: BaseChartDirective;

  viewTitle: string;
  selectedDay = new Date();
  redraw = false;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  segment = 'chart';

  public lineChartData: Array<any> = [
    { data: [], label: 'ระดับน้ำตาลในเลือด (Glucose)' },
    { data: [], label: 'เป้าหมาย (Glucose goals)' },
    { data: [], label: 'คาร์โบไฮเดรต (Carbohydrate)' },
  ];

  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0 } }]
    }
  };

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255, 99, 132,.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(54, 162, 235,.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(255, 230, 170,.2)',
      borderColor: 'rgb(255, 230, 170)',
      pointBackgroundColor: 'rgb(255, 230, 170)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];

  public noEventsLabel = "";

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  data = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public firebaseFirestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth,
    public viewCtrl: ViewController,
    public document: DocumentProvider,
  ) {
  }

  ionViewDidLoad() {
    this.viewTitle = new Date().toDateString();
    this.onTimeSelected(new Date().toDateString());
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

  onTimeSelected(date) {
    this.viewTitle = date;
    this.firebaseFirestore
      .collection('users')
      .doc(this.firebaseAuth.auth.currentUser.uid)
      .collection('glucose')
      .doc(date)
      .collection('datas', ref => ref.orderBy('time'))
      // .valueChanges()
      .snapshotChanges() //ติดตามข้อมูลเวลาข้อมูลเปลี่ยนแปลง
      .subscribe((data: any) => {
        console.log(data);

        data = data.map(action => {
          return {
            ...action.payload.doc.data(),
            id: action.payload.doc.id,
          }
        })

        this.data = data;

        setTimeout(() => {
          if (this.chart && this.chart.chart && this.chart.chart.config) {

            data = _.sortedUniqBy(data, 'time');


            this.lineChartData[0].data = data.map(item => Number.parseInt(item.bg));
            this.lineChartData[1].data = data.map(item => Number.parseInt(item.targetBg));
            this.lineChartData[2].data = data.map(item => Number.parseInt(item.carb));

            this.lineChartLabels = data.map(item => item.time);

            this.chart.chart.update();
          }
        });
      })

  }

  selectDate() {
    const modal = this.modalCtrl.create(SelectDatePage);
    modal.onDidDismiss(data => {
      if (data !== undefined) {
        this.onTimeSelected(data.date);
        console.log(data);
      }
    })
    modal.present();
  }

  openPdf() {
    this.document.create({});
  }

  showResult(data) {
    this.navCtrl.push(ResultPage, {
      data: data
    })


  }

  delete(id) {
    this.firebaseFirestore.collection('users')
      .doc(this.firebaseAuth.auth.currentUser.uid)
      .collection('glucose')
      .doc(this.viewTitle)
      .collection('datas')
      .doc(id)
      .delete();

  }
}

