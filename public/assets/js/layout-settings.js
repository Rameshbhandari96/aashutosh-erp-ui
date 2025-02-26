var phoenixIsRTL = window.config.config.phoenixIsRTL;
if (phoenixIsRTL) {
    var linkDefault = document.getElementById('style-default');
    var userLinkDefault = document.getElementById('user-style-default');
    linkDefault.setAttribute('disabled', true);
    userLinkDefault.setAttribute('disabled', true);
    document.querySelector('html').setAttribute('dir', 'rtl');
} else {
    var linkRTL = document.getElementById('style-rtl');
    var userLinkRTL = document.getElementById('user-style-rtl');
    linkRTL.setAttribute('disabled', true);
    userLinkRTL.setAttribute('disabled', true);
}

var navbarTopShape = window.config.config.phoenixNavbarTopShape
var navbarPosition = window.config.config.phoenixNavbarPosition;
var body = document.querySelector('body');
var navbarDefault = document.querySelector('#navbarDefault');
var navbarTop = document.querySelector('#navbarTop');
var navbarSlim = document.querySelector('#navbarSlim');
var navbarTopSlimNew = document.querySelector('#navbarTopSlimNew');
var navbarCombo = document.querySelector('#navbarCombo');
var navbarComboSlim = document.querySelector('#navbarComboSlim');
var navbarTopSlimNew = document.querySelector('#navbarTopSlimNew');
var documentElement = document.documentElement;
var navbarVertical = document.querySelector('.navbar-vertical');

navbarComboSlim.removeAttribute('style');
navbarVertical.removeAttribute('style');
documentElement.setAttribute('data-navbar-horizontal-shape', 'slim');;
documentElement.setAttribute('data-navigation-type', 'combo');

var navbarTopStyle = window.config.config.phoenixNavbarTopStyle;
var navbarTop = document.querySelector('.navbar-top');
if (navbarTopStyle === 'darker') {
    navbarTop.setAttribute('data-navbar-appearance', 'darker');
}

var navbarVerticalStyle = window.config.config.phoenixNavbarVerticalStyle;
var navbarVertical = document.querySelector('.navbar-vertical');
if (navbarVertical && navbarVerticalStyle === 'darker') {
    navbarVertical.setAttribute('data-navbar-appearance', 'darker');
}