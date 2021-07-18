import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as questionActions from '../store/questions-actions';
import * as  questionselectors from '../store/question-selectors';
import {State} from '../store/questions-reducer';
import {Answer, Question} from '../store/models/question.model';
import {Subscription} from "rxjs";
import {CountDownComponent} from "../count-down/count-down.component";

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.css']
})
export class QuestionContainerComponent implements OnInit {
  @ViewChild('countDown') countDown: CountDownComponent | undefined;
  questions: Question[] = [];
  index: number = -1;
  questionAmount: number = 0;
  totalLoaded = 0;
  subscriptions: Subscription[] = [];
  seconds: number | undefined;
  selectedAnswer: Answer | undefined;


  constructor(private store: Store<State>, private ref: ChangeDetectorRef) {
    this.store.dispatch(new questionActions.InitState())

    this.subscriptions.push(this.store.select(questionselectors.selectQuestionPosition).subscribe((pos: number) => {
      this.index = pos;
    }));
    this.subscriptions.push(this.store.select(questionselectors.selectQuestionAmount).subscribe((qAmount: number) => {
      this.questionAmount = qAmount;
    }));
    this.subscriptions.push(this.store.select(questionselectors.selectAllQuestions).subscribe((questions: Question[]) => {

      this.questions = questions
    }));
    this.subscriptions.push(this.store.select(questionselectors.totalLoaded).subscribe((loaded: number) => {
      if (loaded == 1) {
        this.countDown?.run(20);
      }
      this.totalLoaded = loaded;
    }));
    this.store.dispatch(new questionActions.LoadQuestionAction());
  }


  selectAnswer(answer: Answer) {
    this.selectedAnswer = answer;
    this.store.dispatch(new questionActions.SelectAnswer({
      questionId: this.questions[this.index].id,
      answerText: answer.text
    }))

  }

  pageChane(event: { page: number }) {
    if (event.page === this.totalLoaded) {
      this.store.dispatch(new questionActions.LoadQuestionAction())
    } else {
      this.store.dispatch(new questionActions.UpdateSelectedIndex(event.page))
    }
    this.countDown?.run(20);


    this.selectedAnswer = undefined;
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe())
  }

  ngOnInit(): void {
  }

  okClick() {
    this.store.dispatch(new questionActions.OkClicked({
      questionId: this.questions[this.index].id,
      answerText: this.selectedAnswer?.text || ''
    }))
  }

  onTimeOver($event: number) {
    alert('time out');
  }

}
