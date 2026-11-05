// /profile-lab — 어느 선생님을 볼지 고르는 안내 페이지 (테스트)
import Link from "next/link";
import { redirect } from "next/navigation";
import { PLANS } from "@/lib/planDoc";

export default function ProfileLabIndex() {
  redirect(`/profile-lab/${PLANS[0].id}`);
  /* eslint-disable-next-line no-unreachable */
  return <Link href="/profile-lab/songjiseung">이동</Link>;
}
