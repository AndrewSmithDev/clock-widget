const dateFns = require("date-fns");

const formatTime = (date) => {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const formatDate = (date) => {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getDayOfWeek = (date) => {
  return date.toLocaleDateString(undefined, { weekday: "long" });
};

const timeElm = document.getElementById("time");
const dayElm = document.getElementById("day");
const dateElm = document.getElementById("date");

function updateClock() {
  const date = new Date();
  timeElm.innerText = dateFns.format(date, "hh:mm aaa");
  dayElm.innerText = getDayOfWeek(date);
  dateElm.innerText = formatDate(date);
}
updateClock();

setInterval(() => {
  updateClock();
}, 1000);
