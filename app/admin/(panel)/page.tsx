import Link from "next/link";
import { MENU } from "../../components/admin/menu";

const GUIDE = [
  {
    title: "강사를 등록하면 두 곳에 함께 나옵니다",
    body: "강사진 소개(/teachers)와 단과시간표(/schedule)가 같은 자료를 씁니다. 강사 한 분을 등록하면서 개설 강좌를 입력하면, 그 강좌가 단과시간표의 모집대상 탭에 자동으로 들어갑니다.",
  },
  {
    title: "저장하면 바로 반영됩니다",
    body: "따로 배포하지 않아도 됩니다. 저장 후 해당 페이지를 새로고침하면 바뀐 내용이 보입니다.",
  },
  {
    title: "순서는 화살표로 바꿉니다",
    body: "목록의 ↑ ↓ 버튼으로 노출 순서를 조정할 수 있습니다. 위에 있을수록 먼저 보입니다.",
  },
];

export default function AdminHome() {
  const cards = MENU.filter((m) => m.href !== "/admin");

  return (
    <div>
      <h1 className="ad-h1">대시보드</h1>
      <p className="ad-desc">관리할 항목을 선택하세요.</p>

      <div className="ad-cards">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="ad-card">
            <b>{c.label}</b>
            <span>{c.desc}</span>
            <i aria-hidden="true">→</i>
          </Link>
        ))}
      </div>

      <h2 className="ad-h2">알아두면 좋은 것</h2>
      <div className="ad-guide">
        {GUIDE.map((g) => (
          <div className="ad-guide-item" key={g.title}>
            <b>{g.title}</b>
            <p>{g.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
