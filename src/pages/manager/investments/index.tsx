import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, styled } from "@mui/material";
import { server } from "@src/config/config";

const rootStyle = {
  width: "100%",
  padding: 10
};

const Title = styled("h3")(({ theme }) => ({
  fontSize: 21,
  fontWeight: 600,
  [theme.breakpoints.down(500)]: {
    fontSize: 18
  }
}));

const Investments = ({ investments }: any) => {

  const columns: any[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "investor",
      headerName: "Investor",
      width: 200,
      renderCell: (params: any) => params.row.investor.name
    },
    {
      field: "fund",
      headerName: "Mutual Fund",
      width: 200,
      renderCell: (params: any) => params.row.fund.name
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200
    },
    {
      field: "date",
      headerName: "Investment Date",
      width: 200,
      renderCell: (params: any) =>
        new Date(params.row.createdAt).toLocaleDateString()
    }
  ];

  return (
    <div style={rootStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "5px 0"
        }}
      >
        <Title>Investments</Title>
      </div>
      <Paper style={{ height: "70vh" }}>
        <DataGrid
          rows={investments}
          columns={columns}
          checkboxSelection={false}
          pagination
        />
      </Paper>
    </div>
  );
};

Investments.getInitialProps = async () => {
  const investments = await fetch(`${server}/api/investments`);
  const data = await investments.json();

  return { investments: data };
};

// export const getServerSideProps = withServerAuth(context => {
//   // Your normal `getServerSideProps` code here
//   return { props: {} };
// });

export default Investments;
