import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        input,
        button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: none;
          border-style: none;
        }
      `}
    />
  </>
);

export default GlobalStyles;
