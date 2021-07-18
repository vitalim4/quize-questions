import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Answer, Question} from './models/question.model';
import {QuestionsActions, QuestionActions} from './questions-actions';

export const featureAdapter: EntityAdapter<Question> = createEntityAdapter<Question>({
  selectId: model => model.id
});

export interface State extends EntityState<Question> {
  index: number;
  maxQuestions: number;
  totalLoaded: number;
}

export const initialState: State = featureAdapter.getInitialState({
  index: -1,
  maxQuestions: 10,
  totalLoaded: 0
});

function initiateQuestionArray() {
  const initData: Question[] = [];
  for (let x = 0; x < initialState.maxQuestions; x++) {
    initData.push({id: x, question: '', answers: [], strikes: 0});
  }
  return initData;
}

function getSelectedQiestion(state: State, questionId: number) {
  const allQuestions = selectAll(state);
  let selectedQuestion: Question = allQuestions.find(f => f.id === questionId) as Question
  return selectedQuestion;
}

export function questionsReducer(state = initialState, action: QuestionsActions): State {
  switch (action.type) {
    case QuestionActions.SELECT_ANSWER: {
      const questionId = action.payload.questionId;
      const answerText = action.payload.answerText;
      let selectedQuestion = getSelectedQiestion(state, questionId);

      let answers: Answer[] | undefined;
      if (selectedQuestion.answers) {
        answers = selectedQuestion.answers.map(a => {
          return {...a, isSelected: false}
        });
        const selectedAnswerPos = answers.findIndex(a => a.text === answerText);

        answers[selectedAnswerPos] = {...answers[selectedAnswerPos], isSelected: true}
      }

      return featureAdapter.updateOne({
        id: selectedQuestion.id,
        changes: {answers: answers}
      }, {
        ...state
      });
    }
    case QuestionActions.INIT_STATE: {
      return featureAdapter.addMany(
        initiateQuestionArray(), {
          ...state
        });
    }
    case QuestionActions.UPDATE_INDEX: {
      return {...state, index: action.payload}
    }
    case QuestionActions.LOAD_QUESTION_SUCCESS: {
      const currentIndex = state.index + 1;
      const newItem = {...action.payload, id: currentIndex}
      return featureAdapter.setOne(newItem, {
        ...state, index: currentIndex, totalLoaded: state.totalLoaded + 1
      });
    }
    case QuestionActions.LOAD_QUESTION_FAILURE: {
      return {
        ...state
      };
    }
    case QuestionActions.OK_CLICKED: {
      const questionId = action.payload.questionId;
      const answerText = action.payload.answerText;
      let selectedQuestion = getSelectedQiestion(state, questionId);
      let answers: Answer[] | undefined;
      if (selectedQuestion.answers) {
        answers = [...selectedQuestion.answers];
        const selectedAnswerPos = answers.findIndex(a => a.text === answerText);

        if (!answers[selectedAnswerPos].isCorrect) {
          selectedQuestion = {...selectedQuestion, strikes: selectedQuestion.strikes + 1};
        } else {

          answers[selectedAnswerPos] = {...answers[selectedAnswerPos], isCorrectSubmitted: true};
        }
      }

      return featureAdapter.updateOne({
        id: selectedQuestion.id,
        changes: {answers: answers, strikes: selectedQuestion.strikes}
      }, {
        ...state
      });
    }


    default: {
      return state;
    }
  }
}

export const getSelectedQuestionId = (state: State) => state.index;
export const getMaxQuestions = (state: State) => state.maxQuestions;
export const getTotalLoaded = (state: State) => state.totalLoaded;

const {
  selectAll,
} = featureAdapter.getSelectors();
