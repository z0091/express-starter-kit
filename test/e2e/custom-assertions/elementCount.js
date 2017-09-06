// A custom Nightwatch assertion.
// the name of the method is the filename.
// can be used in tests like this:
//
//   browser.assert.elementCount(selector, count)
//
// for how to write custom assertions see
// http://nightwatchjs.org/guide#writing-custom-assertions

// eslint-disable-next-line func-names
exports.assertion = function (selector, count) {
    this.message = `Testing if element <${selector}> has count: ${count}`;
    this.expected = count;
    this.pass = val => val === this.expected;
    this.value = res => res.value;
    this.command = (cb) => {
        const self = this;
        return this.api.execute(_selector => document.querySelectorAll(_selector).length, [selector], (res) => {
            cb.call(self, res);
        });
    };
};
