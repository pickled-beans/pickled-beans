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

  let priority = document.getElementById("priority").value;

  let start = document.getElementById("dateStart").value;
  let end = document.getElementById("dateEnd").value;
  let startTime = document.getElementById("start-time").value;
  let endTime = document.getElementById("end-time").value;

  let recur = document.getElementById("recur").value;
  let numRecur = document.getElementById("numRecur").value;

  if (recur === 'NONE') {
    numRecur = 1;
  }
  if (numRecur == 0) {
    alert("This is an invalid amount of occurences");
    return;
  }

  let classification = document.getElementById("class").value;

  if (!(summary === '') && !(location === '') && !(fname === '') &&
      validLoc(location) && checkDT() && checkStartDate(start, startTime)) {
    let fname = document.getElementById("fname").value;
    if (!fname) {
      alert("The event name field is required");
      return;
    }
    let data = `BEGIN:VCALENDAR\r\n
    VERSION:2.0\r\n
    CALSCALE:GREGORIAN\r\n
    BEGIN:VEVENT\r\n
    DTSTART;TZID=${getTZID()}:${convertDate(start, startTime)}\r\n
    RRULE:FREQ=${recur};COUNT=${numRecur}\r\n
    DTEND;TZID=${getTZID()}:${convertDate(end, endTime)}\r\n
    SUMMARY:${summary}\r\n
    DESCRIPTION:${document.getElementById("description").value}\r\n
    LOCATION:${location}\r\n
    RESOURCES:${document.getElementById("resources").value}\r\n
    PRIORITY:${priority}\r\n
    CLASS:${classification}\r\n
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
  if (start == '') {
    alert("Error: Please enter a start date");
    return false;
  }
  if (end == '') {
    alert("Error: Please enter a end date");
    return false;
  }
  let startTime = document.getElementById("start-time").value;
  let endTime = document.getElementById("end-time").value;

  if (end > start) {
    return true;
  }
  else if (end === start) {
    if (endTime > startTime) {
      return true;
    }
    else {
      alert("Error: End time should not be less than or equal to start time");
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
  let cmin = currentDate.getMinutes();
  let year = parseInt(date.substring(0, 4));
  let month = parseInt(date.substring(5, 7));
  let day = parseInt(date.substring(8));
  let hour = parseInt(time.substring(0, 2));
  let min = time.substring(3);

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
  else if (cmin < min) {
    return true;
  }
  else if (cmin > min) {
    alert("Error: Starting time should be greater than or equal to current time");
    return false;
  }
  else {
    alert("Error: Event time is too close to current time");
    return false;
  }

}

function getTZID() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return tz;
}
