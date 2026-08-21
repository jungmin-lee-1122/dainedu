// ═══════════════════════════════════════════════════════════
//  이벤트 · 설명회 페이지 스크립트
//   - eventListScript : 목록 페이지 (상태 필터)
//   - eventViewScript : 상세 페이지 (예약 팝업 + 폼 전송)
// ═══════════════════════════════════════════════════════════
import { mobileMenuScript } from "../mobileMenu";

/** 시계 · 수능 D-day · 푸터 드롭다운 · 퀵메뉴 — 모든 페이지 공통 */
const commonScript = `
/* ═══════ 시계 ═══════ */
(function(){
  var els=document.querySelectorAll(".js-clock"); if(!els.length) return;
  function p(x){return (x<10?"0":"")+x;}
  function tick(){
    var d=new Date(), t=p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());
    for(var i=0;i<els.length;i++) els[i].textContent=t;
  }
  tick(); setInterval(tick,1000);
})();

/* ═══════ 수능 D-day ═══════ */
(function(){
  var num=document.getElementById("dnDdayNum"); if(!num) return;
  var cap=document.getElementById("dnDdayCap");
  var SUNEUNG=new Date(2026,10,19);
  SUNEUNG.setHours(0,0,0,0);
  var now=new Date(); now.setHours(0,0,0,0);
  var d=Math.round((SUNEUNG-now)/86400000);
  num.textContent = d>0 ? ("D-"+d) : (d===0?"D-DAY":("D+"+(-d)));
  if(cap) cap.textContent=(SUNEUNG.getFullYear()+1)+"학년도 수능";
})();

/* ═══════ 푸터 대표번호 드롭다운 ═══════ */
(function(){
  var w=document.querySelector(".dn-foot-tel-wrap"); if(!w) return;
  var btn=w.querySelector(".dn-foot-tel");
  btn.addEventListener("click",function(e){
    e.stopPropagation();
    var open=w.classList.toggle("is-open");
    btn.setAttribute("aria-expanded",open?"true":"false");
  });
  document.addEventListener("click",function(e){
    if(!w.contains(e.target)){ w.classList.remove("is-open"); btn.setAttribute("aria-expanded","false"); }
  });
})();

/* ═══════ 퀵메뉴 맨 위로 ═══════ */
(function(){
  var t=document.querySelector(".dn-quick-top"); if(!t) return;
  t.addEventListener("click",function(){ window.scrollTo({top:0,behavior:"smooth"}); });
})();

/* ═══════ 스크롤 등장 ═══════ */
(function(){
  var items=document.querySelectorAll(".ev-item,.ev-block");
  if(!items.length||!("IntersectionObserver" in window)){
    for(var i=0;i<items.length;i++) items[i].classList.add("is-in");
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  },{threshold:.12,rootMargin:"0px 0px -40px 0px"});
  for(var k=0;k<items.length;k++) io.observe(items[k]);
})();
`;

/* ───────────────────────────────────────────────
   목록 페이지
─────────────────────────────────────────────── */
export const eventListScript = `
(function(){

/* ═══════ 접수 상태 필터 ═══════ */
(function(){
  var box=document.getElementById("evFilter"); if(!box) return;
  var btns=box.querySelectorAll(".ev-filter-btn");
  var items=document.querySelectorAll("#evList .ev-item");
  var empty=document.getElementById("evEmpty");

  function apply(status){
    var shown=0;
    for(var i=0;i<items.length;i++){
      var ok = (status==="전체") || (items[i].getAttribute("data-status")===status);
      items[i].style.display = ok ? "" : "none";
      if(ok) shown++;
    }
    if(empty) empty.hidden = shown>0;
  }

  for(var b=0;b<btns.length;b++){
    (function(el){
      el.addEventListener("click",function(){
        for(var k=0;k<btns.length;k++){
          btns[k].classList.remove("is-on");
          btns[k].setAttribute("aria-selected","false");
        }
        el.classList.add("is-on");
        el.setAttribute("aria-selected","true");
        apply(el.getAttribute("data-status"));
      });
    })(btns[b]);
  }
})();

${commonScript}

})();

${mobileMenuScript}
`;

