'use strict';
function pow(x, n) {
    if (n <= 0)
        return -1; // only natural n
    let ans = x;
    for (let i = 1; i < n; i++)
        ans *= x;
    return ans;
}
console.log(pow(2, 8)); // 256
