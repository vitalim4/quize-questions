import {Component, OnInit, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {Observable, Subscription, timer} from "rxjs";
import {map, takeWhile, tap} from "rxjs/operators";

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit {
  @Input() set seconds(val: number) {

  }

  @Output() onTimeOver: EventEmitter<number> = new EventEmitter();


  countDown: any;
  private subscription: any;
  private done = false;


  constructor() {
  }

  ngOnInit(): void {

  }

  stop() {
    this.done = true;
  }

  run(seconds: number) {
    if (seconds) {
      const end = seconds;
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = timer(0, 1000).pipe(
        map(i => end - i),
        takeWhile(i => i >= -1),
      ).subscribe(s => {
        this.countDown = s;

        if (s == 0) {
          setTimeout(() => {
            this.onTimeOver.emit();
          }, 1000)

          this.subscription.unsubscribe();
        }


      });
    }
  }

}
