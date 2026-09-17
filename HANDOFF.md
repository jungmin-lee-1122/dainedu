# 다인교육 동탄점 웹사이트 — 작업 인수인계

> 이 문서를 그대로 AI 코딩 도구(Codex / Cursor 등)의 첫 프롬프트로 붙여넣으세요.
> 작업 시작 전 이 문서 전체를 먼저 읽고, 아래 규칙을 지켜 이어서 개발하면 됩니다.

---

## 0. 당신의 역할

당신은 이 프로젝트를 이어받는 프론트엔드 개발자입니다.
저장소: `https://github.com/jungmin-lee-1122/dainedu` · 배포: Vercel → `https://home.dainedu.co.kr`

**의뢰인은 개발자가 아닙니다.** 코드 설명은 최소화하고, 무엇이 어떻게 바뀌는지를
일상어로 알려주세요. 코드 주석은 한국어로 답니다.

---

## 1. 프로젝트 목적과 핵심 기능

경기도 화성시 동탄에 **2026년 10월 신규 오픈하는 입시학원(다인교육 동탄점 / 다인아카데미)**의
공식 웹사이트입니다. 인계받은 단일 HTML 랜딩페이지를 Next.js 앱으로 옮긴 뒤 페이지를 계속 늘려왔습니다.

핵심 기능:

1. **브랜드 소개** — 메인 롤링 배너, 두 개 전문관(포르타/클라비스) 진입 카드, 인사말, 시설 안내
2. **모집 안내** — 고등·N수 과정별 상세 페이지, 2027 윈터스쿨 상세 페이지
3. **설명회 예약** — 이벤트/설명회 목록 → 상세 → 예약 신청서 → **구글 시트 저장**
4. **온라인 상담** — 상담 폼 → **구글 시트 저장**
5. 모바일 대응 — 햄버거 메뉴, 하단 고정 CTA, `-m` 접미사 모바일 전용 이미지

---

## 2. 기술 스택 — 반드시 확인할 것

| 항목 | 값 | 주의사항 |
|---|---|---|
| Next.js | **16.3.0** (App Router + Turbopack) | **학습 데이터의 Next.js와 다릅니다.** 아래 ⚠️ 참고 |
| React | 19.2.8 | |
| TypeScript | 5.x | `npx tsc --noEmit --incremental false` 로 검사 |
| 스타일 | **`app/globals.css` 단일 파일** | CSS 모듈·Tailwind 미사용 |
| 외부 라이브러리 | **없음** | 슬라이더·모달·폼 전부 직접 구현 |
| 데이터 저장 | Google Apps Script 웹앱 → 구글 시트 | DB 없음 |

### ⚠️ Next.js 16 관련 필수 주의

- 루트의 `AGENTS.md`(= `CLAUDE.md`)는 **`next dev`가 자동 생성·재작성**합니다. 임의로 지우지 마세요.
- 코드 작성 전 `node_modules/next/dist/docs/` 의 해당 가이드를 확인하세요. API가 바뀌었을 수 있습니다.
- **동적 라우트의 `params`는 Promise 입니다.** 반드시 `await` 하세요.
  ```tsx
  export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  }
  ```

### ⚠️ 이 코드베이스만의 특이한 관례 (그대로 따를 것)

1. **레거시 HTML은 템플릿 문자열 + `dangerouslySetInnerHTML`**
   `app/landingMarkup.ts`, `app/register/registerMarkup.ts`, `app/event/reserveModal.ts`,
   `app/quickMenu.ts`, `app/mobileMenu.ts` 는 JSX가 아니라 **HTML 문자열**입니다.
   인계받은 원본을 최대한 보존하려는 의도이니 JSX로 갈아엎지 마세요.

2. **페이지 스크립트도 템플릿 문자열**
   `*Script.ts` 파일들은 JS 코드를 문자열로 담아 `<Script dangerouslySetInnerHTML>` 로 주입합니다.
   - 정규식의 `\d` `\s` `\.` 는 **`\\d` `\\s` `\\.` 로 이스케이프**해야 합니다.
     (과거 이것 때문에 스크립트 전체가 죽은 적 있음. 가능하면 `[0-9]` 처럼 백슬래시 없는 표현 사용)
   - `${...}` 는 보간으로 해석되니 주의.
   - 문법 검사 방법은 6장 참고.

