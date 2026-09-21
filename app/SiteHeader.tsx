// ═══════════════════════════════════════════════════════════
//  공용 헤더 (상단 공지바 + 카테고리 메뉴 + 수능 D-day)
//  모든 세부 페이지에서 <SiteHeader /> 로 불러 씁니다.
//  카테고리를 바꾸려면 이 파일만 수정하면 전체 페이지에 반영됩니다.
// ═══════════════════════════════════════════════════════════
import { subjects } from "./teachers/teachersData";

const SEMINAR = "https://dain-edu.higgsfield.app/seminar";

/** current: 로고 옆 과정 토글에서 현재 켜둘 값
 *  "porta"  = 포르타 고등전문관 (/porta)
 *  "clavis" = 클라비스 N수전문관 (/clavis)
 */
/** 콘텐츠 메뉴 표시 여부 — 다시 보이려면 true 로 바꾸세요. */
const SHOW_CONTENTS = false;

export default function SiteHeader({ current }: { current?: "porta" | "clavis" }) {
  // 공지사항 / 이벤트·설명회는 현재 보고 있는 관(고등·N수)의 해당 섹션으로 이동합니다.
  const base = current === "clavis" ? "/clavis" : "/porta";

  return (
    <>
      <a className="dn-topbar" href="/event/1" aria-label="2027 윈터스쿨 사전 예약 안내">
        <span className="dn-topbar-mark">※</span>
        <span className="dn-entry-badge">선착순 모집</span>
        <h3 className="dn-topbar-title">2027 윈터스쿨 사전 예약</h3>
        <span className="dn-topbar-desc">
          1월 4일 개강 · 예비 고1·고2·고3 <b>상담 접수 중</b>입니다.
        </span>
      </a>

      <nav className="dn-nav" aria-label="주 메뉴">
        <a className="dn-nav-brand" href="/">
          <img src="/dain-icon.png" alt="다인교육" className="dn-nav-icon" />
          <span className="dn-nav-brandtext">
            <b className="dn-nav-name">DAIN EDU</b>
            <span className="dn-nav-line" />
            <span className="dn-nav-clock js-clock">00:00:00</span>
          </span>
        </a>

        {current && (
          <div className="dn-gtoggle" role="tablist" aria-label="과정 전환">
            <a
              className={`dn-gtoggle-btn${current === "clavis" ? " is-on" : ""}`}
              href="/clavis"
              role="tab"
              aria-selected={current === "clavis"}
            >
              N수
            </a>
            <a
              className={`dn-gtoggle-btn${current === "porta" ? " is-on" : ""}`}
              href="/porta"
              role="tab"
              aria-selected={current === "porta"}
            >
              고등
            </a>
          </div>
        )}

        <ul className="dn-gnb">
          <li className="dn-gnb-item">
            <a href="/#about">학원소개</a>
            <div className="dn-gnb-sub">
              <a href="/greeting">인사말</a>
              <a href="/space">시설 안내</a>
              <a href="/about/location">오시는 길</a>
              <a href="/#system">운영시스템</a>
            </div>
          </li>

          <li className="dn-gnb-item">
            <a href="/teachers">강사진 소개</a>
            <div className="dn-gnb-sub">
              {/* 과목 목록은 teachersData.ts 의 subjects 를 그대로 씁니다 */}
              {subjects.map((s) => (
                <a
                  key={s}
                  href={s === "전체" ? "/teachers" : `/teachers?subject=${encodeURIComponent(s)}`}
                >
                  {s}
                </a>
              ))}
            </div>
          </li>

          {/* 모집안내 — 어느 관에 있느냐에 따라 내용이 달라집니다 */}
          <li className="dn-gnb-item">
            <a href="/#program">모집안내</a>
            {current === "porta" ? (
              <div className="dn-gnb-sub dn-gnb-sub-grouped">
                <a href="/winter">2027 윈터스쿨</a>
                <span className="dn-gnb-gtitle">고등부 단과</span>
                <a href="/schedule">단과 시간표</a>
              </div>
            ) : current === "clavis" ? (
              <div className="dn-gnb-sub">
                {/* 독학재수반 — 페이지가 준비되면 <a href="..."> 로 바꿔주세요 */}
                <span className="dn-gnb-soon">독학재수반</span>
              </div>
            ) : (
              <div className="dn-gnb-sub dn-gnb-sub-grouped">
                <a href="/winter">2027 윈터스쿨</a>
                {/* 독학재수반 — 페이지가 준비되면 <a href="..."> 로 바꿔주세요 */}
                <span className="dn-gnb-soon">독학재수반</span>
                <span className="dn-gnb-gtitle">고등부 단과</span>
                <a href="/schedule">단과 시간표</a>
              </div>
            )}
          </li>

          {/* ── 설명회 · 입시 ── */}
          <li className="dn-gnb-item">
            <a href="/event">설명회 · 입시</a>
            <div className="dn-gnb-sub dn-gnb-sub-grouped">
              <span className="dn-gnb-gtitle">설명회</span>
              <a href="/event">설명회 신청</a>
              <span className="dn-gnb-gtitle">입시</span>
              <a href="/event">입시자료</a>
            </div>
          </li>

          {SHOW_CONTENTS && (
          <li className="dn-gnb-item">
            <a href="/#contents">콘텐츠</a>
            <div className="dn-gnb-sub">
              <a href="/#contents">영단어 데일리 테스트</a>
              <a href="/#contents">빈칸·순서·삽입 데일리 훈련</a>
              <a href="/#contents">학과 적성 찾기</a>
            </div>
          </li>
          )}

          <li className="dn-gnb-item">
            <a href={`${base}#notice`}>학원생활</a>
            <div className="dn-gnb-sub">
              <a href="/notices">공지사항</a>
              <a href="/event">이벤트/설명회</a>
              <a href="/consult">상담문의</a>
            </div>
          </li>
        </ul>

        <span className="dn-navcta dn-dday" aria-label="수능 디데이">
          <span className="cta-label" id="dnDdayCap">수능</span>
          <span className="cta-badge" id="dnDdayNum">D-…</span>
        </span>
      </nav>
    </>
  );
}
