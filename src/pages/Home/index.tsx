import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { EQuestionType } from "../../enums";
import { randomString } from "../../helpers";
import { IQuestion } from "../../interfaces";
import { HomePage } from "./styled";

export const Home = () => {
  const [listQuestions, setListQuestions] = useState<IQuestion[]>([]);

  const [questionType, setQuestionType] = useState<string>(
    EQuestionType.SingleChoose
  );
  const [listAnswers, setListAnswers] = useState<{ [x: string]: string }>({});
  const [listCorrectAnswers, setListCorrectAnswers] = useState<{
    [x: string]: string;
  }>({});

  const disableBtnAddMoreCorrectAnswer = useMemo(() => {
    if (
      questionType === EQuestionType.SingleChoose ||
      questionType === EQuestionType.Fill
    ) {
      if (Object.keys(listCorrectAnswers).length === 1) return true;
      return false;
    }
  }, [listCorrectAnswers, questionType]);

  const addMoreAnswer = () => {
    const random = randomString(6);

    const newListAnswers = { ...listAnswers, [random]: "" };
    setListAnswers(newListAnswers);
  };

  const addMoreCorrectAnswer = () => {
    if (
      questionType === EQuestionType.SingleChoose ||
      questionType === EQuestionType.Fill
    ) {
      if (Object.keys(listCorrectAnswers).length === 1) return;
    }

    const random = randomString(6);

    const newListAnswers = { ...listCorrectAnswers, [random]: "" };
    setListCorrectAnswers(newListAnswers);
  };

  return (
    <HomePage container spacing={2}>
      <Grid item xs={5} className="question">
        <div>
          <h2 className="title">Create Question</h2>

          <div className="input-wrap">
            <label className="label">Question Type</label>
            <Select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
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
            <TextareaAutosize minRows={6} className="input" />
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
            <Button variant="outlined">Submit</Button>
          </div>
        </div>
      </Grid>

      <Grid item xs={7} className="answer">
        <h2 className="title">List Question</h2>
      </Grid>
    </HomePage>
  );
};
