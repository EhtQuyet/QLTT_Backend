export default function roleAuthorization(roles) {

  return function (req, res, next) {

    // var user = req.user;
    // if (roles.indexOf(user.role) > -1) {
    //   return next();
    // }
    // return res.status(401).json({ success: false, message: 'Bạn không có quyền truy cập API' });
    return next()
  }

}
