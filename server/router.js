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
import {dotthuctapRouter} from './api/resources/thuctap/dotthuctap/dotthuctap.router'
import {dkthuctapRouter} from './api/resources/dangkythuctap/dkthuctap.router'
import {thongbaoRouter} from './api/resources/thongbao/thongbao.router'




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
router.use('/dotthuctap', dotthuctapRouter);
router.use('/dangkythuctap', dkthuctapRouter);
router.use('/thongbao', thongbaoRouter);



module.exports = router;
