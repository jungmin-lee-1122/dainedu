import Script from "next/script";
import { landingMarkup } from "./landingMarkup";
import { landingScript } from "./landingScript";

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: landingMarkup }} />
      <Script
        id="dain-landing"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: landingScript }}
      />
    </>
  );
}
