import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/jwt", (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  res.send({ token });
});

export default router;
