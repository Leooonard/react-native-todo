import ProperDate from "./ProperDate";

const MONTH = {
	january: 1,
	february: 2,
	march: 3,
	april: 4,
	may: 5,
	june: 6,
	july: 7,
	august: 8,
	september: 9,
	october: 10,
	november: 11,
	december: 12
};

export default class DateCaculator {
	construtor() {}

	static getMonthFirstDate(month = (new ProperDate).month,
		year = (new ProperDate).year) {
		return new ProperDate(year, month, 1);
	}

	static getMonthTotalDays(month = (new ProperDate).month,
		year = (new ProperDate).year) {

		const MonthTotalDaysMap = {
			[MONTH.january]: 31,
			[MONTH.february]: DateCaculator.getFebruaryTotalDays(year),
			[MONTH.march]: 31,
			[MONTH.april]: 30,
			[MONTH.may]: 31,
			[MONTH.june]: 30,
			[MONTH.july]: 31,
			[MONTH.august]: 31,
			[MONTH.september]: 30,
			[MONTH.october]: 31,
			[MONTH.november]: 30,
			[MONTH.december]: 31
		};

		return MonthTotalDaysMap[month];
	}

	static getFebruaryTotalDays(year = (new ProperDate).year) {
		const RUN_NIAN_DAYS = 29; // 闰年2月有29天。
		const UN_RUN_NIAN_DAYS = 28; // 非闰年2月有28天。

		if (year % 4 === 0) {
			if (year % 100 === 0 && year % 400 === 0) {
				return RUN_NIAN_DAYS;
			} else if (year % 100 === 0 && year % 400 !== 0) {
				return UN_RUN_NIAN_DAYS;
			} else {
				return RUN_NIAN_DAYS;
			}
		} else {
			return UN_RUN_NIAN_DAYS;
		}
	}
};