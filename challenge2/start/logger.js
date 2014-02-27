// TODO: expose a function called "info" which prints the date and a logging string.
exports.info = function(msg) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    console.log(new Date(), msg);
};