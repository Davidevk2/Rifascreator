const btnScreenShot = document.getElementById("btn-screenshot");
const wrapperContent = document.querySelector(".wrapper-img");
const generateScreenShot = () => {
  html2canvas(wrapperContent, {
    width: wrapperContent.clientWidth,
    height: wrapperContent.clientHeight,
    scale: 1,
    allowTransparency: true,
    logging: false,
    scrollY: 0,
    scrollX: 0,
    imageTimeout: 15000
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "screenshot.png";
    link.href = imgData;
    link.click();
  });
};
btnScreenShot.addEventListener("click", generateScreenShot);
