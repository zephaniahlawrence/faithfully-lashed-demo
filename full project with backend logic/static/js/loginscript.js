import * as functions from './functions.js';
import * as globalvariables from './globalvariables.js';
Object.assign(globalThis, functions, globalvariables);


$(document).ready(function() {

    $('.loginsubmit').on('click', function(event) {
        // event.preventDefault();

        $.ajax({
            data: {
                usersignin: $('#usersignin').val(),
                passwordsignin: $('#passwordsignin').val()
            },
            type : 'POST',
            url : '/signin'
        })

        .done(async function(data) {
            // console.log(data);
            if (data.error) { change_class_attribute(signinerrors, 'innerHTML', data); }
            else if (data["status"] == false) { change_class_attribute(signinerrors, 'innerHTML', data); }
            else if (data["status"]) {
                change_class_style(accountswitches, 'display', 'none');
                change_class_style(accountwindows, 'display', 'none');
                change_class_style(dashboardswitches, 'display', 'grid');
                change_class_classlist(dashboardwindow, 'toggle', 'active');

                const dataimports = [accountname, accountmessage, membershipstatus, profileimages];
                import_user_data(dataimports, data);

                const placeholderfields = [fullnameupdate, phonenumberupdate, emailupdate, addressupdate, profileimageupdate];
                update_user_placeholders(placeholderfields, data);

                // document.getElementById('membershipstatus').innerHTML = data["notifications"][0];

                if (profileimage != "static/images/defaultprofilepicture.png") { change_class_style(profileimages, 'padding', '0px'); }

                display_user_cart(data);
                // display_existing_chatrooms(data);
                function fetch_updated_messages() {
                    display_existing_chatrooms(data);
                    console.log("updating messages...")
                    // Wait 8 seconds before triggering the next call
                    setTimeout(fetch_updated_messages, 8000);
                }
                fetch_updated_messages();


                if (data["admin"] === 1) {
                    const adminbtnsections = document.querySelectorAll('.dashboard-navigation-admin');
                    change_class_style(adminbtnsections, 'display', 'grid');

                    display_user_data(data);

                    display_admin_messenger(data);
                }
            }
            else { change_class_attribute(signinerrors, 'innerHTML', data); }
        })

        event.preventDefault();

    });

    fetch_session();

});
