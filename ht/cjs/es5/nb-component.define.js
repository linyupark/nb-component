"use strict";
// NbComponent: Custom Elements Define Library, ES Module/es5 Target
Object.defineProperty(exports, "__esModule", { value: true });
var nb_component_core_js_1 = require("./nb-component.core.js");
var nb_component_components_js_1 = require("./nb-component.components.js");
function defineCustomElements(win, opts) {
    return nb_component_core_js_1.defineCustomElement(win, nb_component_components_js_1.COMPONENTS, opts);
}
exports.defineCustomElements = defineCustomElements;
