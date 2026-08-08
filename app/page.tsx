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

type ProductCategory = "all" | "agriculture" | "pumps" | "dairy" | "workshop";

const productCategories: {id: ProductCategory; en: string; hi: string; noteEn: string; noteHi: string}[] = [
  {id:"all", en:"All Products", hi:"सभी उत्पाद", noteEn:"Complete range", noteHi:"पूरी रेंज"},
  {id:"agriculture", en:"Agriculture", hi:"कृषि मशीनरी", noteEn:"Field & crop solutions", noteHi:"खेत और फसल समाधान"},
  {id:"pumps", en:"Pumps & Motors", hi:"पंप और मोटर", noteEn:"Water & power systems", noteHi:"जल और शक्ति प्रणाली"},
  {id:"dairy", en:"Dairy & Food", hi:"डेयरी और फूड", noteEn:"Processing equipment", noteHi:"प्रोसेसिंग उपकरण"},
  {id:"workshop", en:"Workshop & Construction", hi:"वर्कशॉप और निर्माण", noteEn:"Professional equipment", noteHi:"व्यावसायिक उपकरण"},
];

const productCategoryMap: ProductCategory[] = [
  "agriculture","agriculture","agriculture","agriculture","agriculture","agriculture",
  "pumps","pumps","pumps",
  "dairy","dairy","dairy",
  "agriculture","agriculture","agriculture",
  "dairy","dairy","dairy",
  "workshop","workshop","workshop","workshop","workshop",
  "agriculture","workshop",
];

