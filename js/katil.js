/* Hatch'e Katıl — genel başvuru sayfası (katil.html)
   Başvurular Flow → 📨 Başvurular'a düşer (katilim_basvuru_gonder). */
(function(){
  const SB_URL = "https://uolmzykwvizhmycgymfi.supabase.co", SB_KEY = "sb_publishable_FIJ8mhgoXzlbhtlebcc_Bw_WLHYNFI0";
  const BUCKET = "is-dosyalari", MAX_MB = 15, MAX_DOSYA = 20;
  const HU_KAPANIS = new Date("2026-12-02T00:00:00+03:00");
  const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const ARR = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  // [etiket, tür, ad, zorunlu, seçenekler, ipucu]
  const ORTAK = [
    ["Ad soyad / Marka adı","text","name",true],
    ["E-posta","email","email",true],
    ["Telefon","tel","phone",false],
    ["Instagram / Sosyal medya","text","social",false,null,"@kullaniciadi"],
    ["Web sitesi / Portfolyo bağlantısı","text","website",false],
  ];
  const TURLER = {
    tasarimci:{ ad:"Tasarımcı & Marka", kisa:"Tasarımcı", no:"01", baslik:"Ürettiklerini bizimle paylaş.", metin:"Tasarımlarını, ürünlerini ve markanın hikâyesini tanımak istiyoruz. Mağazamızda yer almak için neler ürettiğini ve üretimlerinin arkasındaki fikri anlat.", sorular:[
      ["Markanı veya üretimini kısaca anlat","textarea","about",true],
      ["Üretim hikâyen nedir?","textarea","story",true],
      ["Ürün kategorileri","text","products",true,null,"Örn. seramik, takı, tekstil"],
      ["Ürün isimleri ve satış fiyatları","textarea","prices",true],
      ["Ürün fotoğrafları","file","photos",false],
      ["Ürün kataloğu / fiyat listesi","file","catalog",false],
      ["Online satış sitesi / mağaza bağlantısı","text","shop",false],
      ["Varsa fiziksel satış noktaların","textarea","locations",false],
    ]},
    atolye:{ ad:"Atölye", kisa:"Atölye", no:"02", baslik:"Birlikte üretelim mi?", metin:"Bir atölye fikrin veya paylaşmak istediğin bir becerin mi var? İçeriğini anlat, birlikte nasıl hayata geçirebileceğimize bakalım.", sorular:[
      ["Atölyenin adı","text","title",true],
      ["Atölyede neler yapılacak?","textarea","description",true],
      ["Bu atölyeyi neden paylaşmak istiyorsun?","textarea","motivation",true],
      ["Tahmini süre","text","duration",false,null,"Örn. 2 saat"],
      ["Katılımcı kapasitesi","number","capacity",false],
      ["Hedef kitle / yaş aralığı","text","audience",false],
      ["Gerekli malzemeler ve teknik ihtiyaçlar","textarea","needs",false],
      ["Önerilen kişi başı ücret (₺)","number","price",false],
      ["Önceki atölye fotoğrafları / portfolyo","file","examples",false],
      ["Tercih edilen tarih / dönem","text","date",false],
    ]},
    etkinlik:{ ad:"Etkinlik & İş Birliği", kisa:"Etkinlik", no:"03", baslik:"Bir etkinlik fikrin mi var?", metin:"Performans, konser, gösterim, topluluk buluşması ya da henüz adını koymadığın bir fikir… studio HATCH'te nasıl bir buluşma hayal ediyorsun?", sorular:[
      ["Etkinlik adı / çalışma başlığı","text","title",true],
      ["Etkinlik fikrini anlat","textarea","description",true],
      ["Kimleri bir araya getirmek istiyorsun?","textarea","audience",true],
      ["Etkinlik türü","select","type",false,["Performans","Konser","Gösterim","Topluluk buluşması","Söyleşi","Diğer"]],
      ["Tahmini katılımcı sayısı","number","capacity",false],
      ["Tarih / dönem önerisi","text","date",false],
      ["Mekân düzeni ve teknik ihtiyaçlar","textarea","needs",false],
      ["Biletli mi, ücretsiz mi?","select","ticket",false,["Henüz belli değil","Biletli","Ücretsiz"]],
      ["Etkinlik dosyası / sunum","file","attachment",false],
    ]},
  };
  let secili = "tasarimci";

  function alanHtml([etiket,tur,ad,zorunlu,secenek,ipucu]){
    const id="kt_"+ad, req=zorunlu?"required":"";
    const giris = tur==="textarea" ? `<textarea id="${id}" name="${ad}" rows="4" maxlength="4000" ${req}></textarea>`
      : tur==="select" ? `<select id="${id}" name="${ad}" ${req}><option value="">Seçiniz</option>${secenek.map(o=>`<option>${esc(o)}</option>`).join("")}</select>`
      : tur==="file" ? `<input id="${id}" name="${ad}" type="file" accept="image/*,.pdf,.xlsx,.xls,.doc,.docx,.ppt,.pptx" multiple ${req}>`
      : `<input id="${id}" name="${ad}" type="${tur}" ${tur==="number"?'min="0" max="1000000" inputmode="numeric"':'maxlength="300"'} ${tur==="email"?'autocomplete="email"':tur==="tel"?'autocomplete="tel"':""} ${req}>`;
    return `<div class="hu-f ${tur==="textarea"||tur==="file"?"wide":""}"><label for="${id}">${esc(etiket)}${zorunlu?' <i>*</i>':""}</label>${giris}${ipucu?`<small>${esc(ipucu)}</small>`:""}${tur==="file"?`<small>Dosya başına en fazla ${MAX_MB} MB</small>`:""}</div>`;
  }

  window.katilPage = function(){
    document.title = "Hatch'e Katıl · Başvuru · studio HATCH";
    const q=new URLSearchParams(location.search).get("tur"); if(q && TURLER[q]) secili=q;
    const huAcik = new Date() < HU_KAPANIS;
    document.getElementById("kt").innerHTML = `
    <section class="kt-hero"><div class="wrap">
      <div class="crumb"><a href="index.html#join">← studio HATCH</a></div>
      <span class="hu-eye mono" lang="en">studio HATCH · Open Call</span>
      <h1>Hatch'e<br>katıl.</h1>
      <p class="lead">Bir üretimin, atölye fikrin ya da hayata geçirmek istediğin bir etkinlik varsa tanışalım. studio HATCH farklı disiplinlerden üreticilere, atölye yürütücülerine ve topluluklara açık.</p>
      <div class="hero-cta"><a class="btn btn-white" href="#form">Başvuru formu <span class="arr">${ARR}</span></a></div>
    </div></section>

    <section class="sec"><div class="wrap">
      ${huAcik?`<a class="hu-join" href="hatch-up.html"><span class="mono">HATCH Up · 20 Aralık</span><b>Immersive Pop-Up başvuru formu</b><small>Yeme-İçme · Satış · Atölye — son başvuru 1 Aralık</small><span class="go">${ARR}</span></a>`:""}
      <div class="kt-cards">${Object.entries(TURLER).map(([k,t])=>`<article class="kt-card"><small class="mono">${t.no} / ${esc(t.kisa)}</small><h3>${esc(t.baslik)}</h3><p>${esc(t.metin)}</p><button class="btn btn-ink" type="button" data-tur="${k}">${esc(t.kisa)} başvurusu <span class="arr">${ARR}</span></button></article>`).join("")}</div>
    </div></section>

    <section class="hu-form-sec kt-form-sec" id="form"><div class="wrap"><div class="hu-form-in">
      <span class="hu-eye mono dark">Başvuru formu</span>
      <h2 class="h2">Tanışalım.</h2>
      <p class="sub">Başvuru türünü seç, detayları paylaş. Ekibimiz başvurunu inceleyip uygun iş birliği fırsatlarında seninle iletişime geçecek.</p>
      <div class="kt-tabs" role="tablist" aria-label="Başvuru türü">${Object.entries(TURLER).map(([k,t])=>`<button type="button" role="tab" data-tur="${k}">${esc(t.kisa)}</button>`).join("")}</div>
      <form id="ktForm" novalidate>
        <div class="hu-grid">${ORTAK.map(alanHtml).join("")}</div>
        ${Object.entries(TURLER).map(([k,t])=>`<div class="hu-grid kt-set" data-tur="${k}" hidden><div class="hu-note wide">${esc(t.ad)}</div>${t.sorular.map(alanHtml).join("")}</div>`).join("")}
        <label class="ck"><input type="checkbox" name="kvkk" required><span>Bilgilerimin başvurumun değerlendirilmesi ve benimle iletişime geçilmesi amacıyla işlenmesine ilişkin <a href="kvkk.html" target="_blank" rel="noopener">KVKK Aydınlatma Metni</a>'ni okudum. <i>*</i></span></label>
        <button class="btn btn-blue kt-btn" type="submit" id="ktGonder">Başvuruyu gönder <span class="arr">${ARR}</span></button>
        <p class="hu-status" id="ktDurum" role="status" aria-live="polite"></p>
        <p class="hu-mini">Bu bir ön başvuru formudur; başvuru, iş birliği veya etkinlik kabulü anlamına gelmez.</p>
      </form>
    </div></div></section>`;
    bagla();
  };

  function bagla(){
    const form=document.getElementById("ktForm"), durum=document.getElementById("ktDurum"), btn=document.getElementById("ktGonder");
    const yaz=(m,hata)=>{ durum.textContent=m; durum.classList.toggle("err",!!hata); };
    const goster=()=>{
      document.querySelectorAll(".kt-tabs [data-tur]").forEach(b=>{ const on=b.dataset.tur===secili; b.classList.toggle("on",on); b.setAttribute("aria-selected",String(on)); });
      form.querySelectorAll(".kt-set").forEach(s=>{ const on=s.dataset.tur===secili; s.hidden=!on; s.querySelectorAll("input,select,textarea").forEach(i=>i.disabled=!on); });
      form.classList.remove("tried"); yaz("");
    };
    document.querySelectorAll("button[data-tur]").forEach(b=>b.addEventListener("click",()=>{ secili=b.dataset.tur; goster(); if(!b.closest(".kt-tabs")) document.getElementById("form").scrollIntoView({behavior:"smooth"}); }));
    goster();

    form.addEventListener("submit",async e=>{
      e.preventDefault();
      if(!form.checkValidity()){
        const ilk=form.querySelector(":invalid:not(form)"); if(ilk){ ilk.scrollIntoView({behavior:"smooth",block:"center"}); setTimeout(()=>ilk.focus({preventScroll:true}),350); }
        form.classList.add("tried"); yaz("Lütfen yıldızlı (*) alanları doldur.",true); return;
      }
      const fd=new FormData(form), get=k=>String(fd.get(k)||"").trim(), tur=TURLER[secili];
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(get("email"))){ yaz("Geçerli bir e-posta adresi gir.",true); return; }
      const secilen=[...form.querySelectorAll(`.kt-set[data-tur="${secili}"] input[type=file]`)].flatMap(i=>[...i.files].map(f=>({ f, alan:tur.sorular.find(x=>x[2]===i.name)[0] })));
      if(secilen.length>MAX_DOSYA){ yaz(`En fazla ${MAX_DOSYA} dosya yükleyebilirsin.`,true); return; }
      const buyuk=secilen.find(x=>x.f.size>MAX_MB*1048576); if(buyuk){ yaz(`"${buyuk.f.name}" ${MAX_MB} MB'tan büyük.`,true); return; }
      btn.disabled=true;
      try{
        if(!window.supabase) throw new Error("Bağlantı kurulamadı.");
        const sb=window.supabase.createClient(SB_URL,SB_KEY,{ auth:{ persistSession:false, autoRefreshToken:false, detectSessionInUrl:false } });
        const klasor=(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2));
        const dosyalar=[];
        for(let i=0;i<secilen.length;i++){
          const { f, alan }=secilen[i]; yaz(`Dosya yükleniyor (${i+1}/${secilen.length})…`);
          const yol=`katilim/${klasor}/${i}-${f.name.normalize("NFKD").replace(/[^\w.\-]+/g,"_").slice(-80)}`;
          const { error }=await sb.storage.from(BUCKET).upload(yol,f,{ contentType:f.type||"application/octet-stream", upsert:false });
          if(error) throw new Error(`"${f.name}" yüklenemedi (${error.message}).`);
          dosyalar.push({ ad:f.name, alan, yol, url:sb.storage.from(BUCKET).getPublicUrl(yol).data.publicUrl, tur:f.type, boyut:f.size });
        }
        yaz("Gönderiliyor…");
        const alanlar=tur.sorular.filter(d=>d[1]!=="file"&&get(d[2])).map(d=>({ etiket:d[0], deger:get(d[2]) }));
        const { error }=await sb.rpc("katilim_basvuru_gonder",{ p_tur:tur.ad, p_ad:get("name"), p_email:get("email"), p_telefon:get("phone")||null, p_sosyal:get("social")||null, p_website:get("website")||null, p_alanlar:alanlar, p_dosyalar:dosyalar });
        if(error) throw new Error(error.message);
        document.querySelector(".kt-tabs").remove();
        form.outerHTML=`<div class="hu-done kt-done"><h3>Başvurun bize ulaştı.</h3><p>Teşekkürler, <b>${esc(get("name"))}</b>! Ekibimiz başvurunu inceleyip uygun iş birliği fırsatlarında <b>${esc(get("email"))}</b> üzerinden seninle iletişime geçecek.</p><a class="btn btn-ink" href="index.html">studio HATCH ana sayfa <span class="arr">${ARR}</span></a></div>`;
        document.getElementById("form").scrollIntoView({ behavior:"smooth" });
      }catch(err){
        yaz("Gönderilemedi: "+err.message+" Lütfen tekrar dene.",true); btn.disabled=false;
      }
    });
  }
})();
