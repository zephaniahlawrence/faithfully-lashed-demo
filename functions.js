import * as globalvariables from './globalvariables.js';
Object.assign(globalThis, globalvariables);






/* make the API call */
// FB.api(
//     "/www.instagram.com/faithfullylashedstudio/?utm_source=ig_embed",
//     function (response) {
//       if (response && !response.error) {
//         /* handle the result */
//         console.log(response);
//       }
//     }
// );


    // fetch('https://www.instagram.com/faithfullylashedstudio/?utm_source=ig_embed')
    // .then(response => response.json())

    // .then(async function(data) {
    //     console.log(response);
    // })


// async function fetchInstagramData() {
//   try {
//     const response = await fetch('https://www.instagram.com/faithfullylashedstudio/?utm_source=ig_embed');
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// // }



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

export function update_class_messages(targetclass, attribute, value) {
    targetclass.forEach(target => {
        const valueClone = value.cloneNode(true);
        target[attribute](valueClone);
    });
}


export function update_class_chatrooms(targetclass, value) {
    if (!activelist.includes(value.id) && (value.id !== 'null')) {
        targetclass.forEach(target => {
            const valueClone = value.cloneNode(true);
            target.firstElementChild.after(valueClone);
        });
        activelist.push(value.id);
        console.log(activelist);
    }
}

// export function clear_class_chatroom_history(targetclass, attribute, value) {
//     targetclass.forEach(target => {
//         target.replaceChildren(target.firstElementChild);
//     });
// }



// export function display_business_status() {
//     const current_date_time = document.querySelector('.current-date-time');
//     const current_day = document.querySelector('.currentday');
//     const current_time = document.querySelector('.current-time');
//     const am_pm_status = document.querySelector('.am-pm-status');
//     const current_status = document.querySelector('.status');
//     const openhours = { "weekday": { "earliest": 8, "latest": 19 }, "weekend": { "earliest": 9, "latest": 17 }, "sunday": { "earliest": 0, "latest": 0 }, "holiday": ['1/1', '2/14', '4/5', '5/10', '5/25', '7/4', '8/10', '9/7', '10/31', '11/11', '11/26', '12/24', '12/25', '12/31'] };
//     const now = new Date();

//     let current_hours = null;
//     let current_day_int = new Date().getDay();


//     const year = now.getFullYear();     // 2026
//     const month = now.getMonth() + 1;   // 7 (July)
//     const day = now.getDate();          // 29
//     const hours = now.getHours();       // 18
//     let minutes = now.getMinutes();   // 10
//     const seconds = now.getSeconds();   // 00
//     const current_holiday = `${month}/${day}`;
//     console.log(current_holiday);

//     current_day.innerHTML = `${new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())}`;
//     if ( hours < 12 ) { am_pm_status.innerHTML = 'AM'; } if ( hours > 12 ) { am_pm_status.innerHTML = 'PM'; }
//     if ( (current_day_int > 0) && (current_day_int < 6) ) { current_hours = openhours["weekday"]; }
//     if (current_day_int === 6) { current_hours = openhours["weekend"]; } if (current_day_int === 0) { current_hours = openhours["sunday"]; }
//     if (minutes < 10) { minutes = `0${minutes}`; }
//     current_time.innerHTML = `${hours - 12}:${minutes}`;
//     current_date_time.innerHTML = `${new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())} ${hours - 12}:${minutes}${am_pm_status}`;
//     if ( (hours > current_hours['earliest']) || (hours <= current_hours['latest']) ) { current_status.innerHTML = "currently open"; current_status.style.color = 'green'; }
//     if ( (hours < current_hours['earliest']) || (hours >= current_hours['latest']) ) { current_status.innerHTML = "currently closed"; current_status.style.color = 'gray'; }
//     if ( openhours["holiday"].includes(current_holiday) ) { current_status.innerHTML = "currently closed, happy holidays!"; current_status.style.color = 'grey'; }
// }



