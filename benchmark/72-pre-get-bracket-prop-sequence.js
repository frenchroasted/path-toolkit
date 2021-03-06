'use strict';

var PathToolkit = require( '../dist/path-toolkit-min' ),
    tk = new PathToolkit(),
    
    tkpath = '["foo"]"bar","qux"<["baz"]',
    tkpathSimplified = 'foo.bar,qux<baz',
    data = {
        foo: {
            bar: {
                baz: 123
            },
            qux: {
                baz: 456
            }
        }
    },

    tkTokens = tk.getTokens( tkpath ),
    tkTokensSimplified = tk.getTokens( tkpathSimplified );

module.exports = {
    name: 'Precompiled:Get:Bracket:Property:Sequence',
    maxTime: 5,
    tests: {
        'tk#get-tokenized': function(){
            tk.get( data, tkTokens );
        },
        'tk#get-tokenized-simplified': function(){
            tk.get( data, tkTokensSimplified );
        }
    }
};
