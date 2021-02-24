import express from 'express';

import userRouter from './api/resources/user/user.router';


const router = express.Router();

router.use('/users', userRouter);



module.exports = router;
