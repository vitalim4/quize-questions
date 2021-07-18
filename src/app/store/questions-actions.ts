import {Action} from '@ngrx/store';
import {Question} from './models/question.model';

export enum QuestionActions {
  LOAD_QUESTION = '[Questions] Load Question',
  LOAD_QUESTION_FAILURE = '[Questions] Load Question Failure',
  LOAD_QUESTION_SUCCESS = '[Questions] Load Question Success',
  INIT_STATE = '[Questions] Init State',
  UPDATE_INDEX = '[Questions] Update Index',
  SELECT_ANSWER = '[Questions] Select Answer',
  OK_CLICKED = '[Questions] OK Clicked'
}

export class SelectAnswer implements Action {
  readonly type = QuestionActions.SELECT_ANSWER;

  constructor(public payload: { questionId: number, answerText: string }) {
  }
}

export class OkClicked implements Action {
  readonly type = QuestionActions.OK_CLICKED;

  constructor(public payload: { questionId: number, answerText: string }) {
  }
}

export class InitState implements Action {
  readonly type = QuestionActions.INIT_STATE;
}

export class LoadQuestionAction implements Action {
  readonly type = QuestionActions.LOAD_QUESTION;
}

export class UpdateSelectedIndex implements Action {
  readonly type = QuestionActions.UPDATE_INDEX;

  constructor(public payload: number) {
  }
}

export class LoadQuestionFailureAction implements Action {
  readonly type = QuestionActions.LOAD_QUESTION_FAILURE;

  constructor(public payload: { error: string }) {
  }
}

export class LoadQuestionSuccessAction implements Action {
  readonly type = QuestionActions.LOAD_QUESTION_SUCCESS;

  constructor(public payload: Question) {
  }
}

export type QuestionsActions =
  LoadQuestionAction
  | LoadQuestionFailureAction
  | LoadQuestionSuccessAction
  | UpdateSelectedIndex
  | InitState
  | SelectAnswer
  | OkClicked;
