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
  }
`;
