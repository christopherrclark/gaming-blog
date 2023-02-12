module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  // format_date: (date) => {
  //   return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
  //     new Date(date).getFullYear() + 5
  //   }`;
  // },
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
  consoleLog: (context) => {
    console.log(context);
    return '';
  }
};
