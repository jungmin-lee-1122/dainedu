/**
 * 다인교육 사전등록 → 구글 시트 자동 저장 스크립트
 *
 * [설치 방법]
 * 1) 구글 시트를 새로 하나 만든다. (예: "다인교육 사전등록")
 * 2) 상단 메뉴 [확장 프로그램] → [Apps Script] 클릭.
 * 3) 기본으로 열린 코드를 지우고, 이 파일 내용을 통째로 붙여넣는다.
 * 4) 저장(💾) 후, 우측 상단 [배포] → [새 배포] 클릭.
 * 5) 유형 선택(톱니바퀴) → [웹 앱] 선택.
 *      - 실행 계정: 나
 *      - 액세스 권한: "모든 사용자(Anyone)"
 * 6) [배포] 누르고 권한 승인(내 구글 계정 허용).
 * 7) 나오는 "웹 앱 URL"( .../exec 로 끝남 )을 복사한다.
 *      → 이 URL을 Vercel 환경변수 SHEET_WEBHOOK_URL 에 넣는다. (안내대로)
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // 첫 실행이면 헤더 행 자동 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "접수시각", "학생이름", "학부모연락처", "학년",
        "참석세션", "관심과정", "마케팅수신동의"
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.grade || "",
      data.session || "",
      data.course || "",
      data.marketing ? "동의" : ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
