export interface ApiQuestion {
  id: string
  difficulty?: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[]
  allAnswersRandomly?: string[];
}

export interface Question {
  id: number
  question: string;
  answers: Answer[];
  strikes: number;
}

export interface Answer {
  text: string,
  isCorrect: boolean,
  isSelected?: boolean,
  isCorrectSubmitted?: boolean
}
