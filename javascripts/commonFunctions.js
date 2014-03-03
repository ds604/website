/////////////////////////////////////////////////////
//Create array of numbers between start and stop
linspace = function(start, stop, divisions){
        start = start || 0;
        stop  = stop || 1;
        divisions = divisions || 100;
        
        return 
    };

/////////////////////////////////////////////////////
//Linear interpolation of 'amount' values between start and stop
lerp = function(start,stop,amount) {
        start = start || 0;
        stop = stop || 1;
        amount = amount || 0.5;
        
        return (1-amount) * start + amount * stop;
    };
    
cos = function(x, amplitude, frequency, phase, offset){
        amplitude = amplitude || 1;
        frequency = frequency || 
        
        return amplitude * (offset + Math.cos(frequency * (x + phase)));
    };
    
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//Add two arrays
//
//var a = [1,2,3];
//var b = [9,2,7];
//
//   // pass an Array
//var c = a.add( b );  // [10,4,10]
//
//   // pass a number
//var d = a.add( 5 );  // [6,7,8]

Array.prototype.add = function( b ) {
    var a = this,
        c = [];
    if( Object.prototype.toString.call( b ) === '[object Array]' ) {
        if( a.length !== b.length ) {
            throw "Array lengths do not match.";
        } else {
            for( var i = 0; i < a.length; i++ ) {
                c[ i ] = a[ i ] + b[ i ];
            }
        }
    } else if( typeof b === 'number' ) {
        for( var i = 0; i < a.length; i++ ) {
            c[ i ] = a[ i ] + b;
        }
    }
    return c;
};

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//String replacement
//Example of string replacement
//var bar1 = 'foobar',
//    bar2 = 'jumped',
//   bar3 = 'dog';
//
//'The lazy {} {} over the {}'.format(bar3, bar2, bar1);

String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

