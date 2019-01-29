const baseSize = 75;
function setRem() {
    const scale = document.documentElement.clientWidth / 750;
    document.documentElement.style.fontSize =
        baseSize * Math.min(scale, 2) + 'px';
}
function pageShow(event) {
    if (event.persisted) {
        setTimeout(function () {
            setRem();
        }, 10);
    }
}
setRem();
window.addEventListener('resize', setRem, false);
window.addEventListener('pageShow', pageShow, false);
function noRem() {
    document.documentElement.removeAttribute('font-size');
    window.removeEventListener('resize', setRem, false);
    window.removeEventListener('pageShow', pageShow, false);
}
export { setRem, noRem };
