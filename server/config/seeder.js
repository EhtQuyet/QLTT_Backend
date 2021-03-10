import Role from '../api/resources/role/role.model';
import roles from '../api/constant/roleConstant';


async function initData() {

  async function initRoles() {
    const countRole = await Role.countDocuments({code: {$in: [roles.ADMIN, roles.BAN_CHU_NHIEM, roles.GIANG_VIEN, roles.GIAO_VU, roles.SINH_VIEN]}})
    if (countRole) return
    const admin = {
      code: roles.ADMIN,
      name: "Quản lý",
      permissions: 'ADMIN'
    }

    const chuNhiem = {
      code: roles.BAN_CHU_NHIEM,
      name: "Ban chủ nhiệm khoa",
      permissions: 'BAN_CHU_NHIEM'
    }

    const giaoVu = {
      code: roles.GIAO_VU,
      name: "Giáo vụ",
      permissions: 'GIAO_VU'
    }

    const giangVien = {
      code: roles.GIANG_VIEN,
      name: "Giảng viên",
      permissions: 'GIANG_VIEN'
    }

    const sinhVien = {
      code: roles.SINH_VIEN,
      name: "Sinh viên",
      permissions: 'SINH_VIEN'
    }

    await Role.create([chuNhiem, giangVien, giaoVu, sinhVien, admin])
  }
  await initRoles();

}


export default async function () {
  try {
    await initData()
  } catch (e) {
    console.log(e)
  }
};
