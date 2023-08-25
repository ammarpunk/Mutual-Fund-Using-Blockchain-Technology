import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
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

const Investors = ({investors}: any) => {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns: any[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200
    },
    {
      field: "investments",
      headerName: "Investments",
      width: 150,
      renderCell: (params: any) => params.row.investments.length
    },
    {
      field: "email",
      headerName: "Email",
      width: 200
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      editable: false,
      filterable: false,
      renderCell: (params: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => onDeleteMutualFund(params.id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      )
    }
  ];

  const onDeleteMutualFund = async (id: any) => {
    if (window.confirm("Are you sure?")) {
      await fetch(`${server}/api/users/${id}`, {
        method: "delete"
      });
      router.push("/manager/investors");
    }
  };

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
        <Title>Investors</Title>
      </div>
      <Paper style={{ height: "70vh" }}>
        <DataGrid
          rows={investors}
          columns={columns}
          //@ts-ignore
          pageSize={5}
          page={page}
          checkboxSelection={false}
          rowsPerPageOptions={[10, 25, 100]}
          onPageChange={(params: any) => {
            setPage(params.page);
          }}
          onPageSizeChange={(params: any) => {
            setRowsPerPage(params.pageSize);
          }}
          pagination
        />
      </Paper>
    </div>
  );
};

Investors.getInitialProps = async () => {
  const investors = await fetch(`${server}/api/users`);
  const data = await investors.json();

  return { investors: data };
};

export default Investors;
