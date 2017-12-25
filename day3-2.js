"use strict";
// circular storage
/**
 *
 * @type {number}
 *
 * 37  36  35  34  33  32  31
 * 38  17  16  15  14  13  30
 * 39  18   5   4   3  12  29
 * 40  19   6   1   2  11  28
 * 41  20   7   8   9  10  27
 * 42  21  22  23  24  25  26
 * 43  44  45  46  47  48  49 50
 */
/**
 * adding
 * 1=1
 * 2=[1]
 * 3=[1]+[2]
 * 4=[1]+[2]+[3]
 * 5=[1]+[4]
 * 6=[1]+[4]+[5]
 * 7=[1]+[6]
 * 8=[1]+[6]+[7]
 * 9=[1]+[2]+[8]
 * 10=[2]+[9]
 * 11=[2]+[3]+[9]+[10]
 * 12=[2]+[3]+[11]
 * 13=[3]+[12]
 * 14=[3]+[4]+[12]+[13]
 */
/**
 * Ring 0: 0 < input_val <= 1^2
 *  n = 0, base_lo=-1 = 2*n-1, base_hi=1 = base_lo+2
 *  range_lo = base_lo^2, range_hi = base_hi^2
 * start > 0^2 stop: 1^2
 * span = 1 = stop-start, mini-span = span / 4 = 1?? -- singularity
 * dist_min = 0
 * dist_max = 0
 *
 * 1 - 0
 */

/**
 * Ring 1: 1^2 < input_val <= 3^2
 *  n = 1, base_lo=1 = 2*n-1, base_hi=3 = base_lo+2
 *  range_lo = base_lo^2, range_hi = base_hi^2
 *  span=8 = 4 * (2*n), mini-span=2 = 2*n
 *  dist_min = 1 = n
 *  dist_max = 2 = 2*n
 *  walk = dist_max-1...dist_min...dist_max = 1,2
 *--------
 * 2 - 1
 * 3 - 2
 *
 * 4 - 1
 * 5 - 2
 *
 * 6 - 1
 * 7 - 2
 *
 * 8 - 1
 * 9 - 2
 */

/**
 * Ring 2: 3^2 < input_val <= 5^2
 *  n = 2, base_lo=3 = 2*n-1, base_hi=5 = base_lo+2
 *  range_lo=9 = base_lo^2, range_hi=25 = base_hi^2
 *  span=16 = 4 * (2*n), mini-span=4 = 2*n
 *  dist_min = 2 = n
 *  dist_max = 4 = 2*n
 *  walk = dist_max-1...dist_min...dist_max = 3,2,3,4
 *--------
 * 10 - 3
 * 11 - 2
 * 12 - 3
 * 13 - 4
 *
 * 14 - 3
 * 15 - 2
 * 16 - 3
 * 17 - 4
 *
 * 18 - 3
 * 19 - 2
 * 20 - 3
 * 21 - 4
 *
 * 22 - 3
 * 23 - 2
 * 24 - 3
 * 25 - 4
 */

/**
 * Ring 3: 5^2 < input_val <= 7^2
 *  n = 3, base_lo=5 = 2*n-1, base_hi=7 = base_lo+2
 *  range_lo=25 = base_lo^2, range_hi=49 = base_hi^2
 *  span = 24 = 4*6 = 4 * (2*n), mini-span = 6 = 2*n
 *  dist_min = 3 = n
 *  dist_max = 6 = 2*n
 *  walk = dist_max-1...dist_min...dist_max = 5,4,3,4,5,6
 *--------
 * 26 - 5
 * 27 - 4
 * 28 - 3
 * 29 - 4
 * 30 - 5
 * 31 - 6
 *
 * 32 - 5
 * 33 - 4
 * 34 - 3
 * 35 - 4
 * 36 - 5
 * 37 - 6
 *
 * 38 - 5
 * 39 - 4
 * 40 - 3
 * 41 - 4
 * 42 - 5
 * 43 - 6
 *
 * 44 - 5
 * 45 - 4
 * 46 - 3
 * 47 - 4
 * 48 - 5
 * 49 - 6
 */

/**
 * Ring 4: 7^2 < input_val <= 9^2
 *  n = 4, base_lo=7 = 2*n-1, base_hi=9 = base_lo+2
 *  range_lo=49 = base_lo^2, range_hi=81 = base_hi^2
 *  span = 32 = 4*8 = 4 * (2*n), mini-span = 8 = 2*n
 *  dist_min = 4 = n
 *  dist_max = 8 = 2*n
 *  walk = dist_max-1...dist_min...dist_max = 7,6,5,4,5,6,7,8
 *
 * 50 - 7,
 *
 */

/**
 * Ring 5: 9^2 < input_val <= 11^2
 *  n = 5, base_lo=9 = 2*n-1, base_hi=11 = base_lo+2
 *  range_lo=81 = base_lo^2, range_hi=121 = base_hi^2
 *  span = 40 = 4*10 = 4 * (2*n), mini-span = 10 = 2*n
 *  dist_min = 5 = n
 *  dist_max = 10 = 2*n
 *  walk = dist_max-1...dist_min...dist_max = 9,8,7,6,5,6,7,8,9,10
 *                                    index = 1,2,3,4,5,6,7,8,9,10
 *                                                    ^         ^
 */

/**
 * rule:
 *  find range_min:ramge_max == the odd squares that the input value sits between (eg. 3^2 to 5^2) == 3,5
 *     range_min = sqrt(input_val)
 *     range_max = 2 + range_min
 *  determine the min & max distance value for that range
 *     dist_min = ceiling(odd_square / 2)
 *     dist_max = 2 * min
 *  determine index of input value from bottom odd square
 *     index = input_val - range_min
 *  determine distance as a function of index
 *
 */

// let inRange(input_val, n) {
//
// }

let findDistance = function(input_val) {
    let n = 1;
    let base_lo=0, base_hi=0;   // 3 & 5
    let range_lo=0, range_hi=0; // 9 & 25

    let mini_span=0, span=0;    // 4 & 16
    let dist_min=0, dist_max=0; // 2 & 4


    while(n) {
        // console.log("n: "+n);

        base_lo = 2*n -1; base_hi = base_lo+2;
        // console.log("base_lo: "+base_lo+"  base_hi:"+base_hi);

        range_lo = base_lo*base_lo; range_hi=base_hi*base_hi;
        // console.log("range_lo: "+range_lo+"  range_hi:"+range_hi);

        mini_span = 2*n; span = 4*mini_span;
        dist_min=n; dist_max=2*n;

        if (input_val > range_lo && input_val <= range_hi) {
            // let index = (input_val - range_lo) / 4;
            let index = (input_val - range_lo) % mini_span;
            // console.log("index: "+index);

            return (index < dist_min) ? dist_max-index : index ;
        }
        n++;
    }
};

// let input = 15; //368078
// for (let val=2; val < 100; val++ ) {
//     // console.log("input: " + input);
//     let distance = findDistance(val);
//     console.log("val: " + val+", distance: " + distance);
// }

let input = 368078; //368078
let distance = findDistance(input);
console.log("input: " + input+", distance: " + distance);
