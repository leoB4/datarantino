import './style/common.styl'
import App from './js/App.js'

new App({
  canvas: document.querySelector('#_canvas'),
  trigger1: document.querySelector('.trigger1'),
  trigger2: document.querySelector('.trigger2'),
  trigger3: document.querySelector('.trigger3'),
  trigger4: document.querySelector('.trigger4'),
  trigger5: document.querySelector('.trigger5'),
  trigger6: document.querySelector('.trigger6'),
  trigger7: document.querySelector('.trigger7'),
  trigger8: document.querySelector('.trigger8'),
  trigger9: document.querySelector('.trigger9'),

  allTrigger: document.querySelectorAll('.btn'),

  labMouse: document.querySelector('.lab-mouse-content'),

  infoBullet: document.querySelector('.gun-fireshot'),
  infoDeath: document.querySelector('.deathPerMovie'),
  infoHead: document.querySelector('.headshotPerMovie'),
  infoTemp: document.querySelector('.temperature'),
  infoExplo: document.querySelector('.explosion-death'),
  infoBlood: document.querySelector('.katana-blood'),
  infoKatana: document.querySelector('.katana-death'),
  infoInsult: document.querySelector('.insult-nb-container'),
  infoPodium: document.querySelector('.insult-podium'),

  allContent: document.querySelectorAll('.js-contentSelector'),

  closeIframe: document.querySelector('.closeIframe'),
  iframe: document.querySelector('.iframe-container'),
  openIframe: document.querySelector('.js-openIframe'),

  

})
