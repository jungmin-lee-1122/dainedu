"use client";

// ═══════════════════════════════════════════════════════════
//  이용약관 / 개인정보 처리방침 팝업
//
//  · 푸터의 <a href="#terms"> · <a href="#privacy"> 를 누르면 열립니다.
//    (JSX 푸터와 문자열로 만든 푸터 양쪽 모두에서 동작합니다)
//  · layout.tsx 에 한 번만 올려두면 전체 페이지에 적용됩니다.
//  · 문구 수정은 아래 TermsBody / PrivacyBody 에서 하시면 됩니다.
// ═══════════════════════════════════════════════════════════
import { useEffect, useState, type ReactNode } from "react";

const ACADEMY = "다인에듀";
const TEL = "1644-8022";
const ADDRESS = "경기도 화성시 동탄 메타폴리스로 53, 6층";
const EFFECTIVE = "2026년 10월 1일";

type Kind = "terms" | "privacy" | null;

export default function LegalModal() {
  const [open, setOpen] = useState<Kind>(null);

  /* 푸터 링크 가로채기 */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("a");
      if (!el) return;
      const href = el.getAttribute("href");
      if (href === "#terms") {
        e.preventDefault();
        setOpen("terms");
      } else if (href === "#privacy") {
        e.preventDefault();
        setOpen("privacy");
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* 열렸을 때: ESC 로 닫기 · 뒤쪽 스크롤 잠금 */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const isTerms = open === "terms";

  return (
    <div
      className="lg-dim"
      role="dialog"
      aria-modal="true"
      aria-label={isTerms ? "이용약관" : "개인정보 처리방침"}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(null);
      }}
    >
      <div className="lg-box">
        <header className="lg-head">
          <div className="lg-head-text">
            <p className="lg-eyebrow">{isTerms ? "TERMS OF SERVICE" : "PRIVACY POLICY"}</p>
            <h2 className="lg-title">{isTerms ? "이용약관" : "개인정보 처리방침"}</h2>
          </div>
          <button type="button" className="lg-x" aria-label="닫기" onClick={() => setOpen(null)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="lg-body">{isTerms ? <TermsBody /> : <PrivacyBody />}</div>
      </div>
    </div>
  );
}

/* ───────────────────────── 공통 조각 ───────────────────────── */

function Article({ no, title, children }: { no: number; title: string; children: ReactNode }) {
  return (
    <section className="lg-art">
      <h3 className="lg-art-t">
        <span className="lg-art-no">제{no}조</span>
        {title}
      </h3>
      <div className="lg-art-b">{children}</div>
    </section>
  );
}

function Section({ no, title, children }: { no: number; title: string; children: ReactNode }) {
  return (
    <section className="lg-art">
      <h3 className="lg-art-t">
        <span className="lg-art-no">{String(no).padStart(2, "0")}</span>
        {title}
      </h3>
      <div className="lg-art-b">{children}</div>
    </section>
  );
}

/* ───────────────────────── 이용약관 ───────────────────────── */

