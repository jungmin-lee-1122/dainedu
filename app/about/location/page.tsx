import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../../SiteHeader";
import SiteFooter from "../../SiteFooter";
import { quickMenuMarkup } from "../../quickMenu";
import { locationScript } from "./locationScript";

const PLACE_NAME = "다인아카데미 동탄점";
const LOT_ADDRESS = "경기도 화성시 동탄구 반송동 92-7";
const ROAD_ADDRESS = "경기도 화성시 동탄 메타폴리스로 53, 6층";
const TEL = "1644-0224";
const MAP_QUERY = `${PLACE_NAME} ${ROAD_ADDRESS}`;
const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=17&hl=ko&output=embed`;
const naverMap = `https://map.naver.com/p/search/${encodeURIComponent(ROAD_ADDRESS)}`;
const kakaoMap = `https://map.kakao.com/link/search/${encodeURIComponent(ROAD_ADDRESS)}`;

export const metadata: Metadata = {
  title: "오시는 길 — 다인교육 동탄점",
  description: `${PLACE_NAME} 오시는 길. ${LOT_ADDRESS}, ${ROAD_ADDRESS}. 대표전화 ${TEL}.`,
};

const routeCards = [
  {
    no: "01",
    label: "PUBLIC TRANSIT",
    title: "대중교통으로 오실 때",
    desc: "동탄역 또는 인근 정류장에서 출발 전 지도 앱의 실시간 추천 경로를 확인해 주세요.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="14" rx="4"/><path d="M5 11h14M8 21l2-3m6 3-2-3"/><circle cx="8.5" cy="14" r=".7"/><circle cx="15.5" cy="14" r=".7"/></svg>
    ),
  },
  {
    no: "02",
    label: "BY CAR",
    title: "자가용으로 오실 때",
    desc: "내비게이션에 ‘동탄 메타폴리스로 53’ 또는 ‘반송동 92-7’을 검색해 주세요.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17h14l-1-7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2l-1 7Z"/><path d="m7 8 1.2-3h7.6L17 8M5 13h14"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/></svg>
    ),
  },
  {
    no: "03",
    label: "PARKING",
    title: "주차 안내",
    desc: "건물 주차 이용과 지원 시간은 방문 일정에 따라 달라질 수 있으니 학원으로 먼저 문의해 주세요.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>
    ),
  },
];

export default function LocationPage() {
  return (
    <main className="dn-body lc-page">
      <SiteHeader />

      <section className="lc-hero">
        <div className="lc-hero-grid" aria-hidden="true" />
        <div className="lc-orb lc-orb-a" aria-hidden="true" />
        <div className="lc-orb lc-orb-b" aria-hidden="true" />
        <div className="lc-wrap lc-hero-in">
          <div className="lc-hero-copy">
            <p className="lc-eyebrow">Find Your Way to Dain</p>
            <h1>
              배움의 중심으로,<br />
              <em>오시는 길</em>
            </h1>
            <p className="lc-hero-sub">동탄의 한가운데에서 다인교육의 새로운 시작을 만나보세요.</p>
          </div>

          <div className="lc-address-card">
            <span className="lc-address-pin" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
            </span>
            <p>DAIN ACADEMY DONGTAN</p>
            <h2>{PLACE_NAME}</h2>
            <address>
              <strong>{LOT_ADDRESS}</strong>
              <span>{ROAD_ADDRESS}</span>
            </address>
            <div className="lc-floor"><b>6F</b><span>메타폴리스로 53<br />6층에서 만나요</span></div>
          </div>
        </div>
        <div className="lc-scroll-mark" aria-hidden="true"><span /> SCROLL TO MAP</div>
      </section>

      <section className="lc-map-section">
        <div className="lc-wrap">
          <div className="lc-section-head">
            <div>
              <p className="lc-eyebrow">Location Map</p>
              <h2>한눈에 찾는 다인교육</h2>
            </div>
            <p>주소를 누르면 원하는 지도 앱에서 바로 길찾기를 시작할 수 있습니다.</p>
          </div>

          <div className="lc-map-shell">
            <div className="lc-map-frame">
              <iframe
                src={mapEmbed}
                title={`${PLACE_NAME} 지도`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <aside className="lc-map-panel">
              <p className="lc-map-panel-kicker">WELCOME TO</p>
              <h3>DAIN<br />ACADEMY</h3>
              <span className="lc-map-panel-rule" />
              <address>{ROAD_ADDRESS}</address>
              <a href={`tel:${TEL.replaceAll("-", "")}`}>{TEL}</a>
            </aside>
          </div>

          <div className="lc-map-actions">
            <a className="lc-map-btn lc-map-btn-naver" href={naverMap} target="_blank" rel="noreferrer">
              <b>N</b><span>네이버 지도에서 보기</span><i>↗</i>
            </a>
            <a className="lc-map-btn lc-map-btn-kakao" href={kakaoMap} target="_blank" rel="noreferrer">
              <b>K</b><span>카카오맵에서 보기</span><i>↗</i>
            </a>
            <a className="lc-map-btn lc-map-btn-call" href={`tel:${TEL.replaceAll("-", "")}`}>
              <b>☎</b><span>전화로 위치 문의</span><i>{TEL}</i>
            </a>
          </div>
        </div>
      </section>

      <section className="lc-route-section">
        <div className="lc-wrap">
          <div className="lc-section-head lc-section-head-light">
            <div>
              <p className="lc-eyebrow">Before You Visit</p>
              <h2>방문 전 확인해 주세요</h2>
            </div>
            <p>가장 편안한 방문을 위해 출발 전 실시간 경로와 주차 안내를 확인해 주세요.</p>
          </div>

          <div className="lc-route-grid">
            {routeCards.map((card) => (
              <article className="lc-route-card" key={card.no}>
                <span className="lc-route-no">{card.no}</span>
                <div className="lc-route-icon">{card.icon}</div>
                <p>{card.label}</p>
                <h3>{card.title}</h3>
                <span>{card.desc}</span>
              </article>
            ))}
          </div>

          <div className="lc-arrival">
            <div className="lc-arrival-title">
              <p className="lc-eyebrow">Arrival Guide</p>
              <h2>도착은 이렇게</h2>
            </div>
            <ol>
              <li><b>1</b><span><strong>주소 검색</strong>메타폴리스로 53</span></li>
              <li><b>2</b><span><strong>건물 도착</strong>반송동 92-7</span></li>
              <li><b>3</b><span><strong>6층 이동</strong>다인아카데미</span></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="lc-cta">
        <div className="lc-wrap lc-cta-in">
          <div>
            <p className="lc-eyebrow">Need Help?</p>
            <h2>찾아오시는 길이 어렵다면<br />바로 안내해 드릴게요.</h2>
          </div>
          <a href={`tel:${TEL.replaceAll("-", "")}`}><span>대표전화</span><b>{TEL}</b><i>→</i></a>
        </div>
      </section>

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />
      <Script id="location-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: locationScript }} />
    </main>
  );
}
