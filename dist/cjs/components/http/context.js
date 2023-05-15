"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpProvider = exports.HttpContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var defaultValue = {
    instance: {},
    networkStatus: '',
};
exports.HttpContext = (0, react_1.createContext)(defaultValue);
var HttpProvider = function (_a) {
    var children = _a.children, config = _a.config, interceptors = _a.interceptors;
    var _b = (0, react_1.useState)(navigator.onLine), isOnline = _b[0], setIsOnline = _b[1];
    var _c = (0, react_1.useState)(function () { return defaultValue.instance; }), instance = _c[0], setInstance = _c[1];
    var initialize = function () {
        var axiosInstance = axios_1.default.create(config);
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
    };
    var onlineHandler = function () {
        setIsOnline(true);
    };
    var offlineHandler = function () {
        setIsOnline(false);
    };
    (0, react_1.useEffect)(function () {
        initialize();
        window.addEventListener('online', onlineHandler);
        window.addEventListener('offline', offlineHandler);
        return function () {
            window.removeEventListener('online', onlineHandler);
            window.removeEventListener('offline', offlineHandler);
        };
    }, []);
    return (react_1.default.createElement(exports.HttpContext.Provider, { value: { instance: instance, networkStatus: isOnline ? 'online' : 'offline' } }, children));
};
exports.HttpProvider = HttpProvider;
//# sourceMappingURL=context.js.map