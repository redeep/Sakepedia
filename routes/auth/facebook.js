'use strict';
let express = require( 'express' );
let router = express.Router();

let session = require('express-session')
/**
 * pssport facebook
 * http://passportjs.org/docs/facebook
 */
let passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: '164983513944480',
  clientSecret: 'e1639b96c2ab304c9851bf295c20ec97',
  callbackURL: '/auth/facebook/callback' },
  ( token, tokenSecret, profile, done ) => {
    process.nextTick( () => {
      return done(null, profile);
    });
  }
));

router.get('/', passport.authenticate('facebook'));
router.get( '/callback', passport.authenticate( 'facebook', {  failureRedirect: '/#/login' } ), (req, res) => {
  session.user = { id: req.user.id, name: req.user.displayName }
  res.redirect('/#/'); // なぜか'/'だとうまくいかない
} );

module.exports = { passport, router, session } ;
