const formatDate = (date: Date) => {
  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    (date.getHours().toString().length == 2
      ? date.getHours()
      : "0" + date.getHours()) +
    ":" +
    (date.getMinutes().toString().length == 2
      ? date.getMinutes()
      : "0" + date.getMinutes()) +
    ":" +
    (date.getSeconds().toString().length == 2
      ? date.getSeconds()
      : "0" + date.getSeconds())
  );
};

export default formatDate;
