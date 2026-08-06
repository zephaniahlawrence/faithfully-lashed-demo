import * as functions from './functions.js';
import * as globalvariables from './globalvariables.js';
Object.assign(globalThis, functions, globalvariables);


$(document).ready(function() {

    fetch_session();
    // fetch('/fetchsession')
    // .then(response => response.json())

    // .then(async function(data) {
    //     if (data["ip"]) { console.log(data); }
    //     else if (data.error) { $('#error').text(data.error).show(); }
    //     else if (data["status"] == false) { return; }
    //     else if (data["status"]) {

    //         change_class_style(accountswitches, 'display', 'none');
    //         change_class_style(accountwindows, 'display', 'none');
    //         change_class_style(dashboardswitches, 'display', 'grid');
    //         // change_class_classlist(dashboardwindow, 'toggle', 'active');

    //         const dataimports = [accountname, accountmessage, membershipstatus, profileimages];
    //         import_user_data(dataimports, data);

    //         const placeholderfields = [fullnameupdate, phonenumberupdate, emailupdate, addressupdate, profileimageupdate];
    //         update_user_placeholders(placeholderfields, data);

    //         // document.getElementById('membershipstatus').innerHTML = data["notifications"][0];

    //         if (profileimage != "static/images/defaultprofilepicture.png") { change_class_style(profileimages, 'padding', '0px'); }

    //         display_user_cart(data);
    //         // fetch_updated_messages(data);

    //         if (data["admin"] === 1) {
    //             // console.log("admin");
    //             const adminbtnsections = document.querySelectorAll('.dashboard-navigation-admin');
    //             change_class_style(adminbtnsections, 'display', 'grid');

    //             globaluserdata = data;
    //             display_user_data(globaluserdata);
    //             // fetch_updated_messages(globaluserdata);

    //             // display_admin_messenger(data);
    //         }
    //     }
    //     // fetch_updated_messages(data);
    // });
});


