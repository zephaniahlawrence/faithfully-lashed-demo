import * as globalvariables from './globalvariables.js';
Object.assign(globalThis, globalvariables);



// transition.js functions
export function close_other_elements(targetElements) {
    allElements.forEach(element => {
        if (!targetElements.includes(element)) {
            element.classList.remove('active');
        }
        if (messengerwindow.classList.contains('active')) {
            messengerswitch.classList.remove('visible');
        }
        if (!messengerwindow.classList.contains('active') && window.scrollY > 24) {
            messengerswitch.classList.add('visible');
        }
    });
    event.stopImmediatePropagation();
}



// export function newchatroom_form_event_listener(targetclass, type)


// login.js and fetchsession.js functions
export function change_class_style(targetclass, attribute, value) {
    targetclass.forEach(target => {
        target.style[attribute] = `${value}`;
    });
}
export function change_class_attribute(targetclass, attribute, value) {
    targetclass.forEach(target => {
        target[attribute] = `${value}`;
    });
}
export function change_class_classlist(targetclass, attribute, value) {
    targetclass.forEach(target => {
        target.classList[attribute](`${value}`);
    });
}






// export function update_class_messages(targetclass, attribute, value) {
//     targetclass.forEach(target => {
//         const children = Array.from(target.children);
//         console.log(`existing children: ${children}`);
//         children.forEach(child => {
//             if (child.id !== value.id) {
//                 console.log(`existing child: ${child.id}`);
//                 console.log(`new child: ${value.id}`);
//                 target.appendChild(value);
//             }
//         });

//     });
// }

// let activelist = [];

// if (!activelist.includes(String(adminchatitem.id))){
//     update_class_messages(existingchatroomforms, 'appendChild', adminchatitem);
//     activelist.push(adminchatitem.id);
//     console.log(activelist);
// }

export async function update_class_messages(targetclass, attribute, value) {
    console.log(activelist);
    console.log(`new value: ${value.id}`);
    targetclass.forEach(target => {
            if (!activelist.includes(value.id)) {
                target[attribute](value);
                activelist.push(value.id);
                console.log(activelist);
            }
    });
}




// target.replaceChildren(target.firstElementChild);
// if (!target.contains(value.dataset.chatinfo)) {
//     target[attribute](value);
// }


// export function refresh_class_messages(targetclass, attribute, value) {
//     targetclass.forEach(target => {
//         target.replaceChildren();
//         target[attribute](value)
//     });
// }


// export function create_elements(names, action, type) {
//     return names.map(name => {
//         name = undefined;
//         name = document[action](type);
//         console.log(name);
//         return name;
//     });
//     // Returns an array of created elements
// }

// export function create_elements(names, action, type) {
//     names.forEach(name => {
//         let xx = name;
//         xx = document.createElement('div');
//         console.log(xx);
//     });
// }


export function confirm_newchatroom_subject(target) {
    const targetdata = new FormData(target);
    const confirmedformdata = Object.fromEntries(targetdata);
    if (confirmedformdata !== "") {
        console.log('subject found');
        const confirmedsubject = "messengertools-newchatroom-subject";
        return confirmedformdata[confirmedsubject].trim();
    }
}




// export function enter_chatroom() {
//     $('.enterchat').on('click', function(event){
//         fetch('/room')
//         .then(response => response.json())
//         .then(async function(data) {
//             // console.log(`roomdata:${data["name"]}`)
//             if (data["error"]) {
//                 change_class_classlist(chatmessagesdisplays, 'add', 'system');
//                 change_class_attribute(chatmessagesdisplays, 'innerHTML', data["error"]);
//             }
//             // if (data["status"] == false) {

//             // }
//             else {
//                 initiatechat(data);
//             }
//         });
//         event.preventDefault();
//     });
// }


export function confirm_newchatroom_info(targetclass) {
    targetclass.forEach(target => {
        $(target).on('submit', function(event){
            console.log('form found');
            event.preventDefault();
            const confirmedsubject = confirm_newchatroom_subject(event.target);
            if (confirmedsubject !== undefined){
                $.ajax({
                    data: { newchatroomsubject: confirmedsubject },
                    type : 'POST',
                    url : '/room'
                })
                .done(async function(data) {
                    console.log(data);
                    initiatechat(data);
                    // enter_chatroom();
                })
            }
        });
    });
}

