import React, { createContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
var defaultValue = {
    instance: {},
    networkStatus: '',
};
export var HttpContext = createContext(defaultValue);
var HttpProvider = function (_a) {
    var children = _a.children, config = _a.config, interceptors = _a.interceptors;
    var _b = useState(navigator.onLine), isOnline = _b[0], setIsOnline = _b[1];
    var _c = useState(function () { return defaultValue.instance; }), instance = _c[0], setInstance = _c[1];
    var initialize = useCallback(function () {
        var axiosInstance = axios.create(config);
        axiosInstance.interceptors.request.use(function (reqConfig) {
            if (interceptors === null || interceptors === void 0 ? void 0 : interceptors.request)
                interceptors.request.onSuccess(reqConfig);
            return reqConfig;
        }, function (error) {
            if (interceptors === null || interceptors === void 0 ? void 0 : interceptors.request)
                interceptors.request.onError(error);
            return error;
        });
        axiosInstance.interceptors.response.use(function (response) {
            if (interceptors === null || interceptors === void 0 ? void 0 : interceptors.response)
                interceptors.response.onSuccess(response);
            return response;
        }, function (error) {
            if (interceptors === null || interceptors === void 0 ? void 0 : interceptors.response)
                interceptors.response.onError(error);
            return error;
        });
        setInstance(function () { return axiosInstance; });
    }, [config, interceptors === null || interceptors === void 0 ? void 0 : interceptors.request, interceptors === null || interceptors === void 0 ? void 0 : interceptors.response]);
    var onlineHandler = function () {
        setIsOnline(true);
    };
    var offlineHandler = function () {
        setIsOnline(false);
    };
    useEffect(function () {
        initialize();
    }, [initialize]);
    useEffect(function () {
        window.addEventListener('online', onlineHandler);
        window.addEventListener('offline', offlineHandler);
        return function () {
            window.removeEventListener('online', onlineHandler);
            window.removeEventListener('offline', offlineHandler);
        };
    }, []);
    return (React.createElement(HttpContext.Provider, { value: { instance: instance, networkStatus: isOnline ? 'online' : 'offline' } }, children));
};
export default HttpProvider;
//# sourceMappingURL=context.js.map