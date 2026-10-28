// ═══════════════════════════════════════════════════════════
//  강사진 목록 — 화면에 보이는 카드만 영상을 재생합니다.
//
//  · 처음에는 포스터 사진만 보여 데이터를 아낍니다.
//  · 카드가 화면에 들어오면 그때 <video> 를 만들어 재생하고,
//    화면 밖으로 나가면 멈춥니다.
//  · 한 번에 너무 많이 재생되지 않도록 최대 6개까지만 돌립니다.
//  · "움직임 줄이기" 설정인 분께는 영상을 만들지 않습니다.
// ═══════════════════════════════════════════════════════════
export const teacherAnimScript = `
(function(){
  var boxes = document.querySelectorAll("[data-anim]");
  if(!boxes.length) return;

  /* 움직임 줄이기 — 포스터 사진만 보여주고 끝냅니다 */
  if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if(!("IntersectionObserver" in window)) return;

  var MAX = 6;          /* 동시에 재생할 최대 개수 */
  var playing = [];

  function make(box){
    if(box.querySelector("video")) return;
    var v = document.createElement("video");
    v.className = "hx-figure";
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute("muted",""); v.setAttribute("playsinline","");
    v.setAttribute("loop",""); v.setAttribute("preload","auto");
    v.setAttribute("disablepictureinpicture","");
    v.setAttribute("aria-hidden","true");

    /* 순서 중요 — 사파리가 webm 투명을 못 그려서 mov 를 먼저 둡니다 */
    var mov = document.createElement("source");
    mov.src = box.getAttribute("data-mov");
    mov.type = 'video/quicktime; codecs="hvc1"';
    var webm = document.createElement("source");
    webm.src = box.getAttribute("data-webm");
    webm.type = "video/webm";

    v.appendChild(mov); v.appendChild(webm);
    box.appendChild(v);

    var p = v.play();
    if(p && p.catch) p.catch(function(){ /* 자동재생이 막히면 포스터만 보입니다 */ });

    playing.push(box);
    while(playing.length > MAX){
      var old = playing.shift();
      if(old !== box) drop(old);
    }
  }

  function drop(box){
    var v = box.querySelector("video");
    if(!v) return;
    try{ v.pause(); }catch(e){}
    while(v.firstChild) v.removeChild(v.firstChild);
    v.removeAttribute("src");
    try{ v.load(); }catch(e){}
    v.remove();
    var i = playing.indexOf(box);
    if(i > -1) playing.splice(i,1);
  }

  var io = new IntersectionObserver(function(entries){
    for(var i=0;i<entries.length;i++){
      var e = entries[i];
      if(e.isIntersecting) make(e.target);
      else drop(e.target);
    }
  }, { rootMargin: "80px 0px", threshold: 0.25 });

  for(var i=0;i<boxes.length;i++) io.observe(boxes[i]);

  /* 다른 탭으로 가면 멈춥니다 */
  document.addEventListener("visibilitychange", function(){
    if(!document.hidden) return;
    for(var i=playing.length-1;i>=0;i--) drop(playing[i]);
  });
})();
`;
