export default class ProperDate {
	constructor(...args) {
		if (args.length === 0) {
			this._date = new Date();
		} else {
			let [year, month, day] = args;
			this._date = new Date(year, month - 1, day);
		}
	}

	get month() {
		return this._date.getMonth() + 1;
	}

	get year() {
		return this._date.getFullYear();
	}

	get weekDay() {
		return this._date.getDay();
	}

	get day() {
		return this._date.getDate();
	}

	get signature() {
		return `${this.year}${this.month}${this.day}${this.weekDay}`;
	}

	static equal(date1, date2) {
		if (date1.signature === date2.signature) {
			return true;
		} else {
			return false;
		}
	}
};

ProperDate.Types = {
	empty: "empty",
	normal: "normal",
	today: 'today'
};