# FitLog — 운동 기록 앱 MVP

헬스장에서 배운 운동 자세 영상을 업로드하고, 분석 결과를 기록하는 웹앱 MVP입니다.

## 실행 방법

```bash
cd prototype
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 주요 화면

| 경로 | 설명 |
|------|------|
| `/` | 홈 — 최근 기록 + 업로드 버튼 |
| `/upload` | 영상 업로드 화면 |
| `/records` | 기록 목록 |
| `/records/[id]` | 기록 상세 + AI 분석 결과 |

## 파일 구조

```
app/               # Next.js App Router 페이지
  page.tsx         # 홈
  upload/page.tsx  # 업로드
  records/page.tsx # 목록
  records/[id]/page.tsx  # 상세
components/
  WorkoutCard.tsx    # 기록 카드
  AnalysisResult.tsx # 분석 결과 (AI 연결 포인트)
  VideoPlayer.tsx    # 영상 플레이어
  NavBar.tsx         # 하단 네비게이션
lib/
  store.tsx          # React Context 기반 상태 관리
  mockData.ts        # 더미 데이터 3개
  utils.ts           # 날짜 포맷 등 유틸
types/
  workout.ts         # TypeScript 타입 정의
```

## 다음 단계 — AI 분석 기능 연결

`components/AnalysisResult.tsx`의 `result` prop 데이터 출처를 변경하면 됩니다.

1. **영상 업로드 API 연결**: `app/upload/page.tsx`의 `handleSave` 함수에서 서버로 영상 전송
2. **AI 분석 API 연결**: `lib/mockData.ts`의 `DUMMY_ANALYSIS`를 실제 API 응답으로 교체
3. **DB 저장**: `lib/store.tsx`의 `addRecord` 함수에서 API 호출로 교체
4. **분석 상태 표시**: `AnalysisResult.tsx`에 로딩/에러 상태 추가
