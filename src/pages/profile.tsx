import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  Typography,
  Stack
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@common/CustomInput";
import { getUserInfo } from "@src/helpers";
//@ts-ignore
import web3 from "@ethereum/web3";
import FundEth from "@ethereum/fund";
import factory from "@ethereum/factory";

export const profileSchema = yup.object({
  name: yup.string().required("Name required"),
  email: yup
    .string()
    .required("Email required")
    .email("Invalid email format"),
  password: yup.string(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
});

const titleStyle = {
  textTransform: "uppercase",
  margin: "10px 0",
  fontWeight: 600
};

const Profile = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const [fetchedInvestments, setInvestments] = React.useState<any>([]);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(profileSchema)
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = async (data: any) => {
    if (isReadOnly) {
      setIsReadOnly(false);
      return;
    }
    const res = await fetch(`/api/users/${getUserInfo()._id}`, {
      method: "PATCH",
      body: JSON.stringify(data)
    });
    if (res.ok) {
      window.location.href = "/profile";
      return;
    }
  };

  const cancelHandler = async (row: any) => {
    if (window.confirm("Are you sure?")) {
      const fd = FundEth(row.fund.address);
      //@ts-ignore
      const accounts = await web3.eth.getAccounts();
      //@ts-ignore
      const addresses = await factory.methods.getDeployedFunds().call()
      const index = addresses.findIndex((address: string) => address === row.fund.address);

      await fd.methods.cancelInvestment(index).send({ from: accounts[0] });

      await fetch(`/api/investments/${row.id}`, {
        method: "DELETE"
      });
      window.location.href = "/profile";
    }
  };

  const getRevenueHandler = async (row: any) => {
    if (window.confirm("Are you sure?")) {
      const fd = FundEth(row.fund.address);
      //@ts-ignore
      const accounts = await web3.eth.getAccounts();
      //@ts-ignore
      const addresses = await factory.methods.getDeployedFunds().call()
      const index = addresses.findIndex((address: string) => address === row.fund.address);

      await fd.methods.getRevenue(100, index).send({ from: accounts[0] });

      await fetch(`/api/investments/${row.id}`, {
        method: "DELETE"
      });
      window.location.href = "/profile";
    }
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      if (!getUserInfo()) return;
      const id = getUserInfo()._id;
      const investor = await fetch(`/api/users/${id}`);
      const data = await investor.json();

      setValue("name", data.name);
      setValue("email", data.email);
      setInvestments(data.investments);
      setLoading(false);
    })();
  }, [setValue]);

  return (
    <Container sx={{ minHeight: "70vh", mt: 3 }}>
      <Typography sx={titleStyle}>My Profile</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography sx={titleStyle}>Personal Infos</Typography>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <Paper sx={{ p: 1 }}>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={1}>
                    <CustomInput
                      label="Name"
                      name="name"
                      fullWidth
                      InputProps={{
                        readOnly: isReadOnly
                      }}
                    />
                    <CustomInput
                      label="Email"
                      name="email"
                      fullWidth
                      InputProps={{
                        readOnly: isReadOnly
                      }}
                    />
                    <CustomInput
                      type="password"
                      label="Password"
                      name="password"
                      fullWidth
                      InputProps={{
                        readOnly: isReadOnly
                      }}
                    />
                    <CustomInput
                      type="password"
                      label="Confirm Password"
                      name="passwordConfirmation"
                      fullWidth
                      InputProps={{
                        readOnly: isReadOnly
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      {isReadOnly ? "Edit" : "Update"}
                    </Button>
                  </Stack>
                </form>
              </FormProvider>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography sx={titleStyle}>My Investments</Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Fund</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchedInvestments?.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {new Date(row.createdAt)?.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{row.amount} Wei</TableCell>
                    <TableCell>{row.fund.name}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => cancelHandler(row)}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="info"
                        sx={{ whiteSpace: "nowrap" }}
                        onClick={() => getRevenueHandler(row)}
                      >
                        Get Revenue
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* )} */}
        </Grid>
      </Grid>
    </Container>
  );
};

const investments = [
  {
    id: "1",
    createdAt: "12/03/2023",
    totalPrice: 20,
    isPaid: false,
    paidAt: "12/03/2023",
    isDelivered: false,
    deliveredAt: "12/03/2023"
  },
  {
    id: "2",
    createdAt: "12/03/2023",
    totalPrice: 20,
    isPaid: false,
    paidAt: "12/03/2023",
    isDelivered: false,
    deliveredAt: "12/03/2023"
  },
  {
    id: "3",
    createdAt: "12/03/2023",
    totalPrice: 20,
    isPaid: false,
    paidAt: "12/03/2023",
    isDelivered: false,
    deliveredAt: "12/03/2023"
  },
  {
    id: "4",
    createdAt: "12/03/2023",
    totalPrice: 20,
    isPaid: false,
    paidAt: "12/03/2023",
    isDelivered: false,
    deliveredAt: "12/03/2023"
  },
  {
    id: "5",
    createdAt: "12/03/2023",
    totalPrice: 20,
    isPaid: false,
    paidAt: "12/03/2023",
    isDelivered: false,
    deliveredAt: "12/03/2023"
  }
];

export default Profile;
