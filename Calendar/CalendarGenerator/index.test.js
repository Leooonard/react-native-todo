import CalendarGenerator from "./CalendarGenerator";

let testCalendar = new CalendarGenerator();
logCalendar(testCalendar);

function logCalendar(calendar) {
	let weekArray = calendar.getWeekArray();
	weekArray.forEach((week) => {
		week.forEach((day) => {
			console.log(day.date._date);
		});
	});
}