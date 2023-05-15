import { useLazyQuery } from '../http';
import React from 'react';
var Index = function () {
    var handle = useLazyQuery("/users", {})[0];
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { onClick: handle }, "Click")));
};
export default Index;
//# sourceMappingURL=index.js.map