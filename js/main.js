import { $, $$, ready } from '../assets/js/utils.js';

// DOM이 준비되면 초기화
ready(() => {
  console.log('웹사이트가 로드되었습니다!');
  
  initializeApp();
});

function initializeApp() {
  console.log('앱이 초기화되었습니다!');
}