function TermsBody() {
  return (
    <>
      <p className="lg-lead">
        본 홈페이지는 별도의 회원가입 절차 없이 이용하실 수 있으며, 학원은 설명회·상담 예약 등을 위하여
        이용자가 직접 입력한 정보만을 수집합니다.
      </p>

      <Article no={1} title="목적">
        <p>
          본 약관은 {ACADEMY}(이하 &ldquo;학원&rdquo;이라 합니다)가 제공하는 홈페이지 및 학원
          서비스(이하 &ldquo;서비스&rdquo;라 합니다)의 이용과 관련하여 이용자의 기본적인 권리와 책임 및
          학원과 이용자 간의 중요 사항을 정하는 것을 목적으로 합니다.
        </p>
      </Article>

      <Article no={2} title="약관의 효력 및 변경">
        <p>① 학원은 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 화면에 게시합니다.</p>
        <p>② 본 약관은 서비스 화면에 공지함으로써 효력이 발생합니다.</p>
        <p>
          ③ 학원은 관련 법령을 위반하지 않고 이용자의 정당한 권리를 부당하게 침해하지 않는 범위에서 본
          약관을 개정할 수 있습니다.
        </p>
        <p>
          ④ 학원이 약관을 변경할 경우에는 적용일자 및 변경사유를 명시하여 적용일자 7일 이전부터 서비스
          화면에 공지합니다. 다만, 이용자에게 불리한 변경의 경우에는 최소 30일 전에 공지합니다.
        </p>
      </Article>

      <Article no={3} title="약관 외 준칙">
        <p>
          본 약관에 명시되지 않은 사항에 대해서는 관련 법령, 학원이 정한 개별 이용지침 및 규칙,
          「학원의 설립·운영 및 과외교습에 관한 법률」 등 관계 법령의 규정에 따릅니다.
        </p>
      </Article>

      <Article no={4} title="용어의 정의">
        <p>① &ldquo;이용자&rdquo;란 학원의 홈페이지에 접속하여 본 약관에 따라 서비스를 이용하는 자를 말합니다.</p>
        <p>
          ② &ldquo;서비스&rdquo;란 학원이 홈페이지를 통해 제공하는 학원·강좌 정보 안내, 설명회 및 상담 예약
          접수 등 일체의 서비스를 말합니다.
        </p>
        <p>
          ③ &ldquo;예약 신청&rdquo;이란 이용자가 홈페이지의 신청 양식을 통해 설명회 참석, 상담 등을 신청하는
          것을 말합니다.
        </p>
      </Article>

      <Article no={5} title="서비스의 제공">
        <p>
          학원은 이용자가 강좌 등에 관하여 정확하게 이해하고 착오 없이 거래할 수 있도록 다음 각 호의
          사항을 서비스 화면 등을 통하여 안내합니다.
        </p>
        <ul className="lg-list">
          <li>학원의 명칭 및 대표자 성명</li>
          <li>학원의 주소, 전화번호 등</li>
          <li>강좌의 명칭 및 내용</li>
          <li>수강료(교습비)의 금액, 납부 방법 및 시기</li>
          <li>강좌의 제공 방법 및 시기</li>
          <li>환불의 조건 및 절차</li>
          <li>기타 강좌 이용과 관련하여 필요한 사항</li>
        </ul>
      </Article>

      <Article no={6} title="서비스 이용시간">
        <p>
          서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 다만, 시스템 점검·교체 및 고장 등의
          이유로 학원이 정한 기간에는 서비스가 일시 중지될 수 있으며, 이 경우 학원은 해당 사실을 사전
          또는 사후에 공지합니다.
        </p>
      </Article>

      <Article no={7} title="서비스의 변경 및 중단">
        <p>① 학원은 서비스가 변경되는 경우 변경 내용 및 제공일자를 서비스 화면을 통하여 공지합니다.</p>
        <p>② 학원은 다음 각 호에 해당하는 경우 서비스의 이용을 전부 또는 일부 제한하거나 중단할 수 있습니다.</p>
        <ul className="lg-list">
          <li>서비스용 설비의 보수 등 공사로 인하여 부득이한 경우</li>
          <li>학원이 통제할 수 없는 불가피한 사유로 서비스 중단이 필요한 경우</li>
          <li>서비스 이용량의 폭주 등으로 정상적인 서비스 제공에 지장이 있는 경우</li>
          <li>기타 정전, 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우</li>
        </ul>
        <p>
          ③ 학원은 제2항에 따라 서비스가 중단되는 경우 이용자에게 사전 공지합니다. 다만, 통제할 수 없는
          사유로 사전 공지가 불가능한 경우에는 사후에 공지합니다.
        </p>
      </Article>

      <Article no={8} title="설명회 예약 및 상담 신청">
        <p>① 이용자는 홈페이지의 신청 양식을 통해 설명회 참석·상담 등을 신청할 수 있습니다.</p>
        <p>② 학원은 신청 내용을 확인한 후 유선·문자 등을 통하여 안내합니다.</p>
        <p>③ 신청 시 입력한 정보에 허위 또는 오기가 있는 경우 안내가 제한될 수 있습니다.</p>
      </Article>

      <Article no={9} title="미성년자의 수강 신청 등">
        <p>
          ① 미성년자의 수강 등록 및 결제는 원칙적으로 부모 등 법정대리인의 동의 하에 이루어져야 하며,
          법정대리인은 본인의 동의 없이 이루어진 계약을 취소할 수 있습니다.
        </p>
        <p>
          ② 미성년자가 수강료를 본인 명의로 결제하는 경우, 학원은 법정대리인의 동의 여부를 유·무선 등의
          방법으로 확인할 수 있습니다.
        </p>
      </Article>

      <Article no={10} title="교습비 등의 환불">
        <p>
          ① 학원은 수강료(교습비)의 환불에 관하여 「학원의 설립·운영 및 과외교습에 관한 법률」 및 같은 법
          시행령이 정하는 기준에 따라 다음과 같이 환불합니다.
        </p>

        <div className="lg-table-wrap">
          <table className="lg-table lg-table-refund">
            <thead>
              <tr>
                <th>구분</th>
                <th>반환사유 발생일</th>
                <th>반환금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>학원의 교습정지·폐원 등</td>
                <td>교습을 할 수 없거나 교습장소를 제공할 수 없게 된 날</td>
                <td>이미 납부한 교습비 등을 일할 계산한 금액</td>
              </tr>
              <tr>
                <td rowSpan={4}>
                  이용자가 본인의 의사로 수강을 포기한 경우
                  <em>(교습기간 1개월 이내)</em>
                </td>
                <td>교습 시작 전</td>
                <td>이미 납부한 교습비 등의 전액</td>
              </tr>
              <tr>
                <td>총 교습시간의 1/3 경과 전</td>
                <td>이미 납부한 교습비 등의 2/3에 해당하는 금액</td>
              </tr>
              <tr>
                <td>총 교습시간의 1/2 경과 전</td>
                <td>이미 납부한 교습비 등의 1/2에 해당하는 금액</td>
              </tr>
              <tr>
                <td>총 교습시간의 1/2 경과 후</td>
                <td>반환하지 않음</td>
              </tr>
              <tr>
                <td rowSpan={2}>교습기간이 1개월을 초과하는 경우</td>
                <td>교습 시작 전</td>
                <td>이미 납부한 교습비 등의 전액</td>
              </tr>
              <tr>
                <td>교습 시작 후</td>
                <td>
                  반환사유가 발생한 해당 월의 반환대상 교습비 등(교습기간이 1개월 이내인 경우의 기준에
                  따라 산출한 금액)과 나머지 월의 교습비 등의 전액을 합산한 금액
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lg-note">
          ※ 총 교습시간은 교습기간 중의 총 교습시간을 말하며, 반환금액의 산정은 반환사유가 발생한 날까지
          경과된 교습시간을 기준으로 합니다.
        </p>

        <p>② 이용자가 환불을 요청하는 경우 학원은 요청을 접수하고 환불규정을 확인한 후 5일 이내에 환불합니다.</p>
        <p>
          ③ 강좌에 포함되어 제공된 교재 등이 있는 경우 환불 시 함께 반납하여야 하며, 이미 사용되었거나
          그 가치가 현저히 감소한 경우에는 해당 금액을 공제할 수 있습니다.
        </p>
        <p>
          ④ 특강, 기간제 과정 등은 별도의 수강 취소·변경 및 환불규정이 적용될 수 있으며, 자세한 내용은
          학원을 통해 확인하실 수 있습니다.
        </p>
      </Article>

      <Article no={11} title="과오금의 환급">
        <p>
          ① 이용자가 수강료 등을 결제함에 있어서 과오금을 지급한 경우 학원은 결제와 동일한 방법으로
          과오금을 환불합니다. 다만, 동일한 방법으로 환불이 불가능할 때에는 이를 고지하고 이용자가 선택한
          방법으로 환불합니다.
        </p>
        <p>
          ② 학원의 책임 있는 사유로 과오금이 발생한 경우 학원은 과오금 전액을 환불하며, 이용자의 책임
          있는 사유로 과오금이 발생한 경우에는 환불에 소요되는 비용을 합리적인 범위에서 공제하고 환불할
          수 있습니다.
        </p>
      </Article>

      <Article no={12} title="학원의 의무">
        <p>
          ① 학원은 관련 법령 및 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 지속적이고
          안정적으로 서비스를 제공하기 위하여 최선을 다합니다.
        </p>
        <p>
          ② 학원은 이용자의 개인정보를 본인의 동의 없이 제3자에게 제공하거나 누설하지 않습니다. 다만,
          적법한 절차를 거친 국가기관의 요구가 있는 경우는 예외로 하며, 개인정보의 보호에 관하여는 관련
          법령 및 학원이 정하는 개인정보 처리방침에 따릅니다.
        </p>
        <p>
          ③ 학원은 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정되는 경우 이를 신속히 처리합니다.
          즉시 처리가 어려운 경우에는 그 사유와 처리 일정을 이용자에게 통보합니다.
        </p>
      </Article>

      <Article no={13} title="이용자의 의무">
        <p>① 이용자는 서비스 이용 시 다음 각 호에 해당하는 행위를 하여서는 아니 됩니다.</p>
        <ul className="lg-list">
          <li>신청 시 허위 사실을 기재하거나 타인의 정보를 도용하는 행위</li>
          <li>학원이 제공하는 정보를 무단으로 복제·배포·전송하거나 상업적으로 이용하는 행위</li>
          <li>학원 또는 제3자의 저작권 등 권리를 침해하는 행위</li>
          <li>학원의 서비스 운영을 방해하는 행위</li>
          <li>학원의 운영진이나 직원을 사칭하는 행위</li>
        </ul>
        <p>② 이용자는 신청 시 입력한 정보에 변경이 있는 경우 즉시 학원에 알려야 합니다.</p>
      </Article>

      <Article no={14} title="저작권 등">
        <p>
          홈페이지에 게시된 콘텐츠(텍스트, 이미지, 강좌 정보 등)에 대한 저작권 및 기타 지적재산권은 학원에
          귀속되며, 이용자는 학원의 사전 동의 없이 이를 복제·배포·전송하거나 상업적으로 이용할 수 없습니다.
        </p>
      </Article>

      <Article no={15} title="분쟁의 해결 및 준거법">
        <p>① 본 약관은 대한민국 법령에 따라 규율되고 해석됩니다.</p>
        <p>
          ② 학원과 이용자 간에 분쟁이 발생한 경우 상호 협의하여 해결함을 원칙으로 하며, 협의가 이루어지지
          않을 경우 관련 법령 및 관할 법원의 판단에 따릅니다.
        </p>
      </Article>

      <p className="lg-foot">부칙 — 본 약관은 {EFFECTIVE}부터 시행합니다.</p>
    </>
  );
}

