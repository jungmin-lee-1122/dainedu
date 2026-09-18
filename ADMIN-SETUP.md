# 관리자 페이지 설정 안내

주소: **`https://home.dainedu.co.kr/admin`**

처음 한 번만 아래 설정을 해두면, 그다음부터는 로그인해서 내용을 직접 고치실 수 있습니다.
순서대로 따라 하시면 되고, 중간에 막히면 어디서 막혔는지만 알려주세요.

---

## 1단계 — 패키지 설치 (맥 터미널)

```bash
cd ~/Desktop/dainedu
npm install
git add -A && git commit -m "관리자 페이지 추가" && git push
```

`npm install` 은 새로 필요해진 부품 두 개(데이터베이스, 사진 저장소)를 내려받는 명령입니다.

---

## 2단계 — 데이터베이스 만들기 (Neon)

관리자가 입력한 강사·강좌·공지·설명회가 저장되는 곳입니다.

1. Vercel → 프로젝트 **dainedu** → 상단 **Storage** 탭
2. **Create Database** → 목록에서 **Neon (Serverless Postgres)** 선택
3. 플랜은 **Free**, 지역은 **Singapore** 또는 **Tokyo** 를 고르세요 (한국에서 가장 빠릅니다)
4. **Connect to Project** 로 dainedu 프로젝트에 연결

연결하면 `DATABASE_URL` 환경변수가 **자동으로 등록됩니다.** 직접 입력하실 필요 없습니다.

> 💡 예전에는 "Vercel Postgres" 라는 이름이었는데, 2025년에 Neon 으로 넘어갔습니다.
> Vercel 안에서 만들고 Vercel 로 청구되는 건 똑같습니다.

---

## 3단계 — 사진 저장소 만들기 (Blob)

강사 사진, 시설 사진을 올리는 곳입니다.

1. 같은 **Storage** 탭 → **Create** → **Blob**
2. 접근 방식은 반드시 **Public** 을 고르세요
3. 이름은 아무거나 (예: `dainedu-images`)
4. **Connect to Project** 로 dainedu 에 연결

> ⚠️ **Private 으로 만들면 안 됩니다.**
> Private 저장소의 사진은 **공개 주소가 없어서 사이트 방문자가 볼 수 없습니다.**
> (계약서·내부 문서처럼 숨겨야 할 파일용입니다.)
> 또 Private 은 `BLOB_READ_WRITE_TOKEN` 을 만들지 않으니, 그 값이 안 보인다면
> Private 으로 만들어진 것입니다. Public 으로 새로 만들어 연결하세요.

Public 으로 연결하면 `BLOB_READ_WRITE_TOKEN` 이 자동 등록됩니다.
로컬(`npm run dev`)에서도 쓰시려면 저장소의 **Projects 탭 → ⋯ → Update Project Connection**
에서 **Development** 까지 체크한 뒤 `vercel env pull` 하시면 됩니다.

무료 용량은 **1GB 저장 · 월 10GB 전송** 입니다. 사진 한 장을 300KB로 잡으면 3,000장 정도라
학원 사이트에는 넉넉합니다.

---

## 4단계 — 관리자 비밀번호 정하기

1. Vercel → **Settings → Environment Variables**
2. **Add New** 클릭
3. Key: `ADMIN_PASSWORD` / Value: **원하는 비밀번호**
4. Environments: **Production and Preview** 선택 → Save

> ⚠️ 설정하지 않으면 기본값 `dain1234` 로 열립니다. **반드시 바꿔주세요.**
> 직원분들과 공유하는 비밀번호이니 너무 단순하지 않게 정하시고, 바뀌면 모두에게 알려주세요.

---

## 5단계 — 다시 배포

환경변수는 저장만으로는 반영되지 않습니다.

**Deployments → 맨 위 배포 우측 ⋯ → Redeploy**

---

## 확인하기

`https://home.dainedu.co.kr/admin` 에 들어가 비밀번호를 넣어보세요.

