import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { eventListScript } from "./eventScript";
import { statusFilters } from "./eventData";
import { getEvents } from "@/lib/content";
import { getVisiblePosts, BLOG_URL } from "@/lib/blog";

// 60초마다 새로 만들어 둡니다. 관리자에서 고치면 즉시 반영됩니다.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "이벤트 · 설명회 — 다인에듀 동탄점",
  description:
    "다인에듀 동탄점 입시설명회 · 공개특강 일정과 사전예약 안내. 선착순으로 마감됩니다.",
};

export default async function EventListPage() {
  const [events, posts] = await Promise.all([getEvents(), getVisiblePosts(6)]);
  const openCount = events.filter((e) => e.status === "접수중").length;
  return (
    <main className="dn-body ev-page">
      <SiteHeader />

      {/* ── 히어로 ── */}
      <PageBand
        eyebrow="Briefing & Special Lecture"
        title="이벤트 · 설명회"
        sub={[
          "입시의 흐름이 바뀔 때마다, 가장 먼저 알려드립니다.",
          "모든 설명회는 사전예약제로 운영되며 선착순 마감됩니다.",
        ]}
        crumb={[{ label: "학원생활" }, { label: "이벤트 · 설명회" }]}
      >
        <span className="pb-chip">
          현재 접수중 <b>{openCount}</b>건
        </span>
        <span className="pb-tel">
          문의 <a href="tel:16448022">1644-8022</a>
        </span>
      </PageBand>

      {/* ── 필터 + 목록 ── */}
      <section className="ev-sec">
        <div className="ev-wrap">
          <div className="ev-filter" id="evFilter" role="tablist" aria-label="접수 상태 필터">
            {statusFilters.map((s, i) => (
              <button
                className={`ev-filter-btn${i === 0 ? " is-on" : ""}`}
                type="button"
                data-status={s}
                role="tab"
                aria-selected={i === 0}
                key={s}
              >
                {s}
                <i>{s === "전체" ? events.length : events.filter((e) => e.status === s).length}</i>
              </button>
            ))}
          </div>

          <ul className="ev-list" id="evList">
            {events.map((e) => (
              <li className="ev-item" data-status={e.status} key={e.id}>
                {/* /event/1 은 중계 서버가 가로채므로 /events/… 로 엽니다 */}
                <a className="ev-card" href={`/events/${e.id}`}>
                  <div className="ev-card-side">
                    <span className={`ev-state ev-state-${e.status === "접수중" ? "open" : e.status === "접수예정" ? "soon" : "closed"}`}>
                      {e.status}
                    </span>
                    <span className="ev-kind">{e.kind}</span>
                  </div>

                  <div className="ev-card-main">
                    <div className="ev-badges">
                      {e.targets.map((t) => (
                        <span className="ev-badge" key={t}>{t}</span>
                      ))}
                    </div>
                    <h2 className="ev-card-title">{e.title}</h2>
                    <p className="ev-card-lead">{e.lead}</p>
                    <dl className="ev-meta">
                      <div>
                        <dt>일시</dt>
                        <dd>{e.date}</dd>
                      </div>
                      <div>
                        <dt>장소</dt>
                        <dd>
                          {e.place}
                          {e.placeDetail && <em> · {e.placeDetail}</em>}
                        </dd>
                      </div>
                      <div>
                        <dt>정원</dt>
                        <dd>{e.capacity}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="ev-card-go">
                    <span className="ev-card-btn">
                      {e.status === "마감" ? "내용 보기" : "자세히 보고 예약"}
                      <i aria-hidden="true">›</i>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <p className="ev-empty" id="evEmpty" hidden>
            해당하는 일정이 없습니다.
          </p>

          <p className="ev-note">
            ※ 설명회 일정은 학원 사정에 따라 변경될 수 있으며, 변경 시 예약자에게 개별 안내드립니다.
          </p>
        </div>
      </section>

      {/* ── 입시자료 (네이버 블로그 연동) ── */}
      {posts.length > 0 && (
        <section className="ar-sec" id="archive">
          <div className="ev-wrap">
            <div className="ar-head">
              <div>
                <p className="ev-eyebrow">Archive</p>
                <h2 className="ar-title">입시자료</h2>
                <p className="ar-desc">다인에듀가 정리한 입시 소식과 학습 자료입니다.</p>
              </div>
              <a className="ar-more" href={BLOG_URL} target="_blank" rel="noopener noreferrer">
                블로그에서 더 보기 ↗
              </a>
            </div>

            <ul className="ar-grid">
              {posts.map((p) => (
                <li key={p.id}>
                  <a className="ar-card" href={p.link} target="_blank" rel="noopener noreferrer">
                    <div className="ar-thumb">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <span aria-hidden="true">DAIN</span>
                      )}
                    </div>
                    <div className="ar-body">
                      <span className="ar-date">{p.date}</span>
                      <h3 className="ar-card-title">{p.title}</h3>
                      {p.summary && <p className="ar-sum">{p.summary}</p>}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── 하단 안내 ── */}
      <section className="ev-cta">
        <div className="ev-wrap ev-cta-in">
          <div>
            <p className="ev-eyebrow ev-eyebrow-inv">Need help?</p>
            <h2 className="ev-cta-title">일정이 맞지 않으신가요?</h2>
            <p className="ev-cta-desc">
              온라인 상담을 남겨주시면 담당 선생님이 개별 상담 일정을 잡아드립니다.
            </p>
          </div>
          <a className="ev-cta-btn" href="/consult">온라인 상담 신청</a>
        </div>
      </section>

      <SiteFooter />

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script
        id="event-list-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: eventListScript }}
      />
    </main>
  );
}
