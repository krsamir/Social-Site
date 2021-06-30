// eslint-disable-next-line
import SQL from "../Database/Database.js";
import Mail from "../Mail/Mails.js";
const Task = {};
Task.register = async (data, result) => {
  const { firstName, lastName, email, password, token, expireat } = data;
  let query = `INSERT INTO register (firstname, lastname, email, password,token, expireat) 
  VALUES ('${firstName}','${lastName}', '${email}', '${password}', '${token}', '${expireat}');`;
  await SQL.query(query, async (err, res) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        result(null, { status: "existing" });
        await Mail.registerUser();
      } else {
        console.log(err);
        result(err, null);
      }
    } else {
      result(null, { status: "created" });
    }
  });
};

export default Task;
