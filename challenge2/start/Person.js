// TODO: What do we need to do to make Underscore "requireable"?
// $ npm install underscore
var _ = require('underscore');

function Person(properties) {
    // This is how you can use underscore to extend the constructed object with some default
    // values, and then with any user-provided values.
    _.extend(this, {
        knowsKungFu:false
    }, properties);
}

// TODO: How do we expose the constructor AS the module?
// http://nodejs.org/api/modules.html#modules_module_exports
module.exports = Person;