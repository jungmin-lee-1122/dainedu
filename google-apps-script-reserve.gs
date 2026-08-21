/**
 * ═══════════════════════════════════════════════════════════
 *  다인교육 동탄점 — 설명회 예약 접수 저장 스크립트
 * ═══════════════════════════════════════════════════════════
 *
 *  【 반드시 이렇게 만들어야 합니다 】
 *  구글 드라이브에서 "새 Apps Script"로 만들면 시트와 연결되지 않아
 *  저장이 실패합니다. 아래 순서를 지켜주세요.
 *
 *  1. 구글 드라이브 → 새 스프레드시트 (예: "설명회 예약 접수")
 *  2. 그 스프레드시트 안에서 상단 메뉴 → 확장 프로그램 → Apps Script
 *     ※ 반드시 시트 안에서 열어야 시트와 연결됩니다.
 *  3. 기본 코드를 모두 지우고 이 내용을 통째로 붙여넣고 저장
 *  4. 오른쪽 위 [배포] → [새 배포] → 톱니바퀴 → [웹 앱]
 *  5. 실행 사용자: "나"  /  액세스 권한: "모든 사용자"
 *     ※ "Google 계정이 있는 모든 사용자"는 안 됩니다.
 *  6. [배포] → 권한 승인 → 나오는 "웹 앱 URL"(끝이 /exec) 복사
 *  7. Vercel → Settings → Environment Variables
 *     이름: RESERVE_WEBHOOK_URL  /  값: 복사한 URL  → 저장 후 Redeploy
 *
 *  【 잘 됐는지 확인 】
 *  복사한 /exec 주소를 브라우저에 붙여넣으면 상태가 나옵니다.
 *    시트연결: "정상"  → 준비 완료
 *    시트연결: "끊김"  → 아래 SPREADSHEET_ID 를 채워주세요
 *
 *  ※ 코드를 고치면 [배포] → [배포 관리] → 연필 → 버전 "새 버전"으로
 *     다시 배포해야 반영됩니다. 저장만으로는 반영되지 않습니다.
 */

/**
 * 시트와 연결이 끊긴 경우에만 채우세요. (보통은 비워둡니다)
 * 스프레드시트 주소에서 /d/ 와 /edit 사이의 긴 문자열입니다.
 *   예) https://docs.google.com/spreadsheets/d/[여기가ID]/edit
 */
var SPREADSHEET_ID = '';

/** 시트(탭) 이름 */
var SHEET_NAME = '설명회예약';

/** 표의 머리글 — 순서를 바꾸면 아래 appendRow 순서도 함께 바꿔야 합니다. */
var HEADERS = [
  '접수시각',
  '설명회명',
  '설명회일시',
  '예약자구분',
  '이름',
  '휴대전화',
  '학교명',
  '학년',
  '계열',
  '동반인수',
  '유입경로',
  '마케팅동의',
  '처리상태'
];

/* ═══════════════ 예약 접수 저장 ═══════════════ */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: '전달된 내용이 없습니다.' });
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    sheet.appendRow([
      formatNow_(),
      data.eventTitle || '',
      data.eventDate || '',
      data.who || '',
      data.name || '',
      data.phone || '',
      data.school || '',
      data.grade || '',
      data.track || '',
      data.companion || '',
      data.source || '',
      data.agreeMarketing || '미동의',
      '접수'
    ]);

    styleLastRow_(sheet);

    return json_({ ok: true, row: sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/* ═══════════════ 상태 점검 ═══════════════ */
/** 브라우저에서 /exec 주소를 열면 설정이 제대로 됐는지 알려줍니다. */
function doGet() {
  var result = { ok: true, msg: '설명회 예약 수신 대기 중입니다.' };

  try {
    var ss = getSpreadsheet_();
    var sheet = ss.getSheetByName(SHEET_NAME);

    result['시트연결'] = '정상';
    result['문서이름'] = ss.getName();
    result['탭이름'] = SHEET_NAME;
    result['현재접수건수'] = sheet ? Math.max(0, sheet.getLastRow() - 1) : 0;
    result['안내'] = '이 상태면 예약이 정상 저장됩니다.';
  } catch (err) {
    result.ok = false;
    result['시트연결'] = '끊김';
    result['원인'] = String(err);
    result['해결방법'] =
      '이 스크립트가 스프레드시트에 연결되어 있지 않습니다. ' +
      '스프레드시트를 열고 [확장 프로그램 → Apps Script]에서 다시 만들거나, ' +
      '코드 위쪽 SPREADSHEET_ID 에 시트 ID를 넣고 새 버전으로 다시 배포하세요.';
  }

  return json_(result);
}

/* ─────────── 아래는 내부 처리용 ─────────── */

function getSpreadsheet_() {
  // 1) ID를 직접 적어둔 경우 그걸 우선 사용
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  // 2) 시트에 연결된 스크립트인 경우
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error(
      '연결된 스프레드시트를 찾을 수 없습니다. (독립형 스크립트로 만들어진 상태)'
    );
  }
  return ss;
}

function getSheet_() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var head = sheet.getRange(1, 1, 1, HEADERS.length);
    head.setFontWeight('bold');
    head.setBackground('#24365A');
    head.setFontColor('#FFFFFF');
    head.setVerticalAlignment('middle');
    sheet.setRowHeight(1, 34);
    sheet.setFrozenRows(1);

    var widths = [150, 260, 200, 90, 100, 130, 180, 110, 80, 110, 120, 100, 90];
    for (var i = 0; i < widths.length; i++) {
      sheet.setColumnWidth(i + 1, widths[i]);
    }
  }

  return sheet;
}

function styleLastRow_(sheet) {
  var row = sheet.getLastRow();
  var range = sheet.getRange(row, 1, 1, HEADERS.length);
  range.setVerticalAlignment('middle');
  range.setWrap(true);

  // 처리상태 칸에 드롭다운(접수 / 확인 / 참석 / 취소)
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['접수', '확인', '참석', '취소'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(row, HEADERS.length).setDataValidation(rule);
}

function formatNow_() {
  return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ─────────── 직접 실행해보는 시험용 함수 ───────────
   Apps Script 편집기 위쪽에서 함수 선택 → 테스트저장_ → 실행
   시트에 "테스트" 한 줄이 들어가면 저장 기능은 정상입니다.        */
function 테스트저장_() {
  var out = doPost({
    postData: {
      contents: JSON.stringify({
        eventTitle: '테스트 설명회',
        eventDate: '2026. 01. 01(금)',
        who: '학부모',
        name: '테스트',
        phone: '010-0000-0000',
        school: '테스트고등학교',
        grade: '고3',
        track: '인문',
        companion: '본인만 참석',
        source: '기타',
        agreeMarketing: '미동의'
      })
    }
  });
  Logger.log(out.getContent());
}
