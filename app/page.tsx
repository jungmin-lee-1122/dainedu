import Script from "next/script";
import { landingMarkup } from "./landingMarkup";
import { landingScript } from "./landingScript";
import { winterPopupMarkup } from "./winterPopup";
import { winterPopupScript } from "./winterPopupScript";

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: landingMarkup }} />
      <div dangerouslySetInnerHTML={{ __html: winterPopupMarkup }} />
      <Script
        id="dain-landing"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: landingScript }}
      />
      <Script
        id="dain-winter-popup"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: winterPopupScript }}
      />
    </>
  );
}
