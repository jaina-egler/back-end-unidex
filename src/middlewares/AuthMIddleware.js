import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .json({ mensagem: "É necessário um token para autenticação" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Token inválido");
  }
  return next();
};

export default AuthMiddleware;
