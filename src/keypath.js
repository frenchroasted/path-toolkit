'use strict';

import Null from './null';
import Lexer from './lexer';
import Builder from './builder';
import Interpreter from './interpreter';
import hasOwnProperty from './hasOwnProperty';

var lexer = new Lexer(),
    builder = new Builder( lexer ),
    intrepreter = new Interpreter( builder ),
    
    cache = {};

/**
 * @class KeyPathExp
 * @extends Null
 * @param {external:string} pattern
 * @param {external:string} flags
 */
function KeyPathExp( pattern, flags ){
    typeof pattern !== 'string' && ( pattern = '' );
    typeof flags !== 'string' && ( flags = '' );
    
    var tokens = hasOwnProperty( cache, pattern ) ?
        cache[ pattern ] :
        cache[ pattern ] = lexer.lex( pattern );
    
    Object.defineProperties( this, {
        'flags': {
            value: flags,
            configurable: false,
            enumerable: true,
            writable: false
        },
        'source': {
            value: pattern,
            configurable: false,
            enumerable: true,
            writable: false
        },
        'getter': {
            value: intrepreter.compile( tokens, false ),
            configurable: false,
            enumerable: false,
            writable: false
        },
        'setter': {
            value: intrepreter.compile( tokens, true ),
            configurable: false,
            enumerable: false,
            writable: false
        }
    } );
}

KeyPathExp.prototype = new Null();

KeyPathExp.prototype.constructor = KeyPathExp;

/**
 * @function
 */
KeyPathExp.prototype.get = function( target, lookup ){
    return this.getter( target, undefined, lookup );
};

/**
 * @function
 */
KeyPathExp.prototype.has = function( target, lookup ){
    var result = this.getter( target, undefined, lookup );
    return typeof result !== 'undefined';
};

/**
 * @function
 */
KeyPathExp.prototype.set = function( target, value, lookup ){
    return this.setter( target, value, lookup );
};

/**
 * @function
 */
KeyPathExp.prototype.toJSON = function(){
    var json = new Null();
    
    json.flags = this.flags;
    json.source = this.source;
    
    return json;
};

/**
 * @function
 */
KeyPathExp.prototype.toString = function(){
    return this.source;
};

export { KeyPathExp as default };