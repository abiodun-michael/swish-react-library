"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutation = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var context_1 = require("./context");
var useMutation = function (url, config) {
    var _a = (0, react_1.useState)(null), error = _a[0], setError = _a[1];
    var _b = (0, react_1.useState)({}), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useContext)(context_1.HttpContext), instance = _d.instance, networkStatus = _d.networkStatus;
    var handle = function (datas) {
        return new Promise(function (resolve, reject) {
            setLoading(true);
            var conf = tslib_1.__assign(tslib_1.__assign({}, config), { data: datas || (config === null || config === void 0 ? void 0 : config.variables) });
            instance
                .request(tslib_1.__assign({ url: url, method: 'POST' }, conf))
                .then(function (_a) {
                var data = _a.data;
                if ((config === null || config === void 0 ? void 0 : config.onCompleted) !== undefined) {
                    config === null || config === void 0 ? void 0 : config.onCompleted(data);
                }
                resolve(data);
                setData(data);
            })
                .catch(function (error) {
                reject(error);
                if ((config === null || config === void 0 ? void 0 : config.onError) !== undefined) {
                    config === null || config === void 0 ? void 0 : config.onError(error);
                }
                setError(error);
            })
                .finally(function () {
                setLoading(false);
            });
        });
    };
    return [handle, { data: data, error: error, loading: loading, networkStatus: networkStatus }];
};
exports.useMutation = useMutation;
//# sourceMappingURL=mutation.js.map