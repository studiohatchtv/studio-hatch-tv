/* Veri: Flow (Supabase) → site. Anahtar "publishable" türündedir; sadece herkese açık fonksiyonları çağırabilir.
   ?demo=1 → tasarımı görmek için örnek veri. */
(function(){
  const URL_ = "https://uolmzykwvizhmycgymfi.supabase.co";
  const KEY = "sb_publishable_FIJ8mhgoXzlbhtlebcc_Bw_WLHYNFI0";
  const H = { apikey:KEY, Authorization:"Bearer "+KEY, "Content-Type":"application/json" };
  const FALLBACK = { culture:"assets/immersive.jpg", wellness:"assets/wellness.jpg", nocturne:"assets/immersive.jpg" };
  const hm = t => t ? String(t).slice(0,5) : "";
  const paras = s => String(s||"").split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  const lines = s => String(s||"").split(/\n/).map(x=>x.replace(/^[-•*]\s*/,"").trim()).filter(Boolean);
  const safeUrl = u => /^https:\/\//i.test(u||"") ? u : "";
  const gorsel = u => String(u||"").startsWith(URL_+"/storage/v1/object/public/site-gorselleri/") ? u : "";
  window.HATCH_DEMO_MODE = new URLSearchParams(location.search).has("demo");
  function map(r){
    const times = (r.seanslar && r.seanslar.length) ? r.seanslar : (r.baslangic_saat ? [hm(r.baslangic_saat)] : []);
    const multi = r.bitis_tarih && r.bitis_tarih > r.tarih;
    return { id:r.id, pillar:["culture","wellness","nocturne"].includes(r.program)?r.program:"culture", kind: multi ? "run" : "event", featured:!!r.one_cikan,
      tur:{tr:r.tur||"", en:r.tur_en||r.tur||""}, title:{tr:r.baslik, en:r.baslik_en||r.baslik},
      short:{tr:r.ozet||"", en:r.ozet_en||r.ozet||""}, desc:{tr:paras(r.aciklama), en:paras(r.aciklama_en||r.aciklama)},
      know:{tr:lines(r.bilgiler), en:lines(r.bilgiler_en||r.bilgiler)},
      date:r.tarih, end:multi?r.bitis_tarih:null, times, endTime: times.length===1 && r.bitis_saat ? hm(r.bitis_saat) : "",
      durationMin:r.sure_dk||null, price:{tr:r.fiyat||"", en:r.fiyat_en||r.fiyat||""}, ticketUrl:safeUrl(r.bilet_url),
      image:gorsel(r.gorsel)||FALLBACK[r.program]||FALLBACK.culture, blend:false };
  }
  // SSS: bloklar boş satırla ayrılır; ilk satır soru, kalanı cevap
  const faq = s => String(s||"").split(/\n\s*\n/).map(b=>b.trim().split("\n")).filter(b=>b[0]&&b[0].trim())
    .map(([q,...a])=>({ q:q.trim(), a:a.join(" ").trim() })).filter(x=>x.a);
  window.hatchFaq = faq;
  function mapShow(g){
    const two = (a,b,f=x=>x||"") => ({ tr:f(a), en:f(b||a) });
    return { id:g.id, featured:!!g.one_cikan, title:two(g.baslik,g.baslik_en), sub:two(g.alt_baslik,g.alt_baslik_en),
      short:two(g.ozet,g.ozet_en), desc:two(g.aciklama,g.aciklama_en,paras), is:two(g.nedir,g.nedir_en,lines), isnt:two(g.ne_degildir,g.ne_degildir_en,lines),
      faq:two(g.sss,g.sss_en,faq), start:g.baslangic||null, end:g.bitis||null, times:g.seanslar||[], durationMin:g.sure_dk||null,
      age:two(g.yas,g.yas_en), price:two(g.fiyat,g.fiyat_en), ticketUrl:safeUrl(g.bilet_url), image:gorsel(g.gorsel)||"assets/immersive.jpg", blend:false };
  }
  window.hatchLoad = async function(){
    if(window.HATCH_DEMO_MODE){ window.HATCH_SETTINGS=window.HATCH_DEMO_SETTINGS||{}; window.HATCH_SHOWS=window.HATCH_DEMO_SHOWS||[]; return window.HATCH_DEMO; }
    const [ev, ay, gs] = await Promise.allSettled([
      fetch(URL_+"/rest/v1/rpc/site_etkinlikler", { method:"POST", headers:H, body:"{}" }).then(r=>r.ok?r.json():Promise.reject(r.status)),
      fetch(URL_+"/rest/v1/site_ayarlar?select=anahtar,deger", { headers:H }).then(r=>r.ok?r.json():Promise.reject(r.status)),
      fetch(URL_+"/rest/v1/gosterimler?select=*&order=sira.asc,baslangic.asc", { headers:H }).then(r=>r.ok?r.json():Promise.reject(r.status)),
    ]);
    window.HATCH_SHOWS = gs.status==="fulfilled" ? gs.value.map(mapShow) : [];
    window.HATCH_SETTINGS = ay.status==="fulfilled" ? Object.fromEntries(ay.value.map(x=>[x.anahtar,x.deger||""])) : {};
    window.HATCH_LOAD_ERROR = ev.status!=="fulfilled";
    return ev.status==="fulfilled" ? ev.value.map(map) : [];
  };
  window.hatchNewsletter = async function(email, metin){
    const r = await fetch(URL_+"/rest/v1/rpc/site_bulten_kaydet", { method:"POST", headers:H, body:JSON.stringify({ p_email:email, p_izin_metni:metin }) });
    if(!r.ok) throw new Error((await r.json().catch(()=>({}))).message || "Hata");
  };
})();
