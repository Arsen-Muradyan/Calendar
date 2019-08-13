// Declare Vairbales
var daysBox = document.getElementsByClassName('days')
var monthTitle = document.getElementsByClassName('month-title');
var yearTitle = document.getElementsByClassName('year-title');
var monDays = document.getElementById("mon-days");
var tueDays = document.getElementById("tue-days");
var wedDays = document.getElementById("wed-days");
var thuDays = document.getElementById("thu-days");
var friDays = document.getElementById("fri-days");
var satDays = document.getElementById("sat-days");
var sunDays = document.getElementById("sun-days");
var btnNext = document.getElementsByClassName('btn-next');
var btnPrev = document.getElementsByClassName('btn-prev');
// Add Event
document.addEventListener("DOMContentLoaded", start);
// Start Function
function start() {
  // Create Date Object
  var d = new Date();
  // Month Names Array
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
  //Days Array
  var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  // Setup Date data
  var year = d.getFullYear();
  var month = d.getMonth();
  // Set Current Month/Year To title
  monthTitle[0].innerHTML = months[month];
  yearTitle[0].innerHTML = year;
  // Create Calendar Data
  createDays();
  // Add Click Events
  btnNext[0].addEventListener('click', nextMonth);
  btnPrev[0].addEventListener('click', prevMonth);
  function nextMonth() {
    month++;
    if (month > 11) {
      month = 0;
      year++
    }
    monthTitle[0].innerHTML = months[month];
    yearTitle[0].innerHTML = year;
    dropDays();
    createDays();
  }
  function prevMonth() {
    month--;
    if (month < 0) {
      month = 11;
      year--
    } 
    monthTitle[0].innerHTML = months[month];
    yearTitle[0].innerHTML = year;
    dropDays();
    createDays();

  }
  // Clear Calendar Data Function
  function dropDays() {
    monDays.innerHTML = '';
    tueDays.innerHTML = '';
    wedDays.innerHTML = '';
    thuDays.innerHTML = '';
    friDays.innerHTML = '';
    satDays.innerHTML = '';
    sunDays.innerHTML = '';
  }
  // Create Calendar Data function
  function createDays() {
    for (var i = -(getFirstDay(year, month) - 1); i <= dayInMonth(d.getFullYear(), d.getMonth() + 1); i++) {
      // Set Year, Month, Day
      d.setFullYear(year, month, i);
      // Add Calendar Counts
      var txt;
      // Check special days
      if (i < 1) {
        txt = `<span class="text-old">${d.getDate()}</span><br><br>`;
      }
      else if (days[currentDay(d.getDay())].toLowerCase() == 'sat' ||
        days[currentDay(d.getDay())].toLowerCase() == 'sun') {
        txt = `<span class="text-holiday">${d.getDate()}</span><br><br>`;
        if (currentDate().day == d.getDate() &&
          currentDate().month == d.getMonth() &&
          currentDate().year == d.getFullYear()) {
          txt = `<span class="text-active">${d.getDate()}</span><br><br>`;
        }
      }
      else if (currentDate().day == d.getDate() &&
        currentDate().month == d.getMonth() &&
        currentDate().year == d.getFullYear()) {
        txt = `<span class="text-active">${d.getDate()}</span><br><br>`;
      }
      else {
        txt = `<span>${d.getDate()}</span><br><br>`;
      }
      // Check Date Day
      switch (days[currentDay(d.getDay())].toLowerCase()) {
        case 'mon':
          monDays.innerHTML += txt;
          break;
        case 'tue':
          tueDays.innerHTML += txt;
          break;
        case 'wed':
          wedDays.innerHTML += txt;
          break;
        case 'thu':
          thuDays.innerHTML += txt;
          break;
        case 'fri':
          friDays.innerHTML += txt;
          break;
        case 'sat':
          satDays.innerHTML += txt;
          break;
        case 'sun':
          sunDays.innerHTML += txt;
          break;
      }
    }
  }
}
// Helper Functions
function currentDay(d) {
  var day = d == 0 ? 6 : d - 1;
  return day;
}
function dayInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
function getFirstDay(y, m) {
  var d = new Date();
  d.setFullYear(y, m, 1);
  return currentDay(d.getDay());
} 
function currentDate() {
  var d = new Date();
  return {
    year: d.getFullYear(),
    month: d.getMonth(),
    day: d.getDate(),
  };
}
