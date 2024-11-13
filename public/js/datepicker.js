function app(selected_date = '', date_format, first_weekday = 'sun') {
  return {
    showDatepicker: false,
    datepickerValue: "",
    selectedDate: selected_date,
    dateFormat: date_format, //"YYYY-MM-DD",
    month: "",
    year: "",
    day: "",
    no_of_days: [],
    blankdays: [],
    initDate() {
      let today;
      if (this.selectedDate) {
        today = new Date(Date.parse(this.selectedDate));
      } else {
        today = '';
      }
      if (today !== '') {
        this.month = today.getMonth();
        this.year = today.getFullYear();
        this.datepickerValue = this.formatDateForDisplay(
          today
        );
      } else {
        this.month = new Date().getMonth();
        this.year = new Date().getFullYear();
      }
    },
    initMonth() {
      let today;
      if(!this.dateFormat)
        this.dateFormat = "M Y";
      if(this.selectedDate)
        today = new Date(Date.parse(this.selectedDate)).setDate(1)
      else
        today = '';
      if(today !== '') {
        this.month = today.getMonth();
        this.year = today.getFullYear();
        this.day = 1;
        this.datepickerValue = this.formatDateForDisplay(today);
      }
      else {
        this.month = new Date().getMonth();
        this.year = new Date().getFullYear();
        this.day = 1;
      }
    },
    formatDateForDisplay(date) {
      let formattedDay = DAYS[date.getDay()];
      let formattedDate = ("0" + date.getDate()).slice(
        -2
      ); // appends 0 (zero) in single digit date
      let formattedMonth = MONTH_NAMES[date.getMonth()];
      let formattedMonthShortName =
        MONTH_SHORT_NAMES[date.getMonth()];
      let formattedMonthInNumber = (
        "0" +
        (parseInt(date.getMonth()) + 1)
      ).slice(-2);
      let formattedYear = date.getFullYear();
      if (this.dateFormat === "DD-MM-YYYY") {
        return `${formattedDate}-${formattedMonthInNumber}-${formattedYear}`; // 02-12-2021
      }
      if (this.dateFormat === "MM-DD-YYYY") {
        return `${formattedMonthInNumber}-${formattedDate}-${formattedYear}`; // 12-02-2021
      }
      if (this.dateFormat === "YYYY-MM-DD") {
        return `${formattedYear}-${formattedMonthInNumber}-${formattedDate}`; // 2021-12-02
      }
      if (this.dateFormat === "D d M, Y") {
        return `${formattedDay} ${formattedDate} ${formattedMonthShortName} ${formattedYear}`; // Tue 02 Dec 2021
      }
      if(this.dateFormat === "M Y")
        return `${formattedMonthShortName} ${formattedYear}`
      return `${formattedDay} ${formattedDate} ${formattedMonth} ${formattedYear}`;
    },
    isSelectedDate(date) {
      const d = new Date(this.year, this.month, date);
      return this.datepickerValue ===
      this.formatDateForDisplay(d) ?
        true :
        false;
    },
    isSelectedMonth(monthNum) {
      const d = new Date(this.year, monthNum - 1, 1);
      return this.datepickerValue == this.formatDateForDisplay(d) ? true : false;
    },
    isToday(date) {
      const today = new Date();
      const d = new Date(this.year, this.month, date);
      return today.toDateString() === d.toDateString() ?
        true :
        false;
    },
    isThisMonth (monthNum) {
      const today = new Date();
      return today.getMonth() == monthNum - 1;
    },
    getDateValue(date, format) {
      let selectedDate = new Date(
        this.year,
        this.month,
        date
      );
      this.datepickerValue = this.formatDateForDisplay(
        selectedDate
      );
      this.isSelectedDate(date);
      this.showDatepicker = false;
    },
    getMonthValue(monthNum, format) {
      this.month = monthNum - 1
      let selectedDate = new Date(
        this.year,
        this.month,
        1
      );
      this.datepickerValue = this.formatDateForDisplay(selectedDate);
      this.isSelectedDate(1);
      this.showDatepicker = false;
    },
    getNoOfDays() {
      let daysInMonth = new Date(
        this.year,
        this.month + 1,
        0
      ).getDate();
      // find where to start calendar day of week
      let dayOfWeek = new Date(
        this.year,
        this.month
      ).getDay();
      let blankdaysArray = [];
      dayOfWeek = (first_weekday === 'sun') ? dayOfWeek : (dayOfWeek - 1);
      for (var i = 1; i <= dayOfWeek; i++) {
        blankdaysArray.push(i);
      }
      let daysArray = [];
      for (var i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
      }
      this.blankdays = blankdaysArray;
      this.no_of_days = daysArray;
    },
  };
}