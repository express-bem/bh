module.exports = function (opts) {
    return {
        engines: [require('./engines/bh')(opts)]
    };
};
