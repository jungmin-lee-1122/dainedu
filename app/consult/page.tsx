import Script from "next/script";
import type { Metadata } from "next";
import { consultScript } from "./consultScript";
import { quickMenuMarkup } from "../quickMenu";

export const metadata: Metadata = {
  title: "온라인 상담 — 다인교육 동탄점",
  description: "다인교육 동탄점 온라인 입학상담 신청. 답변이 등록되면 알려드립니다.",
};

/** 관심 과정 (반 문의) 선택지 */
const COURSES = ["고등종합", "단과", "독학재수", "재수종합"];

/** 유입경로 선택지 */
const SOURCES = [
  "지인 소개",
  "네이버 검색",
  "블로그·카페",
  "인스타그램",
  "유튜브",
  "현수막·전단",
  "설명회 참석",
  "기타",
];

export default function ConsultPage() {
  return (
    <main className="dn-body cs-page">
      {/* ── 헤더 ── */}
      <a className="dn-topbar" href="/register" aria-label="설명회 사전등록 안내">
        <span className="dn-topbar-mark">※</span>
        <span className="dn-entry-badge">9/19 SAT</span>
        <h3 className="dn-topbar-title">설명회 사전등록</h3>
        <span className="dn-topbar-desc">
          그랜드 오픈 설명회 <b>좌석을 먼저 확보</b>하세요.
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
        <ul className="dn-gnb">
          <li className="dn-gnb-item">
            <a href="/#about">학원소개</a>
            <div className="dn-gnb-sub">
              <a href="/#about">인사말</a>
              <a href="/#about">시설 안내</a>
              <a href="/#about">오시는 길</a>
              <a href="/#system">운영시스템</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="/#teachers">강사진 소개</a>
            <div className="dn-gnb-sub">
              <a href="/#teachers">국어</a>
              <a href="/#teachers">수학</a>
              <a href="/#teachers">영어</a>
              <a href="/#teachers">탐구</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="/#program">모집안내</a>
            <div className="dn-gnb-sub">
              <a href="/#program">재수종합</a>
              <a href="/#program">독학재수</a>
              <a href="/#program">고등종합</a>
              <a href="/#program">단과</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="/#contents">콘텐츠</a>
            <div className="dn-gnb-sub">
              <a href="/#contents">영단어 데일리 테스트</a>
              <a href="/#contents">빈칸·순서·삽입 데일리 훈련</a>
              <a href="/#contents">학과 적성 찾기</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="/#life">학원생활</a>
            <div className="dn-gnb-sub">
              <a href="/#life">하루 일과</a>
              <a href="/#life">급식·편의</a>
              <a href="/#life">상담 문의</a>
            </div>
          </li>
        </ul>
        <span className="dn-navcta dn-dday" aria-label="수능 디데이">
          <span className="cta-label" id="dnDdayCap">수능</span>
          <span className="cta-badge" id="dnDdayNum">D-…</span>
        </span>
      </nav>

      {/* ── 온라인 상담 ── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <header className="cs-head">
            <h1 className="cs-title">온라인 상담</h1>
            <p className="cs-desc">답변이 등록되면 입력하신 이메일로 알려드려요.</p>
          </header>

          <form id="csForm" noValidate>
            {/* 상담자 정보 */}
            <h2 className="cs-group-title">상담자 정보</h2>

            <div className="cs-field">
              <span className="cs-label">상담자 유형 <i>필수</i></span>
              <div className="cs-choices" data-choice-group>
                <button className="cs-choice" type="button" data-value="학생">학생</button>
                <button className="cs-choice" type="button" data-value="보호자">보호자</button>
              </div>
              <input type="hidden" name="role" />
            </div>

            <div className="cs-row">
              <div className="cs-field">
                <label className="cs-label" htmlFor="csName">학생 이름 <i>필수</i></label>
                <input id="csName" name="name" maxLength={40} placeholder="이름을 입력해 주세요." />
              </div>
              <div className="cs-field">
                <span className="cs-label">성별 <i>필수</i></span>
                <div className="cs-choices" data-choice-group>
                  <button className="cs-choice" type="button" data-value="여성">여성</button>
                  <button className="cs-choice" type="button" data-value="남성">남성</button>
                </div>
                <input type="hidden" name="gender" />
              </div>
            </div>

            <div className="cs-row">
              <div className="cs-field">
                <label className="cs-label" htmlFor="csPhone">연락처 <i>필수</i></label>
                <input id="csPhone" name="phone" type="tel" inputMode="numeric" maxLength={13} placeholder="010-0000-0000" />
                <span className="cs-hint">010-0000-0000 형식으로 입력해 주세요. (숫자만 입력하면 자동으로 ‘-’가 붙습니다)</span>
              </div>
              <div className="cs-field">
                <label className="cs-label" htmlFor="csAddress">주소 <i>필수</i></label>
                <div className="cs-addr">
                  <input id="csAddress" name="address" placeholder="주소 찾기를 눌러 주세요." readOnly />
                  <button id="csAddrBtn" className="cs-addr-btn" type="button">주소 찾기</button>
                </div>
                <input type="hidden" id="csZip" name="zipcode" />
                <input
                  className="cs-addr-detail"
                  id="csAddrDetail"
                  name="addressDetail"
                  maxLength={60}
                  placeholder="상세주소 (동·호수 등)"
                />
                <span className="cs-hint">상세주소는 선택 입력입니다.</span>
              </div>
            </div>

            <div className="cs-row">
              <div className="cs-field">
                <label className="cs-label" htmlFor="csEmail">이메일 <i>필수</i></label>
                <input id="csEmail" name="email" type="email" inputMode="email" placeholder="example@dain.com" />
                <span className="cs-hint">답변은 입력하신 이메일로 보내드립니다.</span>
              </div>
              <div className="cs-field" />
            </div>

            <div className="cs-row">
              <div className="cs-field">
                <label className="cs-label" htmlFor="csCourse">관심 과정 <i>필수</i></label>
                <select id="csCourse" name="course" defaultValue="">
                  <option value="" disabled>문의하실 과정을 선택해 주세요.</option>
                  {COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="cs-field">
                <label className="cs-label" htmlFor="csSource">유입경로 <i>필수</i></label>
                <select id="csSource" name="source" defaultValue="">
                  <option value="" disabled>다인교육을 어떻게 알게 되셨나요?</option>
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="cs-row">
              <div className="cs-field">
                <label className="cs-label" htmlFor="csPw">임시 비밀번호 <i>필수</i></label>
                <div className="cs-pw">
                  <input id="csPw" name="password" type="password" inputMode="numeric" maxLength={4} placeholder="숫자 4자리" />
                  <button id="csPwEye" className="cs-pw-eye" type="button" aria-label="비밀번호 보기">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </button>
                </div>
                <span className="cs-hint">답변 확인 시 사용됩니다.</span>
              </div>
              <div className="cs-field" />
            </div>

            {/* 상담 내용 */}
            <h2 className="cs-group-title cs-mt">상담 내용</h2>

            <div className="cs-field">
              <label className="cs-label" htmlFor="csTitle">제목 <i>필수</i></label>
              <input id="csTitle" name="title" maxLength={80} placeholder="상담 제목을 입력해 주세요." />
            </div>

            <div className="cs-field">
              <label className="cs-label" htmlFor="csContent">내용 <i>필수</i></label>
              <textarea id="csContent" name="content" rows={7} placeholder="상담하고 싶은 내용을 입력해 주세요." />
            </div>

            <div className="cs-agree-row">
              <button id="csAgree" className="cs-agree" type="button">
                <span className="cs-agree-check" aria-hidden="true">✓</span>
                개인정보 수집과 이용 동의<i>(필수)</i>
              </button>
              <a id="csAgreeMore" className="cs-agree-more" href="#agree">더보기 ›</a>
            </div>
            <div id="csAgreeDetail" className="cs-agree-detail">
              <p>· 수집 항목: 상담자 유형, 이름, 성별, 연락처, 주소, 관심 과정, 유입경로, 상담 내용</p>
              <p>· 수집 목적: 온라인 상담 답변 및 입학 안내</p>
              <p>· 보유 기간: 상담 완료 후 1년 보관 뒤 파기</p>
            </div>

            <p id="csMsg" className="cs-msg" />

            <div className="cs-submit-row">
              <button className="cs-submit" type="submit">온라인 상담 신청하기</button>
            </div>
          </form>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="dn-footer">
        <div className="dn-wrap dn-foot">
          <div className="dn-foot-left">
            <div className="dn-foot-brand">
              <img src="/dain-foot-icon.png" alt="다인교육" className="dn-foot-icon" />
              <span className="dn-foot-brandtext">
                <b className="dn-foot-name">DAIN EDU</b>
                <span className="dn-foot-brandline" />
                <span className="dn-foot-clock js-clock">00:00:00</span>
              </span>
            </div>
            <div className="dn-foot-tel-wrap">
              <button className="dn-foot-tel" type="button" aria-expanded="false" aria-label="대표번호 펼치기">
                031-8003-0221
                <span className="dn-foot-tel-caret" aria-hidden="true">▾</span>
              </button>
              <div className="dn-foot-tel-menu">
                <a href="tel:03180030221">
                  <span className="dn-tel-label">주식회사 다인교육 (본점)</span>
                  <span className="dn-tel-num">031-8003-0221</span>
                </a>
                <a href="tel:03180030222">
                  <span className="dn-tel-label">다인 학습센터</span>
                  <span className="dn-tel-num">031-8003-0222</span>
                </a>
                <a href="tel:03180030224">
                  <span className="dn-tel-label">다인 아카데미</span>
                  <span className="dn-tel-num">031-8003-0224</span>
                </a>
              </div>
            </div>
            <nav className="dn-foot-links">
              <a href="/#about">회사소개</a>
              <a href="#terms">이용약관</a>
              <a href="#privacy">개인정보 처리방침</a>
            </nav>
            <div className="dn-foot-info">
              <p>
                다인아카데미<span className="dn-foot-sep">|</span>대표 (주)다인교육
                <span className="dn-foot-sep">|</span>e-mail: help@dain-edu.com
              </p>
              <p>
                개인정보보호책임자: 김양현<span className="dn-foot-sep">|</span>대표번호 031-8003-0221
                <span className="dn-foot-sep">|</span>주소: 경기도 화성시 동탄 메타폴리스로 53, 6층
              </p>
              <p>
                사업자등록번호 421-85-03313<span className="dn-foot-sep">|</span>
                학원설립·운영등록번호: 제0000호 다인아카데미
                <span className="dn-foot-badge">교습비 안내</span>
              </p>
            </div>
            <p className="dn-foot-copy">Copyright © DAIN EDU. All Rights Reserved.</p>
          </div>
          <div className="dn-foot-sns">
            <a href="#" className="dn-sns dn-sns-kakao" aria-label="카카오톡">
              <img src="https://cdn.simpleicons.org/kakaotalk/391B1B" alt="카카오톡" />
            </a>
            <a href="#" className="dn-sns dn-sns-youtube" aria-label="유튜브">
              <img src="https://cdn.simpleicons.org/youtube/white" alt="유튜브" />
            </a>
            <a href="#" className="dn-sns dn-sns-naver" aria-label="네이버 블로그">
              <img src="https://cdn.simpleicons.org/naver/white" alt="네이버 블로그" />
            </a>
            <a href="#" className="dn-sns dn-sns-insta" aria-label="인스타그램">
              <img src="https://cdn.simpleicons.org/instagram/white" alt="인스타그램" />
            </a>
            <a href="#" className="dn-sns dn-sns-facebook" aria-label="페이스북">
              <img src="https://cdn.simpleicons.org/facebook/white" alt="페이스북" />
            </a>
          </div>
        </div>
      </footer>

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      {/* 도로명 주소 검색 (다음 우편번호 서비스) */}
      <Script
        id="daum-postcode"
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />

      <Script id="consult-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: consultScript }} />
    </main>
  );
}