/* ───────────────────────────────────────────────
   상세 페이지 (예약 팝업)
─────────────────────────────────────────────── */
export const eventViewScript = `
(function(){

var modal=document.getElementById("rvModal");
var form=document.getElementById("rvForm");

/* ═══════ 예약하기 버튼 → 폼으로 이동 + 첫 칸에 커서 ═══════ */
(function(){
  if(!form) return;
  var links=document.querySelectorAll('a[href="#reserve"]');
  for(var i=0;i<links.length;i++){
    links[i].addEventListener("click",function(){
      var first=document.getElementById("rvName");
      if(first) setTimeout(function(){ first.focus({preventScroll:true}); },600);
    });
  }
  if(window.console) console.log("[예약] 폼 준비 완료 · 버튼",links.length,"개");
})();

/* ═══════ 휴대전화 자동 하이픈 ═══════ */
(function(){
  var el=document.getElementById("rvPhone"); if(!el) return;
  el.addEventListener("input",function(){
    var v=el.value.replace(/[^0-9]/g,"").slice(0,11);
    if(v.length<4) el.value=v;
    else if(v.length<8) el.value=v.slice(0,3)+"-"+v.slice(3);
    else el.value=v.slice(0,3)+"-"+v.slice(3,7)+"-"+v.slice(7);
  });
})();

/* ═══════ 약관 펼치기 / 전체 동의 ═══════ */
(function(){
  if(!modal) return;

  var toggles=modal.querySelectorAll(".rv-agree-toggle");
  for(var i=0;i<toggles.length;i++){
    (function(btn){
      btn.addEventListener("click",function(){
        var box=btn.parentNode.querySelector(".rv-agree-detail"); if(!box) return;
        var willOpen=box.hidden;
        box.hidden=!willOpen;
        btn.setAttribute("aria-expanded",willOpen?"true":"false");
        btn.classList.toggle("is-open",willOpen);
      });
    })(toggles[i]);
  }

  var all=document.getElementById("rvAgreeAll");
  var each=modal.querySelectorAll("[data-agree]");
  if(all){
    all.addEventListener("change",function(){
      for(var k=0;k<each.length;k++) each[k].checked=all.checked;
    });
    for(var j=0;j<each.length;j++){
      each[j].addEventListener("change",function(){
        var on=true;
        for(var k=0;k<each.length;k++){ if(!each[k].checked) on=false; }
        all.checked=on;
      });
    }
  }
})();

/* ═══════ 폼 검사 + 전송 ═══════ */
(function(){
  if(!form) return;
  var msg=document.getElementById("rvMsg");
  var submit=document.getElementById("rvSubmit");
  var done=document.getElementById("rvDone");
  var panel=modal?modal.querySelector(".rv-panel:not(.rv-done)"):null;

  function showErr(key,on){
    var el=form.querySelector('[data-err="'+key+'"]');
    if(el) el.classList.toggle("is-on",!!on);
  }
  function clearErrs(){
    var all=form.querySelectorAll(".rv-err");
    for(var i=0;i<all.length;i++) all[i].classList.remove("is-on");
  }
  function val(name){
    var el=form.querySelector('[name="'+name+'"]');
    return el ? String(el.value||"").trim() : "";
  }

  form.addEventListener("submit",function(e){
    e.preventDefault();
    clearErrs();
    if(msg){ msg.hidden=true; msg.textContent=""; }

    var data={
      eventId: val("eventId"),
      eventTitle: val("eventTitle"),
      eventDate: val("eventDate"),
      who: (form.querySelector('[name="who"]:checked')||{}).value||"",
      name: val("name"),
      phone: val("phone"),
      school: val("school"),
      grade: val("grade"),
      track: val("track"),
      companion: val("companion"),
      source: val("source"),
      agreeMarketing: form.querySelector('[name="agreeMarketing"]').checked ? "동의" : "미동의"
    };

    var bad=null;
    if(!data.name){ showErr("name",1); bad=bad||"#rvName"; }
    if(!/^01[0-9]-[0-9]{3,4}-[0-9]{4}$/.test(data.phone)){ showErr("phone",1); bad=bad||"#rvPhone"; }
    if(!data.school){ showErr("school",1); bad=bad||"#rvSchool"; }
    if(!data.grade){ showErr("grade",1); bad=bad||"#rvGrade"; }
    if(!data.track){ showErr("track",1); bad=bad||"#rvTrack"; }
    if(!data.companion){ showErr("companion",1); bad=bad||"#rvCompanion"; }
    if(!data.source){ showErr("source",1); bad=bad||"#rvSource"; }
    if(!form.querySelector('[name="agreeRequired"]').checked){ showErr("agreeRequired",1); bad=bad||null; }

    if(bad){
      var el=form.querySelector(bad);
      if(el){ el.focus(); el.scrollIntoView({block:"center",behavior:"smooth"}); }
      return;
    }
    if(!form.querySelector('[name="agreeRequired"]').checked) return;

    submit.disabled=true;
    submit.textContent="접수 중…";

    fetch("/api/reserve",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    }).then(function(r){ return r.json().catch(function(){ return {ok:false}; }); })
      .then(function(res){
        if(res && res.ok){
          if(panel) panel.hidden=true;
          if(done){
            done.hidden=false;
            done.scrollIntoView({block:"center",behavior:"smooth"});
          }
          form.reset();
        }else{
          if(msg){
            /* 원인별 안내 — 관리자가 무엇을 고쳐야 하는지 바로 알 수 있게 */
            var why=(res&&res.error)||"unknown";
            var txt="접수에 실패했습니다. 잠시 후 다시 시도하시거나 031-8003-0221로 연락해 주세요.";
            if(why==="no_webhook") txt="[설정 필요] 구글 시트 주소(RESERVE_WEBHOOK_URL)가 등록되지 않았습니다.";
            else if(why==="sheet") txt="[연결 실패] 구글 시트에 저장하지 못했습니다. Apps Script 배포 설정을 확인해 주세요.";
            else if(why==="invalid") txt="입력하신 내용을 다시 확인해 주세요.";
            msg.hidden=false;
            msg.textContent=txt;
            if(window.console) console.error("[예약 실패]",res);
          }
        }
      })
      .catch(function(){
        if(msg){
          msg.hidden=false;
          msg.textContent="네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
        }
      })
      .then(function(){
        submit.disabled=false;
        submit.textContent="예약하기";
      });
  });
})();

${commonScript}

})();

${mobileMenuScript}
`;
