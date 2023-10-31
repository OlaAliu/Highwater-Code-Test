import styled from "@emotion/styled";

const FormFieldContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin: 15px;

  &:first-of-type {
    border-top: none;
  }
`;

const Label = styled.label`
  width: 20%;
  min-width: 70px;
  padding: 11px 0;
  color: #000000;
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 11px 15px 11px 8px;
  color: #000;
  background-color: transparent;
  animation: 1ms void-animation-out;
  border: 1px solid rgb(0,0,0, 0.2);
  border-radius: 7px;

  &::placeholder {
    color: grey;
  }
`;

const FormField = ({ label, type, name, placeholder, value, disabled, required }) => {
  return (
    <FormFieldContainer>
      <Label htmlFor={name}>{label}</Label> <br />
      <Input name={name} type={type} value={value} readOnly={disabled} placeholder={placeholder} required />
    </FormFieldContainer>
  );
};

export default FormField;
