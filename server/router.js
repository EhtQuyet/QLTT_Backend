import express from 'express';

import userRouter from './api/resources/user/user.router';
import {giaovienRouter} from './api/resources/giaovienhdtttn/giaovien.router';
import {sinhvienRouter} from './api/resources/sinhvientttn/sinhvien.router';
import {lophocRouter} from './api/resources/lophoc/lop.router';
import roleRouter from './api/resources/role/role.router';
import {bomonRouter} from './api/resources/bomon/bomon.router';
import {detaiRouter} from './api/resources/detaitttn/detai.router';
import {diadiemthuctapRouter} from './api/resources/diadiemthuctap/diadiemthuctap.router'
import {namhocRouter} from './api/resources/namhoc/namhoc.router'
import {danhsachthuctapRouter} from './api/resources/thuctap/danhsachthuctap/danhsachthuctap.router'
import {lopthuctapRouter} from './api/resources/thuctap/lopthuctap/lopthuctap.router'
import {dkthuctapRouter} from './api/resources/dangkythuctap/dkthuctap.router'




const router = express.Router();

router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/giaovien', giaovienRouter);
router.use('/sinhvien', sinhvienRouter);
router.use('/bomon', bomonRouter);
router.use('/lophoc', lophocRouter);
router.use('/detai', detaiRouter);
router.use('/diadiemthuctap', diadiemthuctapRouter);
router.use('/namhoc', namhocRouter);
router.use('/danhsachthuctap', danhsachthuctapRouter);
router.use('/lopthuctap', lopthuctapRouter);
router.use('/dangkythuctap', dkthuctapRouter);



module.exports = router;
