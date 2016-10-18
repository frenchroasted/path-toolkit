'use strict';

var kp = require( '../dist/kp-umd' ),
    tk = require( '../dist/tk-umd' ),
    
    path = '[1,2][1][0]',
    data = [
        [ [ 1 ], [ 2 ] ],// 0
        [ [ 3 ], [ 4 ] ],// 1
        [ [ 5 ], [ 6 ] ],// 2
        [ [ 7 ], [ 8 ] ] // 3
    ];
    
module.exports = {
    name: 'Run:Get:Bracket:Index:Array',
    maxTime: 5,
    tests: {
        'kp': function(){
            kp`[1,2][1][0]`( data );
        }/*, Is this supported?
        'tk#get': function(){
            tk.get( data, path );
        }
        */
    }
};