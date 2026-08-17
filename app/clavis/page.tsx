import Script from "next/script";
import type { Metadata } from "next";
import { clavisScript } from "./clavisScript";
import { quickMenuMarkup } from "../quickMenu";
import {
  heroSlides,
  teacherTabs,
  teachers,
  notices,
  lectures,
  reviews,
  sideBanners,
} from "./clavisData";

export const metadata: Metadata = {
  title: "고등 클라비스 — 다인교육 동탄점",
  description: "명문대 합격의 열쇠, 핵심 커리큘럼. 다인교육 동탄점 고등 클라비스.",
};

export default function ClavisPage() {
  return (
    <main className="dn-body cv-page">
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
            <a href="#about">학원소개</a>
            <div className="dn-gnb-sub">
              <a href="#about">인사말</a>
              <a href="#about">시설 안내</a>
              <a href="#about">오시는 길</a>
              <a href="#system">운영시스템</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="#teachers">강사진 소개</a>
            <div className="dn-gnb-sub">
              <a href="#teachers">국어</a>
              <a href="#teachers">수학</a>
              <a href="#teachers">영어</a>
              <a href="#teachers">탐구</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="#notice">모집안내</a>
            <div className="dn-gnb-sub">
              <a href="#notice">고등종합</a>
              <a href="#notice">단과</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="#contents">콘텐츠</a>
            <div className="dn-gnb-sub">
              <a href="#contents">영단어 데일리 테스트</a>
              <a href="#contents">빈칸·순서·삽입 데일리 훈련</a>
              <a href="#contents">학과 적성 찾기</a>
            </div>
          </li>
          <li className="dn-gnb-item">
            <a href="#review">학원생활</a>
            <div className="dn-gnb-sub">
              <a href="#review">성공수기</a>
              <a href="#review">상담 문의</a>
            </div>
          </li>
        </ul>
        <span className="dn-navcta dn-dday" aria-label="수능 디데이">
          <span className="cta-label" id="dnDdayCap">수능</span>
          <span className="cta-badge" id="dnDdayNum">D-…</span>
        </span>
      </nav>

      {/* ── 1) 메인 롤링 배너 ── */}
      <section className="cv-main-bn" id="top">
        <div className="cv-wrap">
          <div className="cv-hero" id="cvHero">
            <div className="cv-hero-track">
              {heroSlides.map((s, i) => (
                <a className="cv-hero-slide" href={s.href} key={i}>
                  <img src={s.img} alt={s.alt} />
                </a>
              ))}
            </div>
            <div className="cv-hero-tabs" role="tablist">
              {heroSlides.map((s, i) => (
                <button
                  className="cv-hero-tab"
                  type="button"
                  data-idx={i}
                  key={i}
                >
                  {s.tab}
                </button>
              ))}
              <span className="cv-hero-count">
                <b className="cv-cur">1</b> / <span className="cv-tot">{heroSlides.length}</span>
              </span>
              <button className="cv-hero-play" type="button" aria-label="자동재생 정지">
                <span className="cv-ico-pause">❚❚</span>
                <span className="cv-ico-play">▶</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 그랜드 오픈 배너 ── */}
      <section className="cv-stats-sec">
        <div className="cv-wrap">
          <a className="cv-statsbn" href="/register" aria-label="다인에듀 동탄점 09.21 그랜드 오픈">
            <img src="/clavis/stats-banner.png" alt="다인에듀 동탄점 09.21 GRAND OPEN" />
            <span className="cv-statsbn-sheen" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ── 3) 선생님 ── */}
      <section className="cv-teacher" id="teachers">
        <div className="cv-wrap">
          <div className="cv-sec-head">
            <h2 className="cv-sec-title">선생님</h2>
            <div className="cv-tabs" id="cvTeacherTabs">
              {teacherTabs.map((t, i) => (
                <button className="cv-tab" type="button" data-subject={t} key={i}>
                  {t}
                </button>
              ))}
            </div>
            <a className="cv-more" href="#teachers" aria-label="전체보기">+</a>
          </div>
          <div className="cv-teacher-slider" id="cvTeacher">
            <div className="cv-teacher-track">
              {teachers.map((t, i) => (
                <a className="cv-teacher-card" href="#teachers" data-subject={t.subject} key={i}>
                  <div className="cv-teacher-info">
                    <div className="cv-teacher-grades">
                      {t.grades.map((g, j) => (
                        <span className="cv-grade" key={j}>{g}</span>
                      ))}
                    </div>
                    <span className="cv-teacher-subject">{t.subject}</span>
                    <b className="cv-teacher-name">
                      {t.name}
                      {t.isNew && <i className="cv-new">N</i>}
                    </b>
                  </div>
                  <img className="cv-teacher-photo" src={t.img} alt={`${t.subject} ${t.name} 선생님`} />
                </a>
              ))}
            </div>
            <button className="cv-arrow cv-arrow-prev" type="button" data-dir="prev" aria-label="이전">‹</button>
            <button className="cv-arrow cv-arrow-next" type="button" data-dir="next" aria-label="다음">›</button>
          </div>
        </div>
      </section>

      {/* ── 4) 공지사항 · 설명회 ── */}
      <section className="cv-board" id="notice">
        <div className="cv-wrap cv-board-grid">
          <div className="cv-notice">
            <div className="cv-sec-head">
              <h2 className="cv-sec-title">공지사항</h2>
              <a className="cv-more" href="#notice" aria-label="전체보기">+</a>
            </div>
            <ul className="cv-notice-list">
              {notices.map((n, i) => (
                <li key={i}>
                  <a href={n.href}>
                    <span className="cv-notice-tag">【{n.tag}】</span>
                    <span className="cv-notice-title">{n.title}</span>
                    <span className="cv-notice-date">{n.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="cv-lecture">
            <div className="cv-sec-head">
              <h2 className="cv-sec-title">설명회·공개특강</h2>
              <a className="cv-more" href="#notice" aria-label="전체보기">+</a>
            </div>
            <div className="cv-lecture-list">
              {lectures.map((l, i) => (
                <a className="cv-lecture-item" href={l.href} key={i}>
                  <div className="cv-lecture-main">
                    <div className="cv-lecture-top">
                      {l.badges.map((b, j) => (
                        <span className="cv-badge" key={j}>{b}</span>
                      ))}
                      <b className="cv-lecture-title">{l.title}</b>
                    </div>
                    <div className="cv-lecture-meta">
                      <span>· 일시 <b>{l.date}</b></span>
                      <span>· 장소 <b>{l.place}</b></span>
                    </div>
                  </div>
                  <span className="cv-lecture-btn">{l.status}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5) 성공수기 + 사이드 배너 ── */}
      <section className="cv-bottom" id="review">
        <div className="cv-wrap cv-bottom-grid">
          <div className="cv-review">
            <div className="cv-sec-head">
              <h2 className="cv-sec-title">성공수기</h2>
              <div className="cv-dots" id="cvReviewDots" />
            </div>
            <div className="cv-review-slider" id="cvReview">
              <div className="cv-review-track">
                {reviews.map((r, i) => (
                  <a className="cv-review-card" href={r.href} key={i}>
                    <img src={r.img} alt={r.alt} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="cv-side">
            <div className="cv-side-slider" id="cvSide">
              <div className="cv-side-track">
                {sideBanners.map((b, i) => (
                  <a className="cv-side-slide" href={b.href} key={i}>
                    <img src={b.img} alt={b.alt} />
                  </a>
                ))}
              </div>
              <div className="cv-side-ctrl">
                <div className="cv-dots" id="cvSideDots" />
                <button className="cv-side-play" type="button" aria-label="자동재생 정지">
                  <span className="cv-ico-pause">❚❚</span>
                  <span className="cv-ico-play">▶</span>
                </button>
              </div>
            </div>
          </div>
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
              <a href="#about">회사소개</a>
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

      <Script id="clavis-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: clavisScript }} />
    </main>
  );
}
