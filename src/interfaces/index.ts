export interface IQuestion {
  questionType: string;
  question: string;
  answers: string[];
  correctAnswers: string[];
  selectedAnswers?: string[];
  source: { [x: string]: string };
  destination: { [x: string]: string };
}
