//https://code.google.com/p/mathbiol/source/browse?repo=compstats
//binocdf.js   Binomial cumulative distribution function
//Dependencies: combinations.js, factorial.js
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20, updated 090824

function binocdf(x,n,p) {
   
   var sum = 0; 
   
   for (b = 0; b <= x; b++) {
   
  var tmp = combinations(n,b)*Math.pow(p,b)*Math.pow((1-p),(n-b));
   
   sum += tmp;
   }
   
  
   return sum;
}

//combinations.js Calculate the k combinations of set of length n
//Dependencies: factorial.js
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function combinations(n,k) {
  operator = factorial(n);
  denominator = factorial(k)*factorial((n-k));
  
  return (operator/denominator);
}

//cov.js Calculate the co-variance of a distribution
//Dependencies: mean.js - available at mathbiol.org
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function cov(x,y) {
    var sum     = 0;
        if(x.length!=y.length)
                {alert("sorry... x and y must have the same length for cov to work :-(");}
        else {
            var n = x.length;
                var mean_x = mean(x);
                var mean_y = mean(y);
                
                for (co = 0; co < n; co++) {
                sum += (x[co]-mean_x)*(y[co]-mean_y);
            }

                var cov_ = sum/(n-1);
                return cov_;
        }
}

//csquantiles.js requires interp1, available at http://code.google.com/p/mathbiol
//Helena F Deus (helenadeus@gmail.com), 090820


function csquantiles(x,p){
//Helena F Deus, Apr 4, 2009 ** helenadeus@gmail.com
//given a random vector x and a quantile vector p with size m, csquantiles will interpolate each value of p from x
//needs interp1

//create a vector with the quantiles of x
n=x.length;
x_quant = [];
for (var i=1; i<=n; i++) {
        x_quant.push((i-0.5)/n);
}
//now get the linear interpolation of every p from x_quant. Lookup needs to have the same size
x.sort();
x_int = [];
for (var j=0; j<p.length; j++) {
        x_int.push(interp1(x_quant,x,p[j]));
}
console.log(x_int);
return x_int;

}

//factorial.js Calculate x!
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function factorial(x) {
    var fact = 1;
        var i=1;
        while(i<=x)
        {
        fact = fact*i;
        i++;
        }
        return fact;
}

//freq.js Calculate frequency of bins of observed values
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function freq(obs) {
        //freq returns the bins and the frequency of data as a single object where freq[0] is the bins, freq[1] is the absolute frequency and freq[2] is the relative frequency
        
        var bins = [];
        var freq = {};
        for (var j = 0; j < obs.length; j++) {
                 if(!in_array(obs[j], bins))
                {array_push(bins, obs[j]);
                freq[obs[j]] = 1;
                }
                else {
                freq[obs[j]] = freq[obs[j]]+1;  
                }
                
                
        }
        var rel_freq = {};
        for (var k in freq) {
           rel_freq[k]=  freq[k]/obs.length;
        }
        
        function in_array(needle,haystack,strict)
        {
                var found=false,key,strict=!!strict;for(key in haystack){if((strict&&haystack[key]===needle)||(!strict&&haystack[key]==needle)){found=true;break;}}
                return found;
        }

        function array_push(array)
        {       
                var i,argv=arguments,argc=argv.length;for(i=1;i<argc;i++){array[array.length++]=argv[i];}
                return array.length;
        }

        return (new Array(bins, freq, rel_freq));
}

//interp1.js is part of mathbiol.org; Please see documentation there
//Helena F. Deus (helenadeus@gmail.com)
//200809

function interp1(x,y,p){
        //interp1 calculates p by linear interpolation of x and y
        //Helena F Deus, 01 Apr 2009 **helenadeus@gmail.com**
        if(x.length!=y.length)
        {
                return false;
        }
        else {
                x.sort();
                big_a=[];small_a=[];big_b=[];small_b=[];
                //start by finding the closest points
                for (var i=0; i<x.length; i++) {
                        if(x[i]>p)
                        {
                        big_a.push(x[i]);
                        big_b.push(y[i]);
                        }
                        if(x[i]<=p)
                        {
                        small_a.push(x[i]);
                        small_b.push(y[i]);
                        }
                }

                //the points of interest will be the last of small and the first of big
                a = [small_a[small_a.length-1], big_a[0]];
                b = [small_b[small_b.length-1], big_b[0]];
                q=b[0]+(p-a[0])*((b[1]-b[0])/(a[1]-a[0]));

                return q;
        }
}

//kernel_pdf.js is part of mathbiol.org; Please see documentation there
//Helena F. Deus (helenadeus@gmail.com)
//200809

