import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {EMPTY} from 'rxjs';
import {map, mergeMap, catchError, withLatestFrom} from 'rxjs/operators';
import {ApiService} from 'src/app/services/api.service';
import * as questionActions from './questions-actions';
import {State} from './questions-reducer';
import * as  questionselectors from './question-selectors';
import {Question} from './models/question.model';

@Injectable()
export class QuestionsEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<State>
  ) {
  }

  loadQuestions$ = createEffect(() => this.actions$.pipe(
    ofType(questionActions.QuestionActions.LOAD_QUESTION),
    withLatestFrom(this.store.select(questionselectors.selectAllQuestions)),
    mergeMap((state) => {
      return this.apiService.loadQuestion()
        .pipe(
          map(question => {
            if (state[1].find(q => q.question == question.question)) {
              return new questionActions.LoadQuestionAction()
            } else {
              return new questionActions.LoadQuestionSuccessAction(question)
            }
          }),
          catchError(() => EMPTY)
        )
    })
    )
  );
}
