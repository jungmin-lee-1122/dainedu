// ═══════════════════════════════════════════════════════════
//  접속 지역 알아내기
//
//  우리 사이트 앞에 Cloudflare 가 있어서, Vercel 이 알려주는
//  x-vercel-ip-* 값은 방문자가 아니라 "중계 서버(예: 도쿄)" 위치가 됩니다.
//  그래서 Cloudflare 가 넣어주는 cf-* 값을 먼저 봅니다.
// ═══════════════════════════════════════════════════════════

export type Geo = { city: string; region: string; country: string; source: string };

function dec(v: string | null | undefined) {
  if (!v) return "";
  try {
    return decodeURIComponent(v).trim();
  } catch {
    return v.trim();
  }
}

/** 중계 서버가 찍히는 값인지 (방문자 지역이 아님) */
const RELAY = /^(tokyo|osaka|singapore|hong kong|ashburn|san jose|seattle|frankfurt)$/i;

export function readGeo(h: Headers): Geo {
  // 1순위 — Cloudflare 가 넣어주는 방문자 지역
  const cfCity = dec(h.get("cf-ipcity"));
  const cfRegion = dec(h.get("cf-region") || h.get("cf-region-code"));
  const cfCountry = dec(h.get("cf-ipcountry"));
  if (cfCity) return { city: cfCity, region: cfRegion, country: cfCountry, source: "cloudflare" };

  // 2순위 — Vercel 값 (중계를 거치지 않고 들어온 경우에만 정확합니다)
  const vCity = dec(h.get("x-vercel-ip-city"));
  const vRegion = dec(h.get("x-vercel-ip-country-region"));
  const vCountry = dec(h.get("x-vercel-ip-country"));
  if (vCity && !RELAY.test(vCity)) {
    return { city: vCity, region: vRegion, country: vCountry, source: "vercel" };
  }

  // 도시는 못 믿더라도 나라는 Cloudflare 값이 정확합니다
  if (cfCountry) return { city: "", region: "", country: cfCountry, source: "cf-country" };
  if (vCountry) return { city: "", region: "", country: vCountry, source: "vercel-country" };

  return { city: "", region: "", country: "", source: "none" };
}

/** 어떤 지역 관련 헤더가 실제로 들어오는지 (진단용) */
export function geoHeaders(h: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  h.forEach((v, k) => {
    if (/^(cf-|x-vercel-ip|x-forwarded-|x-real-ip|true-client-ip)/i.test(k)) {
      // IP 는 화면에 그대로 보여주지 않습니다
      out[k] = /ip$|for$|^true-client-ip$/i.test(k) ? "(가려짐)" : dec(v);
    }
  });
  return out;
}
