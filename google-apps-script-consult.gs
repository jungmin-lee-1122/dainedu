/**
 * 다인교육 온라인 상담 → 구글 시트 자동 저장 스크립트
 *
 * [설치 방법]
 * 1) 구글 시트를 새로 하나 만든다. (예: "다인교육 온라인 상담")
 *    ※ 사전등록 시트와는 별개로 새로 만드세요.
 * 2) 상단 메뉴 [확장 프로그램] → [Apps Script] 클릭.
 * 3) 기본으로 열린 코드를 전부 지우고, 이 파일 내용을 통째로 붙여넣는다.
 * 4) 저장(💾) 후, 우측 상단 [배포] → [새 배포] 클릭.
 *    ※ 이미 배포한 적이 있다면 [배포] → [배포 관리] → 연필(수정) → 버전 "새 버전" → [배포]
 * 5) 유형 선택(톱니바퀴) → [웹 앱] 선택.
 *      - 실행 계정: 나
 *      - 액세스 권한: "모든 사용자(Anyone)"
 * 6) [배포] 누르고 권한 승인.
 * 7) 나오는 "웹 앱 URL"( .../exec 로 끝남 )을 복사한다.
 *      → Vercel 환경변수 CONSULT_WEBHOOK_URL 에 넣는다.
 *
 * ※ 기존에 데이터가 쌓인 시트에 이 버전을 적용하면 열 순서가 달라집니다.
 *    새 시트로 시작하거나, 기존 시트의 1행(제목 줄)을 지우고 다시 받으세요.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // 첫 실행이면 헤더 행 자동 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "접수시각", "상담자유형", "학생이름", "성별", "연락처", "이메일",
        "우편번호", "주소", "상세주소", "관심과정", "유입경로",
        "임시비밀번호", "제목", "내용", "처리상태"
      ]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.role || "",
      data.name || "",
      data.gender || "",
      data.phone || "",
      data.email || "",
      data.zipcode || "",
      data.address || "",
      data.addressDetail || "",
      data.course || "",
      data.source || "",
      data.password || "",
      data.title || "",
      data.content || "",
      "접수"
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
