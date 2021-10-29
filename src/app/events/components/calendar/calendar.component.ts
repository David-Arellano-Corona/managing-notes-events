import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment-timezone';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { MomentFormat } from '../../../commons/MomentFormat';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  private months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  days = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"]
  calendarSqare: number[][] = [
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 4, 5, 6]
  ]
  selectedMonth?: number;
  daysInMonth?: number;
  initialDay = 1;
  selectedYear?: number;
  labelMonth?: string;
  initialDayOfWeek?: string;
  selectedDay?:number;

  @Output() o_onClickDay = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    if (!this.selectedYear) this.setYear(moment().year())
    if (!this.selectedMonth) this.setMonth(moment().month())
    this.setCalendarTime()
  }

  private fillCalendarSlots(
    lastDayOfMonth: number,
    currentMonth: number,
    dayInitialDayOfWeek: string
  ) {
    const calendarDays: number[][] = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]
    const previousMonth = moment().set('month', currentMonth).subtract(1, 'month');
    let lastDayOfPreviousMonth = previousMonth.daysInMonth()
    const indexInitialDayOfWeek = this.days.findIndex(e => e == dayInitialDayOfWeek)
    
    let dayCounter = 1;
    for (let week = 0; week < calendarDays.length; week++) {
      for (let day = 0; day < calendarDays[week].length; day++) {
        if (
          (week == 0 && day >= indexInitialDayOfWeek) ||
          week != 0
        ) {
          calendarDays[week][day] = dayCounter;
          dayCounter++;
        }
        if (dayCounter > lastDayOfMonth) dayCounter = 1;
      }
    }

    for(let day = calendarDays[0].length; day >= 0; day--){
      if(calendarDays[0][day] == 0){
        calendarDays[0][day] = lastDayOfPreviousMonth;
        lastDayOfPreviousMonth--;
      }
    }
    this.calendarSqare = calendarDays;
  }

  private setCalendarTime() {
    const year = this.getYear() as number;
    const month = this.getmonth() as number;
    const days = this.getDaysInMonth(month, year)
    const currentDay = this.currentDay(year, month)
    const currentMonth = moment().month();
    const currentYear = moment().year();
    const initialDayOfWeek = this.getinitialDayOfWeek(year, month);

    this.daysInMonth = days;
    this.labelMonth = this.months[month]
    this.initialDayOfWeek = initialDayOfWeek;
    this.selectedDay = currentMonth == month && currentYear == year ? currentDay:0;

    this.fillCalendarSlots(days, month, initialDayOfWeek)
    /*console.log({
      year,
      month,
      days,
      label: this.labelMonth,
      currentDay,
      initialDayOfWeek: this.initialDayOfWeek
    })*/
  }

  private getinitialDayOfWeek(year: number, month: number) {
    type key = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
    const daysOfWeek = {
      "sunday": this.days[6],
      "monday": this.days[0],
      "tuesday": this.days[1],
      "wednesday": this.days[2],
      "thursday": this.days[3],
      "friday": this.days[4],
      "saturday": this.days[5]
    }
    const day: key = moment()
      .set('year', year)
      .set('month', month)
      .startOf('month')
      .format(MomentFormat.DAYNAME)
      .toLowerCase() as key

    return daysOfWeek[day]
  }

  private currentDay(year: number, month: number) {
    // domingo = 0
    return parseInt(moment().set("year", year).set('month', month).format(MomentFormat.DAY))
  }

  private getYear() {
    const year = this.selectedYear;
    return year;
  }

  private setYear(year: number) {
    this.selectedYear = year;
  }

  private getmonth() {
    const month = this.selectedMonth;
    return month
  }

  private setMonth(month: number) {
    this.selectedMonth = month;
  }

  private getDaysInMonth(month: number, year: number) {
    const daysInMonth = moment()
      .set('year', year)
      .set('month', month)
      .daysInMonth()
    return daysInMonth
  }



  decreaseMonth() {
    const month = this.selectedMonth as number
    const newMonth = moment().set('month', month).subtract(1, 'month')
    this.setMonth(newMonth.month())

    if (newMonth.year() < this.getYear()!) {
      this.setYear(newMonth.year());
    }
    this.setCalendarTime();
  }
  increaseMonth() {
    const month = this.selectedMonth as number
    const newMonth = moment().set('month', month).add(1, 'month')
    this.setMonth(newMonth.month())

    if (newMonth.year() > this.getYear()!) {
      this.setYear(newMonth.year());
    }
    this.setCalendarTime();
  }

  onClickDay(day:any){
    const year = this.getYear();
    const month = this.getmonth();
    const labelMonth = this.labelMonth;
    this.o_onClickDay.emit({year,month,day, labelMonth})
  }

}
