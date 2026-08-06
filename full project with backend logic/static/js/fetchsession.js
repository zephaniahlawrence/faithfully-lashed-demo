import * as functions from './functions.js';
import * as globalvariables from './globalvariables.js';
Object.assign(globalThis, functions, globalvariables);


$(document).ready(function() {
    // fetch_session();
    display_business_status();

});


