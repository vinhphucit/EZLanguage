"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizePath = exports.switchNull = void 0;
function switchNull(val1, val2) {
    return val1 ? val1 : val2;
}
exports.switchNull = switchNull;
function standardizePath(val) {
    if (!val)
        return ``;
    if (!val.startsWith(`/`))
        val = `/${val}`;
    if (val.endsWith(`/`))
        val = val.substring(0, val.length - 1);
    return val;
}
exports.standardizePath = standardizePath;
//# sourceMappingURL=StringUtils.js.map