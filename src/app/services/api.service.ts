import {Injectable,} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question, ApiQuestion, Answer} from '../store/models/question.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly questionsApi = 'https://opentdb.com/api.php?amount=1&encode=base64&type=multiple';

  constructor(private http: HttpClient) {
  }

  loadQuestion(): Observable<Question> {
    return this.http.get<{ results: ApiQuestion[] }>(this.questionsApi).pipe(
      map(res => {
        return res.results[0]
      }),
      map((res: ApiQuestion) => {
        const answers: Answer[] = res.incorrect_answers?.map(ia => ({
          text: atob(ia),
          isCorrect: false,
          isSelected: false
        }));
        answers.push({text: atob(res.correct_answer), isCorrect: true, isSelected: false,isCorrectSubmitted: false})
        const ret: Question = {
          id: -1,
          answers: this.changeAnswersOrder(answers),
          question: atob(res.question),
          strikes: 0
        };
        return ret;
      })
    );
  }

  changeAnswersOrder(answers: Answer[]) {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

}
