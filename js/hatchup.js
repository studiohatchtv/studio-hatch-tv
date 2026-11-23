/* HATCH Up · Immersive Pop-Up — başvuru sayfası (hatch-up.html)
   Başvurular Flow → 📨 Başvurular'a "HATCH Up · Pop-Up" türüyle düşer (katilim_basvuru_gonder). */
(function(){
  const SB_URL = "https://uolmzykwvizhmycgymfi.supabase.co", SB_KEY = "sb_publishable_FIJ8mhgoXzlbhtlebcc_Bw_WLHYNFI0";
  const BUCKET = "is-dosyalari", MAX_MB = 15, MAX_FOTO = 8, TUR = "HATCH Up · Pop-Up";
  const KAPANIS = new Date("2026-12-02T00:00:00+03:00");      // 1 Aralık 23:59'dan sonra kapanır
  const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const ARR = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  // [etiket, tür, ad, zorunlu, seçenekler, ipucu]
  const ORTAK = [
    ["Marka / işletme adı","text","marka",true],
    ["Yetkili ad soyad","text","yetkili",true],
    ["Telefon","tel","telefon",true,null,"Sonuç ve hatırlatmalar için"],
    ["E-posta","email","email",true],
    ["Instagram hesabı","text","instagram",true,null,"@kullaniciadi"],
    ["Web sitesi / online mağaza","text","web",false],
    ["Şehir","text","sehir",true,null,"Üretim yaptığın / geleceğin şehir"],
  ];
  const ALANLAR = {
    yemeicme:{ ad:"Yeme-İçme", ikon:"🍪", ozet:"Tatlılar, atıştırmalıklar, kahve, içecekler, paketli gurme ürünler.", sorular:[
      ["Satacağın ürünler ve satış fiyatları","textarea","yi_urunler",true,null,"Örn. Zencefilli kurabiye kutusu (6'lı) – 280 ₺"],
      ["Ürünler etkinliğe nasıl gelecek?","select","yi_hazirlik",true,["Paketli / hazır gelir","Hazır gelir, yerinde servis edilir (porsiyonlama, bardak vb.)","Yerinde ısıtma veya hazırlama gerekir"]],
      ["Gıda işletme kayıt / onay belgen var mı?","select","yi_belge",true,["Evet","Başvuru aşamasında","Hayır"]],
      ["Ürünlerin içerik ve alerjen bilgisini verebiliyor musun?","select","yi_alerjen",true,["Evet, etiketlerde yazıyor","Evet, stantta bilgi kartı olacak","Hayır"]],
      ["Soğutma, ısıtma veya ek ekipman ihtiyacın","textarea","yi_ekipman",false,null,"Örn. küçük buzdolabı, su ısıtıcı, kahve makinesi"],
    ]},
    satis:{ ad:"Satış (Ürün)", ikon:"🛍️", ozet:"Takı, seramik, tekstil, dekorasyon, kırtasiye, kozmetik, illüstrasyon ve tasarım ürünleri.", sorular:[
      ["Ürün kategorin","select","st_kategori",true,["Takı & aksesuar","Giyim & tekstil","Ev & dekorasyon","Seramik & obje","Kırtasiye & baskı","Kozmetik & kişisel bakım","Sanat & illüstrasyon","Yılbaşı & hediyelik","Diğer"]],
      ["Ürünler kendi tasarımın / üretimin mi?","select","st_uretim",true,["Evet, tamamı","Kısmen","Hayır, seçtiğim ürünlerin satışını yapıyorum"]],
      ["Getireceğin ürünler ve fiyat aralığı","textarea","st_urunler",true,null,"Örn. Seramik kupalar 450–750 ₺, tabaklar 600–1.200 ₺"],
      ["Yaklaşık kaç çeşit ürün getireceksin?","number","st_cesit",true],
      ["Stantta masa dışında kullanacağın ekipman","textarea","st_ekipman",false,null,"Örn. küçük raf, askılık, ayna (120×60 cm masa ve örtü bizden)"],
    ]},
    atolye:{ ad:"Atölye", ikon:"✂️", ozet:"Gün içinde seanslar hâlinde yapılan, ziyaretçilerin katıldığı kısa atölyeler.", sorular:[
      ["Atölyenin adı","text","at_ad",true],
      ["Atölyede neler yapılacak?","textarea","at_icerik",true],
      ["Bir seansın süresi (dakika)","number","at_sure",true],
      ["Seans başına kontenjan (kişi)","number","at_kontenjan",true],
      ["Gün içinde kaç seans yapabilirsin?","number","at_seans",true],
      ["Kişi başı ücret (₺)","number","at_ucret",true],
      ["Malzemeler ücrete dahil mi?","select","at_malzeme",true,["Evet, tüm malzeme dahil","Kısmen","Hayır"]],
      ["Yaş grubu","select","at_yas",true,["Herkes","Yetişkin (18+)","Çocuk (7–12)","Aile (çocuk + ebeveyn)"]],
      ["Masa dışında alan / ekipman ihtiyacın","textarea","at_ihtiyac",false,null,"Örn. katılımcılar için sandalye, su, priz"],
    ]},
  };
  const SON = [
    ["Markanı ve getireceklerini kısaca anlat","textarea","hakkinda",true,null,"Seni diğerlerinden ayıran ne? Yılbaşına özel bir ürünün / konseptin var mı?"],
    ["Ürün / atölye fotoğrafları","file","foto",true,null,`En az 1, en fazla ${MAX_FOTO} fotoğraf · her biri en fazla ${MAX_MB} MB`],
    ["Elektrik ihtiyacın","select","elektrik",true,["Yok","Var – telefon / POS / ışık için priz yeterli","Var – ısıtıcı, kahve makinesi gibi yüksek güçlü cihaz"]],
    ["Stantta kaç kişi olacaksınız?","select","kisi",true,["1","2","3 veya daha fazla"]],
    ["Daha önce pop-up / market etkinliğine katıldın mı?","text","deneyim",false,null,"Hangi etkinlikler? (varsa)"],
    ["Bizi nereden duydun?","select","kaynak",false,["Instagram","Arkadaş / tavsiye","studio HATCH ziyareti","Web sitesi","Diğer"]],
  ];

  const SSS = [
    ["HATCH Up nedir?","HATCH Up, studio HATCH'in yerel üreticileri, tasarımcıları ve atölye yürütücülerini ziyaretçilerle buluşturduğu pop-up buluşmasıdır. 20 Aralık'ta bir günlüğüne, dijital sanatla çevrili immersive alanımızda yılbaşı öncesi bir pop-up kuruyoruz."],
    ["Katılım ücreti ne kadar?","1 stant bedeli 5.000 ₺ + KDV'dir. Başvurmak ücretsizdir; ödeme yalnızca seçilen katılımcılardan, sonuç duyurusunun ardından istenir."],
    ["Stantta neler sağlanıyor?","Her stanta 120×60 cm 1 masa ve masa örtüsü veriyoruz. Masa dışında ihtiyacın olan ekipmanı (raf, askılık, sandalye, elektrik vb.) formda belirt; imkânlar ölçüsünde planlıyoruz."],
    ["Katılımcılar nasıl seçiliyor?","Stant sayısı sınırlı olduğu için katılımcıları başvurular arasından seçiyoruz. Ürünlerin özgünlüğü ve kalitesi, gönderdiğin fotoğraflar, etkinliğin konseptine uyum ve alanlar arasında çeşitlilik (aynı kategoriden çok fazla stant olmaması) değerlendirmede öne çıkar."],
    ["Son başvuru ve sonuç tarihi ne zaman?","Son başvuru 1 Aralık Salı 23:59. Sonuçları 3 Aralık Perşembe günü e-posta ve telefonla bildiriyoruz; seçilmeyen başvurulara da dönüş yapıyoruz."],
    ["Seçilirsem ödemeyi nasıl ve ne zaman yapacağım?","Seçilen katılımcılara 3 Aralık'ta ödeme bilgileri ve katılım rehberi gönderilir. Belirtilen süre içinde ödemesi tamamlanmayan stantlar yedek listedeki başvurulara verilir."],
    ["Satışlardan komisyon alınıyor mu?","Hayır. Satışlarından komisyon almıyoruz; stant bedeli dışında satışlarından herhangi bir pay ödemezsin."],
    ["Satışları kim yapıyor, ödeme nasıl alınıyor?","Satışlarını kendin yaparsın. Kart, nakit veya havale; hangi ödeme yöntemlerini kabul edeceksen (POS cihazı, QR, IBAN vb.) yanında getirmelisin."],
    ["Kurulum ve etkinlik saatleri nedir?","Kurulum, etkinlik ve toplama saatleri seçilen katılımcılara gönderilen katılım rehberinde yer alır. Stantların ziyaretçiler gelmeden önce hazır olması gerekir."],
    ["Elektrik var mı?","Alanda sınırlı sayıda priz var. Telefon, POS ve ışık için priz ihtiyacını, yüksek güçlü cihaz (ısıtıcı, kahve makinesi vb.) kullanacaksan bunu formda mutlaka belirt; yüksek güçlü cihazlar önceden onaylanmalıdır."],
    ["Yeme-içme stantları için kurallar neler?","Ürünlerin gıda mevzuatına uygun üretilmiş ve hijyenik paketlenmiş olması gerekir; içerik ve alerjen bilgisini ziyaretçiye verebilmelisin. Immersive alanda açık ateş, kızartma ve yoğun duman veya koku oluşturan pişirme yapılamaz."],
    ["Atölyeler nasıl işliyor?","Atölyeler gün içinde seanslar hâlinde yapılır. Seans saatleri, kontenjan ve katılımcı kaydı seçimden sonra birlikte planlanır; kişi başı ücreti sen belirlersin."],
    ["Stantı başka bir markayla paylaşabilir miyim?","Evet. Ortak stant açmak istiyorsanız başvuruyu tek marka adına yapıp diğer markayı “Markanı ve getireceklerini anlat” alanında belirtin. Bir stant için tek bedel ödenir; iki marka da değerlendirmeye dahil edilir."],
    ["Seçildikten sonra katılamazsam ne olur?","Mümkün olan en kısa sürede bize haber ver; yerin yedek listedeki bir başvuruya verilir. İptal ve iade koşulları katılım rehberinde yer alır."],
    ["Bilgilerim nasıl kullanılıyor?","Başvuru bilgilerin yalnızca başvurunun değerlendirilmesi ve seninle iletişim kurulması için kullanılır. Ayrıntılar KVKK Aydınlatma Metni'nde."],
  ];

  const fmtGun = "20 Aralık Pazar";
  function alanHtml([etiket,tur,ad,zorunlu,secenek,ipucu]){
    const id="hu_"+ad, req=zorunlu?"required":"";
    const giris = tur==="textarea" ? `<textarea id="${id}" name="${ad}" rows="4" maxlength="2000" ${req}></textarea>`
      : tur==="select" ? `<select id="${id}" name="${ad}" ${req}><option value="">Seçiniz</option>${secenek.map(o=>`<option>${esc(o)}</option>`).join("")}</select>`
      : tur==="file" ? `<input id="${id}" name="${ad}" type="file" accept="image/jpeg,image/png,image/webp,image/heic" multiple ${req}>`
      : `<input id="${id}" name="${ad}" type="${tur}" ${tur==="number"?'min="0" max="100000" inputmode="numeric"':'maxlength="200"'} ${tur==="email"?'autocomplete="email"':tur==="tel"?'autocomplete="tel"':""} ${req}>`;
    return `<div class="hu-f ${tur==="textarea"||tur==="file"?"wide":""}"><label for="${id}">${esc(etiket)}${zorunlu?' <i>*</i>':""}</label>${giris}${ipucu?`<small>${esc(ipucu)}</small>`:""}</div>`;
  }

  window.hatchupPage = function(){
    const acik = new Date() < KAPANIS;
    document.title = "HATCH Up Başvuru Formu · Immersive Pop-Up · studio HATCH";
    const el=document.getElementById("hu");
    el.innerHTML = `
    <section class="hu-hero"><div class="wrap">
      <div class="crumb"><a href="index.html#join">← Hatch'e katıl</a></div>
      <span class="hu-eye mono">HATCH Up · Open Call</span>
      <h1>Immersive<br>Pop-Up</h1>
      <p class="lead">${fmtGun}, immersive alanımız bir günlüğüne üreticilere açılıyor. Yılbaşı öncesi, dijital sanatla çevrili bir alanda ürünlerini, lezzetlerini ve atölyelerini ziyaretçilerle buluştur.</p>
      <div class="hero-cta">${acik?`<a class="btn btn-white" href="#form">Başvuru formu <span class="arr">${ARR}</span></a>`:`<span class="hu-kapali">Başvurular kapandı · Sonuçlar 3 Aralık'ta</span>`}<a class="btn hu-ghost" href="#sss">Sıkça sorulanlar</a></div>
      <dl class="hu-facts">
        <div><dt>Etkinlik</dt><dd>${fmtGun}</dd></div>
        <div><dt>Son başvuru</dt><dd>1 Aralık · 23:59</dd></div>
        <div><dt>Sonuçlar</dt><dd>3 Aralık</dd></div>
      </dl>
    </div></section>

    <section class="sec hu-sec"><div class="wrap">
      <div class="hu-two">
        <div><span class="hu-eye mono dark">Nasıl işliyor?</span><h2 class="h2">Başvur, seçilirsen<br>masan hazır.</h2>
          <p class="sub">Stant sayısı sınırlı; katılımcıları başvuru ile seçiyoruz. Her stanta <b>120×60 cm 1 masa ve masa örtüsü</b> bizden.</p></div>
        <ol class="hu-steps">
          <li><b>Başvur</b><span>Formu 1 Aralık 23:59'a kadar doldur, ürün ya da atölye fotoğraflarını ekle.</span></li>
          <li><b>Seçim</b><span>Başvuruları ürün kalitesi, konsepte uyum ve çeşitliliğe göre değerlendiriyoruz.</span></li>
          <li><b>Duyuru</b><span>3 Aralık'ta sonuçları e-posta ve telefonla bildiriyoruz.</span></li>
          <li><b>Onay</b><span>Seçilen katılımcılar stant bedelini öder, katılım rehberini alır.</span></li>
          <li><b>20 Aralık</b><span>Immersive alanda pop-up günü.</span></li>
        </ol>
      </div>
      <div class="hu-cats">${Object.values(ALANLAR).map(a=>`<div class="hu-cat"><span class="ic" aria-hidden="true">${a.ikon}</span><h3>${esc(a.ad)}</h3><p>${esc(a.ozet)}</p></div>`).join("")}</div>
    </div></section>

    <section class="hu-form-sec" id="form"><div class="wrap"><div class="hu-form-in">
      <span class="hu-eye mono dark">HATCH Up Başvuru Formu</span>
      <h2 class="h2">Tanışalım.</h2>
      ${acik ? `<p class="sub">Yıldızlı (*) alanlar zorunlu. Katılım alanını seçince o alana özel sorular açılır. Formu doldurmak yaklaşık 5 dakika sürer.</p>
      <form id="huForm" novalidate>
        <fieldset><legend>1 · İletişim</legend><div class="hu-grid">${ORTAK.map(alanHtml).join("")}</div></fieldset>
        <fieldset><legend>2 · Katılım alanı <i>*</i></legend>
          <div class="hu-pick" role="radiogroup">${Object.entries(ALANLAR).map(([k,a])=>`<label class="hu-opt"><input type="radio" name="alan" value="${k}" required><span><em aria-hidden="true">${a.ikon}</em><b>${esc(a.ad)}</b><small>${esc(a.ozet)}</small></span></label>`).join("")}</div>
          ${Object.entries(ALANLAR).map(([k,a])=>`<div class="hu-grid hu-alan" data-alan="${k}" hidden><div class="hu-note wide">${esc(a.ad)} için sorular</div>${a.sorular.map(alanHtml).join("")}</div>`).join("")}
        </fieldset>
        <fieldset><legend>3 · Markan ve stantın</legend><div class="hu-grid">${SON.map(alanHtml).join("")}<div class="hu-thumbs wide" id="huThumbs"></div></div></fieldset>
        <label class="ck"><input type="checkbox" name="kvkk" required><span>Başvuru bilgilerimin değerlendirme ve iletişim amacıyla işlenmesine ilişkin <a href="kvkk.html" target="_blank" rel="noopener">KVKK Aydınlatma Metni</a>'ni okudum. <i>*</i></span></label>
        <label class="ck"><input type="checkbox" name="kosul" required><span>Seçilmem durumunda 5.000 ₺ + KDV stant bedelini belirtilen sürede ödemem gerektiğini ve bu sayfadaki katılım koşullarını okudum. <i>*</i></span></label>
        <button class="btn hu-btn" type="submit" id="huGonder">Başvuruyu gönder <span class="arr">${ARR}</span></button>
        <p class="hu-status" id="huDurum" role="status" aria-live="polite"></p>
        <p class="hu-mini">Bu bir ön başvurudur; katılım, seçim sonucunun ve ödemenin ardından kesinleşir.</p>
      </form>` : `<div class="hu-done"><h3>Başvurular kapandı.</h3><p>İlgin için teşekkürler! Sonuçları 3 Aralık'ta başvuru sahiplerine bildiriyoruz. Gelecek HATCH Up duyuruları için bültene kaydolabilir ya da Instagram'dan bizi takip edebilirsin.</p><a class="btn btn-ink" href="index.html#visit">Bültene kaydol <span class="arr">${ARR}</span></a></div>`}
    </div></div></section>

    <section class="sec" id="sss"><div class="wrap hu-faq">
      <div><span class="hu-eye mono dark">SSS</span><h2 class="h2">Sıkça sorulanlar</h2><p class="sub">Başka bir sorun varsa <a href="mailto:${esc((window.HATCH_SETTINGS||{}).eposta||"hello@studiohatch.tv")}">e-posta</a> veya Instagram'dan yazabilirsin.</p></div>
      <div class="faqs">${SSS.map(([q,a])=>`<details class="faq"><summary>${esc(q)}<i aria-hidden="true"></i></summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div></section>`;

    // Google için SSS yapılandırılmış verisi
    const ld=document.createElement("script"); ld.type="application/ld+json";
    ld.textContent=JSON.stringify({ "@context":"https://schema.org", "@type":"FAQPage", mainEntity:SSS.map(([q,a])=>({ "@type":"Question", name:q, acceptedAnswer:{ "@type":"Answer", text:a } })) });
    document.head.appendChild(ld);
    if(acik) formuBagla();
  };

  function formuBagla(){
    const form=document.getElementById("huForm"), durum=document.getElementById("huDurum"), btn=document.getElementById("huGonder");
    const yaz=(m,hata)=>{ durum.textContent=m; durum.classList.toggle("err",!!hata); };
    // alan seçimi: yalnızca seçili alanın soruları açık ve zorunlu
    const alanGoster=()=>{ const sec=(form.querySelector('input[name=alan]:checked')||{}).value;
      form.querySelectorAll(".hu-alan").forEach(b=>{ const on=b.dataset.alan===sec; b.hidden=!on; b.querySelectorAll("input,select,textarea").forEach(i=>i.disabled=!on); }); };
    form.querySelectorAll('input[name=alan]').forEach(r=>r.addEventListener("change",alanGoster)); alanGoster();
    // fotoğraf önizleme
    const foto=form.querySelector('input[name=foto]'), th=document.getElementById("huThumbs");
    foto.addEventListener("change",()=>{ th.innerHTML=[...foto.files].slice(0,MAX_FOTO).map(f=>`<img src="${URL.createObjectURL(f)}" alt="">`).join(""); });

    form.addEventListener("submit",async e=>{
      e.preventDefault();
      if(new Date()>=KAPANIS){ yaz("Başvurular kapandı. Sonuçlar 3 Aralık'ta açıklanacak.",true); return; }
      if(!form.checkValidity()){
        const ilk=form.querySelector(":invalid:not(fieldset)"); if(ilk){ ilk.scrollIntoView({behavior:"smooth",block:"center"}); setTimeout(()=>ilk.focus({preventScroll:true}),350); }
        form.classList.add("tried"); yaz("Lütfen yıldızlı (*) alanları doldur.",true); return;
      }
      const fd=new FormData(form), get=k=>String(fd.get(k)||"").trim();
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(get("email"))){ yaz("Geçerli bir e-posta adresi gir.",true); return; }
      if(get("telefon").replace(/\D/g,"").length<10){ yaz("Telefon numarasını alan koduyla gir (ör. 0532 000 00 00).",true); return; }
      const dosyalar=[...foto.files];
      if(dosyalar.length>MAX_FOTO){ yaz(`En fazla ${MAX_FOTO} fotoğraf ekleyebilirsin.`,true); return; }
      const buyuk=dosyalar.find(f=>f.size>MAX_MB*1048576); if(buyuk){ yaz(`"${buyuk.name}" ${MAX_MB} MB'tan büyük.`,true); return; }
      const alanKey=get("alan"), alan=ALANLAR[alanKey];
      btn.disabled=true;
      try{
        if(!window.supabase) throw new Error("Bağlantı kurulamadı.");
        const sb=window.supabase.createClient(SB_URL,SB_KEY,{ auth:{ persistSession:false, autoRefreshToken:false, detectSessionInUrl:false } });
        const klasor=(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2));
        const yuklenen=[];
        for(let i=0;i<dosyalar.length;i++){
          const f=dosyalar[i]; yaz(`Fotoğraflar yükleniyor (${i+1}/${dosyalar.length})…`);
          const yol=`katilim/hatchup/${klasor}/${i}-${f.name.normalize("NFKD").replace(/[^\w.\-]+/g,"_").slice(-80)}`;
          const { error }=await sb.storage.from(BUCKET).upload(yol,f,{ contentType:f.type||"application/octet-stream", upsert:false });
          if(error) throw new Error(`"${f.name}" yüklenemedi (${error.message}).`);
          yuklenen.push({ ad:f.name, alan:"Ürün / atölye fotoğrafları", yol, url:sb.storage.from(BUCKET).getPublicUrl(yol).data.publicUrl, tur:f.type, boyut:f.size });
        }
        yaz("Gönderiliyor…");
        const satir=d=>({ etiket:d[0], deger:get(d[2]) });
        const alanlar=[ { etiket:"Etkinlik", deger:"HATCH Up · Immersive Pop-Up · 20 Aralık 2026" }, { etiket:"Katılım alanı", deger:alan.ad },
          satir(ORTAK[1]), satir(ORTAK[6]), ...alan.sorular.map(satir), ...SON.filter(d=>d[1]!=="file").map(satir),
          { etiket:"Onay", deger:"KVKK metnini okudu · seçilirse 5.000 ₺ + KDV stant bedelini ödemeyi kabul etti" } ].filter(x=>x.deger);
        const { error }=await sb.rpc("katilim_basvuru_gonder",{ p_tur:TUR, p_ad:get("marka"), p_email:get("email"), p_telefon:get("telefon"), p_sosyal:get("instagram"), p_website:get("web")||null, p_alanlar:alanlar, p_dosyalar:yuklenen });
        if(error) throw new Error(error.message);
        form.outerHTML=`<div class="hu-done"><h3>Başvurun bize ulaştı 🎄</h3><p>Teşekkürler, <b>${esc(get("marka"))}</b>! Başvuruları 1 Aralık'tan sonra değerlendirip <b>3 Aralık</b>'ta sonuçları <b>${esc(get("email"))}</b> adresine ve telefonla bildireceğiz.</p><a class="btn btn-ink" href="index.html">studio HATCH ana sayfa <span class="arr">${ARR}</span></a></div>`;
        document.getElementById("form").scrollIntoView({ behavior:"smooth" });
      }catch(err){
        yaz("Gönderilemedi: "+err.message+" Lütfen tekrar dene; sorun sürerse bize e-postayla yaz.",true);
        btn.disabled=false;
      }
    });
  }
})();
