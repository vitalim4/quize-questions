import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from '../../store/models/question.model';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input()
  answer: Answer | undefined;


  @Output()
  answerSelected = new EventEmitter<string>()

  constructor() { }
  answerClicked() {

    this.answerSelected.emit(this.answer?.text)
  }
  ngOnInit(): void {
  }

}
