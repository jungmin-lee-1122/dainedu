// ═══════════════════════════════════════════════════════════
//  셔틀버스 안내  (/shuttle)
//
//  · 글과 시간은 전부 shuttleData.ts 에 있습니다. 거기만 고치세요.
//  · IS_DRAFT 가 true 인 동안에는 "준비 중" 띠가 뜨고 검색에도 안 잡힙니다.
//    확정 노선을 받으면 false 로 바꾸세요.
// ═══════════════════════════════════════════════════════════
import Script from "next/script";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { shuttleScript } from "./shuttleScript";
import { hero, summary, routes, notes, routeNote } from "./shuttleData";

/** 노선이 확정되기 전까지 true — 검색에 잡히지 않게 합니다 */
const IS_DRAFT = true;
/** 화면 맨 위 "준비 중" 띠 표시 여부 */
const SHOW_DRAFT_BANNER = false;

export const metadata: Metadata = {
  title: "셔틀버스 안내 — 다인에듀 동탄점",
  description:
    "다인에듀 동탄점 셔틀버스 노선과 시간 안내. 동탄1·2신도시 전 지역을 운행합니다.",
  ...(IS_DRAFT ? { robots: { index: false, follow: false } } : {}),
};

function Icon({ name }: { name: string }) {
  const c = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "bus")
    return (
      <svg {...c}>
        <rect x="4" y="4" width="16" height="12.5" rx="2.5" />
        <path d="M4 10h16M9 4v6M15 4v6" />
        <circle cx="8" cy="19" r="1.6" />
        <circle cx="16" cy="19" r="1.6" />
        <path d="M5 16.5v1.2M19 16.5v1.2" />
      </svg>
    );
  if (name === "clock")
    return (
      <svg {...c}>
        <circle cx="12" cy="12" r="8.6" />
        <path d="M12 7.2V12l3.2 2" />
      </svg>
    );
  return (
    <svg {...c}>
      <rect x="3" y="6" width="18" height="12" rx="2.4" />
      <path d="M3 10h18M6.6 14.2h3.2" />
    </svg>
  );
}

export default function ShuttlePage() {
  return (
    <main className="dn-body sh-page">
      <SiteHeader />

      <PageBand
        eyebrow={hero.eyebrow}
        title="셔틀버스 안내"
        sub={hero.sub}
        crumb={[{ label: "학원소개" }, { label: "셔틀버스 안내" }]}
      />

      {SHOW_DRAFT_BANNER && (
        <div className="sh-draft" role="status">
          <b>노선 준비 중</b>
          <span>
            아래 노선과 시간은 <em>예시</em>입니다. 확정되는 대로 안내드립니다.
          </span>
        </div>
      )}

      {/* ══ 1) 요약 ══ */}
      <section className="sh-sec sh-sum-sec">
        <div className="sh-wrap">
          <h2 className="sh-h2">{hero.title}</h2>

          <ul className="sh-sum">
            {summary.map((s) => (
              <li className="sh-sum-item" key={s.k}>
                <span className="sh-sum-ico" aria-hidden="true">
                  <Icon name={s.icon} />
                </span>
                <div>
                  <b>{s.k}</b>
                  <span>{s.v}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ 2) 노선 ══ */}
      <section className="sh-sec sh-route-sec" id="route">
        <div className="sh-wrap">
          <p className="sh-tag">Route</p>
          <h2 className="sh-h2">노선 안내</h2>

          <div className="sh-tabs" role="tablist" aria-label="노선 선택">
            {routes.map((r, i) => (
              <button
                className={`sh-tab${i === 0 ? " is-on" : ""}`}
                type="button"
                role="tab"
                aria-selected={i === 0}
                data-route-tab={r.id}
                style={{ ["--sh-c" as string]: r.color }}
                key={r.id}
              >
                <i aria-hidden="true" />
                <b>{r.tab}</b>
                <span>{r.area}</span>
              </button>
            ))}
          </div>

          {routes.map((r, i) => (
            <div
              className="sh-panel"
              data-route-panel={r.id}
              hidden={i !== 0}
              style={{ ["--sh-c" as string]: r.color }}
              key={r.id}
            >
              <div className="sh-cols">
                {[
                  { k: "등원", t: "학원으로", list: r.go },
                  { k: "하원", t: "집으로", list: r.back },
                ].map((col) => (
                  <div className="sh-col" key={col.k}>
                    <div className="sh-col-head">
                      <b>{col.k}</b>
                      <span>{col.t}</span>
                    </div>
                    <ol className="sh-stops">
                      {col.list.map((st, si) => (
                        <li
                          className={`sh-stop${st.note ? " is-hub" : ""}`}
                          key={`${st.time}-${si}`}
                        >
                          <span className="sh-stop-time">{st.time}</span>
                          <span className="sh-stop-dot" aria-hidden="true" />
                          <span className="sh-stop-name">
                            {st.name}
                            {st.note && <i>{st.note}</i>}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="sh-route-note">
            <span aria-hidden="true">※</span> {routeNote}
          </p>
        </div>
      </section>

      {/* ══ 3) 이용 안내 ══ */}
      <section className="sh-sec sh-note-sec">
        <div className="sh-wrap">
          <p className="sh-tag">Notice</p>
          <h2 className="sh-h2">이용 안내</h2>
          <ul className="sh-notes">
            {notes.map((n, i) => (
              <li key={n}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />
      <Script
        id="shuttle-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: shuttleScript }}
      />
    </main>
  );
}
