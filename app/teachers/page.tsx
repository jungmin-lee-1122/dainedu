import Script from "next/script";
import type { Metadata } from "next";
import { teachersScript } from "./teachersScript";
import { quickMenuMarkup } from "../quickMenu";
import { subjects, teachers } from "./teachersData";

const SEMINAR = "https://dain-edu.higgsfield.app/seminar";

export const metadata: Metadata = {
  title: "강사진 소개 — 다인교육 동탄점",
  description:
    "대치·목동·평촌에서 검증된 강사진을 한 분씩 소개합니다. 전원 공개는 설명회 현장에서.",
};

const revealedCount = teachers.filter((t) => t.revealed).length;

export default function TeachersPage() {
  return (
    <main className="dn-body tc-page">
      {/* ── 헤더 (메인페이지 카테고리) ── */}
      <a className="dn-topbar" href={SEMINAR} aria-label="설명회 사전등록 안내">
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
            <a href="/teachers">강사진 소개</a>
            {/* 세부 카테고리 숨김 (필요해지면 아래 주석을 풀어주세요)
            <div className="dn-gnb-sub">
              <a href="/teachers">국어</a>
              <a href="/teachers">수학</a>
              <a href="/teachers">영어</a>
              <a href="/teachers">탐구</a>
            </div>
            */}
          </li>
          <li className="dn-gnb-item">
            <a href="/#program">모집안내</a>
            <div className="dn-gnb-sub">
              <a href="/#program">재수종합</a>
              <a href="/#program">독학재수</a>
              <a href="/#program">고등종합</a>
              <a href="/#program">단과</a>
              <a href="/winter">2027 윈터스쿨</a>
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
              <a href="/consult">상담 문의</a>
            </div>
          </li>
        </ul>
        <span className="dn-navcta dn-dday" aria-label="수능 디데이">
          <span className="cta-label" id="dnDdayCap">수능</span>
          <span className="cta-badge" id="dnDdayNum">D-…</span>
        </span>
      </nav>

      {/* ── 히어로 ── */}
      <section className="tc-hero">
        <div className="tc-wrap">
          <p className="tc-eyebrow">Faculty</p>
          <h1 className="tc-title">
            최고의 강사진,<br />
            <em>여러분과 함께 합니다</em>
          </h1>
          <p className="tc-sub">대치 · 목동 · 평촌에서 검증된 강사진을 한 분씩 소개합니다.</p>
          <div className="tc-counter">
            <b>
              <span id="tcCount">{revealedCount}</span> / {teachers.length}
            </b>
            <span>공개</span>
            <i>전체 명단은 설명회 현장에서 발표됩니다</i>
          </div>
        </div>
      </section>

      {/* ── 과목 필터 + 카드 ── */}
      <section className="tc-sec">
        <div className="tc-wrap">
          <div className="tc-filter" id="tcFilter">
            {subjects.map((s, i) => (
              <button
                className={`tc-filter-btn${i === 0 ? " is-on" : ""}`}
                type="button"
                data-subject={s}
                key={s}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="tc-grid" id="tcGrid">
            {teachers.map((t, i) => (
              <article
                className={`tc-card tc-up${t.revealed ? " is-open" : ""}`}
                data-subject={t.subject}
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
                key={i}
              >
                <div className="tc-card-top">
                  <span className="tc-badge">{t.subject}</span>
                  <span className="tc-open">{t.openAt}</span>
                </div>
                <div className="tc-face" aria-hidden="true">
                  {t.revealed && t.photo ? (
                    <img src={t.photo} alt={t.name} />
                  ) : (
                    <span className="tc-face-q">?</span>
                  )}
                </div>
                <h3 className="tc-name">{t.name}</h3>
                <p className="tc-copy">{t.copy}</p>
                <ul className="tc-career">
                  {t.career.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="tc-note">※ 강사진 정보는 계약 및 출강 사실이 확인된 내용만 게시합니다.</p>
        </div>
      </section>

      {/* ── 라인업 안내 ── */}
      <section className="tc-lineup">
        <div className="tc-wrap tc-lineup-in">
          <div>
            <p className="tc-eyebrow tc-eyebrow-inv">Line-up</p>
            <h2 className="tc-h2">과목별 라인업</h2>
            <p className="tc-lineup-desc">
              전 과목 정규 강사진을 자체 편성했습니다.<br />
              출강 이력과 담당 과정을 함께 공개합니다.
            </p>
          </div>
          <div className="tc-lineup-tags">
            {subjects.slice(1).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="tc-cta">
        <div className="tc-wrap">
          <p className="tc-eyebrow">Meet them</p>
          <h2 className="tc-h2">가장 먼저 알고 싶다면</h2>
          <p className="tc-cta-desc">
            사전등록자에게 공개 소식을 먼저 보내드립니다.<br />
            전원 공개는 설명회 현장에서.
          </p>
          <a className="tc-cta-btn" href={SEMINAR}>공개 소식 먼저 받기</a>
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

      <Script id="teachers-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: teachersScript }} />
    </main>
  );
}
