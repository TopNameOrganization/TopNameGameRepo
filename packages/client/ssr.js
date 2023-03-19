"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const App_1 = __importDefault(require("./src/App"));
const server_1 = require("react-dom/server");
const server_2 = require("react-router-dom/server");
const create_instance_1 = __importDefault(require("@emotion/server/create-instance"));
const react_1 = require("@emotion/react");
const cache_1 = __importDefault(require("@emotion/cache"));
const material_1 = require("@mui/material");
function render(url = '/') {
    const cache = (0, cache_1.default)({ key: 'css' });
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = (0, create_instance_1.default)(cache);
    const theme = (0, material_1.createTheme)();
    const html = (0, server_1.renderToString)(<react_1.CacheProvider value={cache}>
      <react_1.ThemeProvider theme={theme}>
      <server_2.StaticRouter location={url}>
        <App_1.default />
      </server_2.StaticRouter>
      </react_1.ThemeProvider>
    </react_1.CacheProvider>);
    const emotionChunks = extractCriticalToChunks(html);
    const muiCss = constructStyleTagsFromChunks(emotionChunks);
    return {
        html,
        muiCss,
    };
}
exports.render = render;
//# sourceMappingURL=ssr.js.map