3. **섹션 숨김은 JSX 주석이 아니라 boolean 플래그**
   `{/* ... */}` 로 감싸면 내부 `*/` 때문에 TS1381 에러가 납니다.
   ```tsx
   const SHOW_TEACHERS = false;
   {SHOW_TEACHERS && ( <section>…</section> )}
   ```
   현재 켜져 있는 플래그: `clavis|porta/page.tsx` 의 `SHOW_BODY=true` `SHOW_TEACHERS=false`,
   `space/page.tsx` 의 `SHOW_HERO/INTRO/LAYOUT/CTA = false` (신규 시설 구성·차별점 + 공간 미리보기 노출 중)

4. **`hidden` 속성을 쓸 땐 CSS `display` 와 충돌 주의**
   `.foo{display:flex}` 가 `hidden`을 덮어써서 **투명한 요소가 화면 전체를 덮고 클릭을 막은 사고**가 있었습니다.
   `hidden`을 쓰는 요소에는 반드시 `[hidden]{display:none !important}` 를 같이 넣으세요.

5. **반응형 이미지 규칙** — PC `foo.png` / 모바일 `foo-m.png`
   ```html
   <picture><source media="(max-width:900px)" srcset="/x-m.png"/><img src="/x.png"/></picture>
   ```
   규격: 메인 슬라이드 PC `2262×770` · 모바일 `1080×1080`, 메인 포스터 `1285×1512`

6. **헤더·푸터는 모든 페이지에 필수**
   새 페이지를 만들면 반드시 `<SiteHeader />` 와 `<SiteFooter />` 를 넣습니다. (의뢰인 명시 요구)
   퀵메뉴 `quickMenuMarkup` 도 함께 넣는 것이 관례입니다.

7. **모바일에서 헤더는 `position:sticky`** (PC는 `fixed`)
   그래서 첫 섹션의 `padding-top`이 PC 150px / 모바일 34px 로 다릅니다. 새 페이지도 이 패턴을 따르세요.

---

## 3. 브랜드 규칙

```css
--dn-navy:#24365A   --dn-deep:#10192E   --dn-gold:#C0994F
--dn-gold-soft:#D9BE8C   --dn-cream:#FAF8F3   --dn-line:#E3DCCB
```

- 대표번호 **1644-0224** (직통 031-8003-0221 / 0222 / 0224)
- 상호 다인아카데미 · 대표 (주)다인교육 · 사업자등록번호 421-85-03313
- 개인정보보호책임자 김양현 · 경기도 화성시 동탄 메타폴리스로 53, 6층
- SNS: 유튜브 `@dain-edu` · 블로그 `blog.naver.com/dainacademy_official` · 인스타 `dainedu_dongtan`
  (카카오톡은 채널 미개설 → 주석 처리됨)

**과정 명칭 — 최근 전면 개편됨. 옛 이름 쓰지 말 것.**

| 옛 이름 | 현재 이름 | 경로 |
|---|---|---|
| 고등 클라비스 | **포르타 고등전문관** (PORTA H) | `/porta` |
| N수 아우룸 | **클라비스 N수전문관** (CLAVIS N) | `/clavis` |

> ⚠️ "클라비스"가 고등 → N수로 **자리를 옮긴 교차 변경**입니다. 헷갈리기 쉬우니 주의.
> `/aurum` → `/clavis` 리다이렉트가 `next.config.ts` 에 있습니다.

---

## 4. 완성된 부분 — 파일 구조

```
app/
├─ layout.tsx                  # 공통 메타데이터·OG
├─ globals.css                 # ★ 전체 스타일 (약 2,540줄, 44개 번호 섹션)
├─ SiteHeader.tsx              # 공용 헤더 — 카테고리 메뉴·수능 D-day·과정 토글
├─ SiteFooter.tsx              # 공용 푸터 — SNS 주소는 상단 SNS 객체에서 관리
├─ quickMenu.ts                # 우측 고정 퀵메뉴 (HTML 문자열)
├─ mobileMenu.ts               # .dn-gnb 를 읽어 모바일 드로어 자동 생성
│
├─ page.tsx / landingMarkup.ts / landingScript.ts      # 메인
├─ greeting/    page.tsx · greetingData.ts · greetingScript.ts · PillarArt.tsx
│               └─ public/greeting/system-{lecture|care}-3d.webp
├─ porta/       page.tsx · portaData.ts · portaScript.ts   # 고등 (스크립트는 clavis와 공용)
├─ clavis/      page.tsx · clavisData.ts                   # N수 (portaScript 를 import)
├─ winter/      page.tsx · winterData.ts · winterScript.ts # 2027 윈터스쿨
├─ teachers/    page.tsx · [id]/page.tsx · teachersData.ts · teachersScript.ts
├─ schedule/    page.tsx · [id]/page.tsx · scheduleData.ts
├─ about/location/ page.tsx · locationScript.ts             # 오시는 길
├─ space/       page.tsx · spaceData.ts · spaceScript.ts
├─ consult/     page.tsx · consultScript.ts                # 온라인 상담
├─ event/       page.tsx · [id]/page.tsx · eventData.ts · eventScript.ts · reserveModal.ts
├─ register/    page.tsx · registerMarkup.ts               # 구 사전등록 (레거시)
└─ api/         consult/ · register/ · reserve/ · schools/ route.ts
```

