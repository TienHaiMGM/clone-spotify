export const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export const getRandomRgba = (a) => {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = (num >> 8) & 255;
  var b = num & 255;
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
};
export const getColorToLinearColor = (linearColor) => {
  const regex = /rgba\(.{18}/;
  return linearColor.match(regex);
};
