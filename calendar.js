function submitForm() {
  const summary = document.getElementById("summary").value;
  if (!summary) {
    alert("The summary field is required");
    return;
  }

  const location = document.getElementById("location").value;
  if (!location) {
    alert("The location field is required");
    return;
  }

  const description = document.getElementById("description").value;

  const fname = document.getElementById("fname").value;
  if (!fname) {
    alert("The event name field is required");
    return;
  }

  const data = `BEGIN:VCALENDAR\r\n
  VERSION:2.0\r\n
  CALSCALE:GREGORIAN\r\n
  BEGIN:VEVENT\r\n
  DTSTART:20200313T200000Z\r\n
  DTEND:20200313T230000Z\r\n
  DTSTAMP:20200227T233911Z\r\n
  SUMMARY:${summary}\r\n
  DESCRIPTION:${description}\r\n
  LOCATION:${location}\r\n
  END:VEVENT\r\n
  END:VCALENDAR`;
  const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
  saveAs(file, `${fname}.ics`);
}