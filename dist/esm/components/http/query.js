import { __assign } from "tslib";
import { useContext, useEffect, useState } from 'react';
import { HttpContext } from './context';
export var useQuery = function (url, config) {
    var _a = useState(null), error = _a[0], setError = _a[1];
    var _b = useState({}), data = _b[0], setData = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useContext(HttpContext), instance = _d.instance, networkStatus = _d.networkStatus;
    var handle = function () {
        setLoading(true);
        instance
            .request(__assign({ url: url, method: 'GET' }, config))
            .then(function (response) {
            setData(response === null || response === void 0 ? void 0 : response.data);
        })
            .catch(function (error) {
            setError(error);
        })
            .finally(function () {
            setLoading(false);
        });
    };
    useEffect(function () {
        handle();
    }, []);
    return { data: data, error: error, loading: loading, refetch: handle, networkStatus: networkStatus };
};
//# sourceMappingURL=query.js.map