function kernel_pdf(data, binF) {
        
        if(!binF) // number of bins
        {binF = 50;
        }
        var n = data.length;
        //get the data min
        var min = Math.min.apply(Math, data);
        var max = Math.max.apply(Math, data);
        //get the positions of the bins
        var x = linspace(min,max,binF);

        var h =1.06*Math.pow(n,(-1/5));
        h=Math.floor(h*10000)/10000;

        
        var fhat = new Array();
        for (var i=0; i<n; i++) {
                var f = new Array();
                for (var j=0; j<x.length; j++) {
                         
                         var tmp1 = (-1/(2*Math.pow(h,2)));
                         var tmp2 = Math.pow((x[j]-data[i]),2);
                         var tmp3 = tmp1*tmp2;
                         var tmp4 = Math.pow(Math.E, tmp3)/Math.sqrt(2*Math.PI)/h
                         
                         var tmp5 = tmp4/n;
                         if(!fhat[j]) { fhat[j] = 0};
                         fhat[j] = (fhat[j] + tmp5);
                }
                
        }
        return fhat;
}

//kurtosis.js: Calculate the kurtosis of a distribution
//Dependencies: mean.js, rth_moment.js - available at mathbiol.org
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function kurtosis(data) {
    return kur = rth_moment(data, 4)/Math.pow(rth_moment(data, 2), 2);
}

//linspace.js Generate linearly spaced vectors
//Helena F. Deus (helenadeus@gmail.com)
//200809

function linspace(d1,d2,n) {
                
        j=0;
        var L = new Array();
        
        while (j<=(n-1)) {
        
                var tmp1 = j*(d2-d1)/(Math.floor(n)-1);
                var tmp2 = Math.ceil((d1+tmp1)*10000)/10000;
                L.push(tmp2);
                j=j+1;
        }
        
        return L;
 }
 
//mean.js Calculate the mean of an array
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function mean(data) {
    sum = 0;
        for (d = 0; d < data.length; d++) {
        sum +=data[d];
    }
        avg = sum/data.length;
        return avg;
}

//normcdf.js Normal cumulative distribution function
//Dependencies: quad.js
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function normcdf(x, mu,sigma) {
    
         z=(x-mu)/sigma;
         
         //a and b are where integral calculation will start and end
         a=0;
         b=z/Math.sqrt(2);
         sum = quad('@(t)Math.pow(Math.E, -Math.pow(t,2))', a,b);

         niu = sum*2/Math.sqrt(Math.PI);
         tmp1 = niu/2+0.5;

         return tmp1;
}

//normpdf.js  Calculate the normal probability density function given x, mu and sigma 
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function normpdf(x, mu, sigma) {
     tmp1 = -Math.pow((x-mu),2)/(2*Math.pow(sigma, 2));
         tmp2 = Math.pow(Math.E, tmp1);
         tmp3 = 1/(sigma*(Math.sqrt(2*Math.PI)));
         norm = tmp3*tmp2;

         return norm;
}

//plot.js is part of mathbiol.org; Please see documentation there
//Helena F. Deus (helenadeus@gmail.com)
//200809

function plot(x,y,ctx){
        //plot(x,y,ctx) creates a plot canvas and plot x and y or a vector x against its indexes as y
        //ctx is the canvas element where plot is going to be placed
        //x and y are the vectors to plot


if(!y){
        y=[];
        for (var i in x) {
                y.push(i);
        }
}

if(x.length!=y.length){
alert("x and y must have the same length.");
}
//create the canvas
if(!ctx)
        {ctx=document.createElement('canvas');
        ctx.width='1000';
        ctx.height='800';
        ctx.setAttribute('style','position: absolute; top: 10px; left: 40px; z-index: 1');
        
        
        document.body.appendChild(ctx);
        var context = ctx.getContext('2d');
                context.fillStyle = "black";
                context.strokeRect(0,0,ctx.width,ctx.height);
        }

//create the axis
//y-axis example



yn=y.length;//this is the number of ticks for x
y_max = Math.max.apply( Math, y);
y_min = Math.min.apply( Math, y);
y_jump = (y_max-y_min)/yn;
height_jump = ctx.height/yn;
k=0;
for (var yy=y_max; yy>y_min; yy=yy-y_jump) {
        var dY = document.createElement("div");
                dY.setAttribute("style","overflow: hidden; position: absolute; top: "+(height_jump*k)+"px; left: 0px; font-size: 12px; z-index: 10; color: black; text-align: right; width: 30px;");
                dY.innerHTML = Math.round(yy*100)/100;
                document.body.appendChild(dY);
                //also draw a line for the y axis at this point
                context.beginPath();
                context.moveTo(0,(height_jump*k));
                context.lineTo(ctx.width,(height_jump*k));
                context.fillStyle = "grey";
                context.stroke();

        k++;
}


//find the x-axis max and mix
xn=x.length-1;//this is the number of ticks for x
x_max = Math.max.apply( Math, x);
x_min = Math.min.apply( Math, x);
x_jump = (x_max-x_min)/xn;
width_jump = ctx.width/xn
j=0;


for (var xx=x_min; xx<=x_max; xx=xx+x_jump) {
var dX = document.createElement("div");
        dX.setAttribute("style","overflow: hidden; position: absolute; text-align: center; width: 20px; top: "+(parseFloat(ctx.style.top)+ctx.height)+"px; left: "+(parseFloat(ctx.style.left)+width_jump*j-5)+"px; font-size: 12px; color: black;");
        dX.innerHTML = Math.round(xx*100)/100;
        document.body.appendChild(dX);
        j++;
}

//and now... finally... plot!
//and now... finally... plot!
for (var pp=0; pp<x.length; pp++) {
                var x_point = x[pp]*ctx.width/x_max;
                var y_point = ctx.width-(y[pp]*ctx.height/y_max);
                
                var radius = 2;
                var startAngle = 0;
                var endAngle = Math.PI*2;
                var clockwise = true;

                context.strokeStyle = "blue";
                context.arc(x_point,y_point,radius,startAngle,endAngle,true);
                context.stroke();
        }
}

