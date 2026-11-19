// ═══════════════════════════════════════════════════════════
//  2028 재수선행반 (/jaesu-2028) — 스크립트
//   · 과목별/요일별 탭, 자주 묻는 질문, 하단 상담 띠 (시안과 같은 동작)
//   · 스크롤 등장 — 각 섹션이 화면에 들어오는 순간에 움직입니다
//   · 시계·D-day·푸터·모바일 메뉴 등 사이트 공통 동작
// ═══════════════════════════════════════════════════════════
import { mobileMenuScript } from "../mobileMenu";
import { eventCommonScript } from "../event/eventScript";

export const jaesuScript = `
(function(){
var root=document.getElementById("jpRoot"); if(!root) return;
function $(s,c){return (c||root).querySelector(s);}
function $$(s,c){return Array.prototype.slice.call((c||root).querySelectorAll(s));}

/* ═══════ 탭 (과목별 · 요일별) — 원본 시안과 같은 동작 ═══════ */
function tabGroup(listSelector,attr,prefix){
  var list=$(listSelector); if(!list) return;
  var tabs=$$("[role=tab]",list);
  function activate(tab){
    tabs.forEach(function(t){
      var chosen=t===tab, panel=document.getElementById(prefix+t.getAttribute(attr));
      t.setAttribute("aria-selected",String(chosen)); t.tabIndex=chosen?0:-1;
      if(!panel) return;
      var was=panel.hidden; panel.hidden=!chosen;
      panel.classList.remove("is-switch");
      if(chosen&&was){ void panel.offsetWidth; panel.classList.add("is-switch"); }
    });
  }
  tabs.forEach(function(tab,i){
    tab.addEventListener("click",function(){activate(tab);});
    tab.addEventListener("keydown",function(e){
      var n=i;
      if(e.key==="ArrowRight"||e.key==="ArrowDown")n=(i+1)%tabs.length;
      else if(e.key==="ArrowLeft"||e.key==="ArrowUp")n=(i-1+tabs.length)%tabs.length;
      else if(e.key==="Home")n=0; else if(e.key==="End")n=tabs.length-1; else return;
      e.preventDefault(); activate(tabs[n]); tabs[n].focus();
    });
  });
}
tabGroup(".jp-subject-tabs","data-subject","jp-panel-");
tabGroup(".jp-day-tabs","data-day","jp-time-");
$$(".jp-time-panel").forEach(function(p){
  $$(".jp-time-row,.jp-fine",p).forEach(function(r,i){ r.style.setProperty("--n",i); });
});

/* ═══════ 자주 묻는 질문 — 하나를 열면 나머지는 닫힙니다 ═══════ */
$$(".jp-faq-list details").forEach(function(el){
  el.addEventListener("toggle",function(){
    if(el.open) $$(".jp-faq-list details").forEach(function(o){ if(o!==el) o.open=false; });
  });
});

/* ═══════ 하단 상담 띠 — 첫 화면을 지나면 올라옵니다 ═══════ */
(function(){
  var bar=document.getElementById("jp-floatingCta"), hero=$(".jp-hero");
  if(!bar||!hero) return;
  if(!("IntersectionObserver" in window)){ bar.classList.add("is-visible"); return; }
  new IntersectionObserver(function(en){
    bar.classList.toggle("is-visible",!en[0].isIntersecting);
  },{threshold:0}).observe(hero);
})();


/* ═══════ 첫 화면 간편 상담 신청 ═══════
   온라인 상담과 같은 시트로 보냅니다(/api/jaesu-consult → 시트의 "재수선행반" 탭). */
(function(){
  var form=$(".jp-quick"); if(!form) return;
  var btn=$(".jp-quick-submit",form), msg=$(".jp-quick-msg",form);
  var tel=form.querySelector('[name="phone"]');
  if(tel) tel.addEventListener("input",function(){
    var v=tel.value.replace(/[^0-9]/g,"").slice(0,11);
    if(v.length<4) tel.value=v;
    else if(v.length<8) tel.value=v.slice(0,3)+"-"+v.slice(3);
    else tel.value=v.slice(0,3)+"-"+v.slice(3,7)+"-"+v.slice(7);
  });
  function say(kind,t){ msg.className="jp-quick-msg"+(kind?" is-"+kind:""); msg.textContent=t||""; }
  function pick(n){ var el=form.querySelector('[name="'+n+'"]:checked'); return el?el.value:""; }

  form.addEventListener("submit",function(e){
    e.preventDefault();
    var data={
      role: pick("role"),
      name: String(form.querySelector('[name="name"]').value||"").trim(),
      phone: String(tel.value||"").trim(),
      grade: pick("grade"),
      content: String(form.querySelector('[name="content"]').value||"").trim(),
      agree: form.querySelector('[name="agree"]').checked
    };
    if(!data.name){ say("error","학생 이름을 입력해 주세요."); form.querySelector('[name="name"]').focus(); return; }
    if(!/^01[0-9]-[0-9]{3,4}-[0-9]{4}$/.test(data.phone)){ say("error","연락처를 010-0000-0000 형식으로 입력해 주세요."); tel.focus(); return; }
    if(!data.grade){ say("error","구분(고3 · 재수 · N수)을 선택해 주세요."); return; }
    if(!data.agree){ say("error","개인정보 수집·이용에 동의해 주세요."); return; }

    btn.disabled=true; btn.textContent="전송 중…"; say("","");
    fetch("/api/jaesu-consult",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    }).then(function(r){ return r.json().catch(function(){ return {ok:false,error:"badjson",status:r.status}; }); })
      .then(function(res){
        if(res&&res.ok){
          form.reset();
          say("ok","상담 신청이 접수되었습니다. 입력하신 연락처로 전화드리겠습니다.");
          return;
        }
        /* 원인별 안내 — 무엇을 고쳐야 하는지 바로 알 수 있게 */
        var why=(res&&res.error)||"unknown";
        var t="전송에 실패했습니다. 잠시 후 다시 시도하시거나 1644-8022로 연락해 주세요.";
        if(why==="no_webhook") t="[설정 필요] 시트 주소(JAESU_CONSULT_WEBHOOK_URL)가 등록되지 않았습니다.";
        else if(why==="invalid") t="입력하신 내용을 다시 확인해 주세요.";
        else if(why==="sheet"){
          if(res.hint==="access") t="[연결 실패] 구글 웹 앱의 액세스 권한이 '모든 사용자'가 아닙니다.";
          else if(res.hint==="html") t="[연결 실패] 시트 주소가 웹 앱 주소(…/exec)가 아닌 것 같습니다. ("+(res.status||"")+")";
          else t="[연결 실패] 시트 스크립트 오류: "+String(res.detail||"").slice(0,120);
        }
        else if(why==="badjson") t="[연결 실패] 접수 주소가 아직 배포되지 않았습니다. ("+(res.status||"")+")";
        say("error",t);
        if(window.console) console.error("[재수선행반 상담 실패]",res);
      })
      .catch(function(){ say("error","네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."); })
      .then(function(){ btn.disabled=false; btn.textContent="상담 신청하기"; });
  });
})();

/* ═══════ 스크롤 등장 ═══════
   묶음(섹션 조각)이 화면에 들어오는 순간, 그 안의 조각들을 차례로 보여 줍니다.
   [묶음, [[조각, 방식], …], 간격(ms)]  ·  조각이 "self" 면 묶음 자신 */
(function(){
  var slow=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(slow||!("IntersectionObserver" in window)) return;   /* 감추지 않고 그대로 둡니다 */

  var PLAN=[
    [".jp-secnav",[["self","up"]]],
    [".jp-intro-copy",[[":scope>*","up"]],110],
    [".jp-change-col",[[".jp-change-item","right"],[".jp-policy-note","up"]],130],
    [".jp-bridge",[[".jp-wrap>*","up"]],140],
    [".jp-section-head",[[":scope>*","up"]],130],
    [".jp-start-grid",[[".jp-start-item","up"]],150],
    [".jp-start-bottom",[["self","up"]]],
    [".jp-study-layout",[["self","up"]]],
    [".jp-curriculum .jp-wrap>.jp-fine",[["self","up"]]],
    [".jp-management-intro",[[":scope>.jp-eyebrow,:scope>h2,:scope>.jp-sub","up"],[".jp-management-image","clip"]],110],
    [".jp-care-accordion",[["details","up"]],120],
    [".jp-day-aside",[[":scope>*","up"]],110],
    [".jp-day-main",[[".jp-day-tabs","up"],[".jp-time-panel:not([hidden]) .jp-time-row,.jp-time-panel:not([hidden]) .jp-fine","up"]],60],
    [".jp-record-copy",[[":scope>.jp-eyebrow,:scope>h2,:scope>.jp-sub","up"],[".jp-record-steps span","scale"]],110],
    [".jp-report-col",[[".jp-report","tilt"],[".jp-report-row","left"],[".jp-report-caption","up"]],110],
    [".jp-tablet-strip",[[":scope>img","left"],[":scope>div","up"]],160],
    [".jp-campus-gallery",[["figure","clip"]],140],
    [".jp-admission-copy",[[":scope>.jp-eyebrow,:scope>h2,:scope>.jp-sub,:scope>.jp-phone,:scope>.jp-fine","up"],[".jp-admission-steps span","scale"]],100],
    [".jp-admission-box",[["self","up"],["dl>div","up"],[":scope>.jp-button,:scope>.jp-fine","up"]],80],
    [".jp-faq-head",[[":scope>*","up"]],110],
    [".jp-faq-list",[["details","up"]],90],
    [".jp-final-cta",[[".jp-wrap>*","up"]],130]
  ];

  var groups=[];
  PLAN.forEach(function(p){
    $$(p[0]).forEach(function(g){
      var kids=[];
      p[1].forEach(function(k){
        var els=k[0]==="self"?[g]:$$(k[0],g);
        els.forEach(function(el){
          if(el.classList.contains("jp-r")) return;
          el.classList.add("jp-r","jp-r-"+k[1]);
          el.style.setProperty("--i",kids.length);
          if(p[2]) el.style.setProperty("--step",p[2]+"ms");
          kids.push(el);
        });
      });
      if(kids.length) groups.push({el:g,kids:kids,step:p[2]||90,done:false});
    });
  });

  function show(g){
    if(g.done) return; g.done=true;
    g.el.classList.add("jp-seen");
    g.kids.forEach(function(k){ k.classList.add("is-in"); });
    /* 다 나타난 뒤에는 등장용 표시를 떼어, 원래의 호버·전환 효과가 그대로 살아나게 합니다 */
    setTimeout(function(){
      g.kids.forEach(function(k){
        k.classList.remove("jp-r","jp-r-up","jp-r-left","jp-r-right","jp-r-scale","jp-r-tilt","jp-r-clip","is-in");
        k.style.removeProperty("--i"); k.style.removeProperty("--step");
      });
    }, g.kids.length*g.step+1900);
  }
  function near(el){
    var r=el.getBoundingClientRect(), vh=window.innerHeight||document.documentElement.clientHeight;
    return r.top<vh*0.84 && r.bottom>0;
  }

  root.classList.add("jp-armed");

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      for(var i=0;i<groups.length;i++) if(groups[i].el===en.target){ show(groups[i]); break; }
      io.unobserve(en.target);
    });
  },{threshold:0.14,rootMargin:"0px 0px -7% 0px"});
  groups.forEach(function(g){ io.observe(g.el); });

  /* 관찰 신호가 안 오는 환경을 대비해 스크롤로도 한 번 더 확인합니다 */
  var tick=false;
  function sweep(){
    if(tick) return; tick=true;
    requestAnimationFrame(function(){
      tick=false; var left=0;
      groups.forEach(function(g){ if(!g.done){ if(near(g.el)) show(g); else left++; } });
      if(!left){ window.removeEventListener("scroll",sweep,true); window.removeEventListener("resize",sweep); }
    });
  }
  window.addEventListener("scroll",sweep,true);
  window.addEventListener("resize",sweep);
})();

})();

(function(){
${eventCommonScript}
})();

${mobileMenuScript}
`;
