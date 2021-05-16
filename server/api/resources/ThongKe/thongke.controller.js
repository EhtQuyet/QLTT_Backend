import Model from '../thuctap/dangkythuctap/dkthuctap.model';
import * as responseAction from '../../utils/responseAction';
import { DKTT_TRANG_THAI } from '../../constant/constant';
import DiaDiemMoDel from '../thuctap/diadiemthuctap/diadiemthuctap.model';

export async function getThongKeSinhVien(req, res) {
  try {
    const arrSVDuDK = await Model.find({ trang_thai: DKTT_TRANG_THAI.CHON_GIANG_VIEN });
    const arrSVKoDuDK = await Model.find({ trang_thai: DKTT_TRANG_THAI.KHONG_DU_DIEU_KIEN });

    let dataRes = []
    let objSVDuDK = {
      SoSV: arrSVDuDK.length,
      TrangThai : ' Sinh viên đủ điều kiện'
    };
    let objSVKoDuDK= {
      SoSV: arrSVKoDuDK.length,
      TrangThai : ' Sinh viên không đủ điều kiện'
    };
    dataRes.push(objSVDuDK)
    dataRes.push(objSVKoDuDK)

    return res.json(dataRes);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}

export async function getThongKeSVTheoDiaDiem(req, res) {
  try {
    const dataDiaDiem = await DiaDiemMoDel.find();
    const dataSVDangKy = await Model.find();
    let arrTK = [];
    dataDiaDiem.forEach(diadiem => {
      let i = 0;
        dataSVDangKy.forEach(sv => {
          if (diadiem._id.toString() == sv.dia_diem_thuc_tap.toString()) {
            i += 1;
          }
        });
        let arr = {
          diadiem: diadiem.ten_dia_diem,
          SoSV: i,
        };
        arrTK.push(arr);
      },
    );
    return res.json(arrTK);
  } catch (err) {
    return responseAction.error(res, err, 500);
  }
}
