export interface IQuestion {
  questionType: string;
  question: string;
  answers: string[];
  correctAnswers: string[];
  selectedAnswers?: string[]
}
