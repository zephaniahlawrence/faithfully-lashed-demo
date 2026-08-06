import * as functions from './functions.js';
import * as globalvariables from './globalvariables.js';
Object.assign(globalThis, functions, globalvariables);

document.addEventListener('DOMContentLoaded', function(){


    // reveal on scroll
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, {threshold: 0.12});
        reveals.forEach(function(r){ obs.observe(r); });
    } else {
        // fallback
        reveals.forEach(function(r){ r.classList.add('in-view'); });
    };


    document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const revealElements = document.querySelectorAll('.grow-on-scroll');

        revealElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + scrollPosition;
            const distance = Math.abs(scrollPosition - elementPosition);
            const scale = 1 + Math.min(distance / 500, 0.2); // Adjust the divisor for sensitivity

            element.style.transform = `scale(${scale})`;
            });
    });


    window.addEventListener('scroll', () => {
        const bannerimage = document.querySelector('.bannerimage').getBoundingClientRect();
        if (window.scrollY > 24) {
            header.classList.add('scrolled');
            if (!messengerwindow.classList.contains('active')) {
                messengerswitch.classList.add('visible');
            }
            if (window.scrollY > bannerimage.height) {
                headerpadding.classList.add('scrolled');
            }
            else {
                headerpadding.classList.remove('scrolled');
            }
        }
        else {
            header.classList.remove('scrolled');
            messengerswitch.classList.remove('visible');
        }
    });

    const toolscartbtn = document.querySelector(".tools-cartbtn");
    const toolscartdisplay = document.querySelector(".tools-cart-display");
    let hovertimer;
    const delay = 2400;

    [toolscartbtn, toolscartdisplay].forEach(target => {
        target.addEventListener("mouseenter", () => {
            // setTimeout(() => {
                close_other_elements([toolscartdisplay, messengerswitch]);
                clearTimeout(hovertimer);
                toolscartdisplay.classList.add('active');
            // }, 200);
        });
        target.addEventListener("mouseleave", () => {
            hovertimer = setTimeout(() => {
                toolscartdisplay.classList.remove('active');
            }, delay);
        });
    });




    document.addEventListener('click', function(event) {
        const messengerWindowParent = event.target.closest('.messengerwindow');
        const searchWindowParent = event.target.closest('.searchwindow');
        const dashboardWindowParent = event.target.closest('.dashboardwindow');
        close_other_elements([event.currentTarget, dashboardWindowParent, searchWindowParent, messengerWindowParent, messengerswitch]);
    });

    morebtn.addEventListener('click', function(event) {
        close_other_elements([morebtn, moremenu, arrow]);
        [morebtn, moremenu, arrow].forEach(target => {
            target.classList.toggle('active');
        });
    });

    dropdownbtn.addEventListener('click', function(event) {
        close_other_elements([dropdownbtn, dropdownmenu, svgrotate]);
        [dropdownbtn, dropdownmenu, svgrotate].forEach(target => {
            target.classList.toggle('active');
        });
    });

    accountswitches.forEach (accountswitch => {
        accountswitch.addEventListener('click', function(event) {
            close_other_elements([]);
            // close_other_elements([accountwindow]);
            // accountwindow.classList.toggle('active');
        });
    });

    dashboardswitches.forEach (dashboardswitch => {
        dashboardswitch.addEventListener('click', function(event) {

            dashboardwindows.forEach (dashboardwindow => {
                close_other_elements([dashboardwindow]);
                dashboardwindow.classList.toggle('active');

            });
            // blurredbackdrop.classList.toggle('active');
        });
    });


    dashboardnavigationsections.forEach(dashboardnavigationsection => {
        $(dashboardnavigationsection).on('click', function(event) {
            const targetwindow = event.currentTarget.dataset.window;
            // console.log(targetwindow);
            toggle_dashboard_sections(targetwindow);
        });
    });

    searchswitches.forEach (searchswitch => {
        searchswitch.addEventListener('click', function(event) {
            close_other_elements([searchwindow]);
            searchwindow.classList.toggle('active');
        });
    });

    messengerswitch.addEventListener('click', function(event) {
        close_other_elements([messengerwindow]);
        messengerwindow.classList.toggle('active');
        messengerswitch.classList.toggle('visible');
    });


    messengerwindowclosebutton.addEventListener('click', function(event) {
        messengerwindow.classList.toggle('active');
        messengerswitch.classList.toggle('visible');
    });

    registerbtn.addEventListener('click', function(event) {
        signincontainer.style.display = 'none';
        registercontainer.style.display = 'block';
    });
    loginbtn.addEventListener('click', function(event) {
        signincontainer.style.display = 'block';
        registercontainer.style.display = 'none';
    });
    forgotpasswordbtn.addEventListener('click', function(event) {
        forgotpasswordcontainer.style.display = 'inline-block';
        signincontainer.style.display = 'none';
        registercontainer.style.display = 'none';
    });
    forgotpasswordreturnbtn.addEventListener('click', function(event) {
        forgotpasswordcontainer.style.display = 'none';
        signincontainer.style.display = 'block';
        registercontainer.style.display = 'none';
    });


    // loginsubmitbtns.forEach (loginsubmitbtn => {
    //     loginsubmitbtn.addEventListener('click', function(event) {
    //         close_other_elements([]);
    //         // close_other_elements([accountwindow]);
    //         // accountwindow.classList.toggle('active');
    //     });
    // });

});
