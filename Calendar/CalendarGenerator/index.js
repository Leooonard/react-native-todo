import DateCaculator from "./DateCaculator";
import ProperDate from "./ProperDate";

export default class CalendarGenerator {
	constructor(year, month) {
		this.props = {
			month,
			year
		};
	}

	getWeekArray() {
		let {
			month,
			year
		} = this.props;

		let monthTotalDays = DateCaculator.getMonthTotalDays(month, year);
		let weekStartDateArray = this.getWeekStartDateArray();
		let weekArray = weekStartDateArray.map((weekStartDate) => {
			return this.generateWeekDateArray(weekStartDate, monthTotalDays);
		});

		if(this.isWeekArrayLackWeek(weekArray)) {
			this.paddingWeekArray(weekArray);
		}

		return weekArray;
	}

	isWeekArrayLackWeek(weekArray) {
		if(weekArray.length === 4) {
			return true;
		} else {
			return false;
		}
	}

	paddingWeekArray(weekArray) {
		let paddingArray = [];
		let lastProperDate = weekArray[3][6].date;
		let {year, month, day} = lastProperDate;
		const PADDING_COUNT = 7;

		for(let i = 0 ; i < PADDING_COUNT ; i++){
			paddingArray.push({
				type: ProperDate.Types.empty,
				date: new ProperDate(year, month, day + i + 1)
			});
		}

		weekArray.push(paddingArray);
	}

	isToday(targetProperDate) {
		let today = new ProperDate();
		if (ProperDate.equal(today, targetProperDate)) {
			return true;
		} else {
			return false;
		}
	}

	generateWeekDateArray(weekStartDate, monthTotalDays) {
		const WEEK_TOTAL_DAY = 7;
		let {
			year,
			month,
			day,
			weekDay
		} = weekStartDate;
		let weekDateArray = [];

		for (let i = 0; i < WEEK_TOTAL_DAY; i++) {
			let currentDay = day + i - weekDay;
			let currentProperDate = new ProperDate(year, month, currentDay);

			if (i < weekDay) {
				weekDateArray.push({
					type: ProperDate.Types.empty,
					date: currentProperDate
				});
			} else if (currentDay > monthTotalDays) {
				weekDateArray.push({
					type: ProperDate.Types.empty,
					date: currentProperDate
				});
			} else if(this.isToday(currentProperDate)) {
				weekDateArray.push({
					type: ProperDate.Types.today,
					date: currentProperDate
				});
			} else {
				weekDateArray.push({
					type: ProperDate.Types.normal,
					date: currentProperDate
				});
			}
		}

		return weekDateArray;
	}

	getWeekStartDateArray() {
		let weekStartDateArray = [];
		let {
			month,
			year
		} = this.props;

		let monthStartDate = DateCaculator.getMonthFirstDate(month, year);
		let monthTotalDays = DateCaculator.getMonthTotalDays(month, year);

		let weekStartDate = monthStartDate;
		let weekStartDay = monthStartDate.day;
		weekStartDateArray.push(weekStartDate);
		while ((weekStartDay = this.getNextWeekStartDay(new ProperDate(year, month, weekStartDay), monthTotalDays)) !== undefined) {
			weekStartDateArray.push(new ProperDate(year, month, weekStartDay));
		}

		return weekStartDateArray;
	}

	getNextWeekStartDay(weekStartDate, monthTotalDays) {
		const WEEK_TOTAL_DAY = 7;

		let weekDay = weekStartDate.weekDay;
		let day = weekStartDate.day;
		let distanceToNextWeekStartDay = WEEK_TOTAL_DAY - weekDay;
		let nextWeekStartDay = day + distanceToNextWeekStartDay;

		if (nextWeekStartDay > monthTotalDays) {
			return undefined;
		} else {
			return nextWeekStartDay;
		}
	}
};