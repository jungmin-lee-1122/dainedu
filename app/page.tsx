import Script from "next/script";
import { landingMarkup } from "./landingMarkup";
import { landingScript } from "./landingScript";
import { winterPopupMarkup } from "./winterPopup";
import { winterPopupScript } from "./winterPopupScript";

/** 윈터스쿨 팝업 표시 여부
 *  현재 Cloudflare 쪽에서 팝업을 따로 띄우고 있어 겹치지 않도록 꺼둡니다.
 *  Cloudflare 팝업을 걷어내면 true 로 바꾸면 다시 나옵니다.
 */
const SHOW_WINTER_POPUP = false;

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: landingMarkup }} />
      <Script
        id="dain-landing"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: landingScript }}
      />

      {SHOW_WINTER_POPUP && (
        <>
          <div dangerouslySetInnerHTML={{ __html: winterPopupMarkup }} />
          <Script
            id="dain-winter-popup"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: winterPopupScript }}
          />
        </>
      )}
    </>
  );
}
