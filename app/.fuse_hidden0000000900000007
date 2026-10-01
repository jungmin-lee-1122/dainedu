// ═══════════════════════════════════════════════════════════
//  공용 헤더밴드 (모든 페이지 상단에 들어가는 제목 띠)
//
//  글자 모양·색은 이벤트·설명회 페이지와 같고,
//  배경은 단과시간표 페이지의 사선 그러데이션(크림 → 연한 블루)입니다.
//  오른쪽에는 다인 로고가 옅게 깔립니다.
//
//  사용 예)
//    <PageBand
//      eyebrow="Notice"
//      title="공지사항"
//      sub={["학원 소식과 안내를 전해드립니다."]}
//      crumb={[{ label: "학원생활" }, { label: "공지사항" }]}
//    />
// ═══════════════════════════════════════════════════════════
import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function PageBand({
  eyebrow,
  title,
  sub,
  crumb = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  /** 한 줄씩 배열로 넣으면 줄바꿈되어 표시됩니다. */
  sub?: string[];
  /** 마지막 항목이 현재 위치입니다. href 가 없으면 링크가 아닙니다. */
  crumb?: Crumb[];
  /** 제목 아래에 넣을 추가 요소 (칩, 버튼 등) */
  children?: React.ReactNode;
}) {
  return (
    <section className="pb-band">
      {/* 오른쪽 로고 워터마크 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="pb-mark" src="/dain-icon.png" alt="" aria-hidden="true" />

      <div className="pb-wrap">
        <nav className="pb-crumb" aria-label="현재 위치">
          <Link href="/">홈</Link>
          {crumb.map((c, i) => {
            const last = i === crumb.length - 1;
            return (
              <span className="pb-crumb-item" key={`${c.label}-${i}`}>
                <i aria-hidden="true">›</i>
                {c.href && !last ? (
                  <Link href={c.href}>{c.label}</Link>
                ) : last ? (
                  <b>{c.label}</b>
                ) : (
                  <span>{c.label}</span>
                )}
              </span>
            );
          })}
        </nav>

        {eyebrow && <p className="pb-eyebrow">{eyebrow}</p>}
        <h1 className="pb-title">{title}</h1>

        {sub && sub.length > 0 && (
          <p className="pb-sub">
            {sub.map((line, i) => (
              <span className="pb-sub-line" key={i}>
                {line}
              </span>
            ))}
          </p>
        )}

        {children && <div className="pb-extra">{children}</div>}
      </div>
    </section>
  );
}
