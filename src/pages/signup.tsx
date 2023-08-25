import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@common/CustomInput";
import CustomLink from "@common/CustomLink";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type IFormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const router = useRouter();

  const schema = yup.object({
    name: yup.string().required("Name required"),
    email: yup.string().required("Email required"),
    password: yup.string().required("Password required")
  });

  const defaultValues = {
    name: "",
    email: "",
    password: ""
  };

  const methods = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues
  });

  const { handleSubmit, setError } = methods;

  const onSubmit: SubmitHandler<IFormInputs> = async data => {
    try {
      const res = await fetch("/api/users/signup", {
        method: "post",
        body: JSON.stringify(data)
      });
      const fetchedData = await res.json();
      if (!res.ok) {
        setError("email", {
          message: fetchedData.message
        });
        return;
      }
      Cookies.set('investor', JSON.stringify(fetchedData), { expires: 30 })
      window.location.href = "/funds"
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <FormProvider {...methods}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomInput label="Name" name="name" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <CustomInput label="Email" name="email" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <CustomLink to="/login" underline="always" color="primary.main">
                  Already have an account? Sign in
                </CustomLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default SignUp;
