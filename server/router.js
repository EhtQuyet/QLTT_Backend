import express from 'express';

import userRouter from './api/resources/user/user.router';
import {giaovienRouter} from './api/resources/quanlidanhmuc/giaovienhdtttn/giaovien.router';
import {sinhvienRouter} from './api/resources/quanlidanhmuc/sinhvientttn/sinhvien.router';
import {lophocRouter} from './api/resources/quanlidanhmuc/lophoc/lop.router';
import roleRouter from './api/resources/role/role.router';
import {bomonRouter} from './api/resources/quanlidanhmuc/bomon/bomon.router';
import {detaiRouter} from './api/resources/detaitttn/detai.router';
import {diadiemthuctapRouter} from './api/resources/thuctap/diadiemthuctap/diadiemthuctap.router'
import {namhocRouter} from './api/resources/quanlidanhmuc/namhoc/namhoc.router'
import {dotthuctapRouter} from './api/resources/thuctap/dotthuctap/dotthuctap.router'
import {linhvucRouter} from './api/resources/linhvuc/linhvuc.router'
import {tukhoaRouter} from './api/resources/tukhoa/tukhoa.router'
import {ngachgvRouter} from './api/resources/ngachgiangvien/ngachgv.router'
// import {kehoachttRouter} from './api/resources/kehoachtt/kehoachtt.router'
import {nhatkyRouter} from './api/resources/nhatkythuctap/nhatkythuctap.router'
import {dkthuctapRouter} from './api/resources/thuctap/dangkythuctap/dkthuctap.router'
import {nhiemVuRouter} from './api/resources/thuctap/NhiemVuSinhVien/nhiemVuSinhVien.router'
import {thongbaoRouter} from './api/resources/thongbao/thongbao.router'
import {thongkeRouter} from './api/resources/ThongKe/thongke.router';
import {fileRouter} from './api/resources/detaitttn/file/file.router';
import { router as nhomTTRouter } from './api/resources/thuctap/nhomthuctap/router';
import { router as chitietNhomTTRouter } from './api/resources/thuctap/nhomthuctap/chitiet/router';
import { router as kehoachRouter } from './api/resources/thuctap/kehoachthuctap/router';
import { router as chitietKeHoachRouter } from './api/resources/thuctap/kehoachthuctap/chitiet/router';


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
router.use('/linhvuc', linhvucRouter);
router.use('/tukhoa', tukhoaRouter);
router.use('/dotthuctap', dotthuctapRouter);
router.use('/dangkythuctap', dkthuctapRouter);
// router.use('/kehoachthuctap', kehoachttRouter);
router.use('/thongbao', thongbaoRouter);
router.use('/ngachgiangvien', ngachgvRouter);
router.use('/nhatkythuctap', nhatkyRouter);
router.use('/nhiemvusinhvien', nhiemVuRouter);

router.use('/nhomthuctap', nhomTTRouter);
router.use('/nhomthuctapchitiet', chitietNhomTTRouter);
router.use('/kehoachthuctap', kehoachRouter);
router.use('/kehoachchitiet', chitietKeHoachRouter);

router.use('/thongkesinhvien', thongkeRouter);
router.use('/file', fileRouter);





module.exports = router;
