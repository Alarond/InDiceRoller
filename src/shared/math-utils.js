// Math science
const utils = {

    // pick a random number between min and max (edges included)
    randomRoll: (min, max) => min + Math.floor(max * Math.random()),

    // get the Sum an array of numbers
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    //Get the average of an array of Numbers 
    average: arr => arr.reduce((a, b) => a + b, 0) / arr.length,

    // Get the Max value from array of numbers
    highRoll: arr => Math.max(...arr),

    // Get the Max value from array of numbers
    lowRoll: arr => Math.min(...arr),

    // get the amount of stun from the total
    stunFromBody: (body, multiplier) => body * multiplier,

    // Get the Body amount from Stun
    bodyFromStun: arr => {
        let body = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 1) {
                body = body;
            } else if (arr[i] === 6) {
                body = body + 2;
            } else {
                body = body + 1;
            }
        }
        return body;
    },
};

export default utils;