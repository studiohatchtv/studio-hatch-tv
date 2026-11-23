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
  window.hatchLoad = async function(){
    if(window.HATCH_DEMO_MODE){ window.HATCH_SETTINGS={}; return window.HATCH_DEMO; }
    const [ev, ay] = await Promise.allSettled([
      fetch(URL_+"/rest/v1/rpc/site_etkinlikler", { method:"POST", headers:H, body:"{}" }).then(r=>r.ok?r.json():Promise.reject(r.status)),
      fetch(URL_+"/rest/v1/site_ayarlar?select=anahtar,deger", { headers:H }).then(r=>r.ok?r.json():Promise.reject(r.status)),
    ]);
    window.HATCH_SETTINGS = ay.status==="fulfilled" ? Object.fromEntries(ay.value.map(x=>[x.anahtar,x.deger||""])) : {};
    window.HATCH_LOAD_ERROR = ev.status!=="fulfilled";
    return ev.status==="fulfilled" ? ev.value.map(map) : [];
  };
  window.hatchNewsletter = async function(email, metin){
    const r = await fetch(URL_+"/rest/v1/rpc/site_bulten_kaydet", { method:"POST", headers:H, body:JSON.stringify({ p_email:email, p_izin_metni:metin }) });
    if(!r.ok) throw new Error((await r.json().catch(()=>({}))).message || "Hata");
  };
})();
