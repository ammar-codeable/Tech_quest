import express from 'express';
import { getReport, getUsers, pushUser } from '../controllers/userController.js';
import isDoctor from '../middlewares/checkuser.js';

const userRoutes =express.Router();
userRoutes.post('/pushUser',pushUser);
userRoutes.get('/getUsers',getUsers);
userRoutes.get('/getReport/:id',isDoctor,getReport);

export default userRoutes;