$('.endchat').on('click', function(event){
    change_class_style(chatroomdisplay, 'display', 'none');
    change_class_style(newmessageforms, 'display', 'none');
    change_class_style(existingchatroomforms, 'display', 'grid');
    change_class_style(newchatroomforms, 'display', 'grid');
});


export function initiatechat(messagedata){
    change_class_style(existingchatroomforms, 'display', 'none');
    change_class_style(newchatroomforms, 'display', 'none');
    change_class_style(chatroomdisplay, 'display', 'grid');
    change_class_style(newmessageforms, 'display', 'grid');

    console.log(messagedata);

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

        // const messagecomponentnames = ['content', 'sender', 'systemnote'];
        // const messagecomponents = create_elements(messagecomponentnames, 'createElement', 'div');
        // console.log(content);
        const content = document.createElement('div');
        const sender = document.createElement('div');
        const systemnote = document.createElement('div');
        // console.log(`test: ${status}, ${name}, ${message}`);


        const timestamp = `<span class="muted" style="border:none;">${new Date().toLocaleString()}</span>`;
        content.innerHTML = `<div class="text">${message}<br>${timestamp}</div>`;
        sender.innerHTML = `<strong>${name}</strong>`;

        systemnote.innerHTML = `<div class="text system"><b>${name} ${message}</b></div><br>`;


        if (status == false) {
            update_class_messages(chatmessagesdisplays, 'append', systemnote);
        }
        else {
            if (currentuser == name) {
                sender.classList.add('currentusername');
                content.classList.add('currentuser');
                update_class_messages(chatmessagesdisplays, 'append', sender);
                update_class_messages(chatmessagesdisplays, 'append', content);
            }
            if (currentuser != name) {
                sender.classList.add('otherusersname');
                content.classList.add('otherusers');
                update_class_messages(chatmessagesdisplays, 'append', sender);
                update_class_messages(chatmessagesdisplays, 'append', content);
            }
        }

        const scrollContainers = chatmessagesdisplays;
        scrollContainers.forEach(scrollContainer => {
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: 'smooth'
            });
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

    fetch_session();


}








export function toggle_dashboard_sections(targetwindow) {
    dashboarddisplays.forEach(dashboarddisplay => {
        if (dashboarddisplay.id != targetwindow) {
            dashboarddisplay.style.display = 'none';
        }
        else {
            dashboarddisplay.style.display = 'grid';
        }
    });
}

export function import_user_data(dataimports, userdata){
    dataimports.forEach(dataimport => {
        // console.log(dataimport);
        const datalocation = dataimport[0].dataset.databasekey;
        change_class_attribute(dataimport, 'innerHTML', userdata[`${datalocation}`]);
    });
}
export function update_user_placeholders(placeholderfields, userdata){
    placeholderfields.forEach(placeholderfield => {
        const datalocation = placeholderfield[0].dataset.databasekey;
        change_class_attribute(placeholderfield, 'placeholder', userdata[`${datalocation}`]);
    });
}


export function display_user_data(data){
    const userdata = data["userdata"];
    const listContainer = document.getElementById('userselector');
        // Object.values(userdata).forEach(user => {
        //     console.log(`user ${user.user.fullname}`);
        // });
    Object.values(userdata).forEach(user => {
        // console.log(`user ${JSON.stringify(user)}`);
        const option = document.createElement('option');
        option.textContent = user["user"]["fullname"];
        option.value = user["user"]["fullname"];
        listContainer.appendChild(option);
    });

    const listContainer2 = document.getElementById('userselector');

    const userdisplay = document.getElementById('displayuser');
    // console.log(selecteduser);
    listContainer2.addEventListener('change', function(event) {
        // const selecteduser = document.getElementById('userselector').value;
        const selecteduser = event.target.value;
        const dataindex = Object.values(userdata).findIndex(user => user.user.fullname === selecteduser);
        // console.log(dataindex);
        if (selecteduser === 'Select User'){
            userdisplay.innerHTML = '';
        }
        else{
            userdisplay.innerHTML = `
                <br>
                id: ${data["userdata"][dataindex]["user"]["id"]}<br>
                full name: ${data["userdata"][dataindex]["user"]["fullname"]}<br>
                email: ${data["userdata"][dataindex]["user"]["email"]}<br>
                phone number: ${data["userdata"][dataindex]["user"]["phonenumber"]}<br>
                address: ${data["userdata"][dataindex]["user"]["address"]}<br>
                password: ${data["userdata"][dataindex]["user"]["password"]}`;
        }
    });
}



