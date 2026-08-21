import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../SiteHeader";
import SiteFooter from "../../SiteFooter";
import { quickMenuMarkup } from "../../quickMenu";
import { eventViewScript } from "../eventScript";
import { reserveModalMarkup } from "../reserveModal";
import { events, findEvent } from "../eventData";

/** 미리 만들어 둘 주소들 (/event/1, /event/2 …) */
export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const ev = findEvent(id);
  if (!ev) return { title: "이벤트 · 설명회 — 다인교육 동탄점" };
  return {
    title: `${ev.title} — 다인교육 동탄점`,
    description: `${ev.lead} · ${ev.date} · ${ev.place}`,
  };
}

export default async function EventViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ev = findEvent(id);
  if (!ev) notFound();

  const closed = ev.status === "마감";
  const stateClass =
    ev.status === "접수중" ? "open" : ev.status === "접수예정" ? "soon" : "closed";

  return (
    <main className="dn-body ev-page ev-view">
      <SiteHeader />

      {/* ── 상단 키비주얼 ── */}
      <section className="ev-kv">
        <div className="ev-wrap">
          <nav className="ev-crumb ev-crumb-inv" aria-label="현재 위치">
            <a href="/">홈</a>
            <span aria-hidden="true">›</span>
            <a href="/event">이벤트 · 설명회</a>
            <span aria-hidden="true">›</span>
            <b>{ev.kind}</b>
          </nav>

          <div className="ev-kv-badges">
            <span className={`ev-state ev-state-${stateClass}`}>{ev.status}</span>
            <span className="ev-kind ev-kind-inv">{ev.kind}</span>
            {ev.targets.map((t) => (
              <span className="ev-badge ev-badge-inv" key={t}>{t}</span>
            ))}
          </div>

          <h1 className="ev-kv-title">{ev.title}</h1>
          <p className="ev-kv-lead">{ev.lead}</p>
        </div>
      </section>

      {/* ── 요약표 ── */}
      <section className="ev-sec ev-sec-tight">
        <div className="ev-wrap">
          <div className="ev-summary">
            <dl className="ev-summary-grid">
              <div>
                <dt>일시</dt>
                <dd>{ev.date}</dd>
              </div>
              <div>
                <dt>대상</dt>
                <dd>{ev.targets.join(" · ")}</dd>
              </div>
              <div>
                <dt>장소</dt>
                <dd>
                  {ev.place}
                  {ev.placeDetail && <em> {ev.placeDetail}</em>}
                </dd>
              </div>
              <div>
                <dt>정원</dt>
                <dd>{ev.capacity}</dd>
              </div>
            </dl>

            <div className="ev-summary-act">
              <button
                className="ev-book-btn"
                type="button"
                id="evBookTop"
                disabled={closed}
              >
                {closed ? "접수 마감" : "예약하기"}
              </button>
              <p className="ev-summary-help">
                {closed
                  ? "다음 일정은 공지사항으로 안내드립니다."
                  : "선착순 마감 · 예약 후 안내 문자를 보내드립니다."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 본문 ── */}
      <section className="ev-sec">
        <div className="ev-wrap ev-body-grid">
          <div className="ev-body-main">
            <div className="ev-block">
              <h2 className="ev-h2">설명회 안내</h2>
              {ev.body.map((p, i) => (
                <p className="ev-p" key={i}>{p}</p>
              ))}
            </div>

            <div className="ev-block">
              <h2 className="ev-h2">진행 순서</h2>
              <ol className="ev-program">
                {ev.program.map((p, i) => (
                  <li key={i}>
                    <span className="ev-program-time">{p.time}</span>
                    <span className="ev-program-desc">{p.desc}</span>
                  </li>
                ))}
              </ol>
            </div>

            {ev.speakers && ev.speakers.length > 0 && (
              <div className="ev-block">
                <h2 className="ev-h2">진행</h2>
                <ul className="ev-speakers">
                  {ev.speakers.map((s, i) => (
                    <li key={i}>
                      <b>{s.name}</b>
                      <span>{s.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="ev-block">
              <h2 className="ev-h2">유의사항</h2>
              <ul className="ev-notice">
                {ev.notice.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 우측 고정 예약 카드 */}
          <aside className="ev-aside">
            <div className="ev-aside-card">
              <span className={`ev-state ev-state-${stateClass}`}>{ev.status}</span>
              <h3 className="ev-aside-title">{ev.title}</h3>
              <dl className="ev-aside-meta">
                <div>
                  <dt>일시</dt>
                  <dd>{ev.date}</dd>
                </div>
                <div>
                  <dt>장소</dt>
                  <dd>
                    {ev.place}
                    {ev.placeDetail && <em> {ev.placeDetail}</em>}
                  </dd>
                </div>
                <div>
                  <dt>정원</dt>
                  <dd>{ev.capacity}</dd>
                </div>
              </dl>
              <button
                className="ev-book-btn ev-book-btn-full"
                type="button"
                id="evBookSide"
                disabled={closed}
              >
                {closed ? "접수 마감" : "예약하기"}
              </button>
              <a className="ev-aside-link" href="/event">다른 일정 보기</a>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />

      {/* 예약 폼 (버튼을 누르면 열립니다) */}
      {!closed && (
        <div
          dangerouslySetInnerHTML={{
            __html: reserveModalMarkup({
              id: ev.id,
              title: ev.title,
              date: ev.date,
              targets: ev.targets.join(", "),
              place: ev.placeDetail ? `${ev.place} ${ev.placeDetail}` : ev.place,
            }),
          }}
        />
      )}

      {/* 모바일 하단 고정 버튼 */}
      <div className="ev-fixcta">
        <span className="ev-fixcta-info">
          <b>{ev.date.split("오")[0].trim()}</b>
          <em>{ev.capacity}</em>
        </span>
        <button className="ev-book-btn" type="button" id="evBookFix" disabled={closed}>
          {closed ? "접수 마감" : "예약하기"}
        </button>
      </div>

      <div dangerouslySetInnerHTML={{ __html: quickMenuMarkup }} />

      <Script
        id="event-view-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: eventViewScript }}
      />
    </main>
  );
}
