import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Question } from './models/question.model';

import { featureAdapter, State, getSelectedQuestionId, getMaxQuestions, getTotalLoaded } from './questions-reducer';

export const selectQuestionState: MemoizedSelector<object, State> = createFeatureSelector<State>('questions');

export const selectQuestionPosition = createSelector(
  selectQuestionState,
  getSelectedQuestionId
);
export const selectQuestionAmount = createSelector(
  selectQuestionState,
  getMaxQuestions
);

export const totalLoaded = createSelector(
  selectQuestionState,
  getTotalLoaded
);
export const selectAllQuestions: (state: object) => Question[] = featureAdapter.getSelectors(selectQuestionState).selectAll;