export function display_user_cart(data){
    if (window.location.pathname.endsWith('/cart')) {
        // console.log(data);
        if (data["cart"] === "Your cart is empty.") {
            const cartdisplay = document.getElementById('cartdisplay');
            const cartmessage = document.getElementById('cartmessage');
            document.getElementById('total').innerHTML = "Total: $0";
            cartdisplay.innerHTML = "";
            cartmessage.innerHTML = data["cart"];
        }
        if (data["cart"] != "Your cart is empty.") {
            const cart = data["cart"];
            const formattedcart = cart.replaceAll("'", '"');
            const cartinfo = JSON.parse(formattedcart);
            console.log(cartinfo);

            const cartmessage = document.getElementById('cartmessage');
            cartmessage.innerHTML = "";

            const cartdisplay = document.getElementById('cartdisplay');
            document.getElementById('total').innerHTML = `Total: $${cartinfo["total"]}`;

            for (const service of cartinfo["cart"]) {
                const serviceid = document.getElementById(service["serviceid"]);
                if (cartdisplay.contains(serviceid)){
                    serviceid.innerHTML = `${service["name"]}: ${service["quantity"]} orders x $${service["price"]} - Subtotal: $${service["subtotal"]}`;
                }
                if (!cartdisplay.contains(serviceid)){
                    const div = document.createElement('div');
                    div.innerHTML = `${service["name"]}: ${service["quantity"]} orders x $${service["price"]} - Subtotal: $${service["subtotal"]}`;
                    div.id = service["serviceid"];
                    cartdisplay.appendChild(div);
                }
            }

        }
    }

}




export async function display_existing_chatrooms(data){
    const userdata = data["userdata"];
    const usermessagehistory = data["messagehistory"];


    console.log(data);

    Object.values(userdata).forEach(user => {

        console.log(user);

        const messagehistory = JSON.parse(user["user"]["messagehistory"]);
        Object.values(messagehistory).forEach(chatroom => {
            if (chatroom["roomstatus"]) {
                // console.log(chatroom["roominfo"]["roomcode"]);
                const adminchatitem = document.createElement('div');
                const xchatinfo = JSON.stringify({"userid": user["userid"], "roomcode": chatroom["roominfo"]["roomcode"]});
                const chatinfo = {"userid": user["userid"], "roomcode": chatroom["roominfo"]["roomcode"]};
                // console.log(`xchatinfo: ${xchatinfo}`);

                adminchatitem.innerHTML = `
                    <button id="${chatinfo["roomcode"]}" name="${chatinfo["roomcode"]}" class="messagerdisplay-existingchat hover3" value="${xchatinfo}" data-chatinfo='${xchatinfo}' type="submit">
                        <div class="existingchat-icon"><svg viewBox="0 0 24 24" id="Layer_1" height="42px" width="42px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><path class="cls-1" d="M18.68,8.16V15.8a2.86,2.86,0,0,1-2.86,2.86H13.91v2.86L8.18,18.66H4.36A2.86,2.86,0,0,1,1.5,15.8V8.16A2.86,2.86,0,0,1,4.36,5.3H15.82A2.86,2.86,0,0,1,18.68,8.16Z"></path><path class="cls-1" d="M18.68,14.84h1A2.86,2.86,0,0,0,22.5,12V4.34a2.86,2.86,0,0,0-2.86-2.86H8.18A2.86,2.86,0,0,0,5.32,4.34v1"></path><line class="cls-1" x1="5.32" y1="11.98" x2="7.23" y2="11.98"></line><line class="cls-1" x1="9.14" y1="11.98" x2="11.05" y2="11.98"></line><line class="cls-1" x1="12.95" y1="11.98" x2="14.86" y2="11.98"></line></g></svg></div>
                        <div class="existingchat-content">
                            <p class="existingchat-content-title"><b>Chat ID: ${chatinfo["roomcode"]}</b></p>
                            <p class="existingchat-content-subtitle">Need help booking or choosing a set?</p>
                        </div>
                    </button>
                `;
                adminchatitem.id = `${chatinfo["roomcode"]}`
                // console.log(adminchatitem);
                update_class_messages(existingchatroomforms, 'appendChild', adminchatitem);
            }
        });
    });
}

