// ═══════════════════════════════════════════════════════════
//  영문 지역명을 한글로 바꿔줍니다.
//
//  Cloudflare 는 "Gyeonggi-do", "Ansan-si" 처럼 영문으로 알려줍니다.
//  아래 표에 없는 곳은 영문 그대로 보여주되, -si/-gun/-gu 는 한글로 바꿉니다.
//  빠진 지역이 보이면 아래 CITY 에 한 줄 추가해 주세요.
// ═══════════════════════════════════════════════════════════

/** 시 · 도 */
const REGION: Record<string, string> = {
  "seoul": "서울특별시",
  "busan": "부산광역시",
  "daegu": "대구광역시",
  "incheon": "인천광역시",
  "gwangju": "광주광역시",
  "daejeon": "대전광역시",
  "ulsan": "울산광역시",
  "sejong": "세종특별자치시",
  "sejong-si": "세종특별자치시",
  "gyeonggi-do": "경기도",
  "gyeonggi": "경기도",
  "gangwon-do": "강원특별자치도",
  "gangwon": "강원특별자치도",
  "chungcheongbuk-do": "충청북도",
  "north chungcheong": "충청북도",
  "chungcheongnam-do": "충청남도",
  "south chungcheong": "충청남도",
  "jeollabuk-do": "전북특별자치도",
  "north jeolla": "전북특별자치도",
  "jeollanam-do": "전라남도",
  "south jeolla": "전라남도",
  "gyeongsangbuk-do": "경상북도",
  "north gyeongsang": "경상북도",
  "gyeongsangnam-do": "경상남도",
  "south gyeongsang": "경상남도",
  "jeju-do": "제주특별자치도",
  "jeju": "제주특별자치도",
};

/** 시 · 군 · 구 (수도권 위주 + 전국 주요 도시) */
const CITY: Record<string, string> = {
  // 경기 — 동탄 상권과 가까운 곳 우선
  "hwaseong-si": "화성시", "hwaseong": "화성시",
  "osan-si": "오산시", "osan": "오산시",
  "suwon-si": "수원시", "suwon": "수원시",
  "yongin-si": "용인시", "yongin": "용인시",
  "pyeongtaek-si": "평택시", "pyeongtaek": "평택시",
  "seongnam-si": "성남시", "seongnam": "성남시",
  "anyang-si": "안양시", "anyang": "안양시",
  "ansan-si": "안산시", "ansan": "안산시",
  "bucheon-si": "부천시", "bucheon": "부천시",
  "gwangmyeong-si": "광명시", "gwangmyeong": "광명시",
  "siheung-si": "시흥시", "siheung": "시흥시",
  "gunpo-si": "군포시", "gunpo": "군포시",
  "uiwang-si": "의왕시", "uiwang": "의왕시",
  "gwacheon-si": "과천시", "gwacheon": "과천시",
  "goyang-si": "고양시", "goyang": "고양시",
  "gimpo-si": "김포시", "gimpo": "김포시",
  "namyangju-si": "남양주시", "namyangju": "남양주시",
  "uijeongbu-si": "의정부시", "uijeongbu": "의정부시",
  "paju-si": "파주시", "paju": "파주시",
  "icheon-si": "이천시", "icheon": "이천시",
  "anseong-si": "안성시", "anseong": "안성시",
  "guri-si": "구리시", "guri": "구리시",
  "hanam-si": "하남시", "hanam": "하남시",
  "yangju-si": "양주시", "yangju": "양주시",
  "pocheon-si": "포천시", "pocheon": "포천시",
  "yeoju-si": "여주시", "yeoju": "여주시",
  "gwangju-si": "광주시", "dongducheon-si": "동두천시",
  "yangpyeong-gun": "양평군", "gapyeong-gun": "가평군", "yeoncheon-gun": "연천군",

  // 서울 자치구
  "gangnam-gu": "강남구", "gangdong-gu": "강동구", "gangbuk-gu": "강북구",
  "gangseo-gu": "강서구", "gwanak-gu": "관악구", "gwangjin-gu": "광진구",
  "guro-gu": "구로구", "geumcheon-gu": "금천구", "nowon-gu": "노원구",
  "dobong-gu": "도봉구", "dongdaemun-gu": "동대문구", "dongjak-gu": "동작구",
  "mapo-gu": "마포구", "seodaemun-gu": "서대문구", "seocho-gu": "서초구",
  "seongdong-gu": "성동구", "seongbuk-gu": "성북구", "songpa-gu": "송파구",
  "yangcheon-gu": "양천구", "yeongdeungpo-gu": "영등포구", "yongsan-gu": "용산구",
  "eunpyeong-gu": "은평구", "jongno-gu": "종로구", "jung-gu": "중구", "jungnang-gu": "중랑구",

  // 그 외 주요 도시
  "cheonan-si": "천안시", "asan-si": "아산시", "cheongju-si": "청주시",
  "sejong-si": "세종시", "chuncheon-si": "춘천시", "wonju-si": "원주시",
  "gangneung-si": "강릉시", "jeonju-si": "전주시", "gunsan-si": "군산시",
  "mokpo-si": "목포시", "yeosu-si": "여수시", "suncheon-si": "순천시",
  "pohang-si": "포항시", "gumi-si": "구미시", "gyeongju-si": "경주시",
  "changwon-si": "창원시", "gimhae-si": "김해시", "jinju-si": "진주시",
  "yangsan-si": "양산시", "geoje-si": "거제시", "jeju-si": "제주시",
  "seogwipo-si": "서귀포시",
};

const SUFFIX: [RegExp, string][] = [
  [/-si$/i, "시"], [/-gun$/i, "군"], [/-gu$/i, "구"], [/-do$/i, "도"],
  [/-eup$/i, "읍"], [/-myeon$/i, "면"], [/-dong$/i, "동"],
];

function look(table: Record<string, string>, raw: string) {
  const key = raw.trim().toLowerCase();
  if (!key) return "";
  if (table[key]) return table[key];
  // 표에 없으면 꼬리말만 한글로 (예: Bongdam-eup → Bongdam읍)
  for (const [re, ko] of SUFFIX) {
    if (re.test(key)) return raw.replace(re, ko);
  }
  return raw;
}

/** 시·도 이름을 한글로 */
export function koRegion(v: string) {
  return look(REGION, v);
}

/** 시·군·구 이름을 한글로 */
export function koCity(v: string) {
  return look(CITY, v);
}
