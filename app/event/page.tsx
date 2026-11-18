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
import { isHiddenEvent } from "@/lib/hiddenEvents";
import {
  hero as WF_HERO,
  TARGETS as WF_TARGETS,
  PLACE as WF_PLACE,
} from "../winter-final/winterFinalData";

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
  /* 윈터 FINAL 묶음 설명회는 관리자 목록이 아니라 손으로 넣은 카드라,
     건수에도 한 건으로 같이 세어 줍니다.
     설명회가 끝나 "마감" 으로 바꿀 때는 아래 WF_STATUS 만 "마감" 으로 고치면
     카드 배지 · 필터 건수가 한 번에 따라갑니다. (카드 자체를 내리려면 WF_SHOW = false) */
  const WF_SHOW = true;
  const WF_STATUS = "접수중" as "접수중" | "접수예정" | "마감";

  const count = (s: string) =>
    events.filter((e) => e.status === s).length + (WF_SHOW && WF_STATUS === s ? 1 : 0);
  const totalCount = events.length + (WF_SHOW ? 1 : 0);
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
            {/* 윈터스쿨 확장 추가 모집 설명회 — 학년별 3회차라 묶음 페이지로 안내합니다
                (회차 3개는 lib/hiddenEvents.ts 에서 목록에 안 뜨게 해 두었습니다) */}
            {WF_SHOW && (
            <li className="ev-item" data-status={WF_STATUS}>
              <a className="ev-card" href="/winter-final">
                <div className="ev-card-side">
                  <span className={`ev-state ev-state-${WF_STATUS === "접수중" ? "open" : WF_STATUS === "접수예정" ? "soon" : "closed"}`}>
                    {WF_STATUS}
                  </span>
                  <span className="ev-kind">설명회</span>
                </div>

                <div className="ev-card-main">
                  <div className="ev-badges">
                    {WF_TARGETS.map((t) => (
                      <span className="ev-badge" key={t}>{t}</span>
                    ))}
                  </div>
                  <h2 className="ev-card-title">{WF_HERO.title}</h2>
                  <p className="ev-card-lead">{WF_HERO.lead}</p>
                  <dl className="ev-meta">
                    <div>
                      <dt>일시</dt>
                      <dd>
                        학년별 상이 · 예비고1 11.28(토) 오후 2시 · 예비고2 11.29(일) 오후 1시 ·
                        예비고3 11.29(일) 오후 4시
                      </dd>
                    </div>
                    <div>
                      <dt>장소</dt>
                      <dd>
                        다인에듀 동탄점
                        <em> · {WF_PLACE}</em>
                      </dd>
                    </div>
                    <div>
                      <dt>정원</dt>
                      <dd>사전 예약제 · 선착순 마감</dd>
                    </div>
                  </dl>
                </div>

                <div className="ev-card-go">
                  <span className="ev-card-btn">
                    {WF_STATUS === "마감" ? "내용 보기" : "자세히 보고 예약"}
                    <i aria-hidden="true">›</i>
                  </span>
                </div>
              </a>
            </li>
            )}

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
