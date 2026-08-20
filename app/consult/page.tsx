import Script from "next/script";
import type { Metadata } from "next";
import { consultScript } from "./consultScript";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import { quickMenuMarkup } from "../quickMenu";

export const metadata: Metadata = {
  title: "온라인 상담 — 다인교육 동탄점",
  description: "다인교육 동탄점 온라인 입학상담 신청. 답변이 등록되면 알려드립니다.",
};

/** 관심 과정 (반 문의) 선택지 — 모집안내 카테고리와 동일하게 유지 */
const COURSES = ["포르타 고등전문관", "클라비스 N수전문관", "2027 윈터스쿨"];

/** 학년 선택지 */
const GRADES = ["중3", "고1", "고2", "고3", "재수 / N수"];

/** 지역 선택지 — 서울 25개 구 */
const SEOUL = [
  "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
  "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
  "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구",
];

/** 지역 선택지 — 경기 시 단위 */
const GYEONGGI = [
  "가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시",
  "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시",
  "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시",
  "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시",
];

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
      <SiteHeader />

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
              <div className="cs-field">
                <label className="cs-label" htmlFor="csGrade">학년 <i>필수</i></label>
                <select id="csGrade" name="grade" defaultValue="">
                  <option value="" disabled>학년을 선택해 주세요.</option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="cs-row">
              <div className="cs-field">
                <label className="cs-label" htmlFor="csRegion">지역 <i>필수</i></label>
                <select id="csRegion" name="region" defaultValue="">
                  <option value="" disabled>지역을 선택해 주세요.</option>
                  <optgroup label="서울">
                    {SEOUL.map((r) => (
                      <option key={r} value={`서울 ${r}`}>{r}</option>
                    ))}
                  </optgroup>
                  <optgroup label="경기">
                    {GYEONGGI.map((r) => (
                      <option key={r} value={`경기 ${r}`}>{r}</option>
                    ))}
                  </optgroup>
                  <option value="기타">기타 지역</option>
                </select>
              </div>
              <div className="cs-field">
                <label className="cs-label" htmlFor="csSchool">학교명 <i>필수</i></label>
                <input id="csSchool" name="school" maxLength={40} placeholder="예) 동탄고등학교" />
                <span className="cs-hint">재학(예정) 중인 학교명을 입력해 주세요.</span>
              </div>
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
      <SiteFooter />

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
