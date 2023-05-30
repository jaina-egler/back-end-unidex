import login from "../models/Login.js";
import bcrypt from "bcryptjs";

const loginSeed = async () => {
  await login.deleteMany();

  const loginToInsert = new login({
    email: "michel.unidex@gmail.com",
    password: bcrypt.hashSync("michelunidex", 8),
  });

  await loginToInsert.save();

  console.log("Inserido login com sucesso!!");
};

export default loginSeed;
