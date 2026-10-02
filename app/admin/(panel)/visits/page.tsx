// ═══════════════════════════════════════════════════════════
//  방문 기록 — 언제 어느 도시에서 어떤 페이지를 봤는지
//
//  IP 주소는 저장하지 않습니다. 도시·지역만 남깁니다.
// ═══════════════════════════════════════════════════════════
import { listVisits, visitSummary, hasDb } from "@/lib/visits";

export const dynamic = "force-dynamic";

/** 2026. 10. 02 (금) 14:33 형태로 (한국 시간) */
function when(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function place(city: string, region: string, country: string) {
  if (!city && !region) return country === "KR" || !country ? "알 수 없음" : country;
  if (country && country !== "KR") return [city, country].filter(Boolean).join(" · ");
  return [region, city].filter(Boolean).join(" ");
}

export default async function VisitsPage() {
  if (!hasDb()) {
    return (
      <div>
        <h1 className="ad-h1">방문 기록</h1>
        <p className="ad-desc">데이터베이스가 연결되어 있지 않아 기록을 볼 수 없습니다.</p>
      </div>
    );
  }

  const [sum, rows] = await Promise.all([visitSummary(), listVisits(200)]);

  return (
    <div>
      <h1 className="ad-h1">방문 기록</h1>
      <p className="ad-desc">
        언제 어느 도시에서 어떤 페이지를 봤는지 보여줍니다. 최근 200건까지 표시되며, 같은 사람이 같은
        페이지를 다시 봐도 30분에 한 번만 기록합니다. IP 주소는 저장하지 않습니다.
      </p>

      <div className="vs-stats">
        <div className="vs-stat"><em>오늘</em><b>{sum.today.toLocaleString()}</b><span>건</span></div>
        <div className="vs-stat"><em>최근 7일</em><b>{sum.week.toLocaleString()}</b><span>건</span></div>
        <div className="vs-stat"><em>전체</em><b>{sum.total.toLocaleString()}</b><span>건</span></div>
      </div>

      <div className="vs-cols">
        <section className="vs-col">
          <h2 className="ad-h2">많이 접속한 지역</h2>
          {sum.topCities.length === 0 ? (
            <p className="ad-empty-sm">아직 기록이 없습니다.</p>
          ) : (
            <ul className="vs-rank">
              {sum.topCities.map((c, i) => (
                <li key={c.name}>
                  <i>{i + 1}</i>
                  <b>{c.name}</b>
                  <span>{c.count.toLocaleString()}건</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="vs-col">
          <h2 className="ad-h2">많이 본 페이지</h2>
          {sum.topPaths.length === 0 ? (
            <p className="ad-empty-sm">아직 기록이 없습니다.</p>
          ) : (
            <ul className="vs-rank">
              {sum.topPaths.map((p, i) => (
                <li key={p.name}>
                  <i>{i + 1}</i>
                  <b>{p.name}</b>
                  <span>{p.count.toLocaleString()}건</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <h2 className="ad-h2">최근 방문</h2>
      {rows.length === 0 ? (
        <p className="ad-empty">
          아직 기록이 없습니다. 사이트가 배포된 뒤 방문이 생기면 여기에 쌓입니다.
        </p>
      ) : (
        <div className="vs-table-wrap">
          <table className="vs-table">
            <thead>
              <tr>
                <th>시각</th>
                <th>지역</th>
                <th>페이지</th>
                <th>기기</th>
                <th>유입</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="vs-when">{when(r.createdAt)}</td>
                  <td><b>{place(r.city, r.region, r.country)}</b></td>
                  <td className="vs-path">{r.path}</td>
                  <td>{r.device}</td>
                  <td className="vs-ref">{r.referrer ? hostOf(r.referrer) : "직접 방문"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
