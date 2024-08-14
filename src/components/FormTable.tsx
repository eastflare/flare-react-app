import styled from "@emotion/styled";

const StyledTable = styled.table`
  width: 80%;
  border: 1px solid;
  border-collapse: collapse;
  border-color: #111111;
`;

const FormTable = ({children}) => {
  const tableStyle = {
    width: "80%",
    border: '1px solid',
    borderCollapse: "collapse",
    borderColor: "#111111",
  };

  return (
    <StyledTable>
      <tbody>
        {children}
      </tbody>
    </StyledTable>
  );
};
  
export default FormTable;
  