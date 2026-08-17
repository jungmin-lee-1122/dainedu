// 모바일 카테고리 메뉴 (햄버거 + 슬라이드 드로어)
// 기존 데스크톱 메뉴(.dn-gnb 또는 .wt-nav-menu)를 읽어 자동으로 만들어 줍니다.
// 페이지마다 메뉴를 따로 관리할 필요가 없습니다.
export const mobileMenuScript = String.raw`
(function(){
  var nav=document.querySelector(".dn-nav")||document.querySelector(".wt-nav");
  if(!nav||document.querySelector(".dn-mmenu")) return;
  var gnb=nav.querySelector(".dn-gnb")||nav.querySelector(".wt-nav-menu");
  if(!gnb) return;

  /* ── 햄버거 버튼 ── */
  var btn=document.createElement("button");
  btn.type="button";
  btn.className="dn-mbtn";
  btn.setAttribute("aria-label","메뉴 열기");
  btn.setAttribute("aria-expanded","false");
  btn.innerHTML='<span></span><span></span><span></span>';
  nav.appendChild(btn);

  /* ── 드로어 ── */
  var wrap=document.createElement("div");
  wrap.className="dn-mmenu";
  wrap.innerHTML='<div class="dn-mmenu-dim"></div><nav class="dn-mmenu-panel" aria-label="모바일 메뉴"><div class="dn-mmenu-head"><span class="dn-mmenu-title">MENU</span><button type="button" class="dn-mmenu-close" aria-label="메뉴 닫기">&times;</button></div><div class="dn-mmenu-body"></div><div class="dn-mmenu-foot"><a class="dn-mmenu-cta" href="/consult">입학상담 신청</a><a class="dn-mmenu-tel" href="tel:03180030221">031-8003-0221</a></div></nav>';
  document.body.appendChild(wrap);

  var body=wrap.querySelector(".dn-mmenu-body");
  var items=gnb.children;

  for(var i=0;i<items.length;i++){
    var li=items[i];
    var top=li.querySelector("a");
    if(!top) continue;
    var sub=li.querySelector(".dn-gnb-sub");
    var group=document.createElement("div");
    group.className="dn-mgroup";

    if(sub && sub.children.length){
      var head=document.createElement("button");
      head.type="button";
      head.className="dn-mgroup-head";
      head.innerHTML='<span>'+top.textContent+'</span><i aria-hidden="true">+</i>';
      group.appendChild(head);

      var list=document.createElement("div");
      list.className="dn-mgroup-list";
      for(var s=0;s<sub.children.length;s++){
        var a=sub.children[s];
        var link=document.createElement("a");
        link.href=a.getAttribute("href")||"#";
        link.textContent=a.textContent;
        list.appendChild(link);
      }
      group.appendChild(list);

      (function(g,h){
        h.addEventListener("click",function(){
          var open=g.classList.contains("is-open");
          var all=body.querySelectorAll(".dn-mgroup");
          for(var k=0;k<all.length;k++) all[k].classList.remove("is-open");
          if(!open) g.classList.add("is-open");
        });
      })(group,head);
    }else{
      var solo=document.createElement("a");
      solo.className="dn-mgroup-solo";
      solo.href=top.getAttribute("href")||"#";
      solo.textContent=top.textContent;
      group.appendChild(solo);
    }
    body.appendChild(group);
  }

  /* ── 열기 / 닫기 ── */
  function open(){
    wrap.classList.add("is-open");
    btn.classList.add("is-on");
    btn.setAttribute("aria-expanded","true");
    document.body.style.overflow="hidden";
  }
  function close(){
    wrap.classList.remove("is-open");
    btn.classList.remove("is-on");
    btn.setAttribute("aria-expanded","false");
    document.body.style.overflow="";
  }
  btn.addEventListener("click",function(){
    wrap.classList.contains("is-open") ? close() : open();
  });
  wrap.querySelector(".dn-mmenu-dim").addEventListener("click",close);
  wrap.querySelector(".dn-mmenu-close").addEventListener("click",close);
  var links=wrap.querySelectorAll("a");
  for(var L=0;L<links.length;L++) links[L].addEventListener("click",close);
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") close(); });
  window.addEventListener("resize",function(){ if(window.innerWidth>1000) close(); });
})();
`;
