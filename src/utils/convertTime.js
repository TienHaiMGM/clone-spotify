const convertMsToDays = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  return days;
};

export const convertDaysAdded = (time) => {
  const current = new Date();
  const timeAdd = new Date(time);
  const daysAdd = current.getTime() - timeAdd.getTime();
  return convertMsToDays(daysAdd);
};

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export const convertMsToMinutesSeconds = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

export const convertMsToHoursMinutes = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;
  return `${padTo2Digits(hours)} hr ${padTo2Digits(minutes)} min ${padTo2Digits(
    seconds
  )} sec`;
};

export const convertDateToYear = (date) => {
  const dates = new Date(date);
  return dates.getFullYear().toString();
};
