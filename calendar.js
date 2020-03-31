function submitForm() {
  let summary = document.getElementById("summary").value;
  if (!summary) {
    alert("The summary field is required");
    return;
  }

  let location = document.getElementById("location").value;
  if (!location) {
    alert("The location field is required");
    return;
  }

  let fname = document.getElementById("fname").value;
  if (!fname) {
    alert("The event name field is required");
    return;
  }

  let start = document.getElementById("dateStart").value;
  let end = document.getElementById("dateEnd").value;
  let startTime = document.getElementById("start-time").value;
  let endTime = document.getElementById("end-time").value;

  if (!(summary === '') && !(location === '') && !(fname === '') &&
      validLoc(location) && checkStartDate(start, startTime) && checkDT()) {
    let data = `BEGIN:VCALENDAR\r\n
    VERSION:2.0\r\n
    CALSCALE:GREGORIAN\r\n
    BEGIN:VEVENT\r\n
    DTSTART;TZID=${getTZID()}:${convertDate(start, startTime)}\r\n
    DTEND;TZID=${getTZID()}:${convertDate(end, endTime)}\r\n
    SUMMARY:${summary}\r\n
    DESCRIPTION:${document.getElementById("description").value}\r\n
    LOCATION:${location}\r\n
    END:VEVENT\r\n
    END:VCALENDAR`;
    let file = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(file, `${fname}.ics`);
  }

}

function validLoc(input)
{
  let valid = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
  if(!input.match(valid))
  {
    alert('Please input letters, numbers, and spaces only in the LOCATION field');
    return false;
  }
  else {
    return true;
  }
}

function checkDT() {
  let start = document.getElementById("dateStart").value;
  let end = document.getElementById("dateEnd").value;
  let startTime = document.getElementById("start-time").value;
  let endTime = document.getElementById("end-time").value;

  if (end > start) {
    return true;
  }
  else if (end === start) {
    if (endTime >= startTime) {
      return true;
    }
    else {
      alert("Error: End time should not be before start time");
      return false;
    }
  }
  else {
    alert("Error: End date should not be before start date");
    return false;
  }
}

function convertDate(date,time) {
  let year = date.substring(0, 4);
  let month = date.substring(5, 7);
  let day = date.substring(8);
  let hour = time.substring(0, 2);
  let min = time.substring(3);
  let dt = year.concat(month, day, 'T', hour, min, '00');
  return dt;
}

function checkStartDate(date,time) {
  let currentDate = new Date();
  let cyear = currentDate.getFullYear();
  let cmonth = currentDate.getMonth() + 1;
  let cday = currentDate.getDate();
  let chour = currentDate.getHours();
  // let cmin = currentDate.getMinutes();
  let year = parseInt(date.substring(0, 4));
  let month = parseInt(date.substring(5, 7));
  let day = parseInt(date.substring(8));
  let hour = parseInt(time.substring(0, 2));
  // let min = time.substring(3);
  console.log(cmonth);
  console.log(month);
  console.log(cday);
  console.log(day);

  if(cyear < year) {
    return true;
  }
  else if (cyear > year) {
      alert("Error: Starting year should be greater than or equal to current year");
      return false;
  }
  else if (cmonth < month) {
    return true;
  }
  else if (cmonth > month) {
    alert("Error: Starting month should be greater than or equal to current month");
    return false;
  }
  else if (cday < day) {
    return true;
  }
  else if (cday > day) {
    alert("Error: Starting day should be greater than or equal to current day");
    return false;
  }
  else if (chour < hour) {
    return true;
  }
  else if (chour > hour) {
    alert("Error: Starting hour should be greater than or equal to current hour");
    return false;
  }
  else {
    alert("Error: You cannot create an event within the same hour of when the event is");
    return false;
  }

}
function getTZID() {
  let date = new Date();
  console.log(date);
  let tzid = date.getTimezoneOffset() / 60; //get time zone offset in hours
  if (tzid === 12) {
    return 'Etc/GMT+12';
  }
  else if(tzid === 11) {
    return 'Etc/GMT+11';
  }
  else if (tzid === 10) {
    return 'Pacific/Honolulu';
  }
  else if (tzid === 9) {
    return 'America/Juneau';
  }
  else if (tzid === 8) {
    return 'America/Los_Angeles';
  }
  else if (tzid === 7) {
    return 'America/Phoenix';
  }
  else if (tzid === 6) {
    return 'America/Chicago';
  }
  else if (tzid === 5) {
    return 'America/New_York';
  }
  else if (tzid === 4) {
    return 'America/Puerto_Rico';
  }
  else if (tzid === 3) {
    return 'America/Argentina/Buenos_Aires';
  }
  else if (tzid === 2) {
    return 'Etc/GMT+2';
  }
  else if (tzid === 1) {
    return 'Etc/GMT+1';
  }
  else if (tzid === -14) {
    return 'Etc/GMT-14';
  }
  else if (tzid === -13) {
    return 'Etc/GMT-13';
  }
  else if (tzid === -12) {
    return 'Pacific/Auckland';
  }
  else if (tzid === -11) {
    return 'Etc/GMT-11';
  }
  else if (tzid === -10) {
    return 'Australia/Sydney';
  }
  else if (tzid === -9) {
    return 'Asia/Seoul';
  }
  else if (tzid === -8) {
    return 'Asia/Singapore';
  }
  else if (tzid === -7) {
    return 'Asia/Bangkok';
  }
  else if (tzid === -6) {
    return 'Etc/GMT-6';
  }
  else if (tzid === -5) {
    return 'Indian/Maldives';
  }
  else if (tzid === -4) {
    return 'Asia/Dubai';
  }
  else if (tzid === -3) {
    return 'Europe/Moscow';
  }
  else if (tzid === -2) {
    return 'Europe/Athens';
  }
  else if (tzid === -1) {
    return 'Europe/Rome';
  }
  else if (tzid === 0) {
    return 'Europe/London';
  }
  else {
    return 'Unknown';
  }
}