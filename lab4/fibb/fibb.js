'use strict';
function fibb(n) {
    if (n < 0 || n > 1000)
        return BigInt(-1); // only non negative n <= 1000
    if (n == 0)
        return BigInt(0);
    if (n == 1)
        return BigInt(1);
    let nums = [BigInt(0), BigInt(1)];
    for (let i = 1; i < n; i++) {
        nums.push(BigInt(nums[0] + nums[1]));
        nums.shift();
    }
    return nums[1];
}
console.log(fibb(1000));
