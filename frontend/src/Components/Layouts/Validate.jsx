import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Alert, Modal, Button as Buttons, Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import {
  successToast,
  warningToast,
  ErrorToast,
} from "../../Redux/Actions/ToastAction";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
const Validate = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    VERIFIED: false,
    UNVERIFIED: false,
    ERROR: false,
  });
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token");
  useEffect(() => {
    axios
      .get(`/api/validateToken/${token}`)
      .then((res) => {
        if (res.data.status === "VERIFIED") {
          setData({
            VERIFIED: true,
            UNVERIFIED: false,
            ERROR: false,
          });
        } else if (res.data.status === "UNVERIFIED") {
          setData({
            VERIFIED: false,
            UNVERIFIED: true,
            ERROR: false,
          });
        } else if (res.data.status === "ERROR") {
          setData({
            VERIFIED: false,
            UNVERIFIED: false,
            ERROR: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  const [email, setEmail] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSend = () => {
    const tokens = uuidv4();
    const expireat = moment().add(1, "hours").format("YYYY-MM-DD HH:mm:ss");
    const value = { email, token: tokens, expireat };
    axios
      .post("/api/reverify", value)
      .then((res) => {
        if (res.data.status === "created") {
          props.successToast("Kindly Check Your Mail!");
        } else if (res.data.status === "failed") {
          props.ErrorToast(
            "Registration failed due to some reason. Please try again"
          );
        } else if (res.data.status === "alreadyverified") {
          props.successToast(
            "You are already a verified user. If required change your password"
          );
        }
        handleShow();
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25%",
      }}
    >
      {data.VERIFIED && (
        <Alert variant="success" style={{ width: "auto" }}>
          <span>
            Your account is verified successfully. Please
            <Link to="/login"> login </Link>to find out more.
          </span>
        </Alert>
      )}
      {data.UNVERIFIED && (
        <Alert variant="warning" style={{ width: "auto" }}>
          <span>
            Link has expired. Please click here to
            <span
              onClick={handleShow}
              style={{
                color: "#007bff",
                textDecoration: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              {" "}
              Resend{" "}
            </span>
            a new verification link.
          </span>
        </Alert>
      )}
      {data.ERROR && (
        <Alert variant="danger" style={{ width: "auto" }}>
          <span>
            Something went wrong. Please try to{" "}
            <Link to="/register">Register</Link> once again.
          </span>
        </Alert>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        onExit={() => setEmail("")}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Resend Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Buttons variant="secondary" onClick={handleClose}>
            Close
          </Buttons>
          <Buttons variant="success" onClick={handleSend}>
            Send
          </Buttons>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default connect(null, {
  successToast,
  warningToast,
  ErrorToast,
})(Validate);
