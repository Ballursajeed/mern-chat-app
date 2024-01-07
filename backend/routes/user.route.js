import Router from "express";
import { registerUserController,loginUserController } from "../controllers/user.controller.js";
import jwt from 'jsonwebtoken';

const router = Router();

 const verifyToken = (req, res, next) => {
 const token = req.headers.authorization;

  if (!token) {
    return res.status(200).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token.split('')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }

    req.userId = decoded.userId; // Attach the user ID to the request
    next();
  });
};

 router.post('/register',registerUserController);
 router.post('/login',loginUserController);


 router.get('/validateToken', verifyToken, (req, res) => {
  // If the middleware successfully verifies the token, send back user details
  res.json({ success: true, user: { userId: req.userId } });
  });

export default router