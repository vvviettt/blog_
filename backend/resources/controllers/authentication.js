import Joi from "joi";
import pool from "../model/connection.js";

//Joi validate

const schemas = {
  register: Joi.object().keys({
    first_name: Joi.string().min(1).required(),
    last_name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    username: Joi.string()
      .pattern(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/)
      .required(),
    phone: Joi.string()
      .pattern(/((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/)
      .required(),
    password: Joi.string().min(6).required(),
  }),
};

//Controller
const authController = {
  //Login handle
  login: (req, res) => {
    pool.getConnection(function (err, connection) {
      connection.query("SELECT * FROM user", (error, results, fields) => {
        connection.release();

        if (error) {
          console.log(error);
          if (error.code === "ER_DUP_ENTRY") {
            return res.status(401).json({
              type: "EXIST_ERR",
              message: "Email , Username or phone is already exists",
            });
          }
          return res.status(500).json({
            error: { type: "SERVER_ERR", message: "Unknown error  " },
          });
        }

        console.log(results);
        return res.status(200).json(results);
      });
    });
  },

  // register handle
  register: (req, res) => {
    const validate = schemas.register.validate(req.body);
    if (validate.error) {
      return res.status(500).json({ error: { message: "Invalid data" } });
    }
    const { first_name, last_name, email, username, phone, password } =
      validate.value;

    pool.getConnection(function (err, connection) {
      // not connected!
      if (err) {
      }
      connection.query(
        `INSERT INTO USER(first_name , last_name , email ,username,phone,  password) VALUES ("${first_name}", "${last_name}", "${email}", "${username}"," ${phone}","${password}")`,
        (error, results, fields) => {
          connection.release();

          if (error) {
            console.log(error);
            if (error.code === "ER_DUP_ENTRY") {
              return res.status(401).json({
                error: true,
                type: "EXIST_ERR",
                message: "Email , username or phone is already exists",
              });
            }
            return res
              .status(500)
              .json({
                error: true,
                type: "UNKNOWN_ERR",
                message: "Unknown error  ",
              });
          }

          return res.status(200).json({ success: true });
        }
      );
    });
  },
};

export default authController;
