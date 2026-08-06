import * as functions from './functions.js';
import * as globalvariables from './globalvariables.js';
Object.assign(globalThis, functions, globalvariables);


$(document).ready(function() {
    const reservation_date_input = document.querySelector('.reservation_date_input');
    const reservation_time_input = document.querySelector('.reservation_time_input');

    // $.ajax({
    //     data: { reservation_date_input: reservation_date_input, reservation_time_input: reservation_time_input },
    //     method: 'post',
    //     url: '/reservation_availability'
    // })
    // .done(async function(data) {
    //     existing_reservations = []
    //     if (data) {
    //         const reservations = data;
    //         reservations.forEach(reservation => {
    //             reservation = {
    //                 "reservation_id": reservation["reservation_id"],
    //                 "reservation_customer_id": reservation["reservation_customer_id"],
    //                 "reservation_service": reservation["reservation_service"],
    //                 "reservation_datetime": reservation["reservation_datetime"],
    //                 "reservation_duration": reservation["reservation_duration"],
    //                 "reservation_price": reservation["reservation_price"],
    //                 "reservation_discount": reservation["reservation_discount"],
    //                 "reservation_note": reservation["reservation_note"],
    //                 "reserved_at": reservation["reserved_at"]
    //             }
    //             existing_reservations.push(reservation["reservation_datetime"])
    //         });


    //         [reservation_date_input, reservation_time_input].forEach(input => {
    //             input.addEventListener('change', function(event) {
    //                 console.log(event.target.value);
    //                 const fullReservation = `${reservation_date_input.value} ${reservation_time_input.value}`;
    //                 if (existing_reservations.includes(fullReservation)) {
    //                     alert("This specific reservation time is unavailable. Please select another.");
    //                     e.target.value = ""; // Clear the invalid selection
    //                 }
    //             });

    //         });
    //     }
    //     else {

    //     }

    // })

//   console.log(scheduled_reservation_time);
//                 console.log(scheduled_reservation_completion_time);
    fetch('/reservation_availability')
    .then(response => response.json())
    .then(async function(data) {




    // Convert and format to Central Time
    const options = {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
    };

    // const centralTimeStr = date.toLocaleString('en-US', options);
    // console.log(centralTimeStr); // "11/20/2026, 12:00:00 PM"












        console.log(data);
            const reservations = data;
            reservations.forEach(reservation => {
                const unavailable_reservation_times = [];
                const scheduled_reservation_time = new Date(reservation['reservation_datetime']);
                console.log(scheduled_reservation_time);
                // A sample UTC timestamp (ISO 8601 string)
                const utcString = scheduled_reservation_time;
                const date = new Date(utcString);
                const scheduled_reservation_duration = reservation['reservation_duration'] * 60;
                const scheduled_reservation_completion_time = new Date(scheduled_reservation_time);

                scheduled_reservation_completion_time.setMinutes(scheduled_reservation_time.getMinutes() + scheduled_reservation_duration);
                unavailable_reservation_times.push({ from: scheduled_reservation_time, to: scheduled_reservation_completion_time });

                console.log(scheduled_reservation_completion_time);

                    const centralTimeStr = date.toLocaleString('en-US', options);
                    console.log(centralTimeStr); // "11/20/2026, 12:00:00 PM"

                let configuration = {
                    // wrap: true,
                    dateFormat: "Y-m-d H:i//K",
                    // enableTime: true,
                    // time_24hr: true,
                    // inline: true,
                    // minTime: "08:00",
                    // maxTime: "17:00",
                    // minuteIncrement: 30,
                    minDate: "today",
                    maxDate: new Date().fp_incr(14),
                    "plugins": [new confirmDatePlugin({
                        confirmIcon: "<i class='fa fa-check'></i>", // your icon's html, if you wish to override
                        confirmText: "CONFIRM",
                        showAlways: true,
                        theme: "light"
                    })],
                    "disable": [
                        function(date) {
                            // return true to disable
                            return (date.getDay() === 0 || date.getDay() === 6);
                        }
                    ],
                    "locale": { "firstDayOfWeek": 1 // start week on Monday
                    }
                };

                console.log('24');
                flatpickr(".reservation_datetime_input", configuration);

                                        // flatpickr(".reservation_datetime_input", {
                                        //     dateFormat: "Y-m-d H:i",
                                        //     enableTime: true,
                                        //     time_24hr: true,
                                        //     minTime: "08:00",
                                        //     maxTime: "17:00"
                                        //     minDate: "today",
                                        //     maxDate: new Date().fp_incr(14),
                                        //     disable: unavailable_reservation_times,
                                        //     "disable": [
                                        //         function(date) {
                                        //             // return true to disable
                                        //             return (date.getDay() === 0 || date.getDay() === 6);
                                        //         }
                                        //     ],
                                        //     "locale": { "firstDayOfWeek": 1 // start week on Monday
                                        //     }
                                        // })

            });


    })

});
