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
  const [checkAnswer, setCheckAnswer] = useState(false);

  const disableBtnAddMoreCorrectAnswer = useMemo(() => {
    if (questionType === EQuestionType.SingleChoose) {
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
    if (disableBtnAddMoreCorrectAnswer) return;

    const random = randomString(6);

    const newListCorrectAnswers = {
      ...listCorrectAnswers,
      [random]: "",
    };

    setListCorrectAnswers(newListCorrectAnswers);
  }

  const onSubmit = () => {
    const source: { [x: string]: string } = {};
    const destination: { [x: string]: string } = {};

    if (questionType === EQuestionType.Drag) {
      Object.values(listAnswers).forEach((value, index) => {
        source[`source_${index}`] = value;
        destination[`destination_${index}`] = "";
      });
    }

    const newQuestion = {
      questionType,
      question,
      answers: Object.values(listAnswers),
      correctAnswers: Object.values(listCorrectAnswers),
      source,
      destination,
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

    if (!newListQuestions[index]?.selectedAnswers)
      newListQuestions[index].selectedAnswers = [];

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

  const onDragEnd = ({ destination, source, questionIndex }: any) => {
    const newListQuestions = JSON.parse(JSON.stringify(listQuestions));

    const sourceDropId = source.droppableId.split("_")[0];

    const destinationDropId = destination.droppableId.split("_")[0];

    if (sourceDropId === "source" && destinationDropId === "destination") {
      const tempData =
        newListQuestions[questionIndex].destination[destination.droppableId];

      newListQuestions[questionIndex].destination[destination.droppableId] =
        newListQuestions[questionIndex].source[source.droppableId];
      newListQuestions[questionIndex].source[source.droppableId] = tempData;
    }

    if (sourceDropId === "destination" && destinationDropId === "source") {
      const tempData =
        newListQuestions[questionIndex].source[destination.droppableId];

      newListQuestions[questionIndex].source[destination.droppableId] =
        newListQuestions[questionIndex].destination[source.droppableId];
      newListQuestions[questionIndex].destination[source.droppableId] =
        tempData;
    }

    setListQuestions(newListQuestions);
  };

  useEffect(() => {
    addMoreAnswer();
    addMoreCorrectAnswer();
  }, []);

  useEffect(() => {
    onClearForm();
  }, [questionType]);

  useEffect(() => {
    if (checkAnswer) {
      setTimeout(() => {
        setCheckAnswer(false);
      }, 3000);
    }
  }, [checkAnswer])

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
                        } ${
                          checkAnswer &&
                          question.correctAnswers.indexOf(answer) > -1 &&
                          "correct-answer"
                        } ${
                          checkAnswer &&
                          question.selectedAnswers &&
                          answer === question.selectedAnswers[0] &&
                          question.correctAnswers.indexOf(answer) === -1 &&
                          "wrong-answer"
                        } `}
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
                      } ${
                        checkAnswer &&
                        question.correctAnswers.indexOf(answer) > -1 &&
                        "correct-answer"
                      } ${
                        checkAnswer &&
                        question.selectedAnswers &&
                        question.selectedAnswers.indexOf(answer) > -1 &&
                        question.correctAnswers.indexOf(answer) === -1 &&
                        "wrong-answer"
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
                            className={`fill-input ${
                              checkAnswer &&
                              question?.selectedAnswers &&
                              question.correctAnswers[index] ===
                                question?.selectedAnswers[index] &&
                              "fill-correct-answer"
                            } ${
                              checkAnswer &&
                              question.selectedAnswers &&
                              question.correctAnswers[index] !==
                                question.selectedAnswers[index] &&
                              "fill-wrong-answer"
                            }`}
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
                  <DragDropContext
                    onDragEnd={(data) => onDragEnd({ ...data, questionIndex })}
                  >
                    <div className="source">
                      <Grid container spacing={2}>
                        {Object.values(question.source).map((answer, index) => (
                          <Grid item key={`source_${index}`}>
                            <Droppable droppableId={`source_${index}`}>
                              {(provided, snapshot: any) => (
                                <div
                                  ref={provided.innerRef}
                                  style={{
                                    backgroundColor:
                                      snapshot.isDragging && "green",
                                  }}
                                  className="drag-box"
                                  {...provided.droppableProps}
                                >
                                  <Draggable
                                    draggableId={`source_${index}`}
                                    index={0}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="drag-box"
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
                    </div>

                    <div className="destination">
                      <Grid container spacing={2}>
                        {Object.values(question.destination).map(
                          (answer, index) => (
                            <Grid item key={`destination_${index}`}>
                              <Droppable droppableId={`destination_${index}`}>
                                {(provided, snapshot: any) => (
                                  <div
                                    ref={provided.innerRef}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "green"
                                        : "lightblue",
                                    }}
                                    className="drag-box"
                                    {...provided.droppableProps}
                                  >
                                    <Draggable
                                      draggableId={`destination_${index}`}
                                      index={0}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={`drag-box ${
                                            checkAnswer &&
                                            question.destination[
                                              `destination_${index}`
                                            ] ===
                                              question.correctAnswers[index] &&
                                            "drag-correct-answer"
                                          } ${
                                            checkAnswer &&
                                            question.destination[
                                              `destination_${index}`
                                            ] !==
                                              question.correctAnswers[index] &&
                                            "drag-wrong-answer"
                                          }`}
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
                          )
                        )}
                      </Grid>
                    </div>
                  </DragDropContext>
                </div>
              </>
            )}
          </div>
        ))}

        <div className="btn-check-answer">
          <Button
            variant="outlined"
            onClick={() => setCheckAnswer(true)}
          >
            Check Answer
          </Button>
        </div>
      </Grid>
    </HomePage>
  );
};