export function display_business_status() {
    let current_date_times = document.querySelectorAll('.current-date-time');
    let current_day = document.querySelector('.currentday');
    let current_time = document.querySelector('.current-time');
    let am_pm_status = document.querySelector('.am-pm-status');
    let current_status_targets = document.querySelectorAll('.current-status');
    const openhours = { "weekday": { "earliest": 8, "latest": 19 }, "weekend": { "earliest": 9, "latest": 17 }, "sunday": { "earliest": 0, "latest": 0 }, "holiday": ['1/1', '2/14', '4/5', '5/10', '5/25', '7/4', '8/10', '9/7', '10/31', '11/11', '11/26', '12/24', '12/25', '12/31'] };
    const now = new Date();

    let current_hours = null;
    let current_day_int = new Date().getDay();

    const month = now.getMonth() + 1;   // 7 (July)
    const day = now.getDate();          // 29
    const hours = now.getHours();
    const hours_formatted = now.getHours() % 12 || 12;     // 18
    let minutes = now.getMinutes();   // 10
    const seconds = now.getSeconds();   // 00
    const current_holiday = `${month}/${day}`;

    current_day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    if (minutes < 10) { minutes = `0${minutes}`; }
    if ( hours < 12 ) { current_time = `${hours_formatted}:${minutes}`; am_pm_status = 'AM'; } if ( hours >= 12 ) { current_time = `${hours_formatted}:${minutes}`; am_pm_status = 'PM'; }
    if ( (current_day_int > 0) && (current_day_int < 6) ) { current_hours = openhours["weekday"]; }
    if (current_day_int === 6) { current_hours = openhours["weekend"]; } if (current_day_int === 0) { current_hours = openhours["sunday"]; }
    current_date_times.forEach(current_date_time => { current_date_time.innerHTML = `${current_day}, ${current_time}${am_pm_status}`; });
    current_status_targets.forEach(current_status => {
        if ( (hours > current_hours['earliest']) || (hours <= current_hours['latest']) ) { current_status.innerHTML = `Open until ${current_hours['latest'] - 12}:00PM.`; current_status.style.color = '#0BC507'; }
        if ( (hours < current_hours['earliest']) || (hours >= current_hours['latest']) ) {
            if (current_day_int === 6) { current_status.innerHTML = `Closed until Monday, ${openhours['weekday']['earliest']}:00AM.`; current_status.style.color = 'gray'; }
            else { current_status.innerHTML = `Closed until ${current_hours['earliest']}:00AM.`; current_status.style.color = 'gray'; }    
        }
        if (current_day_int === 0) { current_status.innerHTML = `Closed until Monday, ${openhours['weekday']['earliest']}:00AM.`; current_status.style.color = 'gray'; }
        if ( openhours["holiday"].includes(current_holiday) ) { current_status.innerHTML = "Currently Closed, Happy Holidays!"; current_status.style.color = 'grey'; }
    });
}



export function confirm_newchatroom_subject(target) {
    const targetdata = new FormData(target);
    const confirmedformdata = Object.fromEntries(targetdata);
    if (confirmedformdata !== "") {
        console.log('subject found');
        const confirmedsubject = "messengertools-newchatroom-subject";
        return confirmedformdata[confirmedsubject].trim();
    }
}


export function confirm_newchatroom_info(targetclass) {
    targetclass.forEach(target => {
        $(target).on('submit', function(event){
            console.log('form found');
            event.preventDefault();
            const confirmedsubject = confirm_newchatroom_subject(event.target);
            console.log(confirmedsubject);
            if (confirmedsubject !== undefined){
                $.ajax({
                    data: { newchatroomsubject: confirmedsubject },
                    type : 'POST',
                    url : '/room'
                })
                .done(async function(data) {
                    initiatechat(data);
                })
            }
        });
    });
}



