import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { EQuestionType } from "../../enums";
import { randomString } from "../../helpers";
import { IQuestion } from "../../interfaces";
import { HomePage } from "./styled";

const convertNumberToAlphabet: { [x: number]: string } = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
};

export const Home = () => {
  const [listQuestions, setListQuestions] = useState<IQuestion[]>([]);

  const [questionType, setQuestionType] = useState<string>(
    EQuestionType.SingleChoose
  );
  const [question, setQuestion] = useState<string>("");
  const [listAnswers, setListAnswers] = useState<{ [x: string]: string }>({});
  const [listCorrectAnswers, setListCorrectAnswers] = useState<{
    [x: string]: string;
  }>({});

  const disableBtnAddMoreCorrectAnswer = useMemo(() => {
    if (
      questionType === EQuestionType.SingleChoose ||
      questionType === EQuestionType.Fill
    ) {
      if (Object.keys(listCorrectAnswers).length >= 1) return true;
    }

    return false;
  }, [listCorrectAnswers, questionType]);

  function addMoreAnswer() {
    const random = randomString(6);
    const newListAnswer = { ...listAnswers, [random]: "" };

    setListAnswers(newListAnswer);
  }

  function addMoreCorrectAnswer() {
    console.log(1, disableBtnAddMoreCorrectAnswer, questionType);

    if (disableBtnAddMoreCorrectAnswer) return;

    console.log(2, disableBtnAddMoreCorrectAnswer, questionType);

    const random = randomString(6);

    const newListCorrectAnswers = {
      ...listCorrectAnswers,
      [random]: "",
    };

    setListCorrectAnswers(newListCorrectAnswers);
  }

  const onSubmit = () => {
    const newQuestion = {
      questionType,
      question,
      answers: Object.values(listAnswers),
      correctAnswers: Object.values(listCorrectAnswers),
    };

    setListQuestions((questions) => [...questions, newQuestion]);
  };

  console.log(listQuestions);

  const onClearForm = () => {
    setQuestion("");

    setListAnswers(() => {
      const random = randomString(6);
      const newListAnswer = { [random]: "" };

      return newListAnswer;
    });
    setListCorrectAnswers(() => {
      const random = randomString(6);

      const newListCorrectAnswers = {
        [random]: "",
      };

      return newListCorrectAnswers;
    });
  };

  const onSelectSingleAnswer = (index: number, answer: string) => {
    const newListQuestions = JSON.parse(JSON.stringify(listQuestions));

    newListQuestions[index].selectedAnswers = [answer];

    setListQuestions(newListQuestions);
  };

  const onSelectMultipleAnswer = (index: number, answer: string) => {
    const newListQuestions = JSON.parse(JSON.stringify(listQuestions));

    const findAnswerIndex =
      newListQuestions[index]?.selectedAnswers?.indexOf(answer);

    if (findAnswerIndex > -1) {
      newListQuestions[index].selectedAnswers.splice(findAnswerIndex, 1);
    } else {
      newListQuestions[index].selectedAnswers.push(answer);
    }

    setListQuestions(newListQuestions);
  };

  const onFillTextAnswer = (
    questionIndex: number,
    fillInputIndex: number,
    answer: string
  ) => {
    const newListQuestions = JSON.parse(JSON.stringify(listQuestions));

    if (!newListQuestions[questionIndex].selectedAnswers)
      newListQuestions[questionIndex].selectedAnswers = [];

    newListQuestions[questionIndex].selectedAnswers[fillInputIndex] = answer;

    setListQuestions(newListQuestions);
  };

  const onDragEnd = () => {
    // the only one that is required
  };

  useEffect(() => {
    addMoreAnswer();
    addMoreCorrectAnswer();
  }, []);

  useEffect(() => {
    onClearForm();
  }, [questionType]);

  return (
    <HomePage container spacing={2}>
      <Grid item xs={5} className="question">
        <div>
          <h2 className="title">Create Question</h2>

          <div className="input-wrap">
            <label className="label">Question Type</label>
            <Select
              value={questionType}
              onChange={(e) => {
                setQuestionType(e.target.value);

                onClearForm();
              }}
              className="select"
              size="small"
            >
              {Object.values(EQuestionType).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="input-wrap">
            <label className="label">Question</label>
            <TextareaAutosize
              minRows={6}
              className="input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className="input-wrap">
            <label className="label">Answer</label>

            <div>
              <div>
                {Object.keys(listAnswers).map((key) => (
                  <div key={key} className="answer-item">
                    <TextField
                      variant="outlined"
                      size="small"
                      name={key}
                      value={listAnswers[key]}
                      onChange={(e) => {
                        setListAnswers((listAnswers) => ({
                          ...listAnswers,
                          [key]: e.target.value,
                        }));
                      }}
                    />

                    <Button
                      color="error"
                      variant="outlined"
                      className="btn-remove"
                    >
                      remove
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                className="btn-add"
                variant="outlined"
                onClick={addMoreAnswer}
              >
                Add More
              </Button>
            </div>
          </div>

          <div className="input-wrap">
            <label className="label">Correct Answer</label>

            {questionType === EQuestionType.Fill &&
              Object.keys(listCorrectAnswers).map((key) => (
                <TextareaAutosize
                  key={key}
                  minRows={6}
                  className="input"
                  name={key}
                  value={listCorrectAnswers[key]}
                  onChange={(e) => {
                    setListCorrectAnswers((listCorrectAnswers) => ({
                      ...listCorrectAnswers,
                      [key]: e.target.value,
                    }));
                  }}
                />
              ))}

            {questionType !== EQuestionType.Fill && (
              <div>
                <div>
                  {Object.keys(listCorrectAnswers).map((key) => (
                    <div key={key} className="answer-item">
                      <TextField
                        variant="outlined"
                        size="small"
                        name={key}
                        value={listCorrectAnswers[key]}
                        onChange={(e) => {
                          setListCorrectAnswers((listCorrectAnswers) => ({
                            ...listCorrectAnswers,
                            [key]: e.target.value,
                          }));
                        }}
                      />

                      <Button
                        color="error"
                        variant="outlined"
                        className="btn-remove"
                      >
                        remove
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  className="btn-add"
                  variant="outlined"
                  disabled={disableBtnAddMoreCorrectAnswer}
                  onClick={addMoreCorrectAnswer}
                >
                  Add More
                </Button>
              </div>
            )}
          </div>

          <div className="btn-submit">
            <Button variant="outlined" onClick={onSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Grid>

      <Grid item xs={7} className="answer">
        <h2 className="title">List Question</h2>

        {listQuestions.map((question: IQuestion, questionIndex: number) => (
          <div className="item-question" key={question.question}>
            {question.questionType === EQuestionType.SingleChoose && (
              <>
                <div>
                  <span className="bold">{questionIndex + 1}</span>: Choose
                  single answer:
                </div>
                <div className="question-title">
                  Question:{" "}
                  {question.question.replace("{{text}}", "__________")}
                </div>
                <div className="single-question-answers">
                  {question.answers.map((answer, index: number) => (
                    <div
                      key={answer}
                      className="item-answer"
                      onClick={() =>
                        onSelectSingleAnswer(questionIndex, answer)
                      }
                    >
                      <span
                        className={`text-answer ${
                          question.selectedAnswers &&
                          answer === question.selectedAnswers[0] &&
                          "selected-answer"
                        }`}
                      >
                        {convertNumberToAlphabet[index + 1]}
                      </span>
                      . {answer}
                    </div>
                  ))}
                </div>
              </>
            )}

            {question.questionType === EQuestionType.MultipleChoose && (
              <>
                <div>
                  <span className="bold">{questionIndex + 1}</span>: Choose
                  multiple answer:
                </div>
                <div className="question-title">
                  Question:{" "}
                  {question.question.replace("{{text}}", "__________")}
                </div>
                <div className="multiple-question-answers">
                  {question.answers.map((answer) => (
                    <div
                      key={answer}
                      className={`item-answer ${
                        question.selectedAnswers &&
                        question.selectedAnswers.indexOf(answer) > -1 &&
                        "selected-answer"
                      }`}
                      onClick={() =>
                        onSelectMultipleAnswer(questionIndex, answer)
                      }
                    >
                      {answer}
                    </div>
                  ))}
                </div>
              </>
            )}

            {question.questionType === EQuestionType.Fill && (
              <>
                <div>
                  <span className="bold">{questionIndex + 1}</span>: Fill answer
                  to blank: {question.answers.join(", ")}
                </div>
                <div className="fill-question-answer">
                  {question.question
                    .split("{{text}}")
                    .map((text: string, index: number) => (
                      <>
                        <div>{text}</div>
                        {index !==
                          question.question.split("{{text}}").length - 1 && (
                          <TextField
                            variant="standard"
                            size="small"
                            className="fill-input"
                            onChange={(e) =>
                              onFillTextAnswer(
                                questionIndex,
                                index,
                                e.target.value
                              )
                            }
                          />
                        )}
                      </>
                    ))}
                </div>
              </>
            )}

            {question.questionType === EQuestionType.Drag && (
              <>
                <div>
                  <span className="bold">{questionIndex + 1}</span>: Drag or
                  Select text to complete this sentence
                </div>
                <div className="drag-answer">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Grid container spacing={2}>
                      {question.answers.map((answer, index) => (
                        <Grid item xs={Math.round(12 / question.answers.length)}>
                          <Droppable droppableId={index.toString()}>
                            {(provided: any, snapshot: any) => (
                              <div
                                ref={provided.innerRef}
                                style={{
                                  backgroundColor: snapshot.isDragging
                                    ? "green"
                                    : "lightblue",
                                }}
                                {...provided.droppableProps}
                              >
                                <Draggable draggableId={answer} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {answer}
                                    </div>
                                  )}
                                </Draggable>
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </Grid>
                      ))}
                    </Grid>
                  </DragDropContext>
                </div>
              </>
            )}
          </div>
        ))}
      </Grid>
    </HomePage>
  );
};
