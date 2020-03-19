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

  if (!(summary === '') && !(location === '') && !(fname === '') && validLoc(location)) {
    let data = `BEGIN:VCALENDAR\r\n
    VERSION:2.0\r\n
    CALSCALE:GREGORIAN\r\n
    BEGIN:VEVENT\r\n
    DTSTART:20200313T200000Z\r\n
    DTEND:20200313T230000Z\r\n
    DTSTAMP:20200227T233911Z\r\n
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