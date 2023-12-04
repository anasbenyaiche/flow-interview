import DataTable from "react-data-table-component";
import styled from "styled-components";

export const StyledTable = styled(DataTable)`
  margin-top: 20px;

  .data-table {
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }
  }
`;

export const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#313e495e",
    },
  },
  rows: {
    style: {
      backgroundColor: "#313e495e",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#313e495e",
      color: "white",
    },
  },
};