// let updated_data = undefined;
// export async function fetch_updated_messages(globaluserdata) {
//     // if (data != undefined) {
//     //     updated_data = data;
//     // }
//     display_existing_chatrooms(globaluserdata);
//     console.log("updating messages...")
//     // Wait 8 seconds before triggering the next call
//     setTimeout(fetch_updated_messages, 8000);
// }


// async function fetchRemoteDataSafely() {
//     try {
//         console.log("Fetching remote data...");
//         // Example network request
//         await fetch('/fetchsession');
//         .then(response => response.json())
//         .then(async function(data) {
//             globaluserdata = data;
//         });
//     } catch (error) {
//         console.error("Request failed:", error);
//     } finally {
//         // Schedule the next call exactly 8 seconds after this one finishes
//         setTimeout(fetchRemoteDataSafely, 8000);
//     }
// }




export function fetch_session() {
    fetch('/fetchsession')
    .then(response => response.json())

    .then(async function(data) {
        if (data["ip"]) { console.log(data); }
        else if (data.error) { $('#error').text(data.error).show(); }
        else if (data["status"] == false) { return; }
        else if (data["status"]) {

            change_class_style(accountswitches, 'display', 'none');
            change_class_style(accountwindows, 'display', 'none');
            change_class_style(dashboardswitches, 'display', 'grid');
            // change_class_classlist(dashboardwindow, 'toggle', 'active');

            const dataimports = [accountname, accountmessage, membershipstatus, profileimages];
            import_user_data(dataimports, data);

            const placeholderfields = [fullnameupdate, phonenumberupdate, emailupdate, addressupdate, profileimageupdate];
            update_user_placeholders(placeholderfields, data);

            // document.getElementById('membershipstatus').innerHTML = data["notifications"][0];

            if (profileimage != "static/images/defaultprofilepicture.png") { change_class_style(profileimages, 'padding', '0px'); }

            display_user_cart(data);
            // fetch_updated_messages(data);

            if (data["admin"] === 1) {
                // console.log("admin");
                const adminbtnsections = document.querySelectorAll('.dashboard-navigation-admin');
                change_class_style(adminbtnsections, 'display', 'grid');

                globaluserdata = data;
                display_user_data(data);
                display_existing_chatrooms(data);
                // fetch_updated_messages(globaluserdata);

                // display_admin_messenger(data);
            }
        }
        // fetch_updated_messages(data);
    });
    // console.log("updating messages...")
    // setTimeout(fetch_updated_messages, 8000);
}


















// export function display_existing_chatrooms(data){
//     const userdata = data["userdata"];
//     const usermessagehistory = data["userdata"];

//     // console.log(usermessagehistory);

//     Object.values(userdata).forEach(user => {

//         console.log(user);

//         const messagehistory = JSON.parse(user["user"]["messagehistory"]);
//         Object.values(messagehistory).forEach(chatroom => {
//             if (chatroom["roomstatus"]) {
//                 // console.log(chatroom["roominfo"]["roomcode"]);
//                 const adminchatitem = document.createElement('div');
//                 const xchatinfo = JSON.stringify({"userid": user["userid"], "roomcode": chatroom["roominfo"]["roomcode"]});
//                 const chatinfo = {"userid": user["userid"], "roomcode": chatroom["roominfo"]["roomcode"]};
//                 // console.log(`xchatinfo: ${xchatinfo}`);

