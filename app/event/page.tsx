import Script from "next/script";
import Link from "next/link";
import { Fragment } from "react";
import type { Metadata } from "next";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";
import PageBand from "../PageBand";
import { quickMenuMarkup } from "../quickMenu";
import { eventListScript } from "./eventScript";
import { statusFilters } from "./eventData";
import { getEvents } from "@/lib/content";
import { isHiddenEvent } from "@/lib/hiddenEvents";
import {
  hero as WF_HERO,
  TARGETS as WF_TARGETS,
  PLACE as WF_PLACE,
} from "../winter-final/winterFinalData";
import {
  hero as JS_HERO,
  TARGETS as JS_TARGETS,
  PLACE as JS_PLACE,
} from "../jaesu-seminar/jaesuSeminarData";

// 60초마다 새로 만들어 둡니다. 관리자에서 고치면 즉시 반영됩니다.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "이벤트 · 설명회 — 다인에듀 동탄점",
  description:
    "다인에듀 동탄점 입시설명회 · 공개특강 일정과 사전 예약 안내. 정원이 차면 접수가 마감됩니다.",
};

export default async function EventListPage() {
  /* 묶음 안내 페이지가 따로 있는 설명회는 목록에서 감춥니다 (lib/hiddenEvents.ts) */
  const events = (await getEvents()).filter((e) => !isHiddenEvent(e.id));
  /* 묶음 안내 페이지로 가는 설명회 — 관리자 목록이 아니라 여기에 손으로 넣는 카드입니다.
     건수에도 같이 세어 줍니다.
     · 끝나서 "마감" 으로 바꿀 때 → 해당 카드의 status 만 "마감" 으로
       (배지 · 버튼 문구 · 필터 건수가 한 번에 따라갑니다)
     · 카드를 아예 내릴 때       → show 를 false 로 */
  type Manual = {
    show: boolean;
    status: "접수중" | "접수예정" | "마감";
    href: string;
    targets: string[];
    title: string;
    lead: string;
    date: string;
    place: string;
    placeDetail?: string;
    capacity: string;
  };
  const MANUAL: Manual[] = [
    {
      /* 2027 윈터스쿨 확장 추가 모집 설명회 — 학년별 3회차 (/winter-final)
         회차 3개는 lib/hiddenEvents.ts 에서 목록에 안 뜨게 해 두었습니다 */
      show: true,
      status: "접수중",
      href: "/winter-final",
      targets: WF_TARGETS,
      title: WF_HERO.title,
      lead: WF_HERO.lead,
      date: "학년별 상이 · 예비고1 11.28(토) 오후 2시 · 예비고2 11.29(일) 오후 1시 · 예비고3 11.29(일) 오후 4시",
      place: "다인에듀 동탄점",
      placeDetail: WF_PLACE,
      capacity: "사전 예약제 · 선착순 마감",
    },
    {
      /* 2028 재수선행반 설명회 — 1차 · 2차 (/jaesu-seminar) */
      show: true,
      status: "접수중",
      href: "/jaesu-seminar",
      targets: JS_TARGETS,
      title: JS_HERO.title,
      lead: JS_HERO.lead,
      date: "1차 12.5(토) 오후 2시 · 2차 12.12(토) 오후 2시",
      place: JS_PLACE,
      capacity: "사전 예약제 · 선착순 모집",
    },
  ];
  const manual = MANUAL.filter((m) => m.show);

  const count = (s: string) =>
    events.filter((e) => e.status === s).length + manual.filter((m) => m.status === s).length;
  const totalCount = events.length + manual.length;
  const openCount = count("접수중");
  return (
    <main className="dn-body ev-page">
      <SiteHeader />

      {/* ── 히어로 ── */}
      <PageBand
        eyebrow="Briefing & Special Lecture"
        title="이벤트 · 설명회"
        sub={[
          "입시의 흐름이 바뀔 때마다, 가장 먼저 알려드립니다.",
          "모든 설명회는 사전 예약제로 운영되며, 정원이 차면 접수가 마감됩니다.",
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
                <i>{s === "전체" ? totalCount : count(s)}</i>
              </button>
            ))}
          </div>

          <ul className="ev-list" id="evList">

            {events.map((e, idx) => (
              <Fragment key={e.id}>
              <li className="ev-item" data-status={e.status}>
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
              {idx === 0 && (
                <>
            {manual.map((m) => (
            <li className="ev-item" data-status={m.status} key={m.href}>
              <a className="ev-card" href={m.href}>
                <div className="ev-card-side">
                  <span className={`ev-state ev-state-${m.status === "접수중" ? "open" : m.status === "접수예정" ? "soon" : "closed"}`}>
                    {m.status}
                  </span>
                  <span className="ev-kind">설명회</span>
                </div>

                <div className="ev-card-main">
                  <div className="ev-badges">
                    {m.targets.map((t) => (
                      <span className="ev-badge" key={t}>{t}</span>
                    ))}
                  </div>
                  <h2 className="ev-card-title">{m.title}</h2>
                  <p className="ev-card-lead">{m.lead}</p>
                  <dl className="ev-meta">
                    <div>
                      <dt>일시</dt>
                      <dd>{m.date}</dd>
                    </div>
                    <div>
                      <dt>장소</dt>
                      <dd>
                        {m.place}
                        {m.placeDetail && <em> · {m.placeDetail}</em>}
                      </dd>
                    </div>
                    <div>
                      <dt>정원</dt>
                      <dd>{m.capacity}</dd>
                    </div>
                  </dl>
                </div>

                <div className="ev-card-go">
                  <span className="ev-card-btn">
                    {m.status === "마감" ? "내용 보기" : "자세히 보고 예약"}
                    <i aria-hidden="true">›</i>
                  </span>
                </div>
              </a>
            </li>
            ))}
                </>
              )}
              </Fragment>
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
