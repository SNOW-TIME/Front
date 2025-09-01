import { $, $$, ready } from '../assets/js/utils.js';

// 앱 상태 관리
const appState = {
  currentScreen: null,
  isLoggedIn: false
};

// DOM이 준비되면 앱 초기화
ready(() => {
  console.log('SNOWTIME 앱이 시작되었습니다!');
  
  initializeApp();
});

async function initializeApp() {
  // 로그인 상태 확인 (임시로 false)
  appState.isLoggedIn = checkLoginStatus();
  
  // 초기 화면 로드
  if (appState.isLoggedIn) {
    await loadScreen('dashboard');
  } else {
    await loadScreen('login');
  }
}

// 화면 로드 함수
async function loadScreen(screenName) {
  try {
    showLoading();
    
    // HTML 파일에서 화면 로드
    const response = await fetch(`./screens/${screenName}.html`);
    if (!response.ok) {
      throw new Error(`화면을 로드할 수 없습니다: ${screenName}`);
    }
    
    const html = await response.text();
    const appContainer = $('#app');
    
    // 화면 교체
    appContainer.innerHTML = html;
    appState.currentScreen = screenName;
    
    // 화면별 이벤트 리스너 등록
    setupScreenEvents(screenName);
    
    hideLoading();
    
    console.log(`${screenName} 화면이 로드되었습니다.`);
   
  } catch (error) {
    console.error('화면 로드 실패:', error);
    // 화면 로드 실패 시 login.html 내용을 직접 삽입
    const loginContent = `
      <div class="container">
        <!-- 로고 섹션 -->
        <header class="text-center p-6">
          <h1 class="text-logo">SNOW</h1>
          <h1 class="text-logo logo-indent">TIME</h1>
          <p class="text-ord color02 mt-4">강의실 시간표 빠르게 검색하기</p>
        </header>
      
        <!-- 로그인 버튼 섹션 -->
        <main>
          <div class="btn_center">
            <button class="gray_btn" style="--btn-padding: 13px 60px; --btn-font-size: 18px;" id="loginBtn">
              숙명 이메일로 로그인
            </button>
          </div>
        </main>
      </div>
    `;
    $('#app').innerHTML = loginContent;
    setupLoginEvents(); // 로그인 이벤트 설정
    hideLoading();
  }
}

// 화면별 이벤트 리스너 설정
function setupScreenEvents(screenName) {
  switch (screenName) {
    case 'login':
      setupLoginEvents();
      break;
    case 'dashboard':
      setupDashboardEvents();
      break;
    case 'mainscreen':
      setupMainScreenEvents();
      break;
    default:
      console.warn(`알 수 없는 화면: ${screenName}`);
  }
}

// 로그인 화면 이벤트 설정
function setupLoginEvents() {
  const loginBtn = $('#loginBtn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      console.log('로그인 시도...');
      
      // TODO: 실제 로그인 로직 구현
      // 임시로 로그인 성공 처리
      appState.isLoggedIn = true;
      
      // 대시보드로 이동
      // await loadScreen('dashboard');
    });
  }
}

function setupMainScreenEvents() {
}

// 로그인 상태 확인 (임시 함수)
function checkLoginStatus() {
  // TODO: 실제 로그인 상태 확인 로직
  return false;
}

// 로딩 화면 표시
function showLoading() {
  const loading = $('#loading');
  if (loading) {
    loading.classList.remove('hidden');
  }
}

// 로딩 화면 숨김
function hideLoading() {
  const loading = $('#loading');
  if (loading) {
    loading.classList.add('hidden');
  }
}

window.loadScreen = loadScreen;