const copy = {
  en: {
    nav: ["Home", "Legacy", "Products", "Services", "Gallery", "Contact"],
    eyebrow: "KANPUR'S TRUSTED MACHINERY HOUSE • ESTD. 1974",
    title: "Machinery that works as hard as you do.",
    sub: "Dependable agricultural, dairy and general-purpose machinery—supported by practical advice and honest service across generations.",
    quote: "Get the right machine", explore: "Explore products", since: "A legacy of trust since 1974",
    story: "Built in Kanpur. Trusted across generations.",
    storyp: "Soni Machinery Stores is a trusted machinery and equipment dealer in Kanpur, serving customers since 1974. For over 50 years, we have built our reputation on fair business practices, dependable service, genuine guidance and long-standing relationships with generations of customers.",
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
  "/carousel/power-tiller-farmer.jpg",
  "/carousel/dairy-cream-separator.jpg",
  "/carousel/earth-auger-farmer.jpg",
  "/carousel/power-sprayer-farmer.jpg",
  "/carousel/dairy-processing-machine.jpg",
];

const storeGallery = [
  "/store-gallery/27980283-board-1563882717197-1000x1000.jpg",
  "/store-gallery/27980283-board-1574941744979-1000x1000.jpg",
  "/store-gallery/27980283-board-1682757842584-1000x1000-2.jpg",
  "/store-gallery/27980283-board-1682757842584-1000x1000.jpg",
  "/store-gallery/27980283-board-1734695186667-1000x1000.jpg",
  "/store-gallery/27980283-board-1779454152448-1000x1000.png",
  "/store-gallery/27980283-location-1563882719208-1000x1000.jpg",
  "/store-gallery/27980283-location-1584100365282-1000x1000.jpg",
  "/store-gallery/27980283-location-1584100369253-1000x1000.jpg",
  "/store-gallery/27980283-location-1652168517494-1000x1000.jpg",
  "/store-gallery/27980283-location-1655543335975-1000x1000.jpg",
  "/store-gallery/27980283-location-1655543336935-1000x1000.jpg",
  "/store-gallery/27980283-location-1657621929107-1000x1000.jpg",
  "/store-gallery/27980283-location-1657621930772-1000x1000.jpg",
  "/store-gallery/27980283-location-1659607283511-1000x1000.jpg",
  "/store-gallery/27980283-location-1660989168128-1000x1000.jpg",
  "/store-gallery/27980283-location-1662980062470-1000x1000.jpg",
  "/store-gallery/27980283-location-1662980064459-1000x1000.jpg",
  "/store-gallery/27980283-location-1686144457362-1000x1000.jpg",
  "/store-gallery/27980283-location-1687429765543-1000x1000.jpg",
  "/store-gallery/27980283-location-1687429767684-1000x1000.jpg",
  "/store-gallery/27980283-location-1687429771237-1000x1000.jpg",
  "/store-gallery/27980283-location-1689774902067-1000x1000.jpg",
  "/store-gallery/27980283-location-1689774907502-1000x1000.jpg",
  "/store-gallery/27980283-location-1696423751124-1000x1000.jpg",
  "/store-gallery/27980283-location-1696578330032-1000x1000.jpg",
  "/store-gallery/27980283-location-1696578330797-1000x1000.jpg",
  "/store-gallery/27980283-location-1696578335137-1000x1000.jpg",
  "/store-gallery/27980283-location-1696578336397-1000x1000.jpg",
  "/store-gallery/27980283-location-1701419655271-1000x1000.jpg",
  "/store-gallery/27980283-location-1725627609843-1000x1000.jpg",
  "/store-gallery/27980283-location-1734695187164-1000x1000.jpg",
  "/store-gallery/27980283-location-1734695187356-1000x1000.jpg",
  "/store-gallery/27980283-location-1734695187540-1000x1000.jpg",
  "/store-gallery/27980283-location-1734695187755-1000x1000.jpg",
  "/store-gallery/27980283-location-1744022508920-1000x1000.png",
  "/store-gallery/27980283-location-1752915547623-1000x1000.png",
  "/store-gallery/27980283-location-1755859132033-1000x1000.png",
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [slide, setSlide] = useState(0);
  const [edit, setEdit] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const t = copy[lang];
  useEffect(() => { const timer = setInterval(() => setSlide(s => (s + 1) % heroImages.length), 5000); return () => clearInterval(timer); }, []);

  return <main className={edit ? "editing" : ""}>
    <div className="topline"><span>☎ +91 93361 27037</span><span>{t.since}</span><span>Mulganj, Kanpur</span></div>
    <header>
      <a className="brand" href="#home"><img src="/logo.png" alt="Soni Machinery Stores"/><span><b>SONI</b><small>MACHINERY STORES · 1974</small></span></a>
      <nav>{t.nav.map((n,i)=><a key={n} href={["#home","#legacy","#products","#services","#gallery","#contact"][i]}>{n}</a>)}</nav>
      <div className="header-actions"><button className="lang" onClick={()=>setLang(lang === "en" ? "hi" : "en")}>{lang === "en" ? "हिंदी" : "English"}</button><a className="btn small" href="#contact">{lang === "en" ? "Enquire now" : "पूछताछ करें"}</a></div>
    </header>

    <section className="hero" id="home" style={{backgroundImage:`linear-gradient(90deg,rgba(5,28,16,.88),rgba(5,28,16,.18)),url(${heroImages[slide]})`}}>
      <div className="hero-content" contentEditable={edit} suppressContentEditableWarning>
        <p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="hero-tagline">{lang === "en" ? "Powering Progress, Serving with Integrity." : "सोनी मशीनरी — मशीनों में मज़बूती, सेवा में सच्चाई।"}</p><p className="lead">{t.sub}</p>
        <div className="hero-buttons"><a className="btn" href="#contact">{t.quote} →</a><a className="btn ghost" href="#products">{t.explore}</a></div>
        <div className="trust"><b>52+</b><span>{lang === "en" ? "years of dependable service" : "वर्षों की भरोसेमंद सेवा"}</span><i></i><b>2</b><span>{lang === "en" ? "generations of experience" : "पीढ़ियों का अनुभव"}</span></div>
      </div>
      <div className="dots">{heroImages.map((_,i)=><button key={i} aria-label={`Slide ${i+1}`} className={i===slide?"active":""} onClick={()=>setSlide(i)}/>)}</div>
    </section>

    <section className="legacy section legacy-redesign" id="legacy">
      <div className="legacy-heading"><div><div className="section-kicker">OUR LEGACY · हमारी विरासत</div><h2 contentEditable={edit} suppressContentEditableWarning>{t.story}</h2></div><p className="intro" contentEditable={edit} suppressContentEditableWarning>{t.storyp}</p></div>
      <div className="legacy-feature">
        <div className="founder-portrait"><img src="/gurdeep-soni.png" alt="Gurdeep Singh Soni, founder of Soni Machinery Stores"/><span className="year-mark">1974</span></div>
        <div className="founder-story"><span>FOUNDER · संस्थापक</span><h3>Gurdeep Singh Soni</h3><blockquote>{lang === "en" ? "Understand what the customer needs, offer dependable machinery at a fair price, and build relationships that last." : "ग्राहक की जरूरत समझें, उचित मूल्य पर भरोसेमंद मशीन दें और ऐसे रिश्ते बनाएँ जो पीढ़ियों तक चलें।"}</blockquote><p>{lang === "en" ? "From Kanpur’s historic Latouche Road machinery market, he laid the foundation for a family enterprise built on practical knowledge, honest guidance and responsibility beyond the sale." : "कानपुर के ऐतिहासिक लाटूश रोड मशीनरी बाजार से उन्होंने व्यावहारिक ज्ञान, ईमानदार सलाह और बिक्री के बाद भी जिम्मेदारी निभाने वाले पारिवारिक व्यवसाय की नींव रखी।"}</p></div>
        <div className="next-generation"><img src="/sumeet-soni.png" alt="Sumeet Singh Soni, second generation proprietor"/><div><span>SECOND GENERATION · दूसरी पीढ़ी</span><h3>Sumeet Singh Soni</h3><p>{lang === "en" ? "Carrying the founder’s values forward with decades of hands-on machinery experience." : "दशकों के व्यावहारिक मशीनरी अनुभव के साथ संस्थापक के मूल्यों को आगे बढ़ा रहे हैं।"}</p></div></div>
      </div>
      <div className="purpose-grid"><article><span>01 · OUR VISION</span><h3>{lang === "en" ? "The most trusted machinery partner for farmers, businesses and communities across Uttar Pradesh." : "उत्तर प्रदेश के किसानों, व्यवसायों और समुदायों का सबसे भरोसेमंद मशीनरी साथी बनना।"}</h3></article><article><span>02 · OUR MISSION</span><h3>{lang === "en" ? "The right machine for the right job, at a fair price—backed by genuine guidance and dependable service." : "सही काम के लिए सही मशीन, उचित मूल्य पर—सच्ची सलाह और भरोसेमंद सेवा के साथ।"}</h3></article><article className="legacy-promise"><span>OUR PROMISE · हमारा वादा</span><p>{lang === "en" ? "Generations of experience. Practical advice. Dependable machinery. Honest service." : "पीढ़ियों का अनुभव। व्यावहारिक सलाह। भरोसेमंद मशीनरी। ईमानदार सेवा।"}</p></article></div>
    </section>

    <section className="products section" id="products"><div className="section-head"><div><div className="section-kicker">OUR RANGE · हमारी रेंज</div><h2>{t.products}</h2><p>{t.productSub}</p></div><a className="text-link" href="#contact">{lang === "en" ? "Request full catalogue →" : "पूरी सूची माँगें →"}</a></div>
      <div className="category-panel" role="tablist" aria-label={lang === "en" ? "Product categories" : "उत्पाद श्रेणियाँ"}>{productCategories.map(category => {const count = category.id === "all" ? products.length : productCategoryMap.filter(item => item === category.id).length; return <button key={category.id} role="tab" aria-selected={activeCategory === category.id} className={activeCategory === category.id ? "active" : ""} onClick={()=>setActiveCategory(category.id)}><span>{lang === "en" ? category.en : category.hi}</span><small>{lang === "en" ? category.noteEn : category.noteHi}</small><b>{String(count).padStart(2,"0")}</b></button>})}</div>
      <div className="category-result"><span>{lang === "en" ? "Showing" : "दिखाए जा रहे हैं"}</span><b>{activeCategory === "all" ? (lang === "en" ? "All products" : "सभी उत्पाद") : (lang === "en" ? productCategories.find(c=>c.id===activeCategory)?.en : productCategories.find(c=>c.id===activeCategory)?.hi)}</b></div>
      <div className="product-grid">{products.map((p,i)=>({p,i})).filter(({i})=>activeCategory === "all" || productCategoryMap[i] === activeCategory).map(({p,i})=><article className="product-card" key={p[0]}><div className="product-image"><img src={`/products/${p[4]}`} alt={lang === "en" ? p[0] : p[1]}/><span>{String(i+1).padStart(2,"0")}</span><em>{lang === "en" ? productCategories.find(c=>c.id===productCategoryMap[i])?.en : productCategories.find(c=>c.id===productCategoryMap[i])?.hi}</em></div><div className="product-copy" contentEditable={edit} suppressContentEditableWarning><h3>{lang === "en" ? p[0] : p[1]}</h3><p>{lang === "en" ? p[2] : p[3]}</p><a href="#contact">{lang === "en" ? "Enquire" : "पूछताछ"} →</a></div></article>)}</div>
    </section>

    <section className="services section" id="services"><div className="section-kicker light">WHAT WE DO · हमारी सेवाएँ</div><h2>{t.services}</h2><div className="service-grid">{[
      ["01","Requirement guidance","जरूरत के अनुसार सलाह","We listen first, then recommend machinery suited to your work and budget."],
      ["02","Product demonstration","उत्पाद प्रदर्शन","Clear guidance on operation, care and practical use before purchase."],
      ["03","Genuine spares","असली स्पेयर पार्ट्स","Support with compatible accessories and essential replacement parts."],
      ["04","After-sales support","बिक्री के बाद सहायता","Dependable help and direction when your machine needs attention."],
    ].map(s=><article key={s[0]}><span>{s[0]}</span><h3>{lang === "en" ? s[1] : s[2]}</h3><p>{lang === "en" ? s[3] : "मशीन खरीदने से पहले और बाद तक सरल, व्यावहारिक और भरोसेमंद सहायता।"}</p></article>)}</div></section>

    <section className="dealers section"><div className="section-kicker">TRUSTED BRANDS · विश्वसनीय ब्रांड</div><h2>{t.dealers}</h2><p>{lang === "en" ? "Brand logos and authorisations shown here are placeholders and ready to be replaced." : "यहाँ ब्रांड लोगो और अधिकृत विवरण अभी नमूने हैं और बदले जा सकते हैं।"}</p><div className="brand-row">{["HONDA","KIRLOSKAR","VST SHAKTI","KISANKRAFT","MAHINDRA","TEXMO"].map(b=><div key={b}>{b}<small>PLACEHOLDER</small></div>)}</div></section>

    <section className="gallery section store-gallery-section" id="gallery"><div className="section-head"><div><div className="section-kicker">INSIDE SONI MACHINERY · सोनी मशीनरी की झलक</div><h2>{lang === "en" ? "A working legacy, captured over the years." : "वर्षों से चलती आ रही विरासत की झलक।"}</h2></div><p>{lang === "en" ? "Real moments from our Latouche Road store—our people, machinery, customers and the everyday work behind five decades of trust." : "हमारे लाटूश रोड स्टोर के वास्तविक पल—हमारे लोग, मशीनरी, ग्राहक और पाँच दशकों के विश्वास के पीछे का रोज़मर्रा का काम।"}</p></div><div className="store-masonry">{storeGallery.slice(0,showAllGallery ? storeGallery.length : 12).map((src,i)=><figure key={src}><img src={src} loading="lazy" alt={`${i < 6 ? "Soni Machinery Stores exterior and team" : "Machinery and equipment inside Soni Machinery Stores"} ${i+1}`}/><span>{String(i+1).padStart(2,"0")}</span></figure>)}</div><div className="gallery-action"><button className="btn" onClick={()=>setShowAllGallery(!showAllGallery)}>{showAllGallery ? (lang === "en" ? "Show less" : "कम दिखाएँ") : (lang === "en" ? `View all ${storeGallery.length} photographs` : `सभी ${storeGallery.length} तस्वीरें देखें`)}</button></div></section>

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

    <section className="big-cta" id="contact"><p>ESTD. 1974 · KANPUR</p><h2>{t.contact}</h2><div><a className="btn cream" href="tel:+919336127037">☎ {lang === "en" ? "Call now" : "अभी कॉल करें"}</a><a className="btn outline" href="https://wa.me/919336127037?text=Hello%20Soni%20Machinery%20Stores%2C%20I%20would%20like%20to%20enquire%20about%20a%20machine.">◉ WhatsApp</a><a className="btn outline" href="https://wa.me/919336127037?text=Hello%20Soni%20Machinery%20Stores%2C%20I%20would%20like%20to%20book%20an%20appointment.">▣ {lang === "en" ? "Book appointment" : "अपॉइंटमेंट लें"}</a></div></section>

    <section className="contact section"><div><div className="section-kicker">VISIT OUR STORE · हमारे स्टोर आएँ</div><h2>Soni Machinery Stores</h2><p>Shop No. 77/156-G, Latouche Road, near Hanumaan Mandir, Mulganj Crossing, Mulganj, Kanpur, Uttar Pradesh 208001</p><p><b>{lang === "en" ? "One-stop machinery destination:" : "हर तरह की मशीनरी का एक ही स्थान:"}</b> {lang === "en" ? "agricultural, dairy, commercial, workshop and industrial machinery—including tillers, weeders, sprayers, pumps, motors, dairy equipment, flour mills, power tools and more." : "कृषि, डेयरी, कमर्शियल, वर्कशॉप और औद्योगिक मशीनरी—टिलर, वीडर, स्प्रेयर, पंप, मोटर, डेयरी उपकरण, आटा चक्की, पावर टूल्स और बहुत कुछ।"}</p><div className="contact-links"><a href="tel:+919336127037">☎ +91 93361 27037 <small>PRIMARY</small></a><a href="tel:+919140360224">☎ +91 91403 60224</a><a href="https://wa.me/919336127037?text=Hello%20Soni%20Machinery%20Stores%2C%20I%20would%20like%20to%20enquire%20about%20a%20machine.">◉ WhatsApp: +91 93361 27037</a><a href="https://www.google.com/maps/dir//Soni+Machinery+Stores,+Shop+No:77,+156-G,+Latouche+Rd,+near+Hanumaan+Mandir,+Mulganj+Crossing,+Mulganj,+Kanpur,+Uttar+Pradesh+208001/@26.4785737,80.3101676,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x399c475e062c557d:0x830ec0d68990b8e2!2m2!1d80.3470055!2d26.4659775?entry=ttu" target="_blank" rel="noreferrer">↗ {lang === "en" ? "Get directions" : "दिशा-निर्देश पाएँ"}</a><a href="/soni-machinery-brochure.pdf" download>↓ {lang === "en" ? "Download brochure" : "ब्रोशर डाउनलोड करें"}</a></div></div><iframe title="Soni Machinery Stores location" src="https://www.google.com/maps?q=Soni%20Machinery%20Stores%2077%2F156-G%20Latouche%20Road%20Mulganj%20Kanpur%20208001&output=embed" loading="lazy"/></section>

    <footer><img src="/logo.png" alt="Soni Machinery Stores"/><div><b>SONI MACHINERY STORES</b><span>{lang === "en" ? "Powering Progress, Serving with Integrity." : "मशीनों में मज़बूती, सेवा में सच्चाई।"}</span></div><p>© 2026 · A legacy business since 1974</p></footer>
    <div className="floating"><a href="https://wa.me/919336127037?text=Hello%20Soni%20Machinery%20Stores%2C%20I%20would%20like%20to%20enquire%20about%20a%20machine." aria-label="WhatsApp">◉</a><a href="tel:+919336127037" aria-label="Call">☎</a></div>
    <button className="edit-toggle" onClick={()=>setEdit(!edit)}>{edit ? "✓ Finish editing" : "✎ Edit page"}</button>
    {edit && <div className="edit-note">Editing mode is on — click any highlighted text to change it. This preview keeps changes until refresh.</div>}
  </main>;
}
