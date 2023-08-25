import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { Paper, Snackbar, styled } from "@mui/material";
import CustomLink from "@common/CustomLink";
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

const StyleButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down(500)]: {
    "& .MuiButton-startIcon": {
      display: "none"
    }
  }
}));

const Funds = ({ data }: any) => {
  const router = useRouter();

  const columns: any[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "companyImg",
      headerName: "Logo",
      width: 100,
      renderCell: (params: any) => (
        <img
          src={params.row.image}
          height={40}
          width={40}
          alt=""
        />
      )
    },
    {
      field: "name",
      headerName: "Name",
      width: 250
    },
    {
      field: "investmentsTotal",
      headerName: "Total Investments",
      width: 150,
      renderCell: (params: any) => params.row.investments.length
    },
    {
      field: "nav",
      headerName: "NAV",
      width: 150,
      renderCell: (params: any) => params.row.details.nav
    },
    {
      field: "risk",
      headerName: "Risk",
      width: 150,
      renderCell: (params: any) => params.row.details.risk
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
          <CustomLink to={`/manager/funds/${params.id}`}>
            <IconButton aria-label="edit" size="small">
              <EditIcon fontSize="inherit" />
            </IconButton>
          </CustomLink>
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

  const onDeleteMutualFund = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await fetch(`${server}/api/funds/${id}`, {
        method: "delete"
      });
      router.push("/manager/funds");
    }
  };

  return (
    <div style={rootStyle}>
      {/* {loading && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!loading && brands && brands.length === 0 && (
        <Alert severity="info" style={{ margin: "10px 0" }}>
          No Brands Available
        </Alert>
      )} */}

      {/* {!loading && ( */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "5px 0"
        }}
      >
        <Title>Mutual Funds</Title>
        <CustomLink to="/manager/funds/new-mutual-fund">
          <StyleButton
            variant="contained"
            color="secondary"
            startIcon={<AddCircleIcon />}
          >
            Add Mutual Fund
          </StyleButton>
        </CustomLink>
      </div>
      {/* )} */}

      <Paper style={{ height: "70vh" }}>
        <DataGrid rows={data} columns={columns} checkboxSelection={false} />
      </Paper>
    </div>
  );
};

Funds.getInitialProps = async () => {
  const funds = await fetch(`${server}/api/funds`);
  const data = await funds.json();

  return { data };
};

export default Funds;
