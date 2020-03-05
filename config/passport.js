const db = require("./database");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        const query = `select email , password from USERS where email = '${email}'`;
        db.executeQuery(query, (data, error) => {
          if (error) console.log(error);
          const result = data.recordset;
          if (result.length === 0) {
            return done(null, false, { message: "Email is not registered" });
          }
          const hashedPassword = result[0].password;
          bcrypt.compare(password, hashedPassword, (err, res) => {
            if (err) throw err;
            if (res) return done(null, result[0]);
            else return done(null, false, { message: "Password do not match" });
          });
        });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
