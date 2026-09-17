import Image from "next/image";

// 인사말 페이지 두 축 카드에 들어가는 3D 일러스트입니다.
const pillarArt = {
  lecture: {
    src: "/greeting/system-lecture-3d.webp",
    width: 1605,
    height: 980,
  },
  care: {
    src: "/greeting/system-care-3d.webp",
    width: 1254,
    height: 1254,
  },
} as const;

export default function PillarArt({ kind }: { kind: keyof typeof pillarArt }) {
  const art = pillarArt[kind];

  return (
    <Image
      className={`gr-art gr-art-${kind}`}
      src={art.src}
      width={art.width}
      height={art.height}
      sizes="(max-width: 900px) 74vw, 390px"
      alt=""
      aria-hidden="true"
    />
  );
}
