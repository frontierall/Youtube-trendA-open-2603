# YouTube 인기 급상승 동영상 뷰어

YouTube Data API v3를 사용하여 국가별 인기 급상승 동영상을 조회하는 웹 앱입니다.

**배포 주소:** https://frontierall.github.io/Youtube-trendA-open-2603/

---

## 주요 기능

- 국가별 인기 동영상 조회 (한국, 미국, 일본, 영국, 독일, 프랑스, 캐나다, 호주)
- 카테고리 필터 (음악, 게임, 스포츠, 엔터테인먼트 등 14개)
- 조회수 / 좋아요 / 최신순 / 구독자순 정렬
- 채널 구독자 수 온디맨드 로딩
- 동영상 썸네일 호버 시 미리보기 (0.8초 후 자동 재생)
- 즐겨찾기 저장 (localStorage)
- 통계 대시보드 (총 조회수, 좋아요, HD 비율, Top 동영상)
- 다크 모드 지원
- API 응답 캐시 (5분)
- URL 복사 기능

---

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 로컬 개발 서버 실행

```bash
npm run dev
```

### 3. YouTube Data API 키 발급

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) 접속
2. 새 프로젝트 생성
3. YouTube Data API v3 활성화
4. API 키 발급
5. 앱 상단 입력창에 키 입력 후 저장

---

## 기술 스택

| 항목 | 내용 |
|---|---|
| 프레임워크 | React 18 |
| 빌드 도구 | Vite 5 |
| 스타일 | Tailwind CSS 3 |
| 배포 | GitHub Pages |
| API | YouTube Data API v3 |

---

## 버전 히스토리

### v1.2.0 (2026-03-16)
- 채널 구독자 수 온디맨드 로딩 기능 추가
- 카드별 "구독자 보기" 버튼 추가
- "전체 구독자 보기" 버튼으로 전체 채널 일괄 로드
- 구독자순 정렬 옵션 추가

### v1.1.0 (2026-03-16)
- 통계 대시보드 모달 추가 (총 조회수, 좋아요, HD 비율, Top 동영상)
- 즐겨찾기 필터 기능 추가
- 조회수 / 좋아요 / 최신순 정렬 기능 추가
- 동영상 썸네일 호버 미리보기 추가
- URL 복사 버튼 추가
- 다크 모드 지원
- API 응답 5분 캐시 적용

### v1.0.0 (2026-03-14)
- 최초 릴리즈
- 국가별 인기 동영상 조회 (YouTube Data API v3)
- 카테고리 필터
- 스켈레톤 로딩 UI
- GitHub Pages 배포 설정
