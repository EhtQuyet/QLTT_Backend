import Passport from "passport";
import PassportJWT from "passport-jwt";

import { getConfig } from "../../config/config";
import User from "../resources/user/user.model";

const config = getConfig(process.env.NODE_ENV);

export const configJWTStrategy = () => {
  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromExtractors([
      PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      PassportJWT.ExtractJwt.fromUrlQueryParameter("token")
    ]),
    secretOrKey: config.secret
  };

  Passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      User.findOne({ _id: payload.id, is_deleted: false }, { password: 0 }).exec(function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};
