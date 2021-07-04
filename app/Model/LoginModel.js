// eslint-disable-next-line
import moment from "moment";
import SQL from "../Database/Database.js";
import Mail from "../Mail/Mails.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
const Task = {};
const log = console.log;
config();
Task.register = async (data, result) => {
  const { firstName, lastName, email, password, token, expireat } = data;
  const checkExistingUser = `SELECT * FROM register where email="${email}"`;
  const createNewUser = `INSERT INTO register (firstname, lastname, email, password,token, expireat) VALUES ('${firstName}','${lastName}', '${email}', '${password}', '${token}', '${expireat}')`;
  const checkStatus = `select status from register where email="${email}"`;
  SQL.query(checkExistingUser, async (err, res1) => {
    if (err) {
      log(err);
      result(err, null);
    } else {
      // if res1.length > 0 that means a user is already present.
      if (res1.length > 0) {
        SQL.query(checkStatus, (err, res2) => {
          if (err) {
            result(err, null);
          } else {
            const response = JSON.parse(JSON.stringify(res2))[0];
            if (response.status === 0) {
              // re route and send a mail containing link
              result(null, { status: "resend" });
            } else if (response.status === 1) {
              // Option should be given for changing password
              result(null, { status: "changepassword" });
            }
          }
        });
      } else {
        // create new user
        Mail.registerUser(
          email,
          firstName,
          token,
          expireat.split(" ")[1],
          async (res) => {
            if (res === "mailsent") {
              SQL.query(createNewUser, async (err, res) => {
                if (err) {
                  if (err.code === "ER_DUP_ENTRY") {
                    log("existing");
                    result(null, { status: "existing" });
                  } else {
                    log(err);
                    result(err, null);
                  }
                } else {
                  result(null, { status: "created" });
                }
              });
            } else if (res === "mailnotsent") {
              log("failed");
              // run database query to delete token and expirydate
              await onRegistrationEmailFailure(email);
              result(null, { status: "failed" });
            }
          }
        );
      }
    }
  });
};

const onRegistrationEmailFailure = (email) => {
  const resetToken = `delete from register where (email = '${email}');`;
  SQL.query(resetToken, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      log(`Deletion done for email id = ${email}`);
    }
  });
};
const onEmailFailure = (email) => {
  const resetToken = `update register set token = NULL,  expireat = NULL, status = 0 WHERE (email = '${email}')`;
  SQL.query(resetToken, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      log(`Reset done for email id = ${email}`);
    }
  });
};

Task.resend = (data, result) => {
  const { email, token, expireat, firstName } = data;
  const updateQuery = `update register set token = '${token}',  expireat = '${expireat}', status = 0 WHERE (email = '${email}')`;
  Mail.registerUser(
    email,
    firstName,
    token,
    expireat.split(" ")[1],
    async (res) => {
      if (res === "mailsent") {
        SQL.query(updateQuery, (err, res) => {
          if (err) {
            console.log(err);
            result(err, null);
          } else {
            result(null, { status: "created" });
          }
        });
      } else if (res === "mailnotsent") {
        log("failed");
        // run database query to delete token and expirydate
        await onEmailFailure(email);
        result(null, { status: "failed" });
      }
    }
  );
};

Task.validateToken = (data, result) => {
  const { token } = data;
  const searchToken = `select expireat, status from register where token="${token}" and status= 0`;
  const Validated = `update register set token = NULL, expireat = NULL, status = 1 where (token = '${token}')`;
  SQL.query(searchToken, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (res.length > 0) {
        const response = JSON.parse(JSON.stringify(res))[0];
        const expiryTime = moment(response.expireat);
        const now = moment();
        if (expiryTime.isBefore(now)) {
          result(null, { status: "UNVERIFIED" });
        } else {
          SQL.query(Validated, (err, response1) => {
            if (err) {
              result(err, null);
            } else {
              result(null, { status: "VERIFIED" });
            }
          });
        }
      } else {
        result(null, { status: "ERROR" });
      }
    }
  });
};

Task.reverify = (data, result) => {
  const { email, token, expireat } = data;
  const findUser = `select * from register where email = "${email}"`;
  const updateQuery = `update register set token = '${token}',  expireat = '${expireat}', status = 0 WHERE (email = '${email}')`;
  SQL.query(findUser, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (res.length > 0) {
        const response = JSON.parse(JSON.stringify(res))[0];
        const { firstname, status } = response;
        if (status === 0) {
          Mail.registerUser(
            email,
            firstname,
            token,
            expireat.split(" ")[1],
            async (res) => {
              if (res === "mailsent") {
                SQL.query(updateQuery, (err, res) => {
                  if (err) {
                    console.log(err);
                    result(err, null);
                  } else {
                    result(null, { status: "created" });
                  }
                });
              } else if (res === "mailnotsent") {
                log(`Mail Failed for ${email}`);
                // run database query to delete token and expirydate
                await onEmailFailure(email);
                result(null, { status: "failed" });
              }
            }
          );
        } else if (status === 1) {
          result(null, { status: "alreadyverified" });
        }
      } else {
        result(null, { status: "doesnotexist" });
      }
    }
  });
};
const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;
Task.login = (data, result) => {
  const { email, password } = data;
  let query = `SELECT * FROM register where email="${email}"`;
  SQL.query(query, async (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (res.length === 0) {
        result(null, { status: "usernotfound" });
      } else {
        const response = JSON.parse(JSON.stringify(res))[0];
        // const isMatched = await bcrypt.compare(password, response.password);
        const isMatched = password === response.password;
        if (isMatched) {
          const token = jwt.sign({ id: email, role: "owner" }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION_TIME,
            // expiresIn: "7 days",
          });
          return result(null, { token });
        } else {
          result(null, { status: "invaliduser" });
        }
      }
    }
  });
};
export default Task;