**설계 원칙: 화면(page.tsx) / 내용(*Data.ts) / 동작(*Script.ts) 분리.**
문구·일정·이미지 경로 수정은 **`*Data.ts` 만** 건드리면 됩니다. 이 구조를 깨지 마세요.

### 페이지별 완성 상태

| 경로 | 내용 | 상태 |
|---|---|---|
| `/` | 롤링 배너, 포스터, 전문관 2개 카드, 푸터, BGM | 완료 |
| `/greeting` | 인사말 — 사진 히어로(강의·관리 붓글씨 강조), 편지글, 3D 일러스트 ACADEMIC SYSTEM 카드 2장, CTA | 완료 |
| `/porta` `/clavis` | 히어로 슬라이더, 그랜드오픈 배너, 공지·설명회, 유튜브 클립, 사이드 배너 | 완료(선생님 섹션 숨김) |
| `/winter` | itall.com 오마주 — KV·고정 탭바·혜택·커리큘럼·FAQ | 완료 |
| `/teachers` `/teachers/[id]` | URL 과목 필터·강사 카드·상세 프로필·개설 강좌 연결 | 완료(실제 강사 정보·사진 대기) |
| `/schedule` `/schedule/[id]` | 모집대상·과목 필터 / PC 표·모바일 카드 / 강좌 상세·계획서 | 완료(실제 강좌 데이터 대기) |
| `/about/location` | 프리미엄 히어로·지도·지도 앱 바로가기·교통/주차·도착 안내 | 완료 |
| `/space` | 시설 구성 9개·차별점 3개 + 렌더링 도면 탭 (기존 히어로·영상·4개 관·CTA는 플래그로 숨김) | 완료(시설 실사진 교체 대기) |
| `/consult` | 상담 폼 → 구글 시트 | **동작 확인됨** |
| `/event` `/event/[id]` | 설명회 목록·필터 / 상세 + 우측 예약 신청서 | **동작 확인됨** |

### 2026-09-17 인사말 페이지 최근 변경 사항

`/greeting` 페이지는 기존 완성본에서 아래 항목이 추가로 수정되었습니다.

1. **ACADEMIC SYSTEM 카드 일러스트를 3D 이미지로 교체**
   - 기존 `PillarArt.tsx`의 직접 그린 평면 SVG를 제거하고 `next/image` 기반 이미지 컴포넌트로 단순화했습니다.
   - 새 에셋:
     - `public/greeting/system-lecture-3d.webp` — 책·칠판·펜
     - `public/greeting/system-care-3d.webp` — 체크리스트·달력
   - 두 파일 모두 투명 배경 WebP이며 각각 약 115KB / 85KB입니다.
   - PC·모바일 공통 크기와 위치는 `globals.css`의 `.gr-art`, 관리 이미지의 개별 비율은 `.gr-art-care`에서 조정합니다.
   - `PillarArt.tsx`가 이미지 종류에 따라 `.gr-art-lecture` / `.gr-art-care` 클래스도 출력하므로, 강의 이미지만 별도로 조정하려면 `.gr-art-lecture` 규칙을 추가하면 됩니다.
   - 원본 생성 이미지가 아니라 위 WebP 파일이 실제 사이트용 최종 에셋입니다.

2. **카드 제목 한 줄 고정**
   - `.gr-pillar-title`에 `white-space:nowrap`을 적용했습니다.
   - 특히 `배운 것을 실력으로 만드는 관리`가 두 줄로 갈라지지 않도록 한 의뢰인 요청입니다.
   - 모바일에서 문구나 글자 크기를 바꿀 때 카드 폭을 넘지 않는지 확인하세요.

