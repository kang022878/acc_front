
# Control Center Dashboard (ACC Frontend)

ACC 프런트엔드 프로젝트로, 계정 관리/정리, 약관 분석, 보안 챗봇 기능을 제공하는 대시보드 UI입니다.  
디자인 베이스는 Figma 시안(https://www.figma.com/design/L2xyHRajwIN7wC83hV4ehk/Control-Center-Dashboard)에서 시작되었습니다.

## 주요 기능
- 대시보드: 계정 요약, 카테고리 분포, 스캔 실행, 보안 챗봇
- 약관 분석: URL 입력 분석, 분석 결과/근거/요약 표시, 분석 기록 조회
- 계정 정리: Gmail 연동/스캔, 계정 목록/카테고리 필터링
- 로그인/권한: Google OAuth(프로덕션), dev-login(개발용)
- 인트로 화면: 타이핑 애니메이션 후 페이드 및 자동 스크롤

## 기술 스택
- React 18 + TypeScript
- Vite (빌드/개발 서버)
- Tailwind 유틸리티(`clsx`, `tailwind-merge`, `class-variance-authority`)
- Radix UI 컴포넌트
- react-router-dom, lucide-react, recharts
- 3D 뷰어: `@google/model-viewer`

## 주요 페이지/라우트
- `/` 대시보드
- `/terms-analysis` 약관 분석
- `/terms-result` 약관 분석 결과
- `/account-management` 계정 정리

## 환경 변수
- `VITE_API_BASE`: 백엔드 API 기본 주소(예: `https://api.example.com`)

## 실행 방법
```bash
npm i
npm run dev
```

## 기타
- 로컬 로그인 토큰은 `localStorage`의 `acc_token`에 저장됩니다.
- 개발 환경에서는 dev-login을 통해 로그인할 수 있습니다.
  