- 로그인되고 대시보드가 보이면 ✅
- **"데이터베이스가 아직 연결되지 않았습니다"** 가 보이면 → 2단계를 다시 확인
- 사진 업로드에서 오류가 나면 → 3단계를 다시 확인

---

## 쓰는 방법

### 강사진 · 개설강좌 — 가장 중요합니다

강사 한 분을 등록하면서 아래 **개설 강좌**에 강좌를 넣으면,

- 강사 카드는 **강사진 소개(`/teachers`)** 에
- 강좌는 **단과시간표(`/schedule`)** 의 모집대상 탭에

**자동으로 함께 들어갑니다.** 두 군데를 따로 입력할 필요가 없습니다.

몇 가지 요령이 있습니다.

- **아직 공개 전인 강사** — `실명·사진 공개`를 꺼두면 이름 대신 "Coming Soon" 과 공개 예정 시기가 표시됩니다
- **강사가 정해지지 않은 강좌** — 이름을 "미정" 으로 만들고 `강사진 목록에서 숨기기`를 켜세요. 카드는 안 보이고 강좌만 시간표에 나옵니다
- **모집대상** 은 `N수, 고3` 처럼 쉼표로 구분합니다. 이 값으로 시간표 탭이 갈립니다

### 나머지

- **이벤트·설명회** — 저장하면 목록과 상세 페이지가 생기고, 예약 신청서가 자동으로 붙습니다
- **공지사항** — 포르타·클라비스 중 어디에 보일지 고를 수 있습니다
- **사진·영상** — 종류에서 `선생님 클립영상` 을 고르고 유튜브 주소를 넣으면 썸네일이 자동으로 잡힙니다

### 공통

- 목록의 **↑ ↓** 버튼으로 노출 순서를 바꿉니다. 위에 있을수록 먼저 보입니다
- 저장하면 **바로 반영**됩니다. 따로 배포하지 않아도 됩니다
- **삭제는 되돌릴 수 없습니다.** 잠시 내리고 싶은 항목은 `노출 여부` 를 끄세요

---

## 안전장치

관리자 페이지에 아무것도 입력하지 않은 상태에서는 **지금 사이트 화면이 그대로 유지됩니다.**
코드 안의 기존 내용(`*Data.ts`)이 계속 쓰이다가, 관리자 페이지에 첫 항목을 등록하는 순간
그 종류만 관리자 내용으로 바뀝니다.

예를 들어 강사진만 등록하면 강사·강좌는 관리자 내용으로 바뀌고, 공지사항은 기존 그대로입니다.
그러니 **한 번에 다 채우지 않아도 됩니다.**

---

## 개발자용 메모

```
lib/db.ts          Neon 연결 · contents 테이블 (resource + JSONB 한 장으로 모든 종류 저장)
lib/auth.ts        비밀번호 확인 + 서명 쿠키 (비밀번호는 쿠키에 담기지 않음)
lib/content.ts     DB → 화면 형식 변환 + 기존 *Data.ts 폴백
middleware.ts      /admin 경로 보호

app/admin/login              로그인
app/admin/(panel)/           사이드바 레이아웃 + 대시보드 + 관리 화면 4개
app/components/admin/        ResourceManager(엔진) · FieldInput · AdminSidebar
app/api/auth/login|logout    로그인 처리
app/api/admin/[resource]     공용 CRUD (GET/POST/DELETE/PATCH)
app/api/upload               Vercel Blob 업로드
```

관리 항목을 늘리려면 세 군데만 손대면 됩니다.

1. `app/api/admin/[resource]/route.ts` 의 `RESOURCES` 에 이름 추가
2. `app/components/admin/AdminSidebar.tsx` 의 `MENU` 에 메뉴 추가
3. `app/admin/(panel)/<이름>/page.tsx` 에 `<ResourceManager>` 설정 작성

DB 스키마 변경은 필요 없습니다. 모든 종류가 `contents` 테이블 한 곳에 JSON 으로 들어갑니다.

로컬 개발 시에는 `.env.local` 에 넣으세요.

```
DATABASE_URL=postgres://...
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
ADMIN_PASSWORD=원하는비밀번호
```
