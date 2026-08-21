/**
 * ═══════════════════════════════════════════════════════════
 *  다인교육 동탄점 — 설명회 예약 접수 저장 스크립트
 * ═══════════════════════════════════════════════════════════
 *
 *  【 사용 방법 】
 *  1. 구글 드라이브에서 새 스프레드시트를 만듭니다. (예: "설명회 예약 접수")
 *  2. 상단 메뉴 → 확장 프로그램 → Apps Script 를 엽니다.
 *  3. 기본 코드를 모두 지우고 이 파일 내용을 통째로 붙여넣습니다.
 *  4. 저장 후 오른쪽 위 [배포] → [새 배포] 를 누릅니다.
 *  5. 유형 선택에서 톱니바퀴 → [웹 앱] 을 고릅니다.
 *  6. 실행 사용자: "나"  /  액세스 권한: "모든 사용자" 로 설정합니다.
 *  7. [배포] 를 누르고 권한을 승인한 뒤, 나오는 "웹 앱 URL" 을 복사합니다.
 *  8. Vercel → 프로젝트 → Settings → Environment Variables 로 가서
 *     이름: RESERVE_WEBHOOK_URL
 *     값  : 복사한 웹 앱 URL
 *     을 추가하고 다시 배포(Redeploy)합니다.
 *
 *  ※ 코드를 수정하면 반드시 [배포] → [배포 관리] → 연필 아이콘 →
 *     버전을 "새 버전"으로 바꿔 다시 배포해야 반영됩니다.
 */

/** 시트 이름 — 바꾸고 싶으면 이 값만 수정하세요. */
var SHEET_NAME = '설명회예약';

/** 표의 머리글 — 순서를 바꾸면 아래 ROW 순서도 함께 바꿔야 합니다. */
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

function doPost(e) {
  try {
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

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** 브라우저에서 URL을 열었을 때 동작 확인용 */
function doGet() {
  return json_({ ok: true, msg: '설명회 예약 수신 대기 중입니다.' });
}

/* ─────────── 아래는 내부 처리용 ─────────── */

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
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

    // 열 너비 보기 좋게
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