3. **히어로의 `강의`, `관리`만 붓글씨로 강조**
   - `greetingData.ts`의 `<b>강의</b>`, `<b>관리</b>` 구조는 그대로 유지합니다.
   - `layout.tsx`의 Google Fonts 요청에 `Nanum Brush Script`를 추가했습니다.
   - `.gr-hero-line b`에만 해당 글꼴을 적용했으며, 색상은 기존 `var(--dn-gold)`를 유지합니다.
   - 나머지 `프리미엄`, `두 축이 완성하는 겨울`은 기존 Pretendard 계열 그대로입니다.

4. **검증 완료**
   - `npx tsc --noEmit --incremental false` 통과
   - CSS 중괄호 수 일치
   - `npm run build` 통과 (전체 20개 정적 페이지 생성 확인)

> 인사말 페이지 스타일은 `globals.css`의 `42) 인사말 (/greeting)` 구역에 모여 있습니다.
> 3D 일러스트는 의도적으로 카드 오른쪽 아래에 배치되어 있으므로, 교체 시 투명 여백과 이미지 종횡비를 함께 확인하세요.

### 2026-09-17 시설안내 페이지 최근 변경 사항

- `/space`의 기존 `공간 미리보기` 바로 위에 첨부 레퍼런스를 따른 시설 소개 섹션을 추가했습니다.
- 상단에는 `시설안내` 제목과 소개 문구, 본문에는 **시설 구성 9개 카드**와 **차별점 Key Point 3개 카드**가 표시됩니다.
- 내용과 임시 이미지 경로는 `app/space/spaceData.ts`의 `facilityItems`, `facilityPoints`에서 관리합니다.
- 현재 시설 사진은 예시용으로 기존 `/space`, `/winter` 이미지를 재사용합니다. 실제 사진을 받으면 `facilityItems[].img`만 교체하세요.
- 화면은 데스크톱 3열, 태블릿 2열, 모바일 1열로 반응합니다.
- 관련 JSX는 `app/space/page.tsx`, 스타일은 `globals.css`의 `32) 시설 안내 (/space)` 구역에 있습니다.
- 기존 `renderings` 탭과 숨김 플래그 섹션은 삭제하지 않고 그대로 유지했습니다.
- 타입 검사, CSS 중괄호 검사, `npm run build`까지 통과했습니다.

### 2026-09-17 강사진 · 단과시간표 구조 확장

평촌 5A 아카데미 사이트는 **정보 구조와 동작 흐름만 참고**했고, 화면은 다인교육의 네이비·골드·크림 디자인으로 새로 구현했습니다.

1. **강사진 목록 `/teachers`**
   - `?subject=`를 사용하는 URL 기반 과목 필터입니다. 새로고침하거나 링크를 공유해도 선택 과목이 유지됩니다.
   - 카드에는 대상 태그·과목·이름·사진이 보이고, PC 호버 시 한 줄 소개와 약력이 나타납니다.
   - 모바일은 참고 사이트처럼 2열 카드이며 호버 레이어는 숨깁니다.
   - 각 카드는 `/teachers/[id]` 상세 페이지로 연결됩니다.

2. **강사 상세 `/teachers/[id]`**
   - 과목 탭 → 같은 과목의 강사 얼굴 선택줄 → 프로필/약력 → `강사 소개`·`개설 강좌` 탭 순서입니다.
   - 탭 상태는 `?view=intro|courses`, 과목 상태는 `?subject=`로 유지합니다.
   - 실제 사진·소개 포스터·영상이 없어도 준비 중 화면이 깨지지 않도록 처리했습니다.
   - 동적 라우트의 `params`, `searchParams`는 Next.js 16 규칙대로 모두 `await` 합니다.

3. **단과시간표 `/schedule`**
   - 모집대상 탭과 과목 필터를 조합해 강좌를 찾습니다.
   - PC에서는 표, 모바일에서는 카드 목록으로 자동 전환합니다.
   - 강사와 강좌 제목에서 각각 강사 상세·강좌 상세로 이동합니다.
   - 공용 헤더와 메인 랜딩 메뉴의 `모집안내` 하위에 `단과시간표` 링크를 추가했습니다.

4. **강좌 상세 `/schedule/[id]`**
   - 강사 영역, 대상·태그, 개강일·기간·시간·수강료·교재, 강의 계획서 영역으로 구성됩니다.
   - 강의 계획서 이미지가 없으면 브랜드형 준비 중 화면을 표시합니다.

