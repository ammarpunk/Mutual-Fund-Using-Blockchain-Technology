import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import CustomLink from "@common/CustomLink";
import CustomInput from "@common/CustomInput";
import Cookies from 'js-cookie'
 
type IFormInputs = {
  email: string;
  password: string;
};

export default function Login() {

  const schema = yup.object({
    email: yup.string().required("Email required"),
    password: yup.string().required("Password required")
  });

  const defaultValues = {
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
      const res = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify(data)
      });
      const fetchedData = await res.json();
      if (!res.ok) {
        setError(fetchedData.input, {
          message: fetchedData.message
        });
        return;
      }
      Cookies.set('investor', JSON.stringify(fetchedData), { expires: 30 })
      if(fetchedData.isAdmin) {
        window.location.href = "/manager/funds"
        return
      }
      window.location.href = "/funds"
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <Container component="main" maxWidth="xs">
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomInput label="Email" name="email" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  label="Password"
                  name="password"
                  fullWidth
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <CustomLink
                  to="/signup"
                  underline="always"
                  color="primary.main"
                >
                  {"Don't have an account? Sign Up"}
                </CustomLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </FormProvider>
  );
}