//                 adminchatitem.innerHTML = `
//                     <button id="${chatroom}" name="${chatroom}" class="messagerdisplay-existingchat hover3" value="${xchatinfo}" data-chatinfo='${xchatinfo}' type="submit">
//                         <div class="existingchat-icon"><svg viewBox="0 0 24 24" id="Layer_1" height="42px" width="42px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><path class="cls-1" d="M18.68,8.16V15.8a2.86,2.86,0,0,1-2.86,2.86H13.91v2.86L8.18,18.66H4.36A2.86,2.86,0,0,1,1.5,15.8V8.16A2.86,2.86,0,0,1,4.36,5.3H15.82A2.86,2.86,0,0,1,18.68,8.16Z"></path><path class="cls-1" d="M18.68,14.84h1A2.86,2.86,0,0,0,22.5,12V4.34a2.86,2.86,0,0,0-2.86-2.86H8.18A2.86,2.86,0,0,0,5.32,4.34v1"></path><line class="cls-1" x1="5.32" y1="11.98" x2="7.23" y2="11.98"></line><line class="cls-1" x1="9.14" y1="11.98" x2="11.05" y2="11.98"></line><line class="cls-1" x1="12.95" y1="11.98" x2="14.86" y2="11.98"></line></g></svg></div>
//                         <div class="existingchat-content">
//                             <p class="existingchat-content-title"><b>Chat ID: ${chatinfo["roomcode"]}</b></p>
//                             <p class="existingchat-content-subtitle">Need help booking or choosing a set?</p>
//                         </div>
//                     </button>
//                 `;
//                 append_class_messages(existingchatroomforms, 'appendChild', adminchatitem);
//             }
//         });
//     });
// }








// export function display_admin_messenger(data){
//     const userdata = data["userdata"];
//     const adminexistingchatform = document.getElementById('admin-existing-chatform');
//     const usermessagehistory = data["userdata"];

//     // console.log(usermessagehistory);

//     Object.values(userdata).forEach(user => {

//         console.log(user);

//         const messagehistory = JSON.parse(user["user"]["messagehistory"]);
//         Object.values(messagehistory).forEach(chatroom => {
//             if (chatroom["roomstatus"]) {
//                 // console.log(chatroom["roominfo"]["roomcode"]);
//                 const adminchatitem = document.createElement('div');
//                 const xchatinfo = JSON.stringify({"userid": user["userid"], "roomcode": chatroom["roominfo"]["roomcode"]});
//                 const chatinfo = {"userid": user["userid"], "roomcode": chatroom["roominfo"]["roomcode"]};
//                 // console.log(`xchatinfo: ${xchatinfo}`);

//                 adminchatitem.innerHTML = `
//                     <button id="${chatroom}" name="${chatroom}" class="adminmessagewindowitem hover3" value="${xchatinfo}" data-chatinfo='${xchatinfo}' type="submit" style="color:pink; stroke:pink; fill: pink;">
//                         <div style="grid-area:messageitem-1; align-self:center; padding-left:4px;margin-right: 11px">
//                             <svg viewBox="0 0 24 24" id="Layer_1" height="42px" width="42px" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><path class="cls-1" d="M18.68,8.16V15.8a2.86,2.86,0,0,1-2.86,2.86H13.91v2.86L8.18,18.66H4.36A2.86,2.86,0,0,1,1.5,15.8V8.16A2.86,2.86,0,0,1,4.36,5.3H15.82A2.86,2.86,0,0,1,18.68,8.16Z"></path><path class="cls-1" d="M18.68,14.84h1A2.86,2.86,0,0,0,22.5,12V4.34a2.86,2.86,0,0,0-2.86-2.86H8.18A2.86,2.86,0,0,0,5.32,4.34v1"></path><line class="cls-1" x1="5.32" y1="11.98" x2="7.23" y2="11.98"></line><line class="cls-1" x1="9.14" y1="11.98" x2="11.05" y2="11.98"></line><line class="cls-1" x1="12.95" y1="11.98" x2="14.86" y2="11.98"></line></g></svg>
//                         </div>
//                         <div style="grid-area:messageitem-2;">
//                             <p style="justify-self:left; font-size:.94rem; margin-bottom:-9px;"><b>Chat ID: ${chatinfo["roomcode"]}</b></p>
//                             <p style="font-size:.69rem;padding-right:9px;font-family: 'Nunito'">Need help booking or choosing a set?</p>
//                         </div>
//                     </button>
//                 `;
//                 adminexistingchatform.appendChild(adminchatitem);
//             }
//         });
//     });
// }
