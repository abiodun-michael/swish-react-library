"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLazyQuery = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var context_1 = require("./context");
var useLazyQuery = function (url, config) {
    var _a = (0, react_1.useState)(null), error = _a[0], setError = _a[1];
    var _b = (0, react_1.useState)({}), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useContext)(context_1.HttpContext), instance = _d.instance, networkStatus = _d.networkStatus;
    var handle = function () {
        return new Promise(function (resolve, reject) {
            setLoading(true);
            instance
                .request(tslib_1.__assign({ url: url, method: 'GET' }, config))
                .then(function (response) {
                setData(response === null || response === void 0 ? void 0 : response.data);
                if (config.onCompleted !== undefined) {
                    config === null || config === void 0 ? void 0 : config.onCompleted(data);
                }
                resolve(response === null || response === void 0 ? void 0 : response.data);
            })
                .catch(function (error) {
                setError(error);
                if (config.onError !== undefined) {
                    config === null || config === void 0 ? void 0 : config.onError(error);
                }
                reject(error);
            })
                .finally(function () {
                setLoading(false);
            });
        });
    };
    return [handle, { data: data, error: error, loading: loading, refetch: handle, networkStatus: networkStatus }];
};
exports.useLazyQuery = useLazyQuery;
//# sourceMappingURL=lazy.js.map