5. **데이터 수정 위치**
   - 강사: `app/teachers/teachersData.ts`
   - 강좌·모집대상 탭: `app/schedule/scheduleData.ts`
   - `teachersData.ts`는 기존 14명 Coming Soon 데이터를 유지하면서 `teacher-01` 형식의 안정적인 ID와 대상 태그를 부여합니다.
   - `scheduleData.ts`의 6개 강좌는 **화면 구성을 확인하기 위한 예시**입니다. 실제 편성 확정 후 반드시 교체하세요.
   - 스타일은 `globals.css`의 `43) 강사진 상세 · 단과시간표` 구역에 모여 있습니다.

### 2026-09-17 오시는 길 페이지 신규 제작

- 경로: `/about/location`
- 주소: `경기도 화성시 동탄구 반송동 92-7`
- 도로명/층 안내: `경기도 화성시 동탄 메타폴리스로 53, 6층`
- 페이지 구성: 프리미엄 네이비·골드 히어로 → 주소 기반 Google 지도 임베드 → 네이버지도·카카오맵·전화 버튼 → 대중교통·자가용·주차 안내 → 3단계 도착 안내 → 대표전화 CTA
- 지도는 별도 API 키 없이 주소 검색형 Google Maps iframe을 사용합니다.
- 확인되지 않은 버스 번호나 소요 시간은 임의로 넣지 않았습니다. 실제 교통 정보가 확정되면 `app/about/location/page.tsx`의 `routeCards`를 수정하세요.
- 공용 헤더와 메인 랜딩페이지의 `학원소개 → 오시는 길` 링크를 `/about/location`으로 연결했습니다.
- 스타일은 `globals.css`의 `44) 오시는 길` 구역에 있습니다.

### 구글 시트 연동 (3개, 모두 동일 패턴)

```
브라우저 폼 → fetch POST /api/{consult|reserve|register}
           → route.ts 가 서버에서 검증 후 Apps Script 웹앱으로 전달
           → 시트에 appendRow
```

| 환경변수 | 용도 | .gs 파일 | 상태 |
|---|---|---|---|
| `CONSULT_WEBHOOK_URL` | 온라인 상담 | `google-apps-script-consult.gs` | 연결됨 |
| `RESERVE_WEBHOOK_URL` | 설명회 예약 | `google-apps-script-reserve.gs` | 연결됨 |
| `SHEET_WEBHOOK_URL` | 구 사전등록 | `google-apps-script.gs` | 레거시 |

**자가진단 엔드포인트**: `GET /api/reserve?test=1` → 실제로 시트에 테스트 행을 넣고 구글 응답을 그대로 보여줍니다.
연동이 의심되면 이것부터 여세요.

> 💡 과거 삽질 기록: Apps Script는 반드시 **스프레드시트 안에서 `확장 프로그램 → Apps Script`** 로 만들어야
> `getActiveSpreadsheet()` 가 동작합니다. 독립형으로 만들면 `doGet`은 성공하는데 저장만 실패해 원인 찾기가 어렵습니다.
> 액세스 권한은 **"모든 사용자"**(× "Google 계정이 있는 모든 사용자"), 코드 수정 후엔 **"새 버전"으로 재배포** 필수.
> Vercel 환경변수는 저장만으로 반영되지 않고 **Redeploy** 해야 합니다.

---

## 5. 다음에 이어서 할 일 (Next Steps)

### 🔴 우선순위 1 — 외부 의존성 제거

**Higgsfield 앱 링크 19곳이 죽어 있습니다.**
`https://dain-edu.higgsfield.app/seminar` 로 연결된 곳들이 "temporarily unavailable" 상태입니다.
새로 만든 `/event` 페이지가 이 역할을 대체하므로 **전부 `/event` 로 교체**하는 것이 좋습니다.

```bash
grep -rn "dain-edu.higgsfield.app" app/
```

대상: `SiteHeader.tsx` 상단 공지바, `landingMarkup.ts`(슬라이드 4 + 포스터 + 배너),
`porta|clavis/*Data.ts` 사이드 배너·설명회 링크, `teachers|space|porta|clavis/page.tsx` CTA, `layout.tsx` metadataBase

### 🟠 우선순위 2 — 실제 콘텐츠 투입

1. **설명회 데이터 교체** — `app/event/eventData.ts` 의 4건은 **예시 더미**입니다. 실제 일정으로 교체 필요.
2. **강사진** — `app/teachers/teachersData.ts` 14명 전원 "Coming Soon". 실명·사진·경력 대기 중.
3. **공지사항** — `porta|clavis/*Data.ts` 의 `notices` / `lectures` 가 더미.
4. **포르타 히어로 배너** — 슬라이드 3~5번 이미지가 없어 2장만 노출 중.
   실제 배너가 나오면 `portaData.ts` 의 `heroSlides` 에 항목만 추가하면 됩니다.

