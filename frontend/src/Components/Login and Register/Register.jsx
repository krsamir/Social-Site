import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import {
  successToast,
  warningToast,
  ErrorToast,
} from "../../Redux/Actions/ToastAction";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { Modal, Button as Buttons } from "react-bootstrap";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Samir ©"}
      {/* <Link color="inherit" to="https://material-ui.com/">
        Your Website
      </Link>{" "} */}
    </Typography>
  );
}
const Register = (props) => {
  const [show, setShow] = useState(false);

  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resend = () => {
    const token = uuidv4();
    const expireat = moment().add(1, "hours").format("YYYY-MM-DD HH:mm:ss");
    const data = { email, token, expireat, firstName };
    axios
      .post("/api/resend", data)
      .then((res) => {
        if (res.data.status === "created") {
          props.successToast("Kindly Check Your Mail!");
        }
        initialize();
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  const handleSubmit = async () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      if (password.length < 8) {
        props.ErrorToast("Password cannot be less than 8 characters");
      } else {
        const token = uuidv4();
        const expireat = moment().add(1, "hours").format("YYYY-MM-DD HH:mm:ss");
        await axios
          .post("/api/register", {
            firstName,
            lastName,
            email,
            password,
            token,
            expireat,
          })
          .then((res) => {
            if (res.data.status === "existing") {
              // Ideally this should not be executed
              props.warningToast("You are already Registered with us.");
            } else if (res.data.status === "created") {
              initialize();
              props.successToast("Kindly Check Your Mail!");
            } else if (res.data.status === "failed") {
              props.ErrorToast(
                "Registration failed due to some reason. Please try again"
              );
            } else if (res.data.status === "changepassword") {
              props.warningToast(
                "You are already Registered with us. Try changing your password"
              );
            } else if (res.data.status === "resend") {
              handleShow();
              // props.ErrorToast("Resend");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      props.ErrorToast(
        "All fields are mandatory. Please fill all the details."
      );
    }
  };
  // eslint-disable-next-line
  const initialize = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <ToastContainer />
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>You are already registered with us.</span>
          <br />
          <span>
            Do you want to recieve a verification link at
            <strong> {email}</strong>{" "}
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Buttons variant="secondary" onClick={handleClose}>
            Close
          </Buttons>
          <Buttons variant="success" onClick={resend}>
            Send
          </Buttons>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default connect(null, {
  successToast,
  warningToast,
  ErrorToast,
})(Register);
