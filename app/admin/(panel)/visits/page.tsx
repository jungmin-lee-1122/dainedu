// ═══════════════════════════════════════════════════════════
//  방문 기록 — 언제 어느 도시에서 어떤 페이지를 봤는지
//
//  IP 주소는 저장하지 않습니다. 도시·지역만 남깁니다.
// ═══════════════════════════════════════════════════════════
import { listVisits, visitSummary, hasDb } from "@/lib/visits";
import { koCity, koRegion } from "@/lib/koreanPlace";

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

const COUNTRY: Record<string, string> = {
  KR: "대한민국", JP: "일본", US: "미국", CN: "중국", TW: "대만",
  VN: "베트남", SG: "싱가포르", HK: "홍콩", GB: "영국", CA: "캐나다",
  AU: "호주", DE: "독일", FR: "프랑스", PH: "필리핀", TH: "태국",
};

function place(city: string, region: string, country: string) {
  const nation = COUNTRY[country] || country;
  // 도시를 모르면 나라만이라도 보여줍니다.
  if (!city && !region) return nation || "알 수 없음";
  // 해외는 한글로 바꾸지 않고 영문 그대로 둡니다.
  if (country && country !== "KR") return [city, nation].filter(Boolean).join(" · ");
  return [koRegion(region), koCity(city)].filter(Boolean).join(" ");
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
                <li key={c.name + c.region}>
                  <i>{i + 1}</i>
                  <b>{[koRegion(c.region), koCity(c.name)].filter(Boolean).join(" ") || c.name}</b>
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

      <p className="ad-notice">
        지역은 접속 IP로 <b>추정</b>한 값입니다. 유선 인터넷은 시·군까지 대체로 맞지만, 휴대폰 데이터로
        접속하면 통신사 장비 위치가 잡혀 실제와 다를 수 있습니다. 한 건씩 보기보다 <b>전체 흐름</b>으로
        봐주세요.{" "}
        <a href="/api/visit/debug" target="_blank" rel="noopener noreferrer">
          지역 정보 진단 ↗
        </a>
      </p>

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
