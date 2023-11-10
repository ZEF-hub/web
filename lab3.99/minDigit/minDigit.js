'use strict';
function minDigit(x) {
    if (x < 0)
        return -1; // only non negative x
    let min = 9;
    let len = String(x).length + 1;
    for (let i = 1; i < len; i++) {
        min = (min > (x % 10)) ? x % 10 : min; // smaller of min amd digit 
        x = Math.floor(x / 10);
    }
    return min;
}
console.log(minDigit(39475)); // 3
