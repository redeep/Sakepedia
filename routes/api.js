'use strict';
/**
 * node-mongodbのドキュメント
 * http://mongodb.github.io/node-mongodb-native/2.1/
 */
let express = require( 'express' );
let router = express.Router();
let ObjectID = require( 'mongodb' ).ObjectID;
// MongoDB用ファイルを指定
let collection = require( '../mongo' );
const COL = 'sake';
const LIMIT = 100;

// For Cross Origin
router.all( '/*', ( req, res, next ) => {
  res.contentType( 'json' );
  res.header( 'Access-Control-Allow-Origin', '*' );
  next();
} );

// GET find
router.get( '/find', ( req, res ) => {
  let query = {}
  if ( req.query.prefecture ) {
    query['都道府県'] = new RegExp( req.query.prefecture );
  }
  if ( req.query.brewrey ) {
    query['蔵元'] = new RegExp( req.query.brewrey );
  }
  if ( req.query.name ) {
    query['名前'] = new RegExp( req.query.name );
  }
  console.log(query);
  collection( COL ).find( query ).limit( LIMIT ).toArray( ( err, docs ) => {
    res.send( docs );
  } );
} );

// GET find names
router.get( '/find/names', ( req, res ) => {
  collection( COL ).distinct( '名前', ( err, docs ) => { res.send( docs) } );
} );

// GET find breweries
router.get( '/find/breweries', ( req, res ) => {
  collection( COL ).distinct( '蔵元', ( err, docs ) => { res.send( docs) } );
} );

// GET find prefectures
router.get( '/find/prefectures', ( req, res ) => {
  collection( COL ).distinct( '都道府県', ( err, docs ) => { res.send( docs) } );
} );

// GET find :id
router.get( '/:id', ( req, res ) => {
  collection( COL ).findOne( {
    _id: new ObjectID( req.params.id )
  }, {}, function ( err, r ) {
    res.send( r );
  } );
} );

// POST insert data
router.post( '/', ( req, res ) => {
  collection( COL ).insertOne( req.body ).then( function ( r ) {
    res.send( r );
  } );
} );

// PUT update data
router.put( '/:id', ( req, res ) => {
  collection( COL ).findOneAndUpdate( {
    _id: new ObjectID( req.params.id )
  }, req.body, {}, function ( err, r ) {
    res.send( r );
  } );
} );

// DELETE remove data
router.delete( '/:id', ( req, res ) => {
  collection( COL ).findOneAndDelete( {
    _id: new ObjectID( req.params.id )
  }, {}, function ( err, r ) {
    res.send( r );
  } );
} );

module.exports = router;