export function confirm_existingchatroom_info(targetclass) {
    targetclass.forEach(target => {
        $(target).on('submit', function(event){
            console.log('chatroom found');
            event.preventDefault();
            const existingchatroom = JSON.parse(event.originalEvent.submitter.dataset.chatinfo);
            $.ajax({
                data: { existingchatroom: existingchatroom["roomcode"], existinguserid: existingchatroom["userid"] },
                type : 'POST',
                url : '/room'
            })
            .done(async function(data) {
                initiatechat(data);
            })
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


    change_class_attribute(chatroomcode, 'innerHTML', messagedata["roomcode"]);

    const currentuser = messagedata["username"];
    const messagehistory = messagedata["messagehistory"];

    const createmessage = (status, name, message) => {

        // console.log([status, name, message]);

        const content = document.createElement('div');
        const sender = document.createElement('div');
        const systemnote = document.createElement('div');


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


        for (const chatmessagesdisplay of chatmessagesdisplays) {
            const lastitem = chatmessagesdisplay.lastElementChild;
            lastitem.scrollIntoView({ behavior: 'smooth', block: 'end'});
        }
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


    const load_chatroom_history = () => {
        if (messagehistory) {
            messagehistory.forEach(msg => createmessage(msg["status"], msg["name"], msg["message"]));
        }

    };

    load_chatroom_history();


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

export async function display_user_data(data){
    if (executed) { return; }
    const userdata = data["userdata"];
    const listContainer = document.getElementById('userselector');
    // listContainer.innerHTML = '';
        // Object.values(userdata).forEach(user => {
        //     console.log(`user ${user.user.fullname}`);
        // });
    Object.values(userdata).forEach(user => {
        // console.log(`user ${JSON.stringify(user)}`);
        const option = document.createElement('option');
        option.textContent = user["user"]["fullname"];
        option.value = user["user"]["fullname"];
        // if (!listContainer.includes(option)) {
            listContainer.appendChild(option);
        // }

    });

    const listContainer2 = document.getElementById('userselector');
    // listContainer2.innerHTML = '';
    const userdisplay = document.getElementById('displayuser');
    // console.log(selecteduser);
    listContainer2.addEventListener('change', function(event) {
        console.log('change');
        // const selecteduser = document.getElementById('userselector').value;
        const selecteduser = event.target.value;
        const dataindex = Object.values(userdata).findIndex(user => user.user.fullname === selecteduser);
        // console.log(dataindex);
        if (selecteduser === 'Select User'){

            userdisplay.outerHTML = '';
        }
        else{
            userdisplay.outerHTML =
                `<table class="no-borders">
                    <tr><th>User ID<br>000${data["userdata"][dataindex]["user"]["id"]}</th></tr>
                    <tr><th>Full Name<br>${data["userdata"][dataindex]["user"]["fullname"]}</th></tr>
                    <tr><th>E-Mail<br>${data["userdata"][dataindex]["user"]["email"]}</th></tr>
                    <tr><th>Phone Number<br>${data["userdata"][dataindex]["user"]["phonenumber"]}</th></tr>
                    <tr><th>Address<br>${data["userdata"][dataindex]["user"]["address"]}</th></tr>
                    <tr><th>Password<br>${data["userdata"][dataindex]["user"]["password"]}</th></tr>
                </table>`;
        }
        // else{
        //     userdisplay.outerHTML =
        //         `<table class="no-borders">
        //             <tr><th>User ID<br>Zephaniah Lawrence</th><td>000${data["userdata"][dataindex]["user"]["id"]}</td></tr>
        //             <tr><th>Full Name</th><td>${data["userdata"][dataindex]["user"]["fullname"]}</td></tr>
        //             <tr><th>E-Mail</th><td>${data["userdata"][dataindex]["user"]["email"]}</td></tr>
        //             <tr><th>Phone Number</th><td>${data["userdata"][dataindex]["user"]["phonenumber"]}</td></tr>
        //             <tr><th>Address</th><td>${data["userdata"][dataindex]["user"]["address"]}</td></tr>
        //             <tr><th>Password</th><td>${data["userdata"][dataindex]["user"]["password"]}</td></tr>
        //         </table>`;
        // }
        // else{
        //     userdisplay.innerHTML = `
        //         <br>
        //         id: ${data["userdata"][dataindex]["user"]["id"]}<br>
        //         full name: ${data["userdata"][dataindex]["user"]["fullname"]}<br>
        //         email: ${data["userdata"][dataindex]["user"]["email"]}<br>
        //         phone number: ${data["userdata"][dataindex]["user"]["phonenumber"]}<br>
        //         address: ${data["userdata"][dataindex]["user"]["address"]}<br>
        //         password: ${data["userdata"][dataindex]["user"]["password"]}`;
        // }


        // else{
        //     userdisplay.outerHTML =
        //                 `<table style="min-width:1000px;">
        //                    <thead>
        //                         <tr>
        //                             <th>User ID</th>
        //                             <th>Full Name</th>
        //                             <th>E-Mail</th>
        //                             <th>Phone Number</th>
        //                             <th>Address</th>
        //                             <th>Password<th>
        //                         <tr>
        //                    </thead>
        //                     <tbody>
        //                         <tr>
        //                             <td>${data["userdata"][dataindex]["user"]["id"]}</td>
        //                             <td>${data["userdata"][dataindex]["user"]["fullname"]}</td>
        //                             <td>${data["userdata"][dataindex]["user"]["email"]}</td>
        //                             <td>${data["userdata"][dataindex]["user"]["phonenumber"]}</td>
        //                             <td>${data["userdata"][dataindex]["user"]["address"]}</td>
        //                             <td>${data["userdata"][dataindex]["user"]["password"]}</td>
        //                         </tr>
        //                     </tbody>

        //                 </table>`;
        // }
    });
    executed = true;
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




export function display_existing_chatrooms(data){
    const userdata = data["userdata"];
    const usermessagehistory = data["messagehistory"];


    // console.log(data);

    Object.values(userdata).forEach(user => {

        // console.log(user);

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
                adminchatitem.id = `${chatinfo["roomcode"]}`;

                update_class_chatrooms(existingchatroomforms, adminchatitem);
            }
        });
    });
}




export async function fetch_session() {
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
            }
        }

    });
    console.log("updating messages...")
    // setTimeout(display_existing_chatrooms, 8000);
    setTimeout(fetch_session, 8000);
}


