import * as functions from './functions.js';
import * as globalvariables from './globalvariables.js';
Object.assign(globalThis, functions, globalvariables);

document.addEventListener("DOMContentLoaded", function(){

    const confirmednewsubject = confirm_newchatroom_info(newchatroomforms);
    const confirmedexistingchatroom = confirm_existingchatroom_info(existingchatroomforms);

    // setTimeout(() => {
        // const xx = document.querySelector(".scroll2");
        // xx.scrollTo({
        //     top: xx.scrollHeight,
        //     behavior: 'smooth'
        // });
    // }, 24);




});
