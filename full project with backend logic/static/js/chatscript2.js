import * as globalvariables from './globalvariables.js';
Object.assign(globalThis, globalvariables);

document.addEventListener("DOMContentLoaded", function(){

    // newchatroomforms.forEach(newchatroomform => {
    //     $(newchatroomform).on('submit', function(event){
    //         event.preventDefault();
    //         newchatroomsubjects.forEach(newchatroomsubject => {
    //             $.ajax({
    //                 data: { newchatroomsubject: $(newchatroomsubject).val() },
    //                 type : 'POST',
    //                 url : '/room'
    //             })
    //             .done(async function(data) {
    //                 // console.log(data);
    //                 initiatechat(data);
    //             })
    //         });
    //         event.preventDefault();
    //     });
    // });

    // for (const newchatroomform of newchatroomforms) {
    //     if (newchatroomform != "") { const confirmednewchatroomform = newchatroomform; }
    // }
    // for (const newchatroomsubject of newchatroomsubjects) {
    //     if (newchatroomsubject != undefined) { const confirmednewchatroomsubject = newchatroomsubject; }
    // }

    const confirmednewform = confirm_newchatroom_info(newchatroomforms);
    const confirmednewsubject = confirm_newchatroom_info(newchatroomsubjects);

    $(confirmednewform).on('submit', function(event){
        console.log("form found");
        event.preventDefault();
            console.log("subject found");
            $.ajax({
                data: { newchatroomsubject: $(confirmednewsubject).val() },
                type : 'POST',
                url : '/room'
            })
            .done(async function(data) {
                console.log(data);
                initiatechat(data);
            })
    });

    existingchatroomforms.forEach(existingchatroomform => {
    $(existingchatroomform).on('submit', function(event){
        event.preventDefault();
        existingchatrooms.forEach(existingchatroom => {
            $.ajax({
                data: { existingchatroom: $(existingchatroom).val() },
                type : 'POST',
                url : '/room'
            })
            .done(async function(data) {
                // console.log(data);
                initiatechat(data);
            })
        });
    });

    // existingchatrooms.forEach(existingchatroom => {
    //     $(existingchatroom).on('click', function(event){

    //         fetch('/room')
    //         .then(response => response.json())
    //         .then(async function(data) {
    //             // console.log(`roomdata:${data["name"]}`)
    //             if (data["error"]) {
    //                 chatmessagesdisplays.forEach(chatmessagesdisplay => {
    //                 const messages = document.getElementById("messages");
    //                 messages.classList.add('system');
    //                 messages.innerHTML = data["error"];
    //                 });
    //             }
    //             else {
    //                 initiatechat(data);
    //             }
    //         });
    //         event.preventDefault();
    //     });
    // });



    // $('#endchat').on('click', function(event){
    //     enterchat.style.display = 'grid';
    //     chatdisplay.style.display = 'none';
    // });






    function initiatechat(messagedata){
        change_class_style(existingchatroomforms, 'display', 'none');
        change_class_style(newchatroomforms, 'display', 'none');
        change_class_style(chatroomdisplay, 'display', 'grid');
        change_class_style(newmessageforms, 'display', 'inline-block');

        var socketio = io();

        newmessageforms.forEach(newmessageform => {
            $(newmessageform).on('submit', function(event){
                event.preventDefault();
                sendmessage();
            });
        });

        // console.log(`existing chat: ${messagedata["username"]}`);
        // console.log(`existing chat: ${messagedata["message"]}`);
        // console.log(`complete data: ${messagedata["roomcode"]}`);
        // console.log(`complete data: ${messagedata["messagehistory"]}`);

        change_class_attribute(chatroomcode, 'innerHTML', messagedata["roomcode"]);

        const currentuser = messagedata["username"];
        const messagehistory = messagedata["messagehistory"];

        const createmessage = (status, name, message) => {

            const messagecomponents = ['content', 'sender', 'systemnote'];
            create_elements(messagecomponents, 'createElement', 'div');

            // console.log(`test: ${status}, ${name}, ${message}`);


            const timestamp = `<span class="muted" style="border:none;">${new Date().toLocaleString()}</span>`;
            content.innerHTML = `<div class="text">${message}<br>${timestamp}</div>`;
            sender.innerHTML = `<strong>${name}</strong>`;

            systemnote.innerHTML = `<div class="text"><b>${name}<b> ${message}</div>`;

            if (status == false) {
                systemnote.classList.add('system');
                append_class_messages(chatmessagesdisplays, 'append', systemnote);
            }
            else {
                if (currentuser == name) {
                    sender.classList.add('currentusername');
                    content.classList.add('currentuser');
                    append_class_messages(chatmessagesdisplays, 'append', sender);
                    append_class_messages(chatmessagesdisplays, 'append', content);
                }
                if (currentuser != name) {
                    sender.classList.add('otherusersname');
                    content.classList.add('otherusers');
                    append_class_messages(chatmessagesdisplays, 'append', sender);
                    append_class_messages(chatmessagesdisplays, 'append', content);
                }
            }

            const scrollContainer = document.getElementById('messages');
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: 'smooth'
            });
        };

        socketio.on("message", (data) => {
            createmessage(data["status"], data["name"], data["message"]);
        });

        const sendmessage = () => {
            newmessageinputs.forEach(newmessageinput => {
                if (newmessageinput.value == "") return;
                socketio.emit("newmessage", {message: newmessageinput.value})
                newmessageinput.value = "";
            });
        };




        if (adminmessagehistory) {
            messagehistory.forEach(msg => admincreatemessage(msg["status"], msg["name"], msg["message"]));
        };

    }



});
