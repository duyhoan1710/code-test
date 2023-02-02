import { Grid } from "@mui/material";
import styled from "styled-components";

export const HomePage = styled(Grid)`
  min-height: 100vh;
  height: 100%;

  .question,
  .answer {
    padding: 40px 60px !important;

    .title {
      margin-bottom: 100px;
    }
  }

  .bold {
    font-weight: 500;
  }

  .text-answer {
    color: blue;
    font-weight: 500;
  }

  .drag-box {
    height: 65px;
    background-color: #0000ff30;
    width: 65px;
    border-radius: 10px;
    border: 1px solid #0059ff4f;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .question {
    border-right: 1px solid #000;

    .input-wrap {
      display: flex;
      align-items: flex-start;
      margin-bottom: 24px;

      .label {
        font-size: 16px;
        font-weight: 500;
        width: 150px;
        padding-top: 5px;
      }

      .input {
        flex-grow: 1;
        padding: 10px;
        font-size: 14px;
      }

      .select {
        width: 30%;
      }

      .answer-item {
        display: flex;
        margin-bottom: 10px;

        .btn-remove {
          margin-left: 20px;
        }
      }

      .btn-add-more {
        margin-top: 15px;
      }
    }

    .btn-submit {
      display: flex;
      justify-content: end;

      button {
        width: 100px;
      }
    }
  }

  .answer {
    .item-question {
      margin-bottom: 30px;

      .question-title {
        margin-bottom: 10px;
      }
      .single-question-answers {
        display: flex;
        width: 100%;

        .item-answer {
          width: 25%;
          max-width: 25%;
        }

        .selected-answer {
          border: 2px solid blue;
          padding: 10px;
          border-radius: 50%;
        }
      }

      .multiple-question-answers {
        .item-answer {
          border: 2px solid blue;
          padding: 6px 8px;
          margin-bottom: 6px;
          border-radius: 6px;
        }

        .selected-answer {
          background-color: #005aff24;
        }
      }

      .fill-question-answer {
        border: 1px solid blue;
        padding: 20px;
        margin-top: 15px;
        display: flex;
        align-items: center;

        .fill-input {
          margin: 0 10px;
          margin-top: 6px;

          input {
            color: blue;
          }
        }
      }

      .drag-answer {
        .source,
        .destination {
          margin: 40px 0;
        }
      }
    }
  }
`;
