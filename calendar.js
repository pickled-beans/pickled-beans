function submitForm() {
  const data = `BEGIN:VCALENDAR\r\n
  VERSION:2.0\r\n
  CALSCALE:GREGORIAN\r\n
  BEGIN:VEVENT\r\n
  DTSTART:20200313T010000Z\r\n
  DTEND:20200313T033000\r\n
  DTSTAMP:20200227T233911Z\r\n
  SUMMARY:Study Session\r\n
  DESCRIPTION:Study for Exam\r\n
  LOCATION:Hamilton Library\r\n
  END:VCALENDAR`;
  const file = new Blob([data], { type: 'text/plain;charset=utf-8' });
  saveAs(file, `study.ics`);
}