//poisscdf.js
//Dependencies: factorial.js
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function poisscdf(x, lambda) {
    
        var sum = 0
        for (p = 0; p <= x; p++) {
         var tmp = Math.exp(-lambda)*(Math.pow(lambda,p))/this.factorial(p);

         sum += tmp;
        }       
        
        return sum;
}

//qqplot.js is part of mathbiol.js; please find documentation and examples there
//Dependencies:  csquantiles.js; interp1.js
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function qqplot(x,y,ctx) {

        if(!ctx)
                {ctx=document.createElement('canvas');
                ctx.width='400';
                ctx.height='400';
                document.body.appendChild(ctx);
                }

        if(!y){
                alert('Please input y');
        }
        else {
                var ctx2d = ctx.getContext('2d');
                m = x.length;
                n = y.length;
                
                x=x.sort();max_x=x[x.length-1];
                y=y.sort();max_y=y[y.length-1]

                
                if(m==n){
                for (var i=0; i<m; i++) {
                        var x_point = ctx.width-(x[i]*ctx.width/max_x);
                        var y_point = y[i]*ctx.height/max_y;
                        var radius = 3;
                        var startAngle = 0;
                        var endAngle = Math.PI*2;
                        var clockwise = true;

                        ctx2d.arc(x_point,y_point,radius,startAngle,endAngle,true);
                        ctx2d.stroke();
                }
                }
                else {
                        //build p with the associated quantiles using the larger one
                        if(m>n) {
                        var larger = x;
                        var smaller = y;
                        }
                        else {
                        var     larger = y;
                        var smaller = x;
                        }
                        p=[];
                        for (var l=1; l<=smaller.length; l++) {
                                  p.push((l-0.5)/smaller.length);
                        }
                        xs=csquantiles(larger,p);

                }
        }
}

//quad.js
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function quad(handle, a,b) {
     var toInt = handle.match(/@\([a-zA-Z0-9_]\)/);
         var func = handle.replace(toInt[0],'');
         agsf=toInt[0].replace('@(','').replace(')','');         //not x to avoid overlapping the value
         
         //we isolated the variable, now let's replace it in the function        
         sum = 0;
         dx = (b-a)/100000;
         var q = a;
         while (Math.abs(q) < Math.abs(b)) {
             eval(agsf+'='+q);
                 sum = sum + eval(func)*dx;
                 q=q+dx;
         }
         
         return sum;
}

//rand.js is part of mathbiol.org; Please see documentation there
//Helena F. Deus (helenadeus@gmail.com)
//200809

function rand(size) {
        var D = new Array();

        for (var i=0; i<size; i++) {
                D.push(Math.random());
        }
        return D;
}

//rht_moment.js Calculates the rth_moment
//Dependencies: mean
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function rth_moment(data, r) {
    var sum = 0;
        mean_ = mean(data);
        for (dt = 0; dt < data.length; dt++) {
             sum += Math.pow(data[dt]-mean_, r);
        }
        var S2 = sum/data.length;
        return S2;
}

//skewness.js calculate the skewness of a distribution;
//Dependencies: rth_moment, mean - available at mathbiol.org
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function skewness(data) {
   return sk = rth_moment(data, 3)/Math.pow(rth_moment(data, 2), 3/2);
}

//std.js: Calculate the standard deviation of a distribution
//Dependencies: mean.js - available at mathbiol.js
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20

function std(data) {
    var sum = 0; 
        mean_ = mean(data);
        for (dt = 0; dt < data.length; dt++) {
         sum += Math.pow((data[dt]-mean_),2);
    }

        var stdev = Math.pow(((1/(data.length-1))*sum),1/2);
        return stdev;
}

//var2.js  Variance of a distribution
//Dependencies: mean.js - available at mathbiol.org
//Helena F. Deus (helenadeus@gmail.com)
//09-08-20, updated 090824

function var2(data) {
    var sum = 0;
        mean_ = mean(data);
        for (dt = 0; dt < data.length; dt++) {
             sum += Math.pow(data[dt]-mean_, 2);
        }
        var S2 = sum/(data.length-1);
        return S2;
}

function chunk() {
//trying to upodate different chunks
var chunk = 123;
return chunk;
}

//zeros.js is part of mathbiol.org; Please see documentation there
//Helena F. Deus (helenadeus@gmail.com)
//200809

function zeros(x,y) {
        if(!y)
                y=1;

        var Z = new Array();
        for (var i=0; i<x; i++) {
                if(y>1){
                Z[i] = new Array();
                for (var j=0; j<y; j++) {
                        Z[i].push(0);
                }
                }
                else {
                        Z.push(0);
                }
        }
 return Z;
 }
