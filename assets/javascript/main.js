var config = {
    apiKey: "AIzaSyDQxk5tTespE1fyPN3Ad07_VOlg3KvlD54",
    authDomain: "gt2018-train-app.firebaseapp.com",
    databaseURL: "https://gt2018-train-app.firebaseio.com",
    projectId: "gt2018-train-app",
    storageBucket: "gt2018-train-app.appspot.com",
    messagingSenderId: "437912929180"
};
firebase.initializeApp(config);


var database = firebase.database();
var currentTime = moment();


$("#submit-train").on("click", function(){
    event.preventDefault();
    var $trainName = $("#train-name-input").val().trim();
    var $destination = $("#destination-input").val().trim();
    var $firstTrainTime = $("#first-train-input").val().trim();
    var $frequency = $("#frequency-input").val().trim();
    var firstTrainTimeConverted = moment($firstTrainTime, "HH:mm").subtract("1, years");
    var difference = currentTime.diff(moment(firstTrainTimeConverted), "minutes");
    var remainder = difference % $frequency;
    var minutesAway = $frequency - remainder;
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");



    database.ref().push({
        trainName: $trainName,
        destination: $destination,
        firstTrainTime: $firstTrainTime,
        frequency: $frequency,
        minutesAway: minutesAway,
        nextArrival: nextArrival
    });


});

database.ref().on("child_added", function(childSnap){

    var $tabledata = $("#table-data");
    var $tr = $("<tr>");


    $tabledata.append($tr);
    $tr.append("<td>" + childSnap.val().trainName + "</td>");
    $tr.append("<td>" + childSnap.val().destination + "</td>");
    $tr.append("<td>" + childSnap.val().frequency + "</td>");
    $tr.append("<td>" + childSnap.val().minutesAway + "</td>");
    $tr.append("<td>" + childSnap.val().nextArrival + "</td>");

});