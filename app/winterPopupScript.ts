// 윈터스쿨 팝업 동작 — 열고 닫기 · 오늘 하루 보지 않기
export const winterPopupScript = String.raw`
(function(){
  var pop=document.getElementById("wpPopup"); if(!pop) return;
  var box=pop.querySelector(".wp-box");
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

})();
`;
