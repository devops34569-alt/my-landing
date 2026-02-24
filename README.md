# YOUNIBUS - 강사 프로필 홍보 사이트

> 서비스 기획 전문가 유니(윤미영)의 공식 프로필 & 포트폴리오 웹사이트

![YOUNIBUS](https://img.shields.io/badge/YOUNIBUS-v1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

---

## 📋 프로젝트 개요

**YOUNIBUS**는 15년 경력의 서비스 기획 전문가 유니(윤미영) 강사의 프로필, 경력, 레퍼런스, 리뷰를 효과적으로 홍보하고 잠재 고객과의 소통을 위한 프로페셔널 웹사이트입니다.

### 🎯 주요 목표

- ✅ 강사의 전문성과 경력을 시각적으로 효과적하게 전달
- ✅ 3D 인터랙티브 배너로 현대적이고 세련된 첫인상 제공
- ✅ 레퍼런스 및 리뷰를 통한 신뢰도 구축
- ✅ 문의 및 리뷰 시스템을 통한 양방향 소통 강화
- ✅ 모바일 친화적인 반응형 디자인

---

## ✨ 현재 완료된 주요 기능

### 1. 🏠 홈 섹션 (Hero Section)
- **Spline 3D 배너**: 인터랙티브한 3D 유리 커서 효과
- **핵심 통계**: 15년 경력, 50+ 프로젝트, 1000+ 교육생
- **CTA 버튼**: 문의하기, 더 알아보기
- **스크롤 인디케이터**: 부드러운 섹션 이동

### 2. 👤 소개 섹션 (About)
- **프로필 사진**: 전문적인 강사 이미지
- **상세 정보**: 이름, 연락처, 이메일
- **전문 분야**: 서비스 기획, UX/UI, PM, 데이터 분석 등
- **경력 요약**: 15년 이상의 현장 경험 소개

### 3. 💼 경력 섹션 (Experience)
- **타임라인 디자인**: 시간순 경력 표시
- **주요 경력**:
  - 2011.06 - 현재: 프리랜서 강사 & 컨설턴트
  - 2009.11 - 2011.05: 삼성에듀 주임
  - 2006.10 - 2009.10: 아윌패스 사원
- **애니메이션 효과**: 스크롤 시 나타나는 애니메이션

### 4. 📁 레퍼런스 섹션 (References)
- **필터 기능**: 전체 / 강의 / 컨설팅 / 워크샵
- **카드 레이아웃**: 프로젝트별 상세 정보
- **데이터베이스 연동**: RESTful API를 통한 실시간 데이터 로딩
- **샘플 레퍼런스**:
  - 삼성전자 임직원 교육
  - 스타트업 액셀러레이팅 프로그램
  - LG CNS 디지털 전환 워크샵

### 5. ⭐ 리뷰 섹션 (Reviews)
- **리뷰 카드**: 수강생 후기 표시
- **평점 시스템**: 5점 만점 별점
- **리뷰 작성 기능**: 모달 폼을 통한 리뷰 제출
- **승인 시스템**: 검토 후 게시 (is_approved 필드)
- **샘플 리뷰**: 3개의 실제 스타일 리뷰

### 6. 📬 문의 섹션 (Contact)
- **문의 폼**: 이름, 이메일, 연락처, 제목, 내용
- **실시간 제출**: DB에 즉시 저장
- **상태 관리**: pending / in_progress / completed
- **연락 정보**: 이메일, 전화번호, 응답 시간
- **시각적 요소**: 업로드된 일러스트레이션 이미지

### 7. 🎨 UI/UX 특징
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **다크/라이트 섹션**: 명확한 섹션 구분
- **부드러운 애니메이션**: AOS 라이브러리 활용
- **모던 디자인**: 그라디언트, 카드, 섀도우 효과
- **접근성**: 시맨틱 HTML, ARIA 라벨

---

## 🗂️ 데이터베이스 구조

### 📊 테이블 스키마

#### 1. `inquiries` (문의)
```javascript
{
  id: "UUID",
  name: "문의자 이름",
  email: "이메일",
  phone: "연락처",
  subject: "문의 제목",
  message: "문의 내용",
  status: "pending|in_progress|completed",
  created_date: "날짜"
}
```

#### 2. `reviews` (리뷰)
```javascript
{
  id: "UUID",
  author_name: "작성자 이름",
  author_title: "직함/소속",
  rating: 1-5,
  content: "리뷰 내용",
  course_name: "수강한 강의명",
  is_approved: true|false,
  created_date: "날짜"
}
```

#### 3. `references` (레퍼런스)
```javascript
{
  id: "UUID",
  title: "레퍼런스 제목",
  company: "회사/기관명",
  description: "프로젝트 설명",
  category: "강의|컨설팅|워크샵|서비스기획",
  date: "진행 기간",
  image_url: "이미지 URL",
  tags: ["태그1", "태그2"],
  order: 정렬순서
}
```

---

## 🔗 API 엔드포인트

### 기본 URL
모든 API는 상대 경로 `/tables/{table_name}`으로 접근합니다.

### 사용 가능한 엔드포인트

#### 레퍼런스 조회
```
GET /tables/references?limit=100&sort=order
```

#### 리뷰 조회 (승인된 것만)
```
GET /tables/reviews?limit=100&sort=-created_date
필터링: is_approved === true
```

#### 문의 제출
```
POST /tables/inquiries
Body: { name, email, phone, subject, message, status, created_date }
```

#### 리뷰 제출
```
POST /tables/reviews
Body: { author_name, author_title, rating, content, course_name, is_approved, created_date }
```

---

## 📁 프로젝트 구조

```
YOUNIBUS/
├── index.html              # 메인 HTML 페이지
├── css/
│   └── style.css          # 메인 스타일시트 (반응형)
├── js/
│   └── main.js            # JavaScript 기능 (API, 폼, 애니메이션)
└── README.md              # 프로젝트 문서
```

---

## 🛠️ 사용된 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션, 그라디언트
- **JavaScript (ES6+)**: Async/Await, Fetch API, DOM 조작

### 라이브러리 & CDN
- **Google Fonts**: Noto Sans KR (한글 웹폰트)
- **Font Awesome 6.4.0**: 아이콘
- **Animate.css 4.1.1**: CSS 애니메이션
- **AOS 2.3.4**: 스크롤 애니메이션
- **Spline 3D**: 인터랙티브 3D 배너

### Backend & Database
- **RESTful Table API**: 데이터 CRUD
- **JSON**: 데이터 포맷

---

## 🚀 사용 방법

### 1. 파일 구조 확인
프로젝트의 모든 파일이 올바른 위치에 있는지 확인하세요.

### 2. 로컬 서버 실행
정적 파일 서버 또는 Live Server를 사용하여 `index.html`을 실행하세요.

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# VS Code Live Server 확장 프로그램 사용
```

### 3. 브라우저에서 확인
```
http://localhost:8000
```

### 4. 배포
Publish 탭을 통해 배포하면 즉시 온라인으로 접근 가능합니다.

---

## 📝 관리자 기능 (향후 개발 권장)

현재는 공개 프론트엔드만 구현되어 있습니다. 아래 기능은 향후 추가 개발을 권장합니다:

### 🔐 관리자 페이지 (Admin Panel)
- [ ] 문의 관리 (조회, 상태 변경, 답변)
- [ ] 리뷰 승인/거부 시스템
- [ ] 레퍼런스 추가/수정/삭제
- [ ] 대시보드 (통계, 최근 활동)

### 📊 분석 & 통계
- [ ] 방문자 수 추적
- [ ] 문의 통계
- [ ] 리뷰 평균 평점 계산
- [ ] 인기 레퍼런스 분석

---

## 🎨 디자인 커스터마이징

### 색상 변경
`css/style.css` 파일의 `:root` 변수를 수정하세요:

```css
:root {
    --primary-color: #2563eb;      /* 메인 색상 */
    --secondary-color: #10b981;    /* 보조 색상 */
    --accent-color: #f59e0b;       /* 강조 색상 */
    /* ... */
}
```

### 폰트 변경
HTML `<head>` 섹션에서 Google Fonts 링크를 변경하세요.

### 3D 배너 교체
`index.html`의 Spline iframe URL을 원하는 3D 디자인으로 교체하세요.

---

## 📱 반응형 브레이크포인트

- **모바일**: < 480px
- **태블릿**: 480px - 768px
- **노트북**: 768px - 1024px
- **데스크톱**: > 1024px

---

## 🐛 알려진 이슈 & 해결 방법

### 이슈 1: Spline 3D 로딩이 느림
**해결**: iframe에 `loading="lazy"` 속성이 추가되어 있습니다. 인터넷 속도에 따라 초기 로딩 시간이 다를 수 있습니다.

### 이슈 2: 모바일에서 3D 배너가 무거움
**해결**: 모바일에서는 3D 배너 대신 정적 이미지나 간단한 그라디언트로 대체할 수 있습니다.

---

## 🔄 업데이트 내역

### v1.0.0 (2026-02-14)
- ✅ 초기 프로젝트 구축
- ✅ 전체 섹션 구현 (Hero, About, Experience, References, Reviews, Contact)
- ✅ RESTful API 연동
- ✅ 반응형 디자인 완성
- ✅ 문의 및 리뷰 폼 기능
- ✅ 3D 인터랙티브 배너 적용

---

## 🤝 기여 & 피드백

이 프로젝트는 YOUNIBUS의 공식 웹사이트입니다. 
피드백이나 개선 제안은 문의 폼을 통해 연락 주세요!

**연락처**:
- 📧 Email: Yuhki20@gmail.com
- 📱 Phone: 010-7749-2322

---

## 📄 라이선스

Copyright © 2026 YOUNIBUS. All rights reserved.

---

## 🎓 향후 개발 계획

### Phase 2 (권장 사항)
1. **블로그/뉴스 섹션** 추가
   - 강의 후기, 인사이트 공유
   - 마크다운 에디터

2. **온라인 예약 시스템**
   - 강의 일정 캘린더
   - 실시간 예약 가능

3. **강의 자료 다운로드**
   - PDF, PPT 등 자료 제공
   - 회원 전용 콘텐츠

4. **다국어 지원**
   - 한국어/영어 전환
   - i18n 라이브러리 사용

5. **SEO 최적화**
   - 메타 태그 강화
   - 구조화된 데이터 (Schema.org)
   - 사이트맵 생성

6. **성능 최적화**
   - 이미지 최적화 (WebP)
   - 코드 minification
   - CDN 사용

---

## 💡 팁 & 베스트 프랙티스

1. **정기적인 데이터 백업**: 레퍼런스와 리뷰 데이터를 주기적으로 백업하세요.
2. **리뷰 모니터링**: 새로운 리뷰를 정기적으로 확인하고 승인하세요.
3. **문의 응답**: 문의에 대한 빠른 응답으로 신뢰도를 높이세요.
4. **콘텐츠 업데이트**: 레퍼런스를 최신 상태로 유지하세요.
5. **모바일 테스트**: 다양한 기기에서 테스트하세요.

---

**Made with ❤️ by YOUNIBUS Team**

*서비스 기획의 새로운 패러다임을 만들어갑니다.*