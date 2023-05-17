import { __assign } from "tslib";
import { useContext, useState } from 'react';
import { HttpContext } from './context';
export var useMutation = function (url, config) {
    var _a = useState(null), error = _a[0], setError = _a[1];
    var _b = useState({}), data = _b[0], setData = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useContext(HttpContext), instance = _d.instance, networkStatus = _d.networkStatus;
    var handle = function (datas) {
        return new Promise(function (resolve, reject) {
            setLoading(true);
            var conf = __assign(__assign({}, config), { data: datas || (config === null || config === void 0 ? void 0 : config.variables) });
            instance
                .request(__assign({ url: url, method: 'POST' }, conf))
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
//# sourceMappingURL=mutation.js.map