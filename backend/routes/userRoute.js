import express from 'express';
import { pushUser } from '../controllers/userController.js';
// import {getUser} from '../controllers/userController.js'

const userRoutes =express.Router();
userRoutes.post('/pushUser',pushUser);
// userRoutes.post('/getUser',getUser);

export default userRoutes;