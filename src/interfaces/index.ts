import { EQuestionType } from "./../enums/index";

export interface IQuestion {
  questionType: EQuestionType;
  question: string;
  answers: string[];
  correctAnswers: string[];
}
