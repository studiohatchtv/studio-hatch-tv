/* PROTOTİP VERİSİ — canlıda bu liste Flow'daki "Sitede yayınla" işaretli etkinliklerden gelecek.
   Frida gösterimi basın bülteninden (gerçek); diğerleri tasarımı görmek için örnek. */
(function(){
  const gun = n => { const d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+n); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
  const PASSO = "https://www.passo.com.tr/";
  window.HATCH_DEMO = [
    { id:"seramik", pillar:"culture", tur:{tr:"Atölye",en:"Workshop"},
      title:{tr:"Toprakla Tanışma: Seramik Atölyesi",en:"Meet the Clay: Ceramics Workshop"},
      short:{tr:"El ile şekillendirme tekniklerini öğrenip kendi kâseni yapıyorsun. Malzemeler bizden.",
             en:"Learn hand-building techniques and make your own bowl. All materials included."},
      desc:{tr:["Deneyim gerekmez. Atölye sonunda yaptığın parça fırınlanıp iki hafta içinde teslim edilir."],en:["No experience needed. Your piece is fired and ready for pickup within two weeks."]},
      know:{tr:["Kontenjan 12 kişi.","Önlük ve tüm malzemeler dahil."],en:["Limited to 12 people.","Apron and all materials included."]},
      date:gun(3), times:["14:00"], endTime:"17:00", price:{tr:"Passo'da",en:"On Passo"}, ticketUrl:PASSO, image:"assets/shop.jpg" },

    { id:"gunbatimi", pillar:"wellness", tur:{tr:"Wellness",en:"Wellness"},
      title:{tr:"Gün Batımında Nefes ve Ses Banyosu",en:"Sunset Breath & Sound Bath"},
      short:{tr:"Gün batımı görüntüleri eşliğinde rehberli nefes çalışması ve ses banyosu.",
             en:"Guided breathwork and a sound bath, surrounded by sunset imagery."},
      desc:{tr:["Günün yorgunluğunu dijital gün batımının içinde bırak. Mat ve battaniye bizden."],en:["Leave the day behind inside a digital sunset. Mats and blankets provided."]},
      know:{tr:["Rahat kıyafet önerilir.","Kontenjan 20 kişi."],en:["Wear comfortable clothes.","Limited to 20 people."]},
      date:gun(2), times:["18:30"], endTime:"19:45", price:{tr:"Passo'da",en:"On Passo"}, ticketUrl:PASSO, image:"assets/wellness.jpg" },

    { id:"nocturne-ambient", pillar:"nocturne", tur:{tr:"Gece / Konser",en:"Night / Live"},
      title:{tr:"Ambient Gece",en:"Ambient Night"},
      short:{tr:"Canlı ambient set, saran görüntüler ve geç saatte açık lounge.",
             en:"A live ambient set, immersive visuals and the lounge open late."},
      desc:{tr:["Hatch geceleri başka bir yere dönüşüyor."],en:["At night, Hatch turns into somewhere else."]},
      know:{tr:["18 yaş ve üzeri.","Lounge 01:00'e kadar açık."],en:["18+ only.","Lounge open until 1am."]},
      date:gun(4), times:["21:00"], endTime:"23:30", price:{tr:"Passo'da",en:"On Passo"}, ticketUrl:PASSO, image:"assets/immersive.jpg" },

    { id:"makers", pillar:"culture", tur:{tr:"Buluşma",en:"Meet-up"},
      title:{tr:"Local Makers: Tasarımcılarla Tanış",en:"Local Makers: Meet the Designers"},
      short:{tr:"Mağazamızdaki tasarımcılar üretim hikâyelerini anlatıyor. Ücretsiz.",
             en:"Designers from our store share the stories behind their work. Free entry."},
      desc:{tr:["Bir ürün, bir hikâye. Kahveni al, üreticilerle aynı masaya otur."],en:["One product, one story. Grab a coffee and sit at the same table as the makers."]},
      know:{tr:["Ücretsiz, kayıt gerekmez."],en:["Free, no registration needed."]},
      date:gun(6), times:["16:00"], endTime:"18:00", price:{tr:"Ücretsiz",en:"Free"}, ticketUrl:"", image:"assets/lounge.jpg" },

    { id:"sabah-yoga", pillar:"wellness", tur:{tr:"Wellness",en:"Wellness"},
      title:{tr:"Orman Sabahı: Yoga",en:"Forest Morning: Yoga"},
      short:{tr:"Dijital orman içinde, her seviyeye uygun sabah akışı.",
             en:"An all-levels morning flow inside a digital forest."},
      desc:{tr:["Haftaya sakin bir başlangıç."],en:["A calm start to the week."]},
      know:{tr:["Mat bizden."],en:["Mats provided."]},
      date:gun(8), times:["09:30"], endTime:"10:45", price:{tr:"Passo'da",en:"On Passo"}, ticketUrl:PASSO, image:"assets/wellness.jpg" },

    { id:"nocturne-frida", pillar:"nocturne", tur:{tr:"Gece / Gösterim",en:"Night / Show"},
      title:{tr:"Frida Gece Yarısı",en:"Frida After Dark"},
      short:{tr:"Frida gösteriminin canlı müzikle yeniden yorumlanmış gece seansı.",
             en:"A late-night session of the Frida show, reimagined with live music."},
      desc:{tr:["Tek gecelik özel seans."],en:["One night only."]},
      know:{tr:["18 yaş ve üzeri."],en:["18+ only."]},
      date:gun(11), times:["20:30","22:00"], durationMin:50, price:{tr:"Passo'da",en:"On Passo"}, ticketUrl:PASSO, image:"assets/frida.jpg", blend:true },

    { id:"cocuk", pillar:"culture", tur:{tr:"Atölye · Çocuk",en:"Workshop · Kids"},
      title:{tr:"Küçük Frida'lar: Otoportre Atölyesi",en:"Little Fridas: Self-Portrait Workshop"},
      short:{tr:"7–12 yaş için renk ve kolajla otoportre. Gösterim biletiyle birlikte.",
             en:"Self-portraits with colour and collage for ages 7–12. Includes a show ticket."},
      desc:{tr:["Gösterimin ardından çocuklar kendi hikâyelerini resmediyor."],en:["After the show, kids paint their own stories."]},
      know:{tr:["7–12 yaş.","Veli eşliği gerekmez."],en:["Ages 7–12.","Parents may drop off."]},
      date:gun(5), times:["11:00"], endTime:"12:30", price:{tr:"Passo'da",en:"On Passo"}, ticketUrl:PASSO, image:"assets/frida.jpg", blend:true },
  ];

  // Immersive gösterimler — Frida bilgileri basın bülteninden; [Ekip] ile başlayan cevaplar taslak, ekip dolduracak
  const ay = (y,m,d) => y+"-"+String(m).padStart(2,"0")+"-"+String(d).padStart(2,"0");
  window.HATCH_DEMO_SHOWS = [
    { id:"frida", featured:true,
      title:{tr:"Frida Kahlo",en:"Frida Kahlo"}, sub:{tr:"Kökler ve İzler",en:"Roots and Traces"},
      short:{tr:"Sanatçının yaşamına, kimliğine ve sanatına uzanan kırk dakikalık, dört bir yanınızı saran bir deneyim.",
             en:"A forty-minute, fully immersive journey into the artist's life, identity and work."},
      desc:{tr:["studioHATCH'in ilk dijital gösterimi “Kökler ve İzler: Frida Kahlo”, ziyaretçileri sanatçının yaşamına, kimliğine ve sanatına uzanan kırk dakikalık bir deneyime davet ediyor.",
                "Frida'nın kendini ifade etme biçiminden ve Meksika'yla kurduğu bağdan beslenen anlatı, izleyiciyi dört bir yandan çevreleyen görüntülerle farklı bir izleme deneyimi sunuyor. Tanıdığımız yüzün ardındaki hayatı keşfetmeye çağıran gösterim, gün içinde farklı seanslarla izleyiciyle buluşuyor."],
            en:["“Roots and Traces: Frida Kahlo”, the first digital show at studioHATCH, invites visitors on a forty-minute journey through the artist's life, identity and art.",
                "Drawing on the way Frida expressed herself and her bond with Mexico, the story surrounds you with images on every side. Shows run in several sessions throughout the day."]},
      is:{tr:["Görüntülerin dört bir yanınızı sardığı, yaklaşık 40 dakikalık dijital bir gösterim","Frida'nın yaşamını, kimliğini ve sanatını anlatan bir hikâye","Gün içinde belirli seans saatlerinde başlayan bir deneyim"],
          en:["A digital show of about 40 minutes, with images all around you","A story of Frida's life, identity and art","An experience that starts at set session times during the day"]},
      isnt:{tr:["Orijinal tabloların sergilendiği bir müze sergisi değil","Gözlük ya da kulaklık takılan bir sanal gerçeklik (VR) deneyimi değil","İstediğin an girip çıktığın bir sergi değil; seansla başlar"],
            en:["Not a museum exhibition of original paintings","Not a virtual reality (VR) experience with a headset","Not a walk-in gallery; it starts with each session"]},
      faq:{tr:[{q:"Gösterim ne kadar sürüyor?",a:"Yaklaşık 40 dakika."},{q:"Biletleri nereden alabilirim?",a:"Biletler Passo üzerinden satışta. Sayfadaki “Passo'dan bilet al” düğmesiyle seans seçebilirsin."},
                 {q:"Seans saatinden ne kadar önce gelmeliyim?",a:"[Ekip] Seanstan 10 dakika önce gelmeni öneririz."},{q:"Çocuklar katılabilir mi?",a:"[Ekip] Yaş sınırı ve çocuk bileti bilgisi buraya."},
                 {q:"Fotoğraf ve video çekebilir miyim?",a:"[Ekip] Kural buraya."}],
           en:[{q:"How long is the show?",a:"About 40 minutes."},{q:"Where can I buy tickets?",a:"Tickets are on sale via Passo. Use the “Get tickets on Passo” button to pick a session."},
               {q:"How early should I arrive?",a:"[Team] We recommend arriving 10 minutes before your session."},{q:"Can children attend?",a:"[Team] Age and child ticket info here."},
               {q:"Can I take photos or videos?",a:"[Team] Policy here."}]},
      start:gun(-20), end:gun(38), times:["11:00","13:00","15:00","17:00","19:00"], durationMin:40,
      age:{tr:"",en:""}, price:{tr:"Passo'da",en:"On Passo"}, ticketUrl:PASSO, image:"assets/frida.jpg", blend:true },
    { id:"yeni-ocak", featured:false,
      title:{tr:"Yeni gösterim",en:"New show"}, sub:{tr:"Ocak 2027 · örnek",en:"January 2027 · sample"},
      short:{tr:"Ocak'ta gelecek yeni immersive içeriklerden biri burada görünecek. Bu kart örnektir.",en:"One of the new immersive shows arriving in January will appear here. This card is a sample."},
      desc:{tr:["Bu sayfa örnektir. Flow → Website → Gösterimler'den yeni içerik girildiğinde başlık, görsel, açıklama ve SSS burada yer alacak."],en:["This page is a sample. Once the show is added in Flow, its title, image, description and FAQ will appear here."]},
      is:{tr:[],en:[]}, isnt:{tr:[],en:[]}, faq:{tr:[],en:[]},
      start:ay(2027,1,15), end:null, times:[], durationMin:null, age:{tr:"",en:""}, price:{tr:"",en:""}, ticketUrl:"", image:"assets/immersive.jpg", blend:false },
  ];
  window.HATCH_DEMO_SETTINGS = {
    immersive_nedir:"Immersive (sarmalayıcı) deneyimde görüntü bir ekranda değil, bulunduğun mekânın duvarlarında ve zemininde akar. İzlemezsin; hikâyenin içinde durursun, dilediğin yere bakar, odada dolaşırsın. [Taslak — ekip düzenleyecek]",
    immersive_nedir_en:"In an immersive experience the images aren't on a screen; they flow across the walls and floor around you. You don't just watch; you stand inside the story, look wherever you like and move around the room. [Draft]",
    genel_sss:"studio HATCH nerede?\nHigh Garden AVM, Newline Konutları, Farabi Cd. E Blok No: 12-E, 16140 Nilüfer/Bursa.\n\nGösterim dışında mekânda ne var?\nLounge, 16 bağımsız tasarımcının ürünleriyle tasarım mağazası, atölyeler ve etkinlikler.\n\nOtopark var mı?\n[Ekip] Bilgi buraya.",
    genel_sss_en:"Where is studio HATCH?\nHigh Garden AVM, Newline Konutları, Farabi Cd. E Blok No: 12-E, 16140 Nilüfer/Bursa.\n\nWhat else is there besides the shows?\nA lounge, a design store with work by 16 independent designers, workshops and events.\n\nIs there parking?\n[Team] Info here." };

  // KVKK aydınlatma metni TASLAĞI — Flow → Website → Site bilgileri'nde "KVKK" alanı doldurulunca o kullanılır. Hukukçu kontrolü gerekir.
  window.HATCH_KVKK_TASLAK = {
    tr:`Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, studio HATCH web sitesindeki bülten formu aracılığıyla paylaştığınız kişisel verilerin işlenmesine ilişkin olarak sizi bilgilendirmek amacıyla hazırlanmıştır.

Veri sorumlusu
CEZERİ TASARIM OTOMOTİV MAKİNE KALIP İTHALAT İHRACAT SANAYİ VE TİCARET LTD. ŞTİ. ("studio HATCH")
Adres: Gökçe Mah. Gökçeköy Cad. No: 18/1 Nilüfer/Bursa
Vergi dairesi / no: Nilüfer V.D. 2091463860 · Ticaret sicil no: 112601 · MERSİS: 0209146386000001
Mekân: High Garden AVM, Newline Konutları, Farabi Cd. E Blok No: 12-E, 16140 Nilüfer/Bursa
İletişim: hello@studiohatch.tv

İşlenen kişisel veriler
E-posta adresiniz; isteğe bağlı olarak paylaşmanız hâlinde adınız soyadınız, telefon numaranız ve seçtiğiniz ilgi alanları; onay verdiğiniz metin ve onay tarihi.

İşleme amaçları
Etkinlik, gösterim, atölye ve kampanyalarımız hakkında sizi e-posta ile (onay vermeniz hâlinde telefon ve SMS ile de) bilgilendirmek; ilgi alanlarınıza uygun içerik sunmak; ticari elektronik ileti onaylarını kayıt altına almak ve yasal yükümlülüklerimizi yerine getirmek.

Hukuki sebep ve toplama yöntemi
Verileriniz web sitemizdeki form aracılığıyla elektronik ortamda toplanır ve KVKK madde 5/1 uyarınca açık rızanız ile, ticari ileti onaylarının saklanması bakımından ise kanunlarda öngörülmesi ve hukuki yükümlülüğün yerine getirilmesi (KVKK madde 5/2-a ve 5/2-ç) hukuki sebeplerine dayanılarak işlenir.

Aktarım
Verileriniz yalnızca yukarıdaki amaçlarla sınırlı olarak; veri barındırma ve e-posta gönderim hizmeti aldığımız tedarikçilere (sunucuları yurt dışında bulunabilir) ve yasal zorunluluk hâlinde yetkili kamu kurum ve kuruluşlarına aktarılabilir. Ticari ileti onaylarınız İleti Yönetim Sistemi'ne (İYS) kaydedilebilir.

Saklama süresi
Verileriniz onayınızı geri alana kadar, onay kayıtları ise mevzuatın öngördüğü süre boyunca saklanır.

Haklarınız
KVKK madde 11 uyarınca kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme, işlemeye itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz. Taleplerinizi hello@studiohatch.tv adresine iletebilirsiniz. Ticari ileti almayı dilediğiniz zaman e-postalardaki bağlantı ile ücretsiz olarak durdurabilirsiniz.`,
    en:`This notice explains how studio HATCH processes the personal data you share through the newsletter form on this website, under Turkish Personal Data Protection Law No. 6698 ("KVKK").

Data controller
CEZERİ TASARIM OTOMOTİV MAKİNE KALIP İTHALAT İHRACAT SANAYİ VE TİCARET LTD. ŞTİ. ("studio HATCH")
Registered address: Gökçe Mah. Gökçeköy Cad. No: 18/1 Nilüfer/Bursa, Türkiye
Tax office / no: Nilüfer V.D. 2091463860 · Trade registry no: 112601 · MERSİS: 0209146386000001
Venue: High Garden AVM, Newline Konutları, Farabi Cd. E Blok No: 12-E, 16140 Nilüfer/Bursa
Contact: hello@studiohatch.tv

Data we process
Your email address; if you choose to share them, your name, phone number and selected interests; the consent text you agreed to and its date.

Purposes
To send you news about our events, shows, workshops and offers by email (and by phone and SMS if you agree); to tailor content to your interests; and to keep records of your consent as required by law.

Legal basis
Data is collected electronically through our website form and processed based on your explicit consent (KVKK Art. 5/1) and, for consent records, our legal obligations (KVKK Art. 5/2-a and 5/2-ç).

Transfers
Your data may be shared only for these purposes with our hosting and email service providers (whose servers may be located abroad) and, where legally required, with authorised public authorities. Your consent may be registered in the Turkish Message Management System (İYS).

Retention
We keep your data until you withdraw your consent, and consent records for as long as the law requires.

Your rights
Under KVKK Art. 11 you may ask whether your data is processed, request information, correction or deletion, object to processing and claim compensation. Contact us at hello@studiohatch.tv. You can unsubscribe at any time, free of charge, via the link in our emails.` };

  window.HATCH_I18N = {
    tr:{ nav:["Immersive Gösterimler","Etkinlikler","Mağaza","Ziyaret"], tickets:"Bilet al",
      showsH:"Immersive <em>Gösterimler</em>", showsSub:"Görüntülerin dört bir yanını sardığı dijital deneyimler. Her birinin kendi hikâyesi, seansları ve sayfası var.",
      showing:"Gösterimde", soon:"Yakında", opens:"Başlangıç", explore:"İncele", prev:"Önceki", next:"Sonraki",
      ghostH:"Yeni gösterimler yolda", ghostP:"Yeni içerikler geldiğinde ilk sen haberdar ol.", ghostBtn:"Bültene kaydol",
      shBack:"Immersive Gösterimler", shWhat:"Bu deneyim nedir?", shIs:"Bu deneyim…", shIsnt:"…bu değil", shFaq:"Sıkça sorulan sorular", shAbout:"Immersive deneyim nedir?",
      shAge:"Yaş", shOther:"Diğer gösterimler", shEvents:"Etkinliklere göz at", shNotFound:"Bu gösterim artık programda değil", openEnded:"Gösterimde", join:"Hatch'e katıl",
      proto:"<b>Örnek veri.</b> Frida dışındaki içerikler örnektir; canlıda her şey Flow'dan gelir.",
      nowShowing:"Şimdi gösterimde", todaySlots:"Bugünkü seanslar", noMoreToday:"Bugünkü seanslar bitti · yarın", buy:"Passo'dan bilet al", details:"Detaylar", minutes:"dakika",
      upcoming:"Etkinlikler", upcomingSub:"Atölyeler, wellness seansları, gece programları ve buluşmalar. Güne dokun, o günü gör.",
      all:"Tümü", showAll:"Tüm günler", nothing:"Bu seçimde etkinlik yok. Başka bir güne bak.", free:"Ücretsiz",
      pillarsH:"Üç farklı <em>ritim</em>", pillarsSub:"Saran dijital gösterimler, nefes ve hareket, atölyeler ve buluşmalar. Hatch günün her saatinde başka bir yer.",
      pillars:{ culture:["Immersive Gösteri","Görüntülerin dört bir yanını sardığı dijital gösterimler ve özel seanslar."], wellness:["Wellness","Saran görüntüler içinde nefes, ses banyosu ve hareket seansları."], nocturne:["Etkinlikler","Atölyeler, konserler, söyleşiler, tasarımcı buluşmaları ve gece programları."] },
      events:"etkinlik", spaceH:"Görselin <em>içinde</em> sen de varsın", spaceP:"Merkezimizde görüntülerin sizi dört bir yandan çevrelediği bir dijital deneyim alanı var. İçerik değiştikçe mekân da değişiyor: sergi, konser, ders ya da lansman.",
      st:[["40'","dakikalık deneyim"],["4","duvar, tek hikâye"],["16","tasarımcı"]], spaceCap:"High Garden AVM · Nilüfer, Bursa",
      makersH:"Bir ürün, <em>bir hikâye</em>", makersP:"Tasarım mağazamızda 16 bağımsız tasarımcının ürünleri var. Satın aldığın her parça, doğrudan üreticisini destekliyor.", makersBtn:"Mağazayı keşfet",
      joinH:"Fikrin varsa, <em>sahne</em> burada.", joinP:"Tasarımcılara, atölye yürütücülerine ve etkinlik fikri olan herkese açığız.",
      joinOpts:[["01 / TASARIMCI","Ürünlerini mağazamıza getir"],["02 / ATÖLYE","Becerini paylaş, atölye aç"],["03 / ETKİNLİK","Performans, gösterim, buluşma"]],
      visitH:"Ziyaret", where:"Adres", hours:"Saatler", contact:"İletişim", map:"Haritada aç", hoursTodo:"Flow'dan girilecek",
      nlOpt:"İstersen biraz tanışalım (isteğe bağlı)", nlAd:"Ad soyad", nlTel:"Telefon", nlIlgi:"Neler ilgini çeker?",
      nlIzin:"{kvkk}'ni okudum; studio HATCH'in etkinlik, gösterim ve kampanyalarıyla ilgili bana e-posta ile ticari ileti göndermesine onay veriyorum.", kvkkLink:"KVKK Aydınlatma Metni",
      nlTelIzin:"Telefonla ve SMS ile de bilgilendirilmeyi kabul ediyorum.",
      nlH:"İlk sen haberdar ol", nlP:"Yeni gösterimler, atölyeler ve gece programları ayda iki kez e-postanda.", nlPh:"E-posta adresin", nlBtn:"Kaydol", nlOk:"Teşekkürler! Listeye eklendin.", nlFine:"Dilediğin zaman tek tıkla ayrılabilirsin.",
      ftAbout:"Kreatif Yaşamın Merkezi", ftCols:["Program","Hatch","Takip et"], ftLinks:[["Immersive Gösterimler","#gosterimler"],["Etkinlikler","#program"],["Bülten","#visit"]], ftLinks2:[["Mağaza","#makers"],["Hatch'e katıl","#join"],["Ziyaret","#visit"]],
      rights:"Tüm hakları saklıdır.",
      evBack:"Etkinlikler", evDate:"Tarih", evTime:"Saat", evSessions:"Seanslar", evDuration:"Süre", evPlace:"Yer", evPrice:"Bilet", evKnow:"Bilmen gerekenler", evMore:"Bunlar da ilgini çekebilir",
      addCal:"Takvime ekle", share:"Paylaş", copied:"Bağlantı kopyalandı", everyDay:"Her gün", until:"tarihine kadar", noTicket:"Kayıt gerekmez" },
    en:{ nav:["Immersive Shows","Events","Store","Visit"], tickets:"Tickets",
      showsH:"Immersive <em>Shows</em>", showsSub:"Digital experiences where the images surround you. Each has its own story, sessions and page.",
      showing:"Now showing", soon:"Coming soon", opens:"Opens", explore:"Explore", prev:"Previous", next:"Next",
      ghostH:"New shows on the way", ghostP:"Be the first to hear when new content arrives.", ghostBtn:"Join the newsletter",
      shBack:"Immersive Shows", shWhat:"What is this experience?", shIs:"This experience is…", shIsnt:"…and it isn't", shFaq:"Frequently asked questions", shAbout:"What is an immersive experience?",
      shAge:"Age", shOther:"Other shows", shEvents:"See all events", shNotFound:"This show is no longer listed", openEnded:"Now showing", join:"Join Hatch",
      proto:"<b>Sample data.</b> Everything except Frida is a sample; the live site reads from Flow.",
      nowShowing:"Now showing", todaySlots:"Today's sessions", noMoreToday:"No more sessions today · tomorrow", buy:"Get tickets on Passo", details:"Details", minutes:"minutes",
      upcoming:"Events", upcomingSub:"Workshops, wellness sessions, night programs and meet-ups. Tap a day to see it.",
      all:"All", showAll:"All days", nothing:"Nothing on for this selection. Try another day.", free:"Free",
      pillarsH:"Three different <em>rhythms</em>", pillarsSub:"Immersive digital shows, breath and movement, workshops and meet-ups. Hatch is a different place at every hour.",
      pillars:{ culture:["Immersive Show","Digital shows and special screenings where the images surround you."], wellness:["Wellness","Breathwork, sound baths and movement inside immersive visuals."], nocturne:["Events","Workshops, concerts, talks, designer meet-ups and night programs."] },
      events:"events", spaceH:"Step <em>inside</em> the picture", spaceP:"At our heart is a digital space where images surround you on every side. As the content changes, so does the room: exhibition, concert, class or launch.",
      st:[["40'","minute experience"],["4","walls, one story"],["16","designers"]], spaceCap:"High Garden AVM · Nilüfer, Bursa",
      makersH:"One product, <em>one story</em>", makersP:"Our design store carries work by 16 independent designers. Every piece you buy directly supports its maker.", makersBtn:"Explore the store",
      joinH:"Got an idea? <em>The stage</em> is here.", joinP:"We're open to designers, workshop leaders and anyone with an event idea.",
      joinOpts:[["01 / DESIGNERS","Bring your products to our store"],["02 / WORKSHOPS","Share a skill, run a workshop"],["03 / EVENTS","Performances, screenings, meet-ups"]],
      visitH:"Visit", where:"Address", hours:"Hours", contact:"Contact", map:"Open in Maps", hoursTodo:"to be set in Flow",
      nlOpt:"Tell us a bit about you (optional)", nlAd:"Full name", nlTel:"Phone", nlIlgi:"What are you into?",
      nlIzin:"I have read the {kvkk} and agree to receive commercial emails from studio HATCH about events, shows and offers.", kvkkLink:"Privacy Notice (KVKK)",
      nlTelIzin:"I also agree to be contacted by phone and SMS.",
      nlH:"Be the first to know", nlP:"New shows, workshops and night programs, twice a month in your inbox.", nlPh:"Your email", nlBtn:"Sign up", nlOk:"Thanks! You're on the list.", nlFine:"Unsubscribe anytime with one click.",
      ftAbout:"The Home of Creative Living", ftCols:["Program","Hatch","Follow"], ftLinks:[["Immersive Shows","#gosterimler"],["Events","#program"],["Newsletter","#visit"]], ftLinks2:[["Store","#makers"],["Join Hatch","#join"],["Visit","#visit"]],
      rights:"All rights reserved.",
      evBack:"Events", evDate:"Date", evTime:"Time", evSessions:"Sessions", evDuration:"Duration", evPlace:"Venue", evPrice:"Tickets", evKnow:"Good to know", evMore:"You might also like",
      addCal:"Add to calendar", share:"Share", copied:"Link copied", everyDay:"Daily", until:"until", noTicket:"No registration needed" }
  };
})();
