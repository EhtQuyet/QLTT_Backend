import CapBac from '../resources/danhmucnganh/capbac/capbac.model';
import ChucVu from '../resources/danhmucnganh/chucvu/chucvu.model';
import DonVi from '../resources/danhmucnganh/donvi/donvi.model';
import LucLuong from '../resources/danhmucnganh/lucluong/lucluong.model';
import CanBoNganh from '../resources/canbonganh/canbonganh.model';

export async function conditionFilter(query) {
  // ở đây sẽ tạo điều kiện tìm kiếm cấp bậc, chức vụ, đơn vị, lực lượng, đơn vị.
  try{
    if(query.capbac_id || query.chucvu_id || query.donvi_id || query.lucluong_id){
      let queryCanBo = {}
      if(query.capbac_id){
        queryCanBo.capbac_id = query.capbac_id
        delete query.capbac_id
      }
  
      if(query.chucvu_id){
        queryCanBo.chucvu_id = query.chucvu_id
        delete query.chucvu_id
      }
  
      if(query.donvi_id){
        queryCanBo.donvi_id = query.donvi_id
        delete query.donvi_id
      }
  
      if(query.lucluong_id){
        queryCanBo.lucluong_id = query.lucluong_id
        delete query.lucluong_id
      }

      let canbo_id = await CanBoNganh.find(queryCanBo).lean().distinct('canbo_id');
      if(canbo_id.length){
        query.canbo_id = {$in: canbo_id}
      }else{
        return false
      }
    }
    return query
  }catch(e){
    console.log(e)
  }
  
}

