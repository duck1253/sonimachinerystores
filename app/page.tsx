"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "hi";

const products = [
  ["Power Weeder", "पावर वीडर", "Efficient interculture and soil preparation for farms.", "खेतों में निराई और मिट्टी तैयार करने के लिए उपयोगी।", "weeder.jpg"],
  ["Power Tiller", "पावर टिलर", "A dependable compact machine for tillage and farm work.", "जुताई और खेती के काम के लिए भरोसेमंद मशीन।", "tiller.jpg"],
  ["Brush Cutter", "ब्रश कटर", "Fast clearing of grass, weeds and dense undergrowth.", "घास, खरपतवार और झाड़ियों की तेज़ कटाई।", "cutter.jpg"],
  ["Earth Auger", "अर्थ ऑगर", "Quick, consistent pits for plantation and fencing.", "पौधारोपण और बाड़ के लिए तेज़ व समान गड्ढे।", "auger.jpg"],
  ["Chainsaw", "चेनसॉ", "Powerful cutting for wood, orchards and maintenance.", "लकड़ी, बाग और रखरखाव के लिए शक्तिशाली कटाई।", "chainsaw.jpg"],
  ["Seed Drill", "सीड ड्रिल", "Uniform seed placement for better crop establishment.", "बेहतर फसल के लिए बीजों की समान बुवाई।", "seeder.jpg"],
  ["Water Pump", "वॉटर पंप", "Reliable water movement for irrigation and everyday use.", "सिंचाई और दैनिक उपयोग के लिए विश्वसनीय पंप।", "tiller.jpg"],
  ["Submersible Pump", "सबमर्सिबल पंप", "Efficient borewell pumping for farms and businesses.", "खेत और व्यवसाय के लिए कुशल बोरवेल पंपिंग।", "weeder.jpg"],
  ["Electric Motor", "इलेक्ट्रिक मोटर", "Dependable power for agricultural and industrial equipment.", "कृषि और औद्योगिक उपकरणों के लिए भरोसेमंद शक्ति।", "cutter.jpg"],
  ["Chaff Cutter", "चारा कटर", "Consistent fodder cutting for dairy and livestock farms.", "डेयरी और पशुपालन के लिए समान चारा कटाई।", "chainsaw.jpg"],
  ["Milking Machine", "मिल्किंग मशीन", "Hygienic, efficient milking for modern dairy operations.", "आधुनिक डेयरी के लिए स्वच्छ और कुशल दुहाई।", "seeder.jpg"],
  ["Fodder Grinder", "चारा ग्राइंडर", "Convenient feed preparation for livestock.", "पशुओं के आहार की सुविधाजनक तैयारी।", "auger.jpg"],
  ["Sprayer", "स्प्रेयर", "Even crop protection coverage with practical operation.", "आसान संचालन के साथ फसल सुरक्षा का समान छिड़काव।", "weeder.jpg"],
  ["Knapsack Sprayer", "नैपसैक स्प्रेयर", "Portable spraying for fields, orchards and gardens.", "खेत, बाग और उद्यान के लिए पोर्टेबल स्प्रे।", "cutter.jpg"],
  ["Power Reaper", "पावर रीपर", "Faster crop harvesting with reduced manual effort.", "कम मेहनत में फसल की तेज़ कटाई।", "tiller.jpg"],
  ["Rice Mill", "राइस मिल", "Compact processing solution for paddy and grain.", "धान और अनाज के लिए कॉम्पैक्ट प्रोसेसिंग समाधान।", "seeder.jpg"],
  ["Flour Mill", "आटा चक्की", "Durable milling for shops and small businesses.", "दुकानों और छोटे व्यवसायों के लिए टिकाऊ चक्की।", "auger.jpg"],
  ["Mini Oil Expeller", "मिनी ऑयल एक्सपेलर", "Practical small-scale oil extraction equipment.", "छोटे स्तर पर तेल निकालने का व्यावहारिक उपकरण।", "chainsaw.jpg"],
  ["Generator", "जनरेटर", "Backup power for farms, shops and worksites.", "खेत, दुकान और कार्यस्थल के लिए बैकअप बिजली।", "tiller.jpg"],
  ["Air Compressor", "एयर कंप्रेसर", "Steady compressed air for workshop applications.", "वर्कशॉप के काम के लिए स्थिर संपीड़ित हवा।", "cutter.jpg"],
  ["High Pressure Washer", "हाई प्रेशर वॉशर", "Powerful cleaning for machinery and vehicles.", "मशीनरी और वाहनों की शक्तिशाली सफाई।", "weeder.jpg"],
  ["Concrete Cutter", "कंक्रीट कटर", "Precise cutting support for site and repair work.", "निर्माण और मरम्मत कार्य में सटीक कटाई।", "chainsaw.jpg"],
  ["Vibrator Motor", "वाइब्रेटर मोटर", "Consistent performance for construction applications.", "निर्माण कार्यों के लिए निरंतर प्रदर्शन।", "auger.jpg"],
  ["Mini Tractor Attachments", "मिनी ट्रैक्टर अटैचमेंट", "Versatile implements for multiple farm operations.", "खेती के अनेक कामों के लिए बहुउपयोगी उपकरण।", "seeder.jpg"],
  ["Hand Tools & Spares", "हैंड टूल्स और स्पेयर", "Essential accessories and support parts for daily work.", "दैनिक काम के लिए आवश्यक सहायक उपकरण और पुर्जे।", "cutter.jpg"],
];

const copy = {
  en: {
    nav: ["Home", "Legacy", "Products", "Services", "Gallery", "Contact"],
    eyebrow: "KANPUR'S TRUSTED MACHINERY HOUSE • ESTD. 1974",
    title: "Machinery that works as hard as you do.",
    sub: "Dependable agricultural, dairy and general-purpose machinery—supported by practical advice and honest service across generations.",
    quote: "Get the right machine", explore: "Explore products", since: "A legacy of trust since 1974",
    story: "Built in Kanpur. Trusted across generations.",
    storyp: "From Latouche Road, Soni Machinery Stores has served farmers, contractors, small businesses and industrial customers with one enduring promise: understand the requirement, recommend the right machine and stand behind every sale.",
    products: "Machinery for every requirement", productSub: "A preview catalogue of 25 categories. Final specifications, brands and photographs can be updated anytime.",
    services: "Service beyond the sale", dealers: "Authorised dealer of", gallery: "Life in motion", testimonials: "Relationships that last", faq: "Frequently asked questions", contact: "Let’s find the right machine for your work.",
  },
  hi: {
    nav: ["होम", "विरासत", "उत्पाद", "सेवाएँ", "गैलरी", "संपर्क"],
    eyebrow: "कानपुर का विश्वसनीय मशीनरी केंद्र • स्थापना 1974",
    title: "मशीनरी जो आपके जितनी मेहनत करे।",
    sub: "भरोसेमंद कृषि, डेयरी और सामान्य उपयोग की मशीनरी—पीढ़ियों के अनुभव, सही सलाह और ईमानदार सेवा के साथ।",
    quote: "सही मशीन चुनें", explore: "उत्पाद देखें", since: "1974 से विश्वास की विरासत",
    story: "कानपुर में शुरुआत। पीढ़ियों का विश्वास।",
    storyp: "लाटूश रोड से, सोनी मशीनरी स्टोर्स किसानों, ठेकेदारों, छोटे व्यवसायों और औद्योगिक ग्राहकों की सेवा एक स्थायी वादे के साथ करता आया है: जरूरत समझें, सही मशीन सुझाएँ और हर बिक्री के बाद साथ निभाएँ।",
    products: "हर जरूरत के लिए मशीनरी", productSub: "25 श्रेणियों की प्रारंभिक सूची। अंतिम विवरण, ब्रांड और तस्वीरें कभी भी बदली जा सकती हैं।",
    services: "बिक्री के बाद भी सेवा", dealers: "अधिकृत विक्रेता", gallery: "खेत से प्रगति तक", testimonials: "रिश्ते जो चलते रहें", faq: "अक्सर पूछे जाने वाले सवाल", contact: "आपके काम के लिए सही मशीन चुनते हैं।",
  }
};

