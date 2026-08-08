// 히어로 스크롤 영상 + 네비 + 사전등록 폼 스크립트 (원본 그대로)
export const landingScript = String.raw`/* ============================================================
   1) 스크롤 스크럽 히어로 (스크롤 위치 = 영상 재생 위치)
   - .scroll-scrub__stage 가 sticky 로 고정되고,
     [data-scroll-scrub-band] 의 높이만큼 스크롤하는 동안
     영상의 currentTime 을 진행률에 맞춰 이동시킵니다.
   - 주의: html/body 에 overflow-x:hidden 을 주면 sticky 가 깨집니다.
           반드시 overflow-x:clip 을 사용하세요.
   ============================================================ */
(function () {
  var root = document.querySelector(".scroll-scrub");
  if (!root) return;
  var layer = root.querySelector("[data-scroll-scrub-layer]");
  var band  = root.querySelector("[data-scroll-scrub-band]");
  if (!layer || !band) return;

  var DESKTOP = layer.getAttribute("data-clip");
  var MOBILE  = layer.getAttribute("data-clip-mobile");
  var reduce  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMobile = function () {
    return window.matchMedia("(hover:none) and (pointer:coarse)").matches
        || window.matchMedia("(max-width:860px)").matches;
  };

  var video = null, ready = false, current = 0, target = 0, loadedSrc = null;
  var start = 0, end = 1, raf = 0;

  function measure() {
    var r = band.getBoundingClientRect();
    var y = window.scrollY || window.pageYOffset;
    start = r.top + y;
    end   = start + r.height - window.innerHeight;
    if (end <= start) end = start + 1;
  }

  function load() {
    var src = isMobile() && MOBILE ? MOBILE : DESKTOP;
    if (reduce || !src || loadedSrc === src) return;
    loadedSrc = src; ready = false;
    if (video) { video.remove(); video = null; }
    fetch(src).then(function (r) { return r.blob(); }).then(function (blob) {
      var v = document.createElement("video");
      v.className = "scroll-scrub__video";
      v.muted = true; v.playsInline = true; v.preload = "auto";
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.src = URL.createObjectURL(blob);
      v.addEventListener("loadedmetadata", function () { ready = true; }, { once: true });
      v.addEventListener("seeked", function () { layer.dataset.videoPainted = "true"; }, { once: true });
      layer.appendChild(v);
      video = v;
      /* iOS: 사용자 제스처 이후 한 번 play/pause 해야 프레임이 그려집니다 */
      var prime = function () { v.play().then(function () { v.pause(); }).catch(function () {}); };
      window.addEventListener("touchstart", prime, { once: true, passive: true });
      window.addEventListener("pointerdown", prime, { once: true, passive: true });
    }).catch(function () { layer.dataset.videoFailed = "true"; });
  }

  function tick() {
    var y = window.scrollY || window.pageYOffset;
    target = Math.min(1, Math.max(0, (y - start) / (end - start)));
    root.style.setProperty("--ss-progress", String(target));
    if (video && ready && !video.seeking) {
      current += (target - current) * 0.2;                 /* 부드럽게 따라가기 */
      var t = Math.min(current, 0.999) * (video.duration || 1);
      if (Math.abs(video.currentTime - t) > (isMobile() ? 0.02 : 0.008)) {
        try { video.currentTime = t; } catch (e) {}
      }
    }
    raf = requestAnimationFrame(tick);
  }

  measure(); load(); raf = requestAnimationFrame(tick);
  window.addEventListener("resize", function () { measure(); load(); });
  window.addEventListener("orientationchange", measure);
  window.addEventListener("load", measure);
})();

/* ============================================================
   2) 상단 내비게이션 — 스크롤 시 배경 채우기
   ============================================================ */
(function () {
  var nav = document.querySelector(".dn-nav");
  if (!nav) return;
  var onScroll = function () {
    nav.classList.toggle("is-solid", (window.scrollY || 0) > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ============================================================
   3) 사전등록 폼
   ★ 작업자 확인 필요: ENDPOINT 를 실제 접수 API 로 교체하세요.
     (미설정 시 폼은 제출되지 않고 안내 문구만 표시됩니다)
   ============================================================ */
(function () {
  var ENDPOINT = "/api/register";              /* 예: "/api/register" */
  var form = document.querySelector("#register form");
  if (!form) return;
  var btn = form.querySelector(".dn-submit");
  var msg = document.createElement("p");
  msg.className = "dn-formmsg";
  msg.style.cssText = "margin-top:14px;text-align:center;font-size:14px";
  form.appendChild(msg);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    if (!/^01[0-9][0-9-]{7,11}$/.test(String(data.phone || ""))) {
      msg.style.color = "#B4453C";
      msg.textContent = "연락처 형식을 확인해 주세요. (예: 010-0000-0000)";
      return;
    }
    if (!ENDPOINT) {
      msg.style.color = "#B4453C";
      msg.textContent = "접수 서버가 아직 연결되지 않았습니다. (ENDPOINT 설정 필요)";
      return;
    }
    btn.disabled = true; btn.textContent = "전송 중…";
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(function (r) {
      if (!r.ok) throw new Error();
      form.reset();
      msg.style.color = "#2E7D5B";
      msg.textContent = "사전등록이 완료되었습니다. 안내 문자를 보내드리겠습니다.";
    }).catch(function () {
      msg.style.color = "#B4453C";
      msg.textContent = "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.";
    }).finally(function () {
      btn.disabled = false; btn.textContent = "사전등록 완료하기";
    });
  });
})();`;
