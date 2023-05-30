import login from "../models/Login.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

class LoginController {
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // verifying email and pass
      if (!email || !password)
        return res
          .status(400)
          .json({ message: "Email e password são necessários" });

      const userFromDB = await login.findOne({ email: email }).exec();

      // compare in if to verify the password is equals or not.
      if (userFromDB && (await bcrypt.compare(password, userFromDB.password))) {
        // create token - email and password are ok
        const token = Jwt.sign(
          { user_id: userFromDB._id },
          process.env.SECRET,
          {
            expiresIn: process.env.EXPIREIN,
          }
        );

        if (!token) {
          return res
            .status(400)
            .json({ message: "Impossible to create token!!" });
        }

        // inserting token in user Object
        const CompleteObjectToSend = {
          doc: userFromDB,
          token: token,
        };

        // return the object
        return res.status(200).json(CompleteObjectToSend);
      }
      return res.status(400).json({ message: "Credenciais inválidas." });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  static createLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const encryptedPass = bcrypt.hashSync(password, 8);

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email e password são necessários" });
      }

      const verifyingEmail = await login.findOne({ email: email }).exec();

      // verifying the email if already exist
      if (verifyingEmail) {
        return res.status(400).json({ message: "Sua conta já existe!!" });
      }

      const userCreated = new login({
        email: email,
        password: encryptedPass,
      });

      await userCreated.save();

      res.status(200).json({ message: "Cadastrado com sucesso!!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
}

export default LoginController;
