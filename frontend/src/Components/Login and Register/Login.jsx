import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import {
  successToast,
  warningToast,
  ErrorToast,
} from "../../Redux/Actions/ToastAction";
import { Link } from "react-router-dom";
import axios from "axios";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Samir©
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const [data, setData] = useState({
    email: "samirkr2527@gmail.com",
    password: "1234567890",
  });

  const handleChange = (target) => {
    const values = { ...data };
    values[target.name] = target.value;
    setData(values);
  };

  const handleLogin = () => {
    axios
      .post("/api/login", data)
      .then((res) => {
        if (res.data.status === "usernotfound") {
          props.ErrorToast("Please register with us first!");
        } else if (res.data.status === "invaliduser") {
          props.warningToast("Wrong Credentials!");
        } else {
          const { token } = res.data;
          if (token !== undefined && token !== "") {
            window.localStorage.clear();
            window.localStorage.setItem("sid", token);
            props.history.push("/");
          } else {
            props.history.push("/login");
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // setData({ email: "", password: "" });
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={data.email}
            onChange={(e) => handleChange(e.target)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={(e) => handleChange(e.target)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <ToastContainer />
    </Container>
  );
}
export default connect(null, {
  successToast,
  warningToast,
  ErrorToast,
})(Login);
