// ═══════════════════════════════════════════════════════════
//  /winter-final 스크립트
//
//  한 페이지에 예약 신청서가 3개(회차별로) 들어갑니다.
//  설명회 상세페이지 스크립트는 id 하나만 보고 동작해서 그대로 쓸 수 없어,
//  "각 .rv 칸 안에서만" 찾도록 똑같은 동작을 옮겨 적었습니다.
//
//  ※ 보내는 항목(eventId · name · phone …)과 주소(/api/reserve)는
//    상세페이지와 글자 하나까지 같습니다. 건드리면 안 됩니다.
// ═══════════════════════════════════════════════════════════
import { mobileMenuScript } from "../mobileMenu";
import { eventCommonScript } from "../event/eventScript";

export const winterFinalScript = `
(function(){

/* ═══════ 회차 카드 접기/펼치기 ═══════ */
(function(){
  var items=document.querySelectorAll(".wf-item"); if(!items.length) return;

  function close(it){
    var btn=it.querySelector(".wf-round"), p=it.querySelector(".wf-panel");
    it.classList.remove("is-open");
    if(btn) btn.setAttribute("aria-expanded","false");
    if(p) p.hidden=true;
  }
  function open(it){
    var btn=it.querySelector(".wf-round"), p=it.querySelector(".wf-panel");
    it.classList.add("is-open");
    if(btn) btn.setAttribute("aria-expanded","true");
    if(p) p.hidden=false;
  }

  for(var i=0;i<items.length;i++){
    (function(it){
      var btn=it.querySelector(".wf-round"); if(!btn) return;
      btn.addEventListener("click",function(){
        var willOpen=!it.classList.contains("is-open");
        for(var k=0;k<items.length;k++) close(items[k]);
        if(willOpen){
          open(it);
          setTimeout(function(){
            it.scrollIntoView({block:"start",behavior:"smooth"});
          },60);
        }
      });
    })(items[i]);
  }
})();

/* ═══════ 예약 신청서 — 칸마다 따로 동작합니다 ═══════ */
(function(){
  var boxes=document.querySelectorAll(".rv"); if(!boxes.length) return;

  for(var b=0;b<boxes.length;b++) setup(boxes[b]);

  function setup(modal){
    var form=modal.querySelector(".rv-form"); if(!form) return;
    var msg=modal.querySelector(".rv-formmsg");
    var submit=modal.querySelector(".rv-submit");
    var done=modal.querySelector(".rv-done");
    var panel=modal.querySelector(".rv-panel:not(.rv-done)");

    /* 휴대전화 자동 하이픈 */
    var tel=form.querySelector('[name="phone"]');
    if(tel) tel.addEventListener("input",function(){
      var v=tel.value.replace(/[^0-9]/g,"").slice(0,11);
      if(v.length<4) tel.value=v;
      else if(v.length<8) tel.value=v.slice(0,3)+"-"+v.slice(3);
      else tel.value=v.slice(0,3)+"-"+v.slice(3,7)+"-"+v.slice(7);
    });

    /* 약관 펼치기 */
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

    /* 전체 동의 */
    var all=modal.querySelector(".rv-agree-all input");
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

    /* 검사 + 전송 — 상세페이지와 같은 항목·같은 주소 */
    function showErr(key,on){
      var el=form.querySelector('[data-err="'+key+'"]');
      if(el) el.classList.toggle("is-on",!!on);
    }
    function clearErrs(){
      var a=form.querySelectorAll(".rv-err");
      for(var i=0;i<a.length;i++) a[i].classList.remove("is-on");
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
        companion: val("companion"),
        source: val("source"),
        agreeMarketing: form.querySelector('[name="agreeMarketing"]').checked ? "동의" : "미동의"
      };

      var bad=null;
      if(!data.name){ showErr("name",1); bad=bad||'[name="name"]'; }
      if(!/^01[0-9]-[0-9]{3,4}-[0-9]{4}$/.test(data.phone)){ showErr("phone",1); bad=bad||'[name="phone"]'; }
      if(!data.school){ showErr("school",1); bad=bad||'[name="school"]'; }
      if(!data.grade){ showErr("grade",1); bad=bad||'[name="grade"]'; }
      if(!data.companion){ showErr("companion",1); bad=bad||'[name="companion"]'; }
      if(!data.source){ showErr("source",1); bad=bad||'[name="source"]'; }
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
              var why=(res&&res.error)||"unknown";
              var txt="접수에 실패했습니다. 잠시 후 다시 시도하시거나 1644-8022로 연락해 주세요.";
              if(why==="no_webhook") txt="[설정 필요] 구글 시트 주소(RESERVE_WEBHOOK_URL)가 등록되지 않았습니다.";
              else if(why==="sheet") txt="[연결 실패] 구글 시트에 저장하지 못했습니다. ("+(res.status||"")+") "+String(res.detail||"").slice(0,150);
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
  }
})();

${eventCommonScript}

})();

${mobileMenuScript}
`;
