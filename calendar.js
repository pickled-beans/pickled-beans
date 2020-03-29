function submitForm() {
  const ename = document.getElementById("ename").value;
  if (!ename) {
    alert("The event name field is required");
    return;
  }

  const location = document.getElementById("location").value;
  if (!location) {
    alert("The location field is required");
    return;
  }

  const summary = document.getElementById("summary").value;
  if (!summary) {
    alert("The summary field is required");
    return;
  }

  const description = document.getElementById("description").value;
  if (!description) {
      alert("The description field is required");
      return;
    }

  const start = document.getElementById("dateStart").value;
  const end = document.getElementById("dateEnd").value;

  if(end === start) {
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    if (endTime >= startTime) {
      createFile();
    }
    else {
      alert("Error: End time should not be before start time");
      console.assert((end === start) && (endTime < startTime), 'Invalid alert');
    }
  }
  else {
    alert("Error: End date should not be before start date");
    console.assert(end < start, 'Invalid alert');
  }

  /*const data = `BEGIN:VCALENDAR\r\n
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
  saveAs(file, `${ename}.ics`); */
}

//creates a new .ics file
function createFile() {
  let version = document.getElementById('version').value;
  const data = `BEGIN:VCALENDAR\r\nVERSION:${version}\r\nCALSCALE:GREGORIAN\r\n${createVevent()}END:VCALENDAR`;
  if (version === '1.0') {
    const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(file, `${document.getElementById('summary').value}.vcs`);
  }
  else {
    const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(file, `${document.getElementById('summary').value}.ics`);
  }
}
