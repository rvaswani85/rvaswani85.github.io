document.addEventListener('DOMContentLoaded', function () {
  const $wrap = document.querySelector('.wrap'),
        $square1 = document.querySelector('.square-one'),
        $square3 = document.querySelector('.square-three');

  const expandThat = () => {
    $square1.classList.remove('square-one--initial');
    $square1.classList.add('square-one--expanded');
    $square3.classList.remove('square-three--initial');
    $square3.classList.add('square-three--expanded');
  }

  const shrinkThat = () => {
    $square1.classList.remove('square-one--expanded');
    $square1.classList.add('square-one--initial');
    $square3.classList.remove('square-three--expanded');
    $square3.classList.add('square-three--initial');
  }

  $wrap.onmouseover = shrinkThat;
  $wrap.onmouseleave = expandThat;

  setTimeout(expandThat, 1000);

}, false);