const heroImages = [
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c48?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=85",
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [slide, setSlide] = useState(0);
  const [edit, setEdit] = useState(false);
  const t = copy[lang];
  useEffect(() => { const timer = setInterval(() => setSlide(s => (s + 1) % heroImages.length), 5000); return () => clearInterval(timer); }, []);

  return <main className={edit ? "editing" : ""}>
    <div className="topline"><span>☎ +91 98765 43210</span><span>{t.since}</span><span>Latouche Road, Kanpur</span></div>
    <header>
      <a className="brand" href="#home"><img src="/logo.png" alt="Soni Machinery Stores"/><span><b>SONI</b><small>MACHINERY STORES · 1974</small></span></a>
      <nav>{t.nav.map((n,i)=><a key={n} href={["#home","#legacy","#products","#services","#gallery","#contact"][i]}>{n}</a>)}</nav>
      <div className="header-actions"><button className="lang" onClick={()=>setLang(lang === "en" ? "hi" : "en")}>{lang === "en" ? "हिंदी" : "English"}</button><a className="btn small" href="#contact">{lang === "en" ? "Enquire now" : "पूछताछ करें"}</a></div>
    </header>

    <section className="hero" id="home" style={{backgroundImage:`linear-gradient(90deg,rgba(5,28,16,.88),rgba(5,28,16,.18)),url(${heroImages[slide]})`}}>
      <div className="hero-content" contentEditable={edit} suppressContentEditableWarning>
        <p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="lead">{t.sub}</p>
        <div className="hero-buttons"><a className="btn" href="#contact">{t.quote} →</a><a className="btn ghost" href="#products">{t.explore}</a></div>
        <div className="trust"><b>52+</b><span>{lang === "en" ? "years of dependable service" : "वर्षों की भरोसेमंद सेवा"}</span><i></i><b>2</b><span>{lang === "en" ? "generations of experience" : "पीढ़ियों का अनुभव"}</span></div>
      </div>
      <div className="dots">{heroImages.map((_,i)=><button key={i} aria-label={`Slide ${i+1}`} className={i===slide?"active":""} onClick={()=>setSlide(i)}/>)}</div>
    </section>

    <section className="legacy section" id="legacy">
      <div className="section-kicker">OUR LEGACY · हमारी विरासत</div><h2 contentEditable={edit} suppressContentEditableWarning>{t.story}</h2><p className="intro" contentEditable={edit} suppressContentEditableWarning>{t.storyp}</p>
      <div className="founders">
        <article><img src="/gurdeep-soni.png" alt="Gurdeep Singh Soni"/><div><span>FOUNDER · संस्थापक</span><h3>Gurdeep Singh Soni</h3><p>{lang === "en" ? "He established Soni Machinery Stores in 1974 and built its foundation on fair dealing, practical knowledge and relationships that last." : "उन्होंने 1974 में सोनी मशीनरी स्टोर्स की स्थापना की और निष्पक्ष व्यवहार, व्यावहारिक ज्ञान व स्थायी रिश्तों की नींव रखी।"}</p></div></article>
        <article><img src="/sumeet-soni.png" alt="Sumeet Singh Soni"/><div><span>SECOND GENERATION · दूसरी पीढ़ी</span><h3>Sumeet Singh Soni</h3><p>{lang === "en" ? "Carrying the legacy forward with decades of hands-on knowledge across agricultural, dairy and general machinery." : "कृषि, डेयरी और सामान्य मशीनरी के दशकों के व्यावहारिक ज्ञान के साथ विरासत को आगे बढ़ा रहे हैं।"}</p></div></article>
      </div>
      <div className="vision"><div><span>OUR VISION</span><h3>{lang === "en" ? "To be Uttar Pradesh’s most trusted machinery partner." : "उत्तर प्रदेश का सबसे भरोसेमंद मशीनरी साथी बनना।"}</h3></div><div><span>OUR MISSION</span><h3>{lang === "en" ? "The right machine, fair price and dependable service." : "सही मशीन, उचित मूल्य और भरोसेमंद सेवा।"}</h3></div></div>
    </section>

    <section className="products section" id="products"><div className="section-head"><div><div className="section-kicker">OUR RANGE · हमारी रेंज</div><h2>{t.products}</h2><p>{t.productSub}</p></div><a className="text-link" href="#contact">{lang === "en" ? "Request full catalogue →" : "पूरी सूची माँगें →"}</a></div>
      <div className="product-grid">{products.map((p,i)=><article className="product-card" key={p[0]}><div className="product-image"><img src={`/products/${p[4]}`} alt={lang === "en" ? p[0] : p[1]}/><span>{String(i+1).padStart(2,"0")}</span></div><div className="product-copy" contentEditable={edit} suppressContentEditableWarning><h3>{lang === "en" ? p[0] : p[1]}</h3><p>{lang === "en" ? p[2] : p[3]}</p><a href="#contact">{lang === "en" ? "Enquire" : "पूछताछ"} →</a></div></article>)}</div>
    </section>

    <section className="services section" id="services"><div className="section-kicker light">WHAT WE DO · हमारी सेवाएँ</div><h2>{t.services}</h2><div className="service-grid">{[
      ["01","Requirement guidance","जरूरत के अनुसार सलाह","We listen first, then recommend machinery suited to your work and budget."],
      ["02","Product demonstration","उत्पाद प्रदर्शन","Clear guidance on operation, care and practical use before purchase."],
      ["03","Genuine spares","असली स्पेयर पार्ट्स","Support with compatible accessories and essential replacement parts."],
      ["04","After-sales support","बिक्री के बाद सहायता","Dependable help and direction when your machine needs attention."],
    ].map(s=><article key={s[0]}><span>{s[0]}</span><h3>{lang === "en" ? s[1] : s[2]}</h3><p>{lang === "en" ? s[3] : "मशीन खरीदने से पहले और बाद तक सरल, व्यावहारिक और भरोसेमंद सहायता।"}</p></article>)}</div></section>

    <section className="dealers section"><div className="section-kicker">TRUSTED BRANDS · विश्वसनीय ब्रांड</div><h2>{t.dealers}</h2><p>{lang === "en" ? "Brand logos and authorisations shown here are placeholders and ready to be replaced." : "यहाँ ब्रांड लोगो और अधिकृत विवरण अभी नमूने हैं और बदले जा सकते हैं।"}</p><div className="brand-row">{["HONDA","KIRLOSKAR","VST SHAKTI","KISANKRAFT","MAHINDRA","TEXMO"].map(b=><div key={b}>{b}<small>PLACEHOLDER</small></div>)}</div></section>

    <section className="gallery section" id="gallery"><div className="section-head"><div><div className="section-kicker">ON THE FIELD · खेत में</div><h2>{t.gallery}</h2></div><p>{lang === "en" ? "Placeholder photography for your future product demos, customers and store moments." : "भविष्य के उत्पाद प्रदर्शन, ग्राहकों और स्टोर की तस्वीरों के लिए नमूना गैलरी।"}</p></div><div className="gallery-grid">{heroImages.concat(["https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80"]).map((src,i)=><figure key={src}><img src={src} alt={`Agriculture gallery ${i+1}`}/>{i===0&&<figcaption>{lang === "en" ? "Better tools. Better work. Better tomorrow." : "बेहतर औज़ार। बेहतर काम। बेहतर कल।"}</figcaption>}</figure>)}</div></section>

    <section className="testimonials section"><div className="section-kicker">CUSTOMER VOICES · ग्राहकों की बात</div><h2>{t.testimonials}</h2><div className="quotes">{[
      ["They explained the options clearly and helped us choose what actually suited our farm.","Rajesh Yadav · Unnao"],
      ["Fair dealing, reliable machines and support when we needed it—the relationship feels personal.","Harpreet Singh · Kanpur"],
      ["Our family has been buying machinery from Soni Machinery Stores for years.","Mohd. Irfan · Fatehpur"],
    ].map((q,i)=><blockquote key={i}><div>★★★★★</div><p>“{lang === "en" ? q[0] : "सही सलाह, उचित व्यवहार और जरूरत के समय भरोसेमंद सहायता मिली।"}”</p><cite>{q[1]}</cite></blockquote>)}</div></section>

    <section className="faq section"><div><div className="section-kicker">HELP CENTRE · सहायता</div><h2>{t.faq}</h2><p>{lang === "en" ? "Can’t find your answer? Call us and we’ll guide you." : "जवाब नहीं मिला? हमें कॉल करें, हम आपकी मदद करेंगे।"}</p></div><div className="accordions">{[
      ["How do I choose the right machine?","Tell us the job, land size, frequency of use and budget. Our team will suggest suitable options."],
      ["Do you provide demonstrations?","Demonstrations and operating guidance can be arranged for selected products."],
      ["Are spare parts available?","We help source compatible spares and accessories for the machinery categories we sell."],
      ["Do you deliver outside Kanpur?","Delivery options depend on product and destination. Contact us for a quick confirmation."],
    ].map((f,i)=><details key={i}><summary>{lang === "en" ? f[0] : ["सही मशीन कैसे चुनें?","क्या उत्पाद प्रदर्शन उपलब्ध है?","क्या स्पेयर पार्ट्स मिलते हैं?","क्या कानपुर के बाहर डिलीवरी होती है?"][i]}<b>+</b></summary><p>{lang === "en" ? f[1] : "अपनी आवश्यकता, स्थान और बजट साझा करें। हमारी टीम आपको उपलब्ध विकल्पों की सही जानकारी देगी।"}</p></details>)}</div></section>

    <section className="big-cta" id="contact"><p>ESTD. 1974 · KANPUR</p><h2>{t.contact}</h2><div><a className="btn cream" href="tel:+919876543210">☎ {lang === "en" ? "Call now" : "अभी कॉल करें"}</a><a className="btn outline" href="https://wa.me/919876543210">◉ WhatsApp</a><a className="btn outline" href="mailto:hello@sonimachinery.in?subject=Appointment%20Request">▣ {lang === "en" ? "Book appointment" : "अपॉइंटमेंट लें"}</a></div></section>

    <section className="contact section"><div><div className="section-kicker">VISIT OUR STORE · हमारे स्टोर आएँ</div><h2>Soni Machinery Stores</h2><p>Latouche Road, Kanpur, Uttar Pradesh</p><p><b>Mon–Sat</b> · 10:00 AM – 7:00 PM</p><div className="contact-links"><a href="tel:+919876543210">+91 98765 43210</a><a href="mailto:hello@sonimachinery.in">hello@sonimachinery.in</a><a href="/soni-machinery-brochure.pdf" download>↓ {lang === "en" ? "Download brochure" : "ब्रोशर डाउनलोड करें"}</a></div></div><iframe title="Soni Machinery Stores location" src="https://www.google.com/maps?q=Latouche%20Road%20Kanpur&output=embed" loading="lazy"/></section>

    <footer><img src="/logo.png" alt="Soni Machinery Stores"/><div><b>SONI MACHINERY STORES</b><span>{lang === "en" ? "Powering Progress, Serving with Integrity." : "मशीनों में मज़बूती, सेवा में सच्चाई।"}</span></div><p>© 2026 · A legacy business since 1974</p></footer>
    <div className="floating"><a href="https://wa.me/919876543210" aria-label="WhatsApp">◉</a><a href="tel:+919876543210" aria-label="Call">☎</a></div>
    <button className="edit-toggle" onClick={()=>setEdit(!edit)}>{edit ? "✓ Finish editing" : "✎ Edit page"}</button>
    {edit && <div className="edit-note">Editing mode is on — click any highlighted text to change it. This preview keeps changes until refresh.</div>}
  </main>;
}
