import { Component } from '@angular/core';

export class LunarAge {
  yy: number;
  mm: number;
  dd: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <div>
  <label>Name: </label>
  <input [(ngModel)]="lunarAge.name" placeholder="name">
  </div>
  <div>
  <label>Birth date as per solar calendar: </label>
  <input type="date" [(ngModel)]="birthdate"/>
  
  <div>
  <h2>{{lunarAge.name}}'s birth date!</h2>
  <h1>{{birthdate}}</h1>
  </div> 
  
  <!--
  <input [(ngModel)]="lunarAge.yy" placeholder="year">
  <input [(ngModel)]="lunarAge.mm" placeholder="month">
  <input [(ngModel)]="lunarAge.dd" placeholder="day">
  </div>
  <h2>{{lunarAge.name}} birth date!</h2>
  <h1>{{lunarAge.yy}} {{lunarAge.mm}} {{lunarAge.dd}}</h1>
  <p>Today is {{today | date}}</p>
  <p>Or if you prefer, {{today | date:'fullDate'}}</p>
  <p>The time is {{today | date:'jmZ'}}</p>
  -->


  `,
})

export class AppComponent {
  title = 'Lunar Age';
  lunarAge: LunarAge = {
    yy: 2017,
    mm: 10,
    dd: 14,
    name: 'Guest'
  };
  // today: number = Date.now();
  birthdate: Date;  
}
