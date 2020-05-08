window.onscroll = function() {
  const logo = document.getElementById('logo');
  if (document.body.scrollTop > 100 ||
     document.documentElement.scrollTop > 100) {
    logo.style.padding = '1vh 1vw 1vh 1vw';
    logo.style.fontSize = '16px';
  } else {
    logo.style.padding = '10vh 2vw 10vh 2vw';
    logo.style.fontSize = '5vh';
  }
};