/* ─────────────────── 개인정보 처리방침 ─────────────────── */

function PrivacyBody() {
  return (
    <>
      <p className="lg-lead">
        {ACADEMY}(이하 &ldquo;학원&rdquo;)은 「개인정보 보호법」 등 관계 법령을 준수하여 이용자의
        개인정보를 안전하게 처리합니다. 본 홈페이지는 별도의 회원가입 없이 이용하실 수 있으며, 학원은
        설명회·상담 예약 및 수강 등록 등에 필요한 정보만을 수집합니다.
      </p>

      <Section no={1} title="총칙">
        <p>
          학원은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여
          적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 본 개인정보 처리방침을 통하여
          정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게
          처리할 수 있도록 하기 위하여 다음과 같이 알려드립니다. 본 처리방침을 개정하는 경우에는
          홈페이지를 통하여 사전에 고지하겠습니다.
        </p>
      </Section>

      <Section no={2} title="개인정보의 처리 목적">
        <p>
          학원은 다음의 목적을 위하여 개인정보를 처리하며, 처리하는 개인정보는 다음의 목적 이외의 용도로는
          이용하지 않습니다. 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
          받는 등 필요한 조치를 이행합니다.
        </p>
        <ul className="lg-list">
          <li>설명회·상담 예약 : 상담 접수 및 안내, 입학·입시 상담 제공</li>
          <li>수강 신청·등록 관리 : 수강생 등록, 수강 및 원생 관리, 관련 서비스 제공</li>
          <li>현장 방문 상담·테스트 : 수준 테스트 및 맞춤형 컨설팅 제공</li>
          <li>교습비 결제 : 수강료 등 결제 및 환불 처리</li>
          <li>마케팅 활용(선택) : 신규 강좌·특강·설명회·이벤트 등 안내</li>
        </ul>
      </Section>

      <Section no={3} title="처리하는 개인정보의 항목">
        <p>
          학원은 서비스 제공에 꼭 필요한 개인정보만 수집하며, 추가로 개인정보가 필요한 경우에는 별도의
          선택 동의를 받은 후 수집합니다.
        </p>
        <div className="lg-table-wrap">
          <table className="lg-table lg-table-items">
            <thead>
              <tr>
                <th>구분</th>
                <th>수집 항목</th>
                <th>수집·이용 목적</th>
                <th>보유·이용기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>설명회·상담 예약<em>(필수)</em></td>
                <td>(학생) 성명, 휴대폰번호, 학년·출신학교<br />(학부모) 성명, 연락처</td>
                <td>설명회·상담 접수 및 안내, 입학·입시 상담</td>
                <td>미등록 시 상담 종료 후 5일 이내 파기<br />등록 시 퇴원 후 3년간 보관</td>
              </tr>
              <tr>
                <td>수강 신청·등록<em>(필수)</em></td>
                <td>(학생) 성명, 생년월일, 휴대폰번호, 출신학교, 주소<br />(학부모) 성명, 연락처</td>
                <td>수강생 등록 및 원생 관리, 관련 서비스 제공</td>
                <td>퇴원 후 3년간 보관<br />(관련 법령상 보존이 필요한 경우 해당 기간까지)</td>
              </tr>
              <tr>
                <td>현장 방문 상담·테스트<em>(선택)</em></td>
                <td>졸업년도, 학교생활기록부, 모의고사·수능 성적 자료</td>
                <td>수준 테스트 및 맞춤형 컨설팅 제공</td>
                <td>미등록 시 종료 후 5일 이내 파기<br />등록 시 퇴원 후 3년간 보관</td>
              </tr>
              <tr>
                <td>교습비 결제<em>(필수)</em></td>
                <td>결제 정보(결제수단, 결제기록 등)</td>
                <td>수강료 등 결제 및 환불 처리</td>
                <td>관련 법령에서 정한 기간(4항 참고)</td>
              </tr>
              <tr>
                <td>마케팅 활용<em>(선택)</em></td>
                <td>성명, 연락처, (동의 시) 합격 전형·대학·학과, 사진 등</td>
                <td>신규 강좌·특강·설명회·이벤트 등 안내</td>
                <td>동의일로부터 퇴원 후 3년 또는 동의 철회 시까지</td>
              </tr>
              <tr>
                <td>자동 수집 정보</td>
                <td>서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보</td>
                <td>서비스 이용 기록 확인 및 부정 이용 방지</td>
                <td>수집·이용 목적 달성 시까지(쿠키는 브라우저 종료 시 삭제)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lg-note">
          ※ 선택 항목에 동의하지 않아도 기본 서비스를 이용하실 수 있으나, 해당 부가 서비스 제공이 제한될
          수 있습니다.
        </p>
        <p>학원은 다음의 방법을 통하여 개인정보를 수집합니다.</p>
        <ul className="lg-list">
          <li>홈페이지의 신청 양식(설명회·상담 예약 등)을 통한 수집</li>
          <li>전화, 팩스, 서면 및 대면 상담을 통한 수집</li>
          <li>쿠키 등 생성정보 자동 수집</li>
        </ul>
      </Section>

      <Section no={4} title="개인정보의 보유 및 이용기간">
        <p>
          학원은 개인정보의 수집·이용 목적이 달성되면 해당 정보를 지체 없이 파기함을 원칙으로 합니다.
          다만, 관계 법령에 따라 일정 기간 보관해야 하는 경우에는 그 기간 동안 보관 후 파기합니다.
        </p>
        <div className="lg-table-wrap">
          <table className="lg-table">
            <thead>
              <tr>
                <th>보관 항목</th>
                <th>보유기간</th>
                <th>근거 법령</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>영수증 원본(성명, 생년월일)</td>
                <td>5년</td>
                <td rowSpan={2}>학원의 설립·운영 및 과외교습에 관한 법률</td>
              </tr>
              <tr>
                <td>수강생 대장(성명, 주소, 연락처)</td>
                <td>3년</td>
              </tr>
              <tr>
                <td>계약 또는 청약철회 등에 관한 기록</td>
                <td>5년</td>
                <td rowSpan={3}>전자상거래 등에서의 소비자 보호에 관한 법률</td>
              </tr>
              <tr>
                <td>대금결제 및 재화 등의 공급에 관한 기록</td>
                <td>5년</td>
              </tr>
              <tr>
                <td>소비자의 불만 또는 분쟁 처리에 관한 기록</td>
                <td>3년</td>
              </tr>
              <tr>
                <td>서비스 방문(접속) 기록</td>
                <td>3개월</td>
                <td>통신비밀보호법</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section no={5} title="개인정보의 제3자 제공">
        <p>
          학원은 정보주체의 동의가 있거나 관련 법령의 규정에 의한 경우를 제외하고는, 수집·이용 목적에서
          고지한 범위를 넘어 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우에는 관련 법령에 따라
          동의 없이 개인정보를 제공할 수 있습니다.
        </p>
        <ul className="lg-list">
          <li>법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우</li>
          <li>명백히 정보주체 또는 제3자의 급박한 생명·신체·재산의 이익을 위하여 필요한 경우</li>
        </ul>
      </Section>

      <Section no={6} title="개인정보 처리의 위탁">
        <p>
          학원은 원활한 서비스 제공을 위하여 필요한 범위 내에서 일부 업무를 외부 전문업체에 위탁할 수
          있습니다. 위탁 시에는 위탁받는 자(수탁자)와 위탁 업무의 내용을 본 처리방침을 통하여 공개하며,
          수탁자가 개인정보를 안전하게 처리하도록 관리·감독합니다. 위탁 업무의 내용이나 수탁자가 변경될
          경우에는 지체 없이 본 처리방침을 통하여 공개합니다.
        </p>
      </Section>

      <Section no={7} title="개인정보의 파기 절차 및 방법">
        <p>
          학원은 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당
          개인정보를 파기합니다. 전자적 파일 형태의 정보는 복구 및 재생되지 않도록 안전하게 삭제하며,
          종이에 출력된 정보는 분쇄하거나 소각하여 파기합니다.
        </p>
      </Section>

      <Section no={8} title="개인정보 자동 수집 장치(쿠키)의 설치·운영 및 거부">
        <p>
          학원은 이용자에게 맞춤형 서비스를 제공하기 위하여 쿠키(cookie)를 사용할 수 있습니다. 쿠키란
          웹사이트 서버가 이용자의 브라우저에 보내는 작은 텍스트 파일로, 이용자의 기기에 저장됩니다.
        </p>
        <p>
          이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 웹 브라우저의 설정을 통해 모든 쿠키를
          허용하거나, 쿠키 저장 시 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다. 다만, 쿠키
          저장을 거부할 경우 일부 서비스 이용에 어려움이 있을 수 있습니다.
        </p>
      </Section>

      <Section no={9} title="만 14세 미만 아동의 개인정보 처리">
        <p>
          학원은 만 14세 미만 아동의 개인정보를 수집·이용하거나 제3자에게 제공하고자 하는 경우
          법정대리인의 동의를 받습니다. 이 경우 법정대리인의 동의를 얻기 위하여 성명, 연락처 등 필요한
          최소한의 정보를 요구할 수 있습니다.
        </p>
      </Section>

      <Section no={10} title="정보주체와 법정대리인의 권리·의무 및 행사방법">
        <p>
          ① 정보주체(만 14세 미만의 경우 법정대리인 포함)는 언제든지 개인정보의 열람·정정·삭제·처리정지를
          요구할 수 있으며, 수집·이용·제공에 대한 동의를 철회할 수 있습니다.
        </p>
        <p>
          ② 권리 행사는 학원에 대해 서면, 전화, 방문 등을 통하여 하실 수 있으며, 학원은 이에 대해
          지체 없이 조치합니다.
        </p>
        <p>
          ③ 정보주체가 개인정보의 오류에 대한 정정을 요청한 경우, 학원은 정정을 완료하기 전까지 해당
          개인정보를 이용하거나 제공하지 않습니다.
        </p>
        <p>④ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 대리인을 통하여 하실 수도 있습니다.</p>
      </Section>

      <Section no={11} title="개인정보의 안전성 확보 조치">
        <p>학원은 개인정보의 안전성 확보를 위하여 다음과 같은 조치를 취하고 있습니다.</p>
        <ul className="lg-list">
          <li>관리적 조치 : 내부관리계획 수립·시행, 담당자 교육, 접근권한의 차등 관리</li>
          <li>기술적 조치 : 개인정보처리시스템의 접근권한 관리, 비밀번호 암호화, 보안프로그램 설치 및 갱신</li>
          <li>물리적 조치 : 개인정보 보관 장소의 접근 통제 및 출력물 잠금장치 보관</li>
        </ul>
      </Section>

      <Section no={12} title="권익침해에 대한 구제방법">
        <p>
          정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁 해결이나 상담 등을 신청할
          수 있습니다.
        </p>
        <div className="lg-table-wrap">
          <table className="lg-table">
            <thead>
              <tr>
                <th>기관</th>
                <th>전화</th>
                <th>홈페이지</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>개인정보침해신고센터</td><td>(국번없이) 118</td><td>privacy.kisa.or.kr</td></tr>
              <tr><td>개인정보분쟁조정위원회</td><td>1833-6972</td><td>www.kopico.go.kr</td></tr>
              <tr><td>대검찰청 사이버수사과</td><td>(국번없이) 1301</td><td>www.spo.go.kr</td></tr>
              <tr><td>경찰청 사이버수사국</td><td>(국번없이) 182</td><td>ecrm.police.go.kr</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section no={13} title="개인정보 보호책임자">
        <p>
          학원은 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보 처리와 관련한 정보주체의 불만
          처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <div className="lg-card">
          <p><b>개인정보 보호책임자</b><span>{ACADEMY}</span></p>
          <p><b>대표번호</b><span>{TEL}</span></p>
          <p><b>주소</b><span>{ADDRESS}</span></p>
        </div>
      </Section>

      <Section no={14} title="영상정보처리기기(CCTV) 운영·관리">
        <p>
          학원은 「개인정보 보호법」 제25조에 따라 원내 시설 안전, 화재 예방 및 도난 방지를 목적으로
          영상정보처리기기(CCTV)를 설치·운영할 수 있습니다.
        </p>
        <ul className="lg-list">
          <li>설치 목적 : 시설 안전, 화재 예방, 도난 방지</li>
          <li>설치 위치 및 촬영 범위 : 원내 로비·복도·강의실 등 주요 시설물</li>
          <li>보관 기간 : 촬영일로부터 30일 이내 보관 후 파기</li>
          <li>관리 책임 및 열람 문의 : 학원 사무실 ({TEL})</li>
        </ul>
      </Section>

      <Section no={15} title="개인정보 처리방침의 변경">
        <p>
          본 개인정보 처리방침은 법령 및 정책 또는 보안기술의 변경에 따라 내용의 추가·삭제 및 수정이 있을
          경우, 변경 사항을 시행 최소 7일 전부터 홈페이지의 공지사항을 통하여 고지합니다.
        </p>
      </Section>

      <p className="lg-foot">본 개인정보 처리방침은 {EFFECTIVE}부터 적용됩니다. (버전 v1.0)</p>
    </>
  );
}
