import express from 'express';
import { getUsers, pushUser } from '../controllers/userController.js';
import isDoctor from '../middlewares/checkuser.js';

const userRoutes =express.Router();
userRoutes.post('/pushUser',pushUser);
userRoutes.post('/getUsers',isDoctor,getUsers);

export default userRoutes;