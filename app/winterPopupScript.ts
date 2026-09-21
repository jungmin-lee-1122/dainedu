// 윈터스쿨 팝업 동작 — 열고 닫기 · 오늘 하루 보지 않기 · 신청 접수
export const winterPopupScript = String.raw`
(function(){
  var pop=document.getElementById("wpPopup"); if(!pop) return;
  var box=pop.querySelector(".wp-box");
  var form=document.getElementById("wpForm");
  var msg=document.getElementById("wpMsg");
  var KEY="dnWinterPopupHideUntil";

  function open(){
    pop.hidden=false;
    document.body.style.overflow="hidden";
    requestAnimationFrame(function(){ pop.classList.add("is-on"); });
  }
  function close(){
    pop.classList.remove("is-on");
    document.body.style.overflow="";
    setTimeout(function(){ pop.hidden=true; },260);
  }
  function hideToday(){
    try{
      var end=new Date(); end.setHours(23,59,59,999);
      localStorage.setItem(KEY,String(end.getTime()));
    }catch(e){}
    close();
  }

  /* 오늘 하루 보지 않기를 눌렀으면 건너뜁니다 */
  var skip=false;
  try{
    var until=Number(localStorage.getItem(KEY)||0);
    skip = until>Date.now();
  }catch(e){ skip=false; }
  if(!skip) setTimeout(open,600);

  pop.addEventListener("click",function(e){ if(e.target===pop) close(); });
  var closeBtn=pop.querySelector(".wp-close");
  if(closeBtn) closeBtn.addEventListener("click",close);
  var todayBtn=pop.querySelector(".wp-today");
  if(todayBtn) todayBtn.addEventListener("click",hideToday);
  document.addEventListener("keydown",function(e){ if(e.key==="Escape" && !pop.hidden) close(); });

  /* 연락처 자동 하이픈 */
  var phone=form?form.querySelector('input[name="phone"]'):null;
  if(phone){
    phone.addEventListener("input",function(){
      var v=phone.value.replace(/[^0-9]/g,"").slice(0,11);
      if(v.length>7) phone.value=v.slice(0,3)+"-"+v.slice(3,7)+"-"+v.slice(7);
      else if(v.length>3) phone.value=v.slice(0,3)+"-"+v.slice(3);
      else phone.value=v;
    });
  }

  function say(text,ok){
    if(!msg) return;
    msg.textContent=text;
    msg.className="wp-msg"+(ok?" is-ok":" is-bad");
  }

  if(form){
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var f=new FormData(form);
      var name=String(f.get("name")||"").trim();
      var tel=String(f.get("phone")||"").trim();
      var school=String(f.get("school")||"").trim();
      var grade=String(f.get("grade")||"").trim();
      var way=String(f.get("way")||"").trim();
      var memo=String(f.get("memo")||"").trim();

      if(!name) return say("학생 이름을 입력해 주세요.",false);
      if(!/^01[0-9]-[0-9]{3,4}-[0-9]{4}$/.test(tel)) return say("연락처를 010-0000-0000 형태로 입력해 주세요.",false);
      if(!school) return say("학교명을 입력해 주세요.",false);
      if(!grade) return say("학년을 선택해 주세요.",false);
      if(!way) return say("희망 상담 방식을 선택해 주세요.",false);
      if(!f.get("agree")) return say("개인정보 수집·이용에 동의해 주세요.",false);

      var btn=form.querySelector(".wp-submit");
      if(btn){ btn.disabled=true; btn.textContent="접수 중…"; }
      say("접수 중입니다…",true);

      fetch("/api/reserve",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          eventId:"winter",
          eventTitle:"2027 윈터스쿨 사전 예약 · 상담 신청",
          eventDate:"2027.01.04 개강",
          who:way,                 /* 희망 상담 방식 */
          name:name,
          phone:tel,
          school:school,
          grade:grade,
          track:"윈터스쿨",
          companion:memo||"-",     /* 희망 시간대 · 문의 */
          source:"홈페이지 팝업",
          agreeMarketing:"미동의"
        })
      }).then(function(r){ return r.json().catch(function(){ return {}; }); })
      .then(function(res){
        if(res && res.ok){
          say("신청이 접수되었습니다. 곧 연락드리겠습니다.",true);
          form.reset();
          setTimeout(close,1800);
        }else{
          say("접수에 실패했습니다. 1644-8022 로 연락 주세요.",false);
        }
      }).catch(function(){
        say("접수에 실패했습니다. 1644-8022 로 연락 주세요.",false);
      }).finally(function(){
        if(btn){ btn.disabled=false; btn.textContent="신청 완료"; }
      });
    });
  }
})();
`;
