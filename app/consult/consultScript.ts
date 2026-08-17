// 온라인 상담 페이지 스크립트 (선택 버튼 · 유효성 검사 · 전송)
export const consultScript = String.raw`
(function(){

/* ── 선택형 버튼(상담자 유형 / 성별) ── */
var groups=document.querySelectorAll("[data-choice-group]");
for(var g=0;g<groups.length;g++){
  (function(box){
    var btns=box.querySelectorAll(".cs-choice");
    var input=box.parentNode.querySelector("input[type=hidden]");
    for(var i=0;i<btns.length;i++){
      (function(btn){
        btn.addEventListener("click",function(){
          for(var k=0;k<btns.length;k++) btns[k].classList.remove("is-on");
          btn.classList.add("is-on");
          if(input) input.value=btn.getAttribute("data-value");
        });
      })(btns[i]);
    }
  })(groups[g]);
}

/* ── 개인정보 동의 토글 ── */
(function(){
  var box=document.getElementById("csAgree"); if(!box) return;
  box.addEventListener("click",function(){ box.classList.toggle("is-on"); });
  var more=document.getElementById("csAgreeMore"), detail=document.getElementById("csAgreeDetail");
  if(more&&detail){
    more.addEventListener("click",function(e){
      e.preventDefault();
      var open=detail.classList.toggle("is-open");
      more.textContent = open ? "접기 ›" : "더보기 ›";
    });
  }
})();

/* ── 연락처: 숫자만 ── */
(function(){
  var el=document.getElementById("csPhone"); if(!el) return;
  el.addEventListener("input",function(){ el.value=el.value.replace(/[^0-9]/g,""); });
})();

/* ── 임시 비밀번호: 숫자 4자리 + 보기 토글 ── */
(function(){
  var el=document.getElementById("csPw"); if(!el) return;
  el.addEventListener("input",function(){ el.value=el.value.replace(/[^0-9]/g,"").slice(0,4); });
  var eye=document.getElementById("csPwEye");
  if(eye) eye.addEventListener("click",function(){
    el.type = el.type==="password" ? "text" : "password";
    eye.classList.toggle("is-on");
  });
})();

/* ── 제출 ── */
(function(){
  var form=document.getElementById("csForm"); if(!form) return;
  var btn=form.querySelector(".cs-submit");
  var msg=document.getElementById("csMsg");

  function fail(t){ msg.className="cs-msg is-error"; msg.textContent=t; }

  form.addEventListener("submit",function(e){
    e.preventDefault();
    var data=Object.fromEntries(new FormData(form).entries());

    if(!data.role){ return fail("상담자 유형을 선택해 주세요."); }
    if(!String(data.name||"").trim()){ return fail("학생 이름을 입력해 주세요."); }
    if(!data.gender){ return fail("성별을 선택해 주세요."); }
    if(!/^01[0-9]{7,9}$/.test(String(data.phone||""))){ return fail("연락처를 정확히 입력해 주세요. (숫자만)"); }
    if(!String(data.address||"").trim()){ return fail("주소를 입력해 주세요."); }
    if(!data.course){ return fail("관심 과정을 선택해 주세요."); }
    if(!data.source){ return fail("유입경로를 선택해 주세요."); }
    if(!/^[0-9]{4}$/.test(String(data.password||""))){ return fail("임시 비밀번호를 숫자 4자리로 입력해 주세요."); }
    if(!String(data.title||"").trim()){ return fail("제목을 입력해 주세요."); }
    if(!String(data.content||"").trim()){ return fail("내용을 입력해 주세요."); }
    var agree=document.getElementById("csAgree");
    if(!agree||!agree.classList.contains("is-on")){ return fail("개인정보 수집·이용에 동의해 주세요."); }

    btn.disabled=true; btn.textContent="전송 중…";
    msg.className="cs-msg"; msg.textContent="";

    fetch("/api/consult",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    }).then(function(r){ return r.json().then(function(j){ return {ok:r.ok&&j.ok, j:j}; }); })
    .then(function(res){
      if(!res.ok) throw new Error();
      form.reset();
      var ons=form.querySelectorAll(".cs-choice.is-on");
      for(var i=0;i<ons.length;i++) ons[i].classList.remove("is-on");
      var hid=form.querySelectorAll("input[type=hidden]");
      for(var h=0;h<hid.length;h++) hid[h].value="";
      var ag=document.getElementById("csAgree"); if(ag) ag.classList.remove("is-on");
      msg.className="cs-msg is-ok";
      msg.textContent="상담 신청이 접수되었습니다. 답변이 등록되면 연락드리겠습니다.";
    })
    .catch(function(){ fail("전송에 실패했습니다. 잠시 후 다시 시도해 주세요."); })
    .finally(function(){ btn.disabled=false; btn.textContent="온라인 상담 신청하기"; });
  });
})();

/* ── 시계 · D-day · 푸터 드롭다운 · 맨 위로 ── */
(function(){
  var els=document.querySelectorAll(".js-clock");
  if(els.length){
    var p=function(x){return (x<10?"0":"")+x;};
    var tick=function(){
      var d=new Date(), t=p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());
      for(var i=0;i<els.length;i++) els[i].textContent=t;
    };
    tick(); setInterval(tick,1000);
  }
  var num=document.getElementById("dnDdayNum");
  if(num){
    var cap=document.getElementById("dnDdayCap");
    var S=new Date(2026,10,19); S.setHours(0,0,0,0);
    var now=new Date(); now.setHours(0,0,0,0);
    var d=Math.round((S-now)/86400000);
    num.textContent = d>0 ? ("D-"+d) : (d===0?"D-DAY":("D+"+(-d)));
    if(cap) cap.textContent=(S.getFullYear()+1)+"학년도 수능";
  }
  var w=document.querySelector(".dn-foot-tel-wrap");
  if(w){
    var b=w.querySelector(".dn-foot-tel");
    b.addEventListener("click",function(e){ e.stopPropagation(); var o=w.classList.toggle("is-open"); b.setAttribute("aria-expanded",o?"true":"false"); });
    document.addEventListener("click",function(e){ if(!w.contains(e.target)){ w.classList.remove("is-open"); b.setAttribute("aria-expanded","false"); } });
  }
  var top=document.querySelector(".dn-quick-top");
  if(top) top.addEventListener("click",function(){ window.scrollTo({top:0,behavior:"smooth"}); });
})();

})();
`;
