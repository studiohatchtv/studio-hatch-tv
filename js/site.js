/* studio HATCH site — ortak + ana sayfa + etkinlik sayfası */
(async function(){
  const I = window.HATCH_I18N;
  const EV = await window.hatchLoad();
  const SET = window.HATCH_SETTINGS || {};
  const FOREVER = "2999-12-31";
  const DEMO = !!window.HATCH_DEMO_MODE;
  const PREVIEW = false;  // canlı: www.studiohatch.tv
  const PILLAR_COLOR = { culture:["var(--culture)","var(--culture-soft)"], wellness:["var(--wellness)","var(--wellness-soft)"], nocturne:["var(--nocturne)","var(--nocturne-soft)"] };
  const JOIN_URL = "https://studiohatchtv.github.io/studio-hatch-flow/katil";
  const MAPS = "https://maps.app.goo.gl/r5HJbLXDrATRkBp79";
  const ADRES = "High Garden AVM, Newline Konutları, Ahmet Yesevi Mah., Farabi Cd. E Blok No: 12-E, 16140 Nilüfer/Bursa";

  // dil: ?lang=en > kayıtlı tercih > tr
  let lang = new URLSearchParams(location.search).get("lang");
  if(!lang){ try{ lang = localStorage.getItem("hatch-lang"); }catch(e){} }
  if(lang!=="en") lang="tr";
  const t = () => I[lang];
  const L = o => (o && (o[lang] || o.tr)) || "";
  const esc = s => String(s??"").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const $ = s => document.querySelector(s);
  const loc = () => lang==="tr" ? "tr-TR" : "en-GB";

  const dk = d => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  const pd = k => new Date(k+"T00:00:00");
  const today = () => dk(new Date());
  const addDays = (k,n) => { const d=pd(k); d.setDate(d.getDate()+n); return dk(d); };
  const fmt = (k,o) => new Intl.DateTimeFormat(loc(), o).format(pd(k));
  const endOf = e => e.end || e.date;
  const isRun = e => e.kind==="run";
  const tag = e => `<span class="tag" style="--c:${PILLAR_COLOR[e.pillar][0]};--cs:${PILLAR_COLOR[e.pillar][1]}">${esc(L(e.tur))}</span>`;
  // bağlantılarda dil ve demo modu korunur
  const qs = (o={}) => { const p=new URLSearchParams(o); if(lang==="en") p.set("lang","en"); if(DEMO) p.set("demo","1"); const x=p.toString(); return x?"?"+x:""; };
  const evUrl = e => `etkinlik.html${qs({id:e.id})}`;
  const allDay = () => lang==="tr" ? "Tüm gün" : "All day";
  const timeTxt = e => !e.times.length ? allDay() : e.endTime ? `${e.times[0]}–${e.endTime}` : e.times.join(" · ");
  // gösterimler: etkinlik yardımcılarıyla uyumlu olsun diye date/end alanları da var
  const SH = (window.HATCH_SHOWS||[]).map(g=>({ ...g, date:g.start||"2000-01-01", end:g.end||FOREVER, show:true })).filter(g=>g.end>=today());
  const shUrl = g => `gosterim.html${qs({id:g.id})}`;
  const onNow = g => g.date<=today();
  const until = k => lang==="tr" ? fmt(k,{day:"numeric",month:"long"})+" "+t().until : t().until+" "+fmt(k,{day:"numeric",month:"long"});
  const shWhen = g => onNow(g) ? (g.end===FOREVER ? t().openEnded : until(g.end)) : `${t().opens} · ${fmt(g.date,{day:"numeric",month:"long",...(g.date.slice(0,4)!==today().slice(0,4)?{year:"numeric"}:{})})}`;
  const faqHtml = list => list.map(x=>`<details class="faq"><summary>${esc(x.q)}<i aria-hidden="true"></i></summary><p>${esc(x.a)}</p></details>`).join("");
  const NL_ILGI = [["Immersive deneyimler","Immersive shows"],["Atölyeler","Workshops"],["Etkinlikler & konserler","Events & concerts"],["Wellness","Wellness"],["Tasarım ürünleri & mağaza","Design store"]];
  const ayar = k => (lang==="en" && SET[k+"_en"]) || SET[k] || "";
  const ARR = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  function setLang(l){
    lang=l; try{ localStorage.setItem("hatch-lang",l); }catch(e){}
    const u=new URL(location.href); if(l==="en") u.searchParams.set("lang","en"); else u.searchParams.delete("lang");
    history.replaceState(null,"",u); render();
  }
  window.hatchLang = setLang;

  function shell(){
    document.documentElement.lang = lang;
    const n=t().nav, ids=["gosterimler","program","makers","visit"];
    const band = DEMO ? t().proto : (ayar("duyuru") ? esc(ayar("duyuru")) : (PREVIEW ? (lang==="tr" ? "<b>Önizleme.</b> Site henüz yayında değil; program Flow'dan canlı geliyor." : "<b>Preview.</b> Not public yet; the program is live from Flow.") : ""));
    $("#proto").innerHTML = band; $("#proto").style.display = band ? "" : "none";
    $("#nav").innerHTML = n.map((x,i)=>`<a href="index.html${qs()}#${ids[i]}">${esc(x)}</a>`).join("") + `<a href="${JOIN_URL}">${esc(t().join)}</a>`;
    $("#hdR").innerHTML = `<div class="lang" role="group" aria-label="Dil / Language"><button class="${lang==="tr"?"on":""}" onclick="hatchLang('tr')">TR</button><button class="${lang==="en"?"on":""}" onclick="hatchLang('en')">EN</button></div>
      <a class="btn btn-blue" href="index.html${qs()}#gosterimler">${esc(t().tickets)}</a>`;
    $("#ft").innerHTML = footer();
  }
  function footer(){
    const c=t().ftCols;
    return `<div class="wrap"><div class="ft-g">
      <div><span class="logo" aria-label="studio HATCH"></span><div class="slogan">${esc(t().ftAbout)}</div></div>
      <div><h4>${c[0]}</h4><ul>${t().ftLinks.map(([a,h])=>`<li><a href="index.html${qs()}${h}">${esc(a)}</a></li>`).join("")}</ul></div>
      <div><h4>${c[1]}</h4><ul>${t().ftLinks2.map(([a,h])=>`<li><a href="${h==="#join"?JOIN_URL:"index.html"+qs()+h}">${esc(a)}</a></li>`).join("")}</ul></div>
      <div><h4>${c[2]}</h4><ul><li><a href="https://instagram.com/${esc(SET.instagram||"studiohatchtv")}" target="_blank" rel="noopener">Instagram</a></li><li><a href="mailto:${esc(SET.eposta||"hello@studiohatch.tv")}">${esc(SET.eposta||"hello@studiohatch.tv")}</a></li></ul></div>
    </div><div class="ft-b"><span>© ${new Date().getFullYear()} studio HATCH · ${esc(t().rights)} · <a href="kvkk.html${qs()}" style="text-decoration:underline">${esc(t().kvkkLink)}</a></span><a href="${MAPS}" target="_blank" rel="noopener">${esc(ADRES)}</a></div></div>`;
  }

  // bugünkü seanslar: geçenler soluk, sıradaki vurgulu
  function slotsHtml(e){
    if(!e.times.length) return "";
    const now=new Date(), hm=String(now.getHours()).padStart(2,"0")+":"+String(now.getMinutes()).padStart(2,"0");
    const running = e.date<=today() && endOf(e)>=today();
    const kalan = running ? e.times.filter(x=>x>hm).length : 0;
    const label = !running ? fmt(e.date,{weekday:"long",day:"numeric",month:"long"}) : kalan ? t().todaySlots : (endOf(e)>today() ? t().noMoreToday : (lang==="tr"?"Bugünkü seanslar bitti":"Today's sessions are over"));
    let nextFound=false;
    const chips=e.times.map(x=>{ let c="slot"; if(kalan){ if(x<=hm) c+=" past"; else if(!nextFound){ c+=" next"; nextFound=true; } } return `<span class="${c}">${esc(x)}</span>`; }).join("");
    return `<div class="slots-l">${esc(label)}</div><div class="slots-r">${chips}</div>`;
  }

  /* ---------- ANA SAYFA ---------- */
  const st = { pillar:"", day:null }; let heroItem=null;
  function home(){
    const gelecek = EV.filter(e=>endOf(e)>=today());
    const f = SH.find(g=>g.featured&&onNow(g)) || SH.find(onNow) || SH.find(g=>g.featured) || gelecek.find(e=>e.featured) || SH[0] || gelecek.find(isRun) || gelecek[0];
    heroItem = f;
    const fUrl = f && (f.show ? shUrl(f) : evUrl(f));
    if(!f){
      $("#hero").innerHTML = `<div class="wrap"><div class="rv"><div class="eyebrow">studio HATCH · Nilüfer, Bursa</div>
        <h1><span>${lang==="tr"?"Deneyimler · Local Makers · Buluşmalar":"Experiences · Local Makers · Meet-ups"}</span>${esc(t().ftAbout)}</h1>
        <p class="lead">${esc(t().spaceP)}</p><div class="hero-cta" style="margin-top:28px"><a class="btn btn-white" href="#visit">${esc(t().visitH)} <span class="arr">${ARR}</span></a></div></div>
        <div class="hero-art tech"><img src="assets/oda-mavi.jpg" alt=""></div></div>`;
    } else {
    const simdi = f.date<=today();
    $("#hero").innerHTML = `<div class="wrap">
      <div class="rv">
        <div class="eyebrow mono">${simdi?`<span class="live"></span>${esc(t().nowShowing)}`:(lang==="tr"?"Yakında":"Coming up")} · ${esc(f.show ? (lang==="tr"?"Immersive gösterim":"Immersive show") : L(f.tur))}</div>
        <h1>${f.show ? `${L(f.sub)?`<span>${esc(L(f.sub))}</span>`:""}${esc(L(f.title))}` : (()=>{ const [a,b]=L(f.title).split(": "); return b?`<span>${esc(a)}</span>${esc(b)}`:esc(a); })()}</h1>
        <p class="lead">${esc(L(f.short))}</p>
        <div class="slots">${f.show && !f.times.length && L(f.hours) ? `<div class="slots-l">${esc(t().shHours)}</div><div class="slots-r"><span class="slot next">${esc(L(f.hours))}</span></div>` : slotsHtml(f)}</div>
        <div class="hero-cta">${f.ticketUrl?`<a class="btn btn-white" href="${esc(f.ticketUrl)}" target="_blank" rel="noopener">${esc(t().buy)} <span class="arr">${ARR}</span></a>`:""}<a class="btn ${f.ticketUrl?"btn-line":"btn-white"}" href="${fUrl}">${esc(f.show?t().explore:t().details)}</a></div>
      </div>
      <div class="hero-art tech"><img class="${f.blend?"blend":""}" src="${esc(f.image)}" alt="" fetchpriority="high">${f.durationMin?`<div class="badge-40"><b>${f.durationMin}'</b><small>${esc(t().minutes)}</small></div>`:""}</div>
    </div>`;
    }
    const tk=["Deneyimler","Local Makers","Buluşmalar",...["culture","wellness","nocturne"].map(p=>t().pillars[p][0])]; const tkH=tk.map(x=>`<span>${x}</span>`).join("");
    $("#ticker").innerHTML = `<div class="ticker-t" aria-hidden="true">${tkH+tkH+tkH+tkH}</div>`;
    $("#showsW").innerHTML = renderShows();
    $("#programH").innerHTML = `<div><h2 class="h2">${esc(t().upcoming)}</h2><p class="sub">${esc(t().upcomingSub)}</p></div><div class="filters" id="filters"></div>`;
    renderProgram();
    const cnt = p => EV.filter(e=>e.pillar===p && endOf(e)>=today()).length + (p==="culture"?SH.length:0);
    $("#pillarsH").innerHTML = `<div><h2 class="h2">${t().pillarsH}</h2><p class="sub">${esc(t().pillarsSub)}</p></div>`;
    $("#pillars").innerHTML = ["culture","wellness","nocturne"].map(p=>`<a class="pillar ${p} rv" href="#program" onclick="hatchPillar('${p}')"><span class="shape"></span>
      <div><h3>${t().pillars[p][0]}</h3><p>${esc(t().pillars[p][1])}</p></div>
      <div class="n"><span>${cnt(p)} ${esc(t().events)}</span>${ARR}</div></a>`).join("");
    const GAL=["oda-frida","oda-turuncu","oda-geyik","oda-meyve","oda-ziyaretci"];
    $("#space").innerHTML = `<div class="wrap"><div class="dg-top rv"><div><div class="mono dg-eye"><span class="live"></span>${esc(t().spaceEye)} · ${esc(t().spaceCap)}</div><h2 class="h2">${t().spaceH}</h2></div><p class="sub">${esc(t().spaceP)}</p></div>
      <div class="dg-specs rv">${t().st.map(([a,b],i)=>`<div><span class="mono">0${i+1}</span><b>${esc(a)}</b><small>${esc(b)}</small></div>`).join("")}</div>
      <div class="dg-grid">${GAL.map((g,i)=>`<figure class="dg-f f${i} rv"><img src="assets/${g}.jpg" alt="${esc(t().gal[i])}" loading="lazy"><figcaption class="mono">${String(i+1).padStart(2,"0")} / ${esc(t().gal[i])}</figcaption></figure>`).join("")}</div></div>`;
    $("#makers").innerHTML = `<div class="makers-txt rv"><h2 class="h2">${t().makersH}</h2><p class="sub" style="color:var(--ink)">${esc(t().makersP)}</p><div><a class="btn btn-blue" href="#visit">${esc(t().makersBtn)} <span class="arr">${ARR}</span></a></div></div>
      <div class="makers-img rv"><img src="assets/magaza.jpg" alt="" loading="lazy"></div>`;
    $("#join").innerHTML = `<div class="join rv"><div><h2 class="h2">${t().joinH}</h2><p class="sub" style="color:#fff;opacity:.85">${esc(t().joinP)}</p></div>
      <div class="join-opts">${t().joinOpts.map(([a,b])=>`<a class="join-opt" href="${JOIN_URL}"><span><small>${a}</small><b>${esc(b)}</b></span>${ARR}</a>`).join("")}</div></div>`;
    $("#visitG").innerHTML = `<div class="card rv"><h2 class="h2">${esc(t().visitH)}</h2>
        <dl class="kv"><dt>${esc(t().where)}</dt><dd>studio HATCH — High Garden AVM<br>Newline Konutları, Farabi Cd.<br>E Blok No: 12-E<br>16140 Nilüfer / Bursa</dd>
        <dt>${esc(t().hours)}</dt><dd>${ayar("saatler") ? esc(ayar("saatler")).replace(/\n/g,"<br>") : `<span class="todo">${esc(t().hoursTodo)}</span>`}</dd>
        <dt>${esc(t().contact)}</dt><dd><a href="mailto:${esc(SET.eposta||"hello@studiohatch.tv")}">${esc(SET.eposta||"hello@studiohatch.tv")}</a><br><a href="https://instagram.com/${esc(SET.instagram||"studiohatchtv")}" target="_blank" rel="noopener">@${esc(SET.instagram||"studiohatchtv")}</a></dd></dl>
        <a class="btn btn-ink" style="margin-top:26px" href="${MAPS}" target="_blank" rel="noopener">${esc(t().map)} <span class="arr">${ARR}</span></a></div>
      <div class="card rv" style="background:var(--blue-soft)"><h2 class="h2">${esc(t().nlH)}</h2><p class="sub" style="color:var(--ink)">${esc(t().nlP)}</p>
        <form class="nl-form nl2" onsubmit="event.preventDefault(); hatchNl(this)">
          <label class="sr" for="nlMail">${esc(t().nlPh)}</label><input id="nlMail" type="email" required placeholder="${esc(t().nlPh)} *" autocomplete="email" maxlength="200">
          <div class="nl-opt"><span>${esc(t().nlOpt)}</span>
            <label class="sr" for="nlAd">${esc(t().nlAd)}</label><input id="nlAd" placeholder="${esc(t().nlAd)}" autocomplete="name" maxlength="120">
            <div class="nl-tel"><b>0</b><label class="sr" for="nlTel">${esc(t().nlTel)}</label><input id="nlTel" type="tel" inputmode="numeric" placeholder="${esc(t().nlTel)} · 5xx xxx xx xx" autocomplete="tel-national" maxlength="14" oninput="hatchTel(this)"></div>
            <div class="nl-ilgi" role="group" aria-label="${esc(t().nlIlgi)}"><small>${esc(t().nlIlgi)}</small>${NL_ILGI.map(([v,en])=>`<button type="button" class="nl-chip" data-v="${esc(v)}" aria-pressed="false" onclick="this.classList.toggle('on'); this.setAttribute('aria-pressed',this.classList.contains('on'))">${esc(lang==="tr"?v:en)}</button>`).join("")}</div>
          </div>
          <label class="ck"><input type="checkbox" id="nlIzin" required><span>${t().nlIzin.replace("{kvkk}",`<a href="kvkk.html${qs()}" target="_blank">${esc(t().kvkkLink)}</a>`)}</span></label>
          <label class="ck" id="nlTelIzinW" hidden><input type="checkbox" id="nlTelIzin"><span>${esc(t().nlTelIzin)}</span></label>
          <button class="btn btn-blue">${esc(t().nlBtn)} <span class="arr">${ARR}</span></button></form>
        <div class="nl-ok" id="nlOk">${esc(t().nlOk)}</div><p class="fine">${esc(t().nlFine)}</p></div>`;
  }
  function showCard(g){
    const now=onNow(g);
    return `<article class="sh-card rv"><a class="row-link" href="${shUrl(g)}" aria-label="${esc(L(g.title))}"></a>
      <div class="sh-img ${g.blend?"blend":""}"><img src="${esc(g.image)}" alt="" loading="lazy"><span class="sh-badge ${now?"on":""}">${now?`<span class="live"></span>`:""}${esc(now?t().showing:t().soon)}</span></div>
      <div class="sh-txt">${L(g.sub)?`<small>${esc(L(g.sub))}</small>`:""}<h3>${esc(L(g.title))}</h3><p>${esc(L(g.short))}</p>
        <div class="sh-meta"><b>${esc(shWhen(g))}</b>${L(g.hours)?`<span class="sep">·</span><span>${esc(L(g.hours))}</span>`:""}${g.durationMin?`<span class="sep">·</span><span>${g.durationMin} ${esc(t().minutes)}</span>`:""}</div>
        <span class="sh-go">${esc(t().explore)} ${ARR}</span></div></article>`;
  }
  function renderShows(skip){
    const list=SH.filter(g=>g.id!==skip);
    const ghost=`<article class="sh-card sh-ghost rv"><div><span class="shape"></span><h3>${esc(t().ghostH)}</h3><p>${esc(t().ghostP)}</p></div>
      <a class="btn btn-white" href="index.html${qs()}#visit" onclick="setTimeout(()=>document.getElementById('nlMail')&&document.getElementById('nlMail').focus(),600)">${esc(t().ghostBtn)} <span class="arr">${ARR}</span></a></article>`;
    return `<div class="sec-h"><div><h2 class="h2">${skip?esc(t().shOther):t().showsH}</h2>${skip?"":`<p class="sub">${esc(t().showsSub)}</p>`}</div>
        <div class="sh-arrows"><button onclick="hatchSlide(this,-1)" aria-label="${esc(t().prev)}">${ARR}</button><button onclick="hatchSlide(this,1)" aria-label="${esc(t().next)}">${ARR}</button></div></div>
      <div class="sh-track" tabindex="0">${list.map(showCard).join("")}${ghost}</div>`;
  }
  window.hatchSlide = (btn,d) => { const tr=btn.closest(".sec,#more").querySelector(".sh-track"); const c=tr.querySelector(".sh-card"); tr.scrollBy({ left:d*((c?c.offsetWidth:300)+20), behavior:"smooth" }); };
  function renderProgram(){
    const chips=[["",t().all,"var(--ink)"],["culture",t().pillars.culture[0],"var(--culture)"],["wellness",t().pillars.wellness[0],"var(--wellness)"],["nocturne",t().pillars.nocturne[0],"var(--nocturne)"]];
    $("#filters").innerHTML = chips.map(([k,l,c])=>`<button class="fchip ${st.pillar===k?"on":""}" style="--c:${c}" onclick="hatchPillar('${k}')"><i></i>${esc(l)}</button>`).join("");
    // gösterimler de takvimde: her gün, Immersive Gösteri olarak
    const SHEV = SH.map(g=>({ ...g, pillar:"culture", kind:"run", tur:{tr:"Immersive gösterim",en:"Immersive show"},
      title:{tr:(L(g.sub)?g.sub.tr+": ":"")+g.title.tr, en:(L(g.sub)?(g.sub.en||g.sub.tr)+": ":"")+(g.title.en||g.title.tr)} }));
    const list0 = [...SHEV, ...EV].filter(e=>!st.pillar || e.pillar===st.pillar);
    const onDay = (e,k) => e.date<=k && endOf(e)>=k;
    const t0=today();
    let days="";
    for(let i=0;i<14;i++){
      const k=addDays(t0,i), on=list0.filter(e=>onDay(e,k));
      days+=`<button class="day ${i===0?"today":""} ${st.day===k?"on":""} ${on.length?"":"empty"}" onclick="hatchDay('${k}')" aria-pressed="${st.day===k}">
        <small>${i===0?(lang==="tr"?"Bugün":"Today"):esc(fmt(k,{weekday:"short"}))}</small><b>${pd(k).getDate()}</b>
        <span class="dots">${on.slice(0,3).map(e=>`<i style="background:${PILLAR_COLOR[e.pillar][0]}"></i>`).join("")}</span></button>`;
    }
    $("#days").innerHTML = days;
    $("#clearDay").innerHTML = st.day ? `<button class="clear-day" onclick="hatchDay(null)">← ${esc(t().showAll)}</button>` : "";
    const list = (st.day ? list0.filter(e=>onDay(e,st.day)) : list0.filter(e=>endOf(e)>=t0 && e.date<=addDays(t0,45)))
      .sort((a,b)=>(a.date+(a.times[0]||"")).localeCompare(b.date+(b.times[0]||"")));
    $("#rows").innerHTML = list.length ? list.map(e=>`<article class="row">
        <a class="row-link" href="${e.show?shUrl(e):evUrl(e)}" aria-label="${esc(L(e.title))}"></a>
        <div class="dt">${isRun(e)&&e.date<=(st.day||t0)?`<b style="font-size:.62em">${esc(t().everyDay)}</b><small>${endOf(e)===FOREVER?esc(t().showing):"→ "+esc(fmt(endOf(e),{day:"numeric",month:"short"}))}</small>`:`<b>${pd(e.date).getDate()}</b><small>${esc(fmt(e.date,{month:"short"}))} · ${esc(fmt(e.date,{weekday:"short"}))}</small>`}</div>
        <div>${tag(e)}<h3>${esc(L(e.title))}</h3><p>${esc(L(e.short))}</p>
          <div class="meta"><b>${esc(e.show ? (L(e.hours) || (e.times.length?e.times.join(" · "):"")) : timeTxt(e))}</b>${e.show&&e.durationMin?`<span class="sep">·</span><span>${e.durationMin} ${esc(t().minutes)}</span>`:""}<span class="sep">·</span><span>${e.ticketUrl?esc(L(e.price)):esc(t().free)}</span></div></div>
        <div class="th" style="--cs:${PILLAR_COLOR[e.pillar][1]}"><img src="${esc(e.image)}" alt="" loading="lazy"></div>
        <span class="go">${ARR}</span></article>`).join("")
      : `<div class="empty-msg">${esc(t().nothing)}</div>`;
  }
  window.hatchTel = inp => {
    let d=inp.value.replace(/\D/g,""); if(d.startsWith("90")&&d.length>10) d=d.slice(2); d=d.replace(/^0+/,"").slice(0,10);
    inp.value=[d.slice(0,3),d.slice(3,6),d.slice(6,8),d.slice(8,10)].filter(Boolean).join(" ");
    const w=$("#nlTelIzinW"); w.hidden=!d; if(!d) $("#nlTelIzin").checked=false;
  };
  window.hatchNl = async form => {
    const btn=form.querySelector("button.btn"), mail=$("#nlMail").value.trim();
    const ad=$("#nlAd").value.trim(), tel=$("#nlTel").value.replace(/\D/g,""), izinTel=$("#nlTelIzin").checked;
    const ilgi=[...form.querySelectorAll(".nl-chip.on")].map(b=>b.dataset.v);
    if(tel && tel.length!==10){ alert(lang==="tr"?"Telefon numarasını 10 hane olarak yaz (ör. 532 123 45 67) ya da boş bırak.":"Enter a 10-digit phone number or leave it empty."); $("#nlTel").focus(); return; }
    const kvkkUrl=new URL("kvkk.html",location.href).href;
    const metin=(lang==="tr"?"Web sitesi bülten kaydı. Onaylanan: ":"Website newsletter sign-up. Agreed: ")+t().nlIzin.replace("{kvkk}",t().kvkkLink+" ("+kvkkUrl+")")+(izinTel?" | "+t().nlTelIzin:"");
    btn.disabled=true;
    try{
      if(!DEMO) await window.hatchNewsletter(mail, metin, { ad, telefon:tel?"0"+tel:"", izinTel, ilgi });
      form.style.display="none"; $("#nlOk").style.display="block";
    }catch(x){ btn.disabled=false; alert(lang==="tr"?"Kaydedilemedi. E-posta adresini kontrol edip tekrar dene.":"Couldn't sign you up. Check the address and try again."); }
  };
  window.hatchPillar = p => { st.pillar=p; renderProgram(); };
  window.hatchDay = k => { st.day = st.day===k ? null : k; renderProgram(); };

  /* ---------- ETKİNLİK SAYFASI ---------- */
  function eventPage(){
    const id=new URLSearchParams(location.search).get("id");
    const e=EV.find(x=>x.id===id);
    if(!e){
      $("#evHero").className="ev-hero"; $("#evHero").style.setProperty("--c","var(--blue)");
      $("#evHero").innerHTML=`<div class="wrap" style="grid-template-columns:1fr"><div><div class="crumb"><a href="index.html${qs()}#program">← ${esc(t().evBack)}</a></div><h1>${lang==="tr"?"Bu etkinlik artık programda değil":"This event is no longer listed"}</h1></div></div>`;
      $("#evBody").innerHTML=""; $("#more").innerHTML=""; return;
    }
    const [c]=PILLAR_COLOR[e.pillar];
    document.title = `${L(e.title)} · studio HATCH`;
    const dateTxt = isRun(e) ? `${t().everyDay} · ${lang==="tr" ? fmt(endOf(e),{day:"numeric",month:"long"})+" "+t().until : t().until+" "+fmt(endOf(e),{day:"numeric",month:"long"})}` : fmt(e.date,{weekday:"long",day:"numeric",month:"long"});
    const dur = e.durationMin ? `${e.durationMin} ${t().minutes}` : (e.endTime && e.times[0] ? (()=>{ const [h1,m1]=e.times[0].split(":"), [h2,m2]=e.endTime.split(":"); return ((h2*60+ +m2)-(h1*60+ +m1))+" "+t().minutes; })() : "");
    $("#evHero").className = "ev-hero "+e.pillar; $("#evHero").style.setProperty("--c", c);
    $("#evHero").innerHTML = `<div class="wrap"><div>
        <div class="crumb"><a href="index.html${qs()}#program">← ${esc(t().evBack)}</a></div>
        <span class="tag" style="background:rgba(255,255,255,.16);color:#fff">${esc(L(e.tur))}</span>
        <h1>${esc(L(e.title))}</h1><p class="lead">${esc(L(e.short))}</p></div>
      <div class="ev-img ${e.blend?"blend":""}"><img src="${esc(e.image)}" alt=""></div></div>`;
    $("#evBody").innerHTML = `<div class="txt">${L(e.desc).map(p=>`<p>${esc(p)}</p>`).join("")}
        ${L(e.know).length?`<h2>${esc(t().evKnow)}</h2><ul class="know" style="--c:${c}">${L(e.know).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}</div>
      <aside class="side"><dl>
        <div><dt>${esc(t().evDate)}</dt><dd>${esc(dateTxt)}</dd></div>
        <div><dt>${esc(e.times.length>1?t().evSessions:t().evTime)}</dt><dd>${e.times.length>1&&isRun(e)?`<div class="slots-r" style="margin-top:6px">${slotsHtml(e).split('<div class="slots-r">')[1].replace(/<\/div>$/,"")}</div>`:esc(timeTxt(e))}</dd></div>
        ${dur?`<div><dt>${esc(t().evDuration)}</dt><dd>${esc(dur)}</dd></div>`:""}
        <div><dt>${esc(t().evPlace)}</dt><dd>studio HATCH — High Garden AVM<br><span style="font-weight:400;font-size:14px;color:var(--muted)">Farabi Cd. E Blok No: 12-E, Nilüfer/Bursa</span><br><a href="${MAPS}" target="_blank" rel="noopener" style="font-size:14px;color:var(--blue)">${esc(t().map)} ↗</a></dd></div>
        <div><dt>${esc(t().evPrice)}</dt><dd>${esc(e.ticketUrl?L(e.price):t().noTicket)}</dd></div></dl>
        ${e.ticketUrl?`<a class="btn btn-blue" href="${esc(e.ticketUrl)}" target="_blank" rel="noopener">${esc(t().buy)} <span class="arr">${ARR}</span></a>`:""}
        <div class="acts"><button class="btn" onclick="hatchIcs()">📅 ${esc(t().addCal)}</button><button class="btn" onclick="hatchShare()">↗ ${esc(t().share)}</button></div></aside>`;
    const more = EV.filter(x=>x.id!==e.id && !isRun(x) && x.date>=today()).sort((a,b)=>(a.pillar===e.pillar?0:1)-(b.pillar===e.pillar?0:1) || a.date.localeCompare(b.date)).slice(0,3);
    $("#more").innerHTML = `<h2 class="h2" style="font-size:clamp(28px,3vw,40px)">${esc(t().evMore)}</h2><div class="rows">${more.map(x=>`<article class="row"><a class="row-link" href="${evUrl(x)}" aria-label="${esc(L(x.title))}"></a>
        <div class="dt"><b>${pd(x.date).getDate()}</b><small>${esc(fmt(x.date,{month:"short"}))}</small></div>
        <div>${tag(x)}<h3>${esc(L(x.title))}</h3><div class="meta"><b>${esc(timeTxt(x))}</b></div></div>
        <div class="th" style="--cs:${PILLAR_COLOR[x.pillar][1]}"><img src="${esc(x.image)}" alt="" loading="lazy"></div><span class="go">${ARR}</span></article>`).join("")}</div>`;
    // Google etkinlik kartı için yapılandırılmış veri
    const ld={ "@context":"https://schema.org", "@type":"Event", name:L(e.title), description:L(e.short),
      startDate: e.times[0] ? `${e.date}T${e.times[0]}:00+03:00` : e.date, endDate: e.endTime?`${e.date}T${e.endTime}:00+03:00`:`${endOf(e)}T23:00:00+03:00`,
      eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode", eventStatus:"https://schema.org/EventScheduled",
      image:[new URL(e.image,location.href).href],
      location:{ "@type":"Place", name:"studio HATCH — High Garden AVM", address:{ "@type":"PostalAddress", streetAddress:"Ahmet Yesevi Mah., Farabi Cd. Newline Konutları E Blok No: 12-E", addressLocality:"Nilüfer", addressRegion:"Bursa", postalCode:"16140", addressCountry:"TR" } },
      organizer:{ "@type":"Organization", name:"studio HATCH", url:"https://www.studiohatch.tv" },
      ...(e.ticketUrl?{offers:{ "@type":"Offer", url:e.ticketUrl, availability:"https://schema.org/InStock" }}:{}) };
    let s=document.getElementById("ld"); if(!s){ s=document.createElement("script"); s.type="application/ld+json"; s.id="ld"; document.head.appendChild(s); }
    s.textContent=JSON.stringify(ld);
    window.hatchIcs = () => {
      const st=(e.date+"T"+(e.times[0]||"10:00")).replace(/[-:]/g,"")+"00";
      const en=e.endTime ? (e.date+"T"+e.endTime).replace(/[-:]/g,"")+"00" : (()=>{ const d=new Date(`${e.date}T${e.times[0]||"10:00"}:00`); d.setMinutes(d.getMinutes()+(e.durationMin||60)); return dk(d).replace(/-/g,"")+"T"+String(d.getHours()).padStart(2,"0")+String(d.getMinutes()).padStart(2,"0")+"00"; })();
      const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//studio HATCH//TR","BEGIN:VEVENT",`UID:${e.id}@studiohatch.tv`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").slice(0,15)}Z`,
        `DTSTART;TZID=Europe/Istanbul:${st}`,`DTEND;TZID=Europe/Istanbul:${en}`,`SUMMARY:${L(e.title).replace(/[,;]/g,"\\$&")}`,"LOCATION:studio HATCH — High Garden AVM\\, Farabi Cd. E Blok No: 12-E\\, 16140 Nilüfer/Bursa",`URL:${location.href}`,"END:VEVENT","END:VCALENDAR"].join("\r\n");
      const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar"})); a.download=`studiohatch-${e.id}.ics`; a.click();
    };
    window.hatchShare = async () => {
      if(navigator.share){ try{ await navigator.share({ title:L(e.title), url:location.href }); }catch(x){} return; }
      try{ await navigator.clipboard.writeText(location.href); toast(t().copied); }catch(x){}
    };
  }
  /* ---------- GÖSTERİM SAYFASI ---------- */
  function showPage(){
    const id=new URLSearchParams(location.search).get("id");
    const g=SH.find(x=>x.id===id);
    const back=`<div class="crumb"><a href="index.html${qs()}#gosterimler">← ${esc(t().shBack)}</a></div>`;
    if(!g){
      $("#evHero").style.setProperty("--c","var(--blue)");
      $("#evHero").innerHTML=`<div class="wrap" style="grid-template-columns:1fr"><div>${back}<h1>${esc(t().shNotFound)}</h1></div></div>`;
      $("#shFacts").innerHTML=""; $("#evBody").innerHTML=""; $("#more").innerHTML=SH.length?renderShows():""; return;
    }
    const now=onNow(g);
    document.title = `${L(g.title)}${L(g.sub)?" · "+L(g.sub):""} · studio HATCH`;
    $("#evHero").style.setProperty("--c","var(--blue)");
    $("#evHero").innerHTML = `<div class="wrap"><div>${back}
        <span class="tag" style="background:rgba(255,255,255,.16);color:#fff">${now?`<span class="live"></span>`:""}${esc(now?t().showing:t().soon)} · ${lang==="tr"?"Immersive gösterim":"Immersive show"}</span>
        <h1>${L(g.sub)?`<span>${esc(L(g.sub))}</span>`:""}${esc(L(g.title))}</h1><p class="lead">${esc(L(g.short))}</p>
        <div class="hero-cta" style="margin-top:26px">${g.ticketUrl?`<a class="btn btn-white" href="${esc(g.ticketUrl)}" target="_blank" rel="noopener">${esc(t().buy)} <span class="arr">${ARR}</span></a>`:""}</div></div>
      <div class="ev-img ${g.blend?"blend":""}"><img src="${esc(g.image)}" alt=""></div></div>`;
    const facts=[[t().evDate, shWhen(g)], [t().evSessions, g.times.join(" · ")], [t().shHours, L(g.hours)], [t().evDuration, g.durationMin?`${g.durationMin} ${t().minutes}`:""], [t().shAge, L(g.age)], [t().evPrice, L(g.price)]].filter(x=>x[1]);
    $("#shFacts").innerHTML = facts.length ? `<div class="wrap"><dl class="sh-facts">${facts.map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl></div>` : "";
    const is=L(g.is), isnt=L(g.isnt), faq=[...L(g.faq), ...window.hatchFaq(ayar("genel_sss"))], about=ayar("immersive_nedir");
    $("#evBody").innerHTML = `<div class="txt">
        ${L(g.desc).map(p=>`<p>${esc(p)}</p>`).join("")}
        ${is.length||isnt.length?`<h2>${esc(t().shWhat)}</h2><div class="isnt">
          ${is.length?`<div class="yes"><h3>${esc(t().shIs)}</h3><ul>${is.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:""}
          ${isnt.length?`<div class="no"><h3>${esc(t().shIsnt)}</h3><ul>${isnt.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:""}</div>`:""}
        ${about?`<div class="about"><h3>${esc(t().shAbout)}</h3><p>${esc(about)}</p></div>`:""}
        ${faq.length?`<h2>${esc(t().shFaq)}</h2><div class="faqs">${faqHtml(faq)}</div>`:""}</div>
      <aside class="side">${g.times.length&&now?`<div class="slots-l" style="color:var(--muted)">${slotsHtml(g).split('<div class="slots-r">')[0].replace(/<[^>]+>/g,"")}</div><div class="slots-r" style="margin:8px 0 22px">${slotsHtml(g).split('<div class="slots-r">')[1].replace(/<\/div>$/,"")}</div>`:""}
        <dl><div><dt>${esc(t().evPlace)}</dt><dd>studio HATCH — High Garden AVM<br><span style="font-weight:400;font-size:14px;color:var(--muted)">Farabi Cd. E Blok No: 12-E, Nilüfer/Bursa</span><br><a href="${MAPS}" target="_blank" rel="noopener" style="font-size:14px;color:var(--blue)">${esc(t().map)} ↗</a></dd></div></dl>
        ${g.ticketUrl?`<a class="btn btn-blue" href="${esc(g.ticketUrl)}" target="_blank" rel="noopener">${esc(t().buy)} <span class="arr">${ARR}</span></a>`:""}
        <div class="acts" style="grid-template-columns:1fr"><button class="btn" onclick="hatchShare()">↗ ${esc(t().share)}</button></div></aside>`;
    $("#more").innerHTML = (SH.length>1 ? renderShows(g.id) : "") + `<div style="margin-top:40px"><a class="btn btn-ink" href="index.html${qs()}#program">${esc(t().shEvents)} <span class="arr">${ARR}</span></a></div>`;
    const ld=[{ "@context":"https://schema.org", "@type":"Event", name:L(g.sub)?`${L(g.sub)}: ${L(g.title)}`:L(g.title), description:L(g.short),
      startDate:g.start||today(), ...(g.end!==FOREVER?{endDate:g.end}:{}), eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode", eventStatus:"https://schema.org/EventScheduled",
      image:[new URL(g.image,location.href).href],
      location:{ "@type":"Place", name:"studio HATCH — High Garden AVM", address:{ "@type":"PostalAddress", streetAddress:"Ahmet Yesevi Mah., Farabi Cd. Newline Konutları E Blok No: 12-E", addressLocality:"Nilüfer", addressRegion:"Bursa", postalCode:"16140", addressCountry:"TR" } },
      organizer:{ "@type":"Organization", name:"studio HATCH", url:"https://www.studiohatch.tv" },
      ...(g.ticketUrl?{offers:{ "@type":"Offer", url:g.ticketUrl, availability:"https://schema.org/InStock" }}:{}) }];
    if(faq.length) ld.push({ "@context":"https://schema.org", "@type":"FAQPage", mainEntity:faq.map(x=>({ "@type":"Question", name:x.q, acceptedAnswer:{ "@type":"Answer", text:x.a } })) });
    let sc=document.getElementById("ld"); if(!sc){ sc=document.createElement("script"); sc.type="application/ld+json"; sc.id="ld"; document.head.appendChild(sc); }
    sc.textContent=JSON.stringify(ld);
    window.hatchShare = async () => {
      if(navigator.share){ try{ await navigator.share({ title:L(g.title), url:location.href }); }catch(x){} return; }
      try{ await navigator.clipboard.writeText(location.href); toast(t().copied); }catch(x){}
    };
  }
  function toast(m){ const el=$("#toast"); el.textContent=m; el.classList.add("on"); setTimeout(()=>el.classList.remove("on"),1800); }

  /* ---------- ortak ---------- */
  function reveal(){
    const els=[...document.querySelectorAll(".rv:not(.in)")];
    // ilk ekranda görünenler beklemeden belirsin
    els.filter(x=>x.getBoundingClientRect().top < innerHeight).forEach(x=>requestAnimationFrame(()=>x.classList.add("in")));
    if(!("IntersectionObserver" in window)){ els.forEach(x=>x.classList.add("in")); return; }
    const io=new IntersectionObserver(es=>es.forEach(x=>{ if(x.isIntersecting){ x.target.classList.add("in"); io.unobserve(x.target); } }),{ rootMargin:"0px 0px -8% 0px" });
    els.forEach(x=>io.observe(x));
  }
  /* ---------- KVKK ---------- */
  function kvkkPage(){
    const metin = ayar("kvkk") || L(window.HATCH_KVKK_TASLAK);
    document.title = `${t().kvkkLink} · studio HATCH`;
    // tek satırlık kısa paragraflar başlık olur
    $("#legal").innerHTML = `<div class="crumb"><a href="index.html${qs()}">← studio HATCH</a></div><h1>${esc(t().kvkkLink)}</h1>`+
      metin.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean).map(p=>{ const [ilk,...kalan]=p.split("\n"); const bas=ilk.length<70 && !/[.:;,]$/.test(ilk.trim());
        return bas ? `<h2>${esc(ilk)}</h2>${kalan.length?`<p>${esc(kalan.join("\n")).replace(/\n/g,"<br>")}</p>`:""}` : `<p>${esc(p).replace(/\n/g,"<br>")}</p>`; }).join("");
  }
  function render(){ shell(); const pg=document.body.dataset.page; if(pg==="event") eventPage(); else if(pg==="show") showPage(); else if(pg==="kvkk") kvkkPage(); else home(); reveal(); }
  window.addEventListener("scroll", ()=>$(".hd").classList.toggle("scrolled", scrollY>8), { passive:true });
  window.hatchMenu = () => $("#nav").classList.toggle("open");
  document.addEventListener("click", ev=>{ if(ev.target.closest("#nav a")) $("#nav").classList.remove("open"); });
  render();
  setInterval(()=>{ const s=$("#hero .slots"); if(heroItem&&s) s.innerHTML=slotsHtml(heroItem); }, 60000);
})();