### 🟡 우선순위 3 — 미완성 링크 정리

빈 앵커로 남아 연결되지 않는 메뉴들:

| 메뉴 | 현재 | 필요한 작업 |
|---|---|---|
| 학원소개 → 운영시스템 | `#system` | 페이지 신규 제작 |
| 콘텐츠 (3개 항목) | `#contents` | 영단어 테스트 등 기능 기획 필요 |
| 푸터 이용약관 / 개인정보 처리방침 | `#terms` `#privacy` | **법적 필수 문서. 빠르게 채울 것** |
| 공지사항 "전체보기 +" | `#notice` | 목록 페이지 신규 제작 |

### 🟢 우선순위 4 — 개선 과제

- **관리자 CMS** — 지금은 공지·설명회 추가 시 `*Data.ts` 를 고쳐 재배포해야 합니다.
  의뢰인이 직접 등록할 수 있는 관리 화면이 필요합니다. (`*Data.ts` → API 교체 방식으로 설계되어 있음)
- **SMS 인증** — 예약 폼에 휴대전화 인증번호 발송 기능 미구현 (알리고/NHN 등 유료 계약 필요)
- **예약 중복 방지** — 같은 번호로 여러 번 신청 가능
- **접근성** — 색 대비, 키보드 포커스 순서 점검 안 됨
- `poster-dain.png` `poster-dain2.png` `slide-1~3.png` 등 **미사용 이미지 정리**

---

## 6. 작업 규칙과 검증 방법

### 변경 후 반드시 실행할 3가지

```bash
# 1) 타입 검사
npx tsc --noEmit --incremental false

# 2) CSS 중괄호 균형 (globals.css 를 정규식으로 편집했다면 필수)
node -e "const s=require('fs').readFileSync('app/globals.css','utf8');console.log(s.split('{').length-1, s.split('}').length-1)"

# 3) 템플릿 문자열 안 JS 문법 검사 (*Script.ts 를 고쳤다면 필수)
node -e "
const fs=require('fs');
const src=fs.readFileSync('app/event/eventScript.ts','utf8');
const re=/export const (\w+) = \`([\s\S]*?)\`;/g; let m;
while((m=re.exec(src))){ try{ new Function(m[2].replace(/\\\$\{[a-zA-Z]+\}/g,';')); console.log('OK',m[1]); }
catch(e){ console.log('FAIL',m[1],e.message); } }
"
```

`npm run build` 는 로컬에서 돌려도 되지만, 최종 확인은 Vercel 배포 로그로 합니다.

### 커밋·배포

```bash
git add -A && git commit -m "변경 내용" && git push   # → Vercel 자동 배포
```

- `.git/index.lock` 에러가 나면 `rm -f .git/index.lock` 후 재시도
- `node_modules` 는 `.gitignore` 에 있습니다. iCloud 동기화 폴더라 커밋하면 git이 멈춥니다.
- 환경변수를 바꿨다면 **반드시 Redeploy**

### 하지 말아야 할 것

- ❌ `globals.css` 를 CSS 모듈/Tailwind 로 마이그레이션 (의뢰인이 직접 수정하는 파일)
- ❌ `*Markup.ts` 의 HTML 문자열을 JSX로 변환
- ❌ 외부 UI 라이브러리 도입
- ❌ 화면/내용/동작 3분할 구조 변경
- ❌ **기존 섹션을 임의로 삭제** — 의뢰인이 가장 싫어합니다. 숨길 땐 반드시 boolean 플래그로
- ❌ 토큰·비밀키를 코드에 하드코딩하거나 대화창에 노출

---

## 7. 첫 작업 제안

가장 먼저 **우선순위 1 (Higgsfield 링크 19곳 → `/event` 교체)** 을 처리하세요.
현재 사이트에서 **실제로 깨져 있는 유일한 문제**이고, 교체 범위가 명확합니다.

작업 전 `grep -rn "dain-edu.higgsfield.app" app/` 로 전체 목록을 뽑고,
각 링크가 "설명회 참석 유도"인지 "사전등록"인지 문맥을 보고 목적지를 정한 뒤,
의뢰인에게 교체 목록을 보여주고 확인받은 다음 반영하는 것을 권합니다.
