import styled from "@emotion/styled";

const SubmitButton = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  font-size: inherit;
  background-color: ${props => (props.disabled ? "#7795f8" : "rgb(25, 117, 210, 0.3)")};
  box-shadow: ${props =>
    props.disabled
      ? "none"
      : "0 6px 9px rgba(25, 117, 210, 0.06), 0 2px 5px rgba(25, 117, 210, 0.08), inset 0 1px 0 #7795f8;"};
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export default SubmitButton;
