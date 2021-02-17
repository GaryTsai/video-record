const utils = {
  getCurTime : () => {
    const date = new Date();
    return (
      utils.fillZero(date.getHours()) +
      ":" +
      utils.fillZero(date.getMinutes()) +
      ":" +
      utils.fillZero(date.getSeconds())
    );
  },
  fillZero : (time) => {
    return time <= 9 ? "0" + time : time;
  }
};

export default utils;
