"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "hi";

type ProductCategory = "all" | "dairy" | "cleaning" | "motors" | "pumps" | "agriculture";

type Product = {category: Exclude<ProductCategory,"all">; brand: string; nameEn: string; nameHi: string; capacity: string; detailsEn: string; detailsHi: string; image: string};

const products: Product[] = [
  {category:"dairy",brand:"Kamdhenu",nameEn:"Cream Separator 60 LPH",nameHi:"क्रीम सेपरेटर 60 एलपीएच",capacity:"60 LPH",detailsEn:"For small dairy farms and low-volume milk separation.",detailsHi:"छोटे डेयरी फार्म और कम मात्रा में दूध से क्रीम अलग करने के लिए।",image:"image1.png"},
  {category:"dairy",brand:"Kamdhenu",nameEn:"Cream Separator 165 LPH",nameHi:"क्रीम सेपरेटर 165 एलपीएच",capacity:"165 LPH",detailsEn:"For dairy farms and milk collection points.",detailsHi:"डेयरी फार्म और दूध संग्रह केंद्रों के लिए।",image:"image2.png"},
  {category:"dairy",brand:"Kamdhenu",nameEn:"Cream Separator 300 LPH",nameHi:"क्रीम सेपरेटर 300 एलपीएच",capacity:"300 LPH",detailsEn:"For small commercial dairy processing.",detailsHi:"छोटे व्यावसायिक डेयरी प्रसंस्करण के लिए।",image:"image3.png"},
  {category:"dairy",brand:"Kamdhenu",nameEn:"Cream Separator 450 LPH",nameHi:"क्रीम सेपरेटर 450 एलपीएच",capacity:"450 LPH",detailsEn:"For medium-scale dairy processing.",detailsHi:"मध्यम स्तर के डेयरी प्रसंस्करण के लिए।",image:"image4.png"},
  {category:"dairy",brand:"Kamdhenu",nameEn:"Cream Separator 600 LPH",nameHi:"क्रीम सेपरेटर 600 एलपीएच",capacity:"600 LPH",detailsEn:"For commercial dairy processing.",detailsHi:"व्यावसायिक डेयरी प्रसंस्करण के लिए।",image:"image5.png"},
  {category:"dairy",brand:"Kamdhenu",nameEn:"Cream Separator 1000 LPH",nameHi:"क्रीम सेपरेटर 1000 एलपीएच",capacity:"1000 LPH",detailsEn:"High-throughput equipment for large dairy operations.",detailsHi:"बड़े डेयरी संचालन के लिए उच्च क्षमता वाला उपकरण।",image:"image6.png"},
  {category:"dairy",brand:"Master",nameEn:"ClaLactomat Rapid with Stirrer (LM2)",nameHi:"क्लैलैक्टोमैट रैपिड स्टिरर के साथ (एलएम2)",capacity:"LM2",detailsEn:"Digital milk analyser supplied with a dedicated stirrer.",detailsHi:"समर्पित स्टिरर के साथ डिजिटल मिल्क एनालाइज़र।",image:"milk-analyser-clalactomat-rapid-lm2.png"},
  {category:"dairy",brand:"Master",nameEn:"Classic DPS with Ultrasonic Stirrer & 60 Kg Scale",nameHi:"क्लासिक डीपीएस अल्ट्रासोनिक स्टिरर और 60 किग्रा स्केल के साथ",capacity:"DPS · 60 Kg scale",detailsEn:"Milk analyser setup with ultrasonic stirrer and weighing scale.",detailsHi:"अल्ट्रासोनिक स्टिरर और वजन मापने वाले स्केल के साथ मिल्क एनालाइज़र सेटअप।",image:"milk-analyser-classic-dps-ultrasonic-scale.png"},
  {category:"dairy",brand:"Master",nameEn:"Classic LM2 with Stirrer",nameHi:"क्लासिक एलएम2 स्टिरर के साथ",capacity:"LM2",detailsEn:"Digital milk analyser paired with a separate stirrer.",detailsHi:"अलग स्टिरर के साथ डिजिटल मिल्क एनालाइज़र।",image:"milk-analyser-classic-lm2-stirrer.png"},
  {category:"dairy",brand:"Master",nameEn:"Classic with Printer & Stirrer",nameHi:"क्लासिक प्रिंटर और स्टिरर के साथ",capacity:"Printer & stirrer",detailsEn:"Milk analyser configuration with integrated printing and a stirrer.",detailsHi:"प्रिंटिंग सुविधा और स्टिरर वाला मिल्क एनालाइज़र कॉन्फ़िगरेशन।",image:"milk-analyser-classic-printer-stirrer.png"},
  {category:"dairy",brand:"Master",nameEn:"Eco with Stirrer",nameHi:"इको स्टिरर के साथ",capacity:"Eco series",detailsEn:"Compact digital milk analyser supplied with a stirrer.",detailsHi:"स्टिरर के साथ कॉम्पैक्ट डिजिटल मिल्क एनालाइज़र।",image:"milk-analyser-master-eco-stirrer.png"},
  {category:"dairy",brand:"Sumo",nameEn:"Impart AC/DC with Weighing Scale",nameHi:"इम्पार्ट एसी/डीसी वजन स्केल के साथ",capacity:"AC/DC · weighing scale",detailsEn:"AC/DC milk analyser setup supplied with a weighing scale.",detailsHi:"वजन मापने वाले स्केल के साथ एसी/डीसी मिल्क एनालाइज़र सेटअप।",image:"milk-analyser-sumo-impart-ac-dc-scale.png"},
  {category:"dairy",brand:"National",nameEn:"Khoya Making Machine — Electric & Gas",nameHi:"खोया बनाने की मशीन — इलेक्ट्रिक और गैस",capacity:"Electric & gas",detailsEn:"Khoya making machine designed for electric or gas operation.",detailsHi:"इलेक्ट्रिक या गैस से चलने के लिए बनाई गई खोया मशीन।",image:"khoya-machine-electric-gas.png"},
  {category:"dairy",brand:"National",nameEn:"Khoya Making Machine — Electric, Diesel & Gas",nameHi:"खोया बनाने की मशीन — इलेक्ट्रिक, डीज़ल और गैस",capacity:"Electric, diesel & gas",detailsEn:"Khoya making machine designed for electric, diesel or gas operation.",detailsHi:"इलेक्ट्रिक, डीज़ल या गैस से चलने के लिए बनाई गई खोया मशीन।",image:"khoya-machine-electric-diesel-gas.png"},
  {category:"cleaning",brand:"Everest",nameEn:"Scooter Washer 100 PSI",nameHi:"स्कूटर वॉशर 100 पीएसआई",capacity:"100 PSI",detailsEn:"Compact washer for scooters and two-wheelers.",detailsHi:"स्कूटर और दोपहिया वाहनों के लिए कॉम्पैक्ट वॉशर।",image:"image7.png"},
  {category:"cleaning",brand:"Everest",nameEn:"Car Washer Single Cylinder 175 PSI",nameHi:"कार वॉशर सिंगल सिलेंडर 175 पीएसआई",capacity:"175 PSI",detailsEn:"Single-cylinder washer for cars and trucks.",detailsHi:"कार और ट्रक की सफाई के लिए सिंगल-सिलेंडर वॉशर।",image:"image8.png"},
  {category:"cleaning",brand:"Everest",nameEn:"Car Washer Single Cylinder 250 PSI",nameHi:"कार वॉशर सिंगल सिलेंडर 250 पीएसआई",capacity:"250 PSI",detailsEn:"Premium single-cylinder equipment for vehicle washing.",detailsHi:"वाहन धुलाई के लिए प्रीमियम सिंगल-सिलेंडर उपकरण।",image:"image9.png"},
  {category:"cleaning",brand:"Everest",nameEn:"Car Washer Double Cylinder 300 PSI",nameHi:"कार वॉशर डबल सिलेंडर 300 पीएसआई",capacity:"300 PSI",detailsEn:"Double-cylinder washer for higher-throughput vehicle cleaning.",detailsHi:"अधिक क्षमता वाली वाहन सफाई के लिए डबल-सिलेंडर वॉशर।",image:"image10.png"},
  {category:"cleaning",brand:"Everest",nameEn:"Industrial Washer 400 PSI",nameHi:"इंडस्ट्रियल वॉशर 400 पीएसआई",capacity:"400 PSI",detailsEn:"Heavy-duty equipment for industrial cleaning.",detailsHi:"औद्योगिक सफाई के लिए हेवी-ड्यूटी उपकरण।",image:"image11.png"},
  {category:"motors",brand:"SONEE-DX",nameEn:"Electric Motor 1 HP",nameHi:"इलेक्ट्रिक मोटर 1 एचपी",capacity:"1 HP · SDX01",detailsEn:"Single-phase, four-pole, foot-mounted general-purpose motor.",detailsHi:"सिंगल-फेज, चार-पोल, फुट-माउंटेड सामान्य उपयोग की मोटर।",image:"image12.png"},
  {category:"motors",brand:"SONEE-DX",nameEn:"Electric Motor 2 HP",nameHi:"इलेक्ट्रिक मोटर 2 एचपी",capacity:"2 HP · SDX02",detailsEn:"Single-phase, four-pole, foot-mounted machinery drive.",detailsHi:"सिंगल-फेज, चार-पोल, फुट-माउंटेड मशीनरी ड्राइव।",image:"image13.png"},
  {category:"motors",brand:"SONEE-DX",nameEn:"Electric Motor 3 HP",nameHi:"इलेक्ट्रिक मोटर 3 एचपी",capacity:"3 HP · SDX03",detailsEn:"Single-phase, four-pole motor for general machinery.",detailsHi:"सामान्य मशीनरी के लिए सिंगल-फेज, चार-पोल मोटर।",image:"image14.png"},
  {category:"motors",brand:"SONEE-DX",nameEn:"Electric Motor 5 HP",nameHi:"इलेक्ट्रिक मोटर 5 एचपी",capacity:"5 HP · SONEE-DX-5",detailsEn:"Heavy general-purpose drive with cast-iron body.",detailsHi:"कास्ट-आयरन बॉडी वाली हेवी सामान्य उपयोग की ड्राइव।",image:"image15.png"},
  {category:"pumps",brand:"Texmo",nameEn:"DMS-2",nameHi:"डीएमएस-2",capacity:"DMS-2",detailsEn:"Slow-speed self-priming pump for domestic supply, tank filling and washing.",detailsHi:"घरेलू जल आपूर्ति, टंकी भरने और धुलाई के लिए धीमी गति का सेल्फ-प्राइमिंग पंप।",image:"image16.png"},
  {category:"pumps",brand:"Texmo",nameEn:"DMS-2 (N)",nameHi:"डीएमएस-2 (एन)",capacity:"DMS-02N · 0.5 HP",detailsEn:"Self-priming domestic water-supply pump.",detailsHi:"घरेलू जल आपूर्ति के लिए सेल्फ-प्राइमिंग पंप।",image:"image17.png"},
  {category:"pumps",brand:"Texmo",nameEn:"DMS-3",nameHi:"डीएमएस-3",capacity:"DMS-3 · 1 HP",detailsEn:"Self-priming pump for tank filling, pressure boosting and washing.",detailsHi:"टंकी भरने, दबाव बढ़ाने और धुलाई के लिए सेल्फ-प्राइमिंग पंप।",image:"image18.png"},
  {category:"pumps",brand:"Texmo",nameEn:"DMS-3 (N)",nameHi:"डीएमएस-3 (एन)",capacity:"DMS-03N · 1 HP",detailsEn:"Domestic monoblock pump for reliable water supply.",detailsHi:"भरोसेमंद जल आपूर्ति के लिए घरेलू मोनोब्लॉक पंप।",image:"image19.png"},
  {category:"pumps",brand:"Texmo",nameEn:"SCM 1150",nameHi:"एससीएम 1150",capacity:"SCM 1150",detailsEn:"Surface water pump for everyday transfer requirements.",detailsHi:"दैनिक जल स्थानांतरण आवश्यकताओं के लिए सरफेस वॉटर पंप।",image:"image20.png"},
  {category:"pumps",brand:"Texmo",nameEn:"ACS-1575",nameHi:"एसीएस-1575",capacity:"ACS-1575",detailsEn:"Surface pumping solution for domestic and commercial use.",detailsHi:"घरेलू और व्यावसायिक उपयोग के लिए सरफेस पंपिंग समाधान।",image:"image21.png"},
  {category:"pumps",brand:"Texmo",nameEn:"ACS-2280",nameHi:"एसीएस-2280",capacity:"ACS-2280",detailsEn:"Higher-duty surface pumping equipment.",detailsHi:"अधिक क्षमता वाला सरफेस पंपिंग उपकरण।",image:"image22.png"},
  {category:"pumps",brand:"Texmo",nameEn:"4-inch Submersible",nameHi:"4-इंच सबमर्सिबल",capacity:"4-inch borewell series",detailsEn:"For domestic supply, irrigation, livestock and buildings.",detailsHi:"घरेलू आपूर्ति, सिंचाई, पशुपालन और भवनों के लिए।",image:"image23.png"},
  {category:"pumps",brand:"Texmo",nameEn:"6-inch Submersible",nameHi:"6-इंच सबमर्सिबल",capacity:"6-inch borewell series",detailsEn:"For farm and commercial borewells.",detailsHi:"कृषि और व्यावसायिक बोरवेल के लिए।",image:"image24.png"},
  {category:"pumps",brand:"Texmo",nameEn:"7-inch Submersible",nameHi:"7-इंच सबमर्सिबल",capacity:"7-inch borewell series",detailsEn:"For high-volume irrigation, community and industrial water supply.",detailsHi:"उच्च क्षमता वाली सिंचाई, सामुदायिक और औद्योगिक जल आपूर्ति के लिए।",image:"image25.png"},
  {category:"agriculture",brand:"Balwaan",nameEn:"Power Weeder",nameHi:"पावर वीडर",capacity:"BP-650 · 7 HP",detailsEn:"For efficient weeding and soil preparation.",detailsHi:"कुशल निराई और मिट्टी तैयार करने के लिए।",image:"image26.png"},
  {category:"agriculture",brand:"Balwaan",nameEn:"Mini Power Tiller",nameHi:"मिनी पावर टिलर",capacity:"BW-25 · 63 cc",detailsEn:"Compact tiller for kitchen gardens, beds and narrow rows.",detailsHi:"किचन गार्डन, क्यारियों और संकरी कतारों के लिए कॉम्पैक्ट टिलर।",image:"image27.png"},
  {category:"agriculture",brand:"Balwaan",nameEn:"Earth Auger",nameHi:"अर्थ ऑगर",capacity:"BE-52 · 52 cc",detailsEn:"For plantation, fencing and post holes.",detailsHi:"पौधारोपण, बाड़ और खंभों के गड्ढों के लिए।",image:"image28.png"},
  {category:"agriculture",brand:"Balwaan",nameEn:"Chainsaw",nameHi:"चेनसॉ",capacity:"CS-520 · 52 cc · 18 inch",detailsEn:"For firewood, pruning and garden maintenance.",detailsHi:"जलाऊ लकड़ी, छंटाई और बगीचे के रखरखाव के लिए।",image:"image29.png"},
  {category:"agriculture",brand:"Balwaan",nameEn:"Brush Cutter",nameHi:"ब्रश कटर",capacity:"BX-35 · 35 cc",detailsEn:"For grass, brush, pruning and light tilling.",detailsHi:"घास, झाड़ियों, छंटाई और हल्की जुताई के लिए।",image:"image30.png"},
  {category:"agriculture",brand:"Balwaan",nameEn:"Petrol Pump Set",nameHi:"पेट्रोल पंप सेट",capacity:"WP-22R · 7 HP",detailsEn:"For agriculture, construction and high-volume water transfer.",detailsHi:"कृषि, निर्माण और अधिक मात्रा में जल स्थानांतरण के लिए।",image:"image31.png"},
  {category:"agriculture",brand:"Balwaan",nameEn:"Seeder",nameHi:"सीडर",capacity:"S-12 · 12 teeth",detailsEn:"Manual multi-crop seed placement for fields and gardens.",detailsHi:"खेत और बगीचों में अनेक फसलों की बुवाई के लिए मैनुअल सीडर।",image:"image32.png"},
];

const productCategories: {id: ProductCategory; en: string; hi: string; noteEn: string; noteHi: string}[] = [
  {id:"all", en:"All Products", hi:"सभी उत्पाद", noteEn:"Complete range", noteHi:"पूरी रेंज"},
  {id:"dairy", en:"Dairy Equipment", hi:"डेयरी उपकरण", noteEn:"Cream separation", noteHi:"क्रीम सेपरेशन"},
  {id:"cleaning", en:"Cleaning Equipment", hi:"सफाई उपकरण", noteEn:"Vehicle & industrial", noteHi:"वाहन और औद्योगिक"},
  {id:"motors", en:"Electric Motors", hi:"इलेक्ट्रिक मोटर", noteEn:"General-purpose drives", noteHi:"सामान्य उपयोग ड्राइव"},
  {id:"pumps", en:"Water Pumps", hi:"वॉटर पंप", noteEn:"Surface & submersible", noteHi:"सरफेस और सबमर्सिबल"},
  {id:"agriculture", en:"Agricultural Machinery", hi:"कृषि मशीनरी", noteEn:"Field & crop solutions", noteHi:"खेत और फसल समाधान"},
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
    products: "Machinery for every requirement", productSub: "Explore 40 products with catalogue-matched brands, capacities and photographs.",
    services: "Service beyond the sale", dealers: "We are authorised dealers of", gallery: "Life in motion", testimonials: "Relationships that last", faq: "Frequently asked questions", contact: "Let’s find the right machine for your work.",
  },
  hi: {
    nav: ["होम", "विरासत", "उत्पाद", "सेवाएँ", "गैलरी", "संपर्क"],
    eyebrow: "कानपुर का विश्वसनीय मशीनरी केंद्र • स्थापना 1974",
    title: "मशीनरी जो आपके जितनी मेहनत करे।",
    sub: "भरोसेमंद कृषि, डेयरी और सामान्य उपयोग की मशीनरी—पीढ़ियों के अनुभव, सही सलाह और ईमानदार सेवा के साथ।",
    quote: "सही मशीन चुनें", explore: "उत्पाद देखें", since: "1974 से विश्वास की विरासत",
    story: "कानपुर में शुरुआत। पीढ़ियों का विश्वास।",
    storyp: "लाटूश रोड से, सोनी मशीनरी स्टोर्स किसानों, ठेकेदारों, छोटे व्यवसायों और औद्योगिक ग्राहकों की सेवा एक स्थायी वादे के साथ करता आया है: जरूरत समझें, सही मशीन सुझाएँ और हर बिक्री के बाद साथ निभाएँ।",
    products: "हर जरूरत के लिए मशीनरी", productSub: "कैटलॉग से मिलाए गए ब्रांड, क्षमता और तस्वीरों सहित 40 उत्पाद देखें।",
    services: "बिक्री के बाद भी सेवा", dealers: "हम इनके अधिकृत विक्रेता हैं", gallery: "खेत से प्रगति तक", testimonials: "रिश्ते जो चलते रहें", faq: "अक्सर पूछे जाने वाले सवाल", contact: "आपके काम के लिए सही मशीन चुनते हैं।",
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
  const assetBase = typeof window !== "undefined" && window.location.hostname.endsWith("github.io") ? "/sonimachinerystores" : "";
  useEffect(() => { const timer = setInterval(() => setSlide(s => (s + 1) % heroImages.length), 5000); return () => clearInterval(timer); }, []);

  return <main className={edit ? "editing" : ""}>
    <div className="topline"><span>☎ +91 93361 27037</span><span>{t.since}</span><span>Mulganj, Kanpur</span></div>
    <header>
      <a className="brand" href="#home"><img src={`${assetBase}/logo.png`} alt="Soni Machinery Stores"/><span><b>SONI</b><small>MACHINERY STORES · 1974</small></span></a>
      <nav>{t.nav.map((n,i)=><a key={n} href={["#home","#legacy","#products","#services","#gallery","#contact"][i]}>{n}</a>)}</nav>
      <div className="header-actions"><button className="lang" onClick={()=>setLang(lang === "en" ? "hi" : "en")}>{lang === "en" ? "हिंदी" : "English"}</button><a className="btn small" href="#contact">{lang === "en" ? "Enquire now" : "पूछताछ करें"}</a></div>
    </header>

    <section className="hero" id="home" style={{backgroundImage:`linear-gradient(90deg,rgba(5,28,16,.88),rgba(5,28,16,.18)),url(${assetBase}${heroImages[slide]})`}}>
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
        <div className="next-generation sumit-hero"><div className="generation-ribbon">{lang === "en" ? "THE LEGACY CONTINUES" : "विरासत जारी है"}</div><img src={`${assetBase}/sumeet-soni.png`} alt="Sumit Singh Soni, second generation proprietor"/><div><span>SECOND GENERATION · दूसरी पीढ़ी</span><h3>Sumit Singh Soni</h3><blockquote>{lang === "en" ? "Sell the right machine, at the right price, and stand behind what you sell." : "सही मशीन, सही मूल्य पर दें और जो बेचें उसके साथ पूरी जिम्मेदारी से खड़े रहें।"}</blockquote><p>{lang === "en" ? "Representing the second generation of Soni Machinery Stores, Sumit Singh Soni carries the business forward with decades of practical knowledge across agricultural machinery, pumps, motors, dairy equipment and general-purpose machinery." : "सोनी मशीनरी स्टोर्स की दूसरी पीढ़ी का प्रतिनिधित्व करते हुए, सुमित सिंह सोनी कृषि मशीनरी, पंप, मोटर, डेयरी उपकरण और सामान्य उपयोग की मशीनरी के दशकों के व्यावहारिक ज्ञान के साथ व्यवसाय को आगे बढ़ा रहे हैं।"}</p></div></div>
        <aside className="founder-card"><div className="founder-portrait"><img src={`${assetBase}/gurdeep-soni.png`} alt="Gurdeep Singh Soni, founder of Soni Machinery Stores"/><span className="year-mark">1974</span></div><div className="founder-story"><span>FOUNDER · संस्थापक</span><h3>Gurdeep Singh Soni</h3><blockquote>{lang === "en" ? "Understand what the customer needs, offer dependable machinery at a fair price, and build relationships that last." : "ग्राहक की जरूरत समझें, उचित मूल्य पर भरोसेमंद मशीन दें और ऐसे रिश्ते बनाएँ जो पीढ़ियों तक चलें।"}</blockquote><p>{lang === "en" ? "From Kanpur’s historic Latouche Road machinery market, he laid the foundation for a family enterprise built on practical knowledge, honest guidance and responsibility beyond the sale." : "कानपुर के ऐतिहासिक लाटूश रोड मशीनरी बाजार से उन्होंने व्यावहारिक ज्ञान, ईमानदार सलाह और बिक्री के बाद भी जिम्मेदारी निभाने वाले पारिवारिक व्यवसाय की नींव रखी।"}</p></div></aside>
      </div>
      <div className="purpose-grid"><article><span>01 · OUR VISION</span><h3>{lang === "en" ? "The most trusted machinery partner for farmers, businesses and communities across Uttar Pradesh." : "उत्तर प्रदेश के किसानों, व्यवसायों और समुदायों का सबसे भरोसेमंद मशीनरी साथी बनना।"}</h3></article><article><span>02 · OUR MISSION</span><h3>{lang === "en" ? "The right machine for the right job, at a fair price—backed by genuine guidance and dependable service." : "सही काम के लिए सही मशीन, उचित मूल्य पर—सच्ची सलाह और भरोसेमंद सेवा के साथ।"}</h3></article><article className="legacy-promise"><span>OUR PROMISE · हमारा वादा</span><p>{lang === "en" ? "Generations of experience. Practical advice. Dependable machinery. Honest service." : "पीढ़ियों का अनुभव। व्यावहारिक सलाह। भरोसेमंद मशीनरी। ईमानदार सेवा।"}</p></article></div>
    </section>

    <section className="products section" id="products"><div className="section-head"><div><div className="section-kicker">OUR RANGE · हमारी रेंज</div><h2>{t.products}</h2><p>{t.productSub}</p></div><a className="text-link" href="#contact">{lang === "en" ? "Request full catalogue →" : "पूरी सूची माँगें →"}</a></div>
      <div className="category-panel" role="tablist" aria-label={lang === "en" ? "Product categories" : "उत्पाद श्रेणियाँ"}>{productCategories.map(category => {const count = category.id === "all" ? products.length : products.filter(item => item.category === category.id).length; return <button key={category.id} role="tab" aria-selected={activeCategory === category.id} className={activeCategory === category.id ? "active" : ""} onClick={()=>setActiveCategory(category.id)}><span>{lang === "en" ? category.en : category.hi}</span><small>{lang === "en" ? category.noteEn : category.noteHi}</small><b>{String(count).padStart(2,"0")}</b></button>})}</div>
      <div className="category-result"><span>{lang === "en" ? "Showing" : "दिखाए जा रहे हैं"}</span><b>{activeCategory === "all" ? (lang === "en" ? "All products" : "सभी उत्पाद") : (lang === "en" ? productCategories.find(c=>c.id===activeCategory)?.en : productCategories.find(c=>c.id===activeCategory)?.hi)}</b></div>
      <div className="product-grid">{products.map((p,i)=>({p,i})).filter(({p})=>activeCategory === "all" || p.category === activeCategory).map(({p,i})=><article className="product-card" key={`${p.brand}-${p.nameEn}`}><div className="product-image catalogue-image"><img src={`${assetBase}/products-catalogue/${p.image}`} alt={`${p.brand} ${lang === "en" ? p.nameEn : p.nameHi}`}/><span>{String(i+1).padStart(2,"0")}</span><em>{lang === "en" ? productCategories.find(c=>c.id===p.category)?.en : productCategories.find(c=>c.id===p.category)?.hi}</em></div><div className="product-copy" contentEditable={edit} suppressContentEditableWarning><small className="product-brand">{p.brand} · {p.capacity}</small><h3>{lang === "en" ? p.nameEn : p.nameHi}</h3><p>{lang === "en" ? p.detailsEn : p.detailsHi}</p><a href="#contact">{lang === "en" ? "Enquire" : "पूछताछ"} →</a></div></article>)}</div>
    </section>

    <section className="services section" id="services"><div className="section-kicker light">WHAT WE DO · हमारी सेवाएँ</div><h2>{t.services}</h2><div className="service-grid">{[
      ["01","Requirement guidance","जरूरत के अनुसार सलाह","We listen first, then recommend machinery suited to your work and budget."],
      ["02","Product demonstration","उत्पाद प्रदर्शन","Clear guidance on operation, care and practical use before purchase."],
      ["03","Genuine spares","असली स्पेयर पार्ट्स","Support with compatible accessories and essential replacement parts."],
      ["04","After-sales support","बिक्री के बाद सहायता","Dependable help and direction when your machine needs attention."],
    ].map(s=><article key={s[0]}><span>{s[0]}</span><h3>{lang === "en" ? s[1] : s[2]}</h3><p>{lang === "en" ? s[3] : "मशीन खरीदने से पहले और बाद तक सरल, व्यावहारिक और भरोसेमंद सहायता।"}</p></article>)}</div><aside className="kamdhenu-service"><img src={`${assetBase}/kamdhenu-logo.png`} alt="Kamdhenu authorised service and repair - Soni Machinery Stores Kanpur"/><div><small>{lang === "en" ? "AUTHORISED SERVICE & REPAIR" : "अधिकृत सेवा और मरम्मत"}</small><h3>{lang === "en" ? "Authorised Kamdhenu Service & Repair" : "कामधेनु की अधिकृत सेवा और मरम्मत"}</h3><p>{lang === "en" ? "Authorised assistance for Kamdhenu equipment, including service guidance, repairs and genuine support." : "कामधेनु उपकरणों के लिए अधिकृत सेवा मार्गदर्शन, मरम्मत और भरोसेमंद सहायता।"}</p></div></aside></section>

    <section className="dealers section authorised-dealers"><div className="section-kicker">{lang === "en" ? "TRUSTED BRANDS" : "विश्वसनीय ब्रांड"}</div><h2>{t.dealers}</h2><div className="brand-row dealer-logo-row">{[
      ["Everest & Sant Engineers", "everest-sant-engineers.png"],
      ["Kamdhenu", "kamdhenu.png"],
      ["SONEE-DX", "sonee-dx.png"],
      ["Texmo", "texmo.png"],
    ].map(([name,file])=><div key={name}><img loading="lazy" src={`${assetBase}/dealer-logos/${file}`} alt={`${name} authorised dealer logo - Soni Machinery Stores Kanpur`}/></div>)}</div></section>

    <section className="gallery section store-gallery-section" id="gallery"><div className="section-head"><div><div className="section-kicker">INSIDE SONI MACHINERY · सोनी मशीनरी की झलक</div><h2>{lang === "en" ? "A working legacy, captured over the years." : "वर्षों से चलती आ रही विरासत की झलक।"}</h2></div><p>{lang === "en" ? "Real moments from our Latouche Road store—our people, machinery, customers and the everyday work behind five decades of trust." : "हमारे लाटूश रोड स्टोर के वास्तविक पल—हमारे लोग, मशीनरी, ग्राहक और पाँच दशकों के विश्वास के पीछे का रोज़मर्रा का काम।"}</p></div><div className="store-masonry">{storeGallery.slice(0,showAllGallery ? storeGallery.length : 12).map((src,i)=><figure key={src}><img src={`${assetBase}${src}`} loading="lazy" alt={`${i < 6 ? "Soni Machinery Stores exterior and team" : "Machinery and equipment inside Soni Machinery Stores"} ${i+1}`}/><span>{String(i+1).padStart(2,"0")}</span></figure>)}</div><div className="gallery-action"><button className="btn" onClick={()=>setShowAllGallery(!showAllGallery)}>{showAllGallery ? (lang === "en" ? "Show less" : "कम दिखाएँ") : (lang === "en" ? `View all ${storeGallery.length} photographs` : `सभी ${storeGallery.length} तस्वीरें देखें`)}</button></div></section>

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

    <section className="contact section"><div><div className="section-kicker">VISIT OUR STORE · हमारे स्टोर आएँ</div><h2>Soni Machinery Stores</h2><p>Shop No. 77/156-G, Latouche Road, near Hanumaan Mandir, Mulganj Crossing, Mulganj, Kanpur, Uttar Pradesh 208001</p><p><b>{lang === "en" ? "One-stop machinery destination:" : "हर तरह की मशीनरी का एक ही स्थान:"}</b> {lang === "en" ? "agricultural, dairy, commercial, workshop and industrial machinery—including tillers, weeders, sprayers, pumps, motors, dairy equipment, flour mills, power tools and more." : "कृषि, डेयरी, कमर्शियल, वर्कशॉप और औद्योगिक मशीनरी—टिलर, वीडर, स्प्रेयर, पंप, मोटर, डेयरी उपकरण, आटा चक्की, पावर टूल्स और बहुत कुछ।"}</p><div className="contact-links"><a href="tel:+919336127037">☎ +91 93361 27037 <small>PRIMARY</small></a><a href="tel:+919140360224">☎ +91 91403 60224</a><a href="https://wa.me/919336127037?text=Hello%20Soni%20Machinery%20Stores%2C%20I%20would%20like%20to%20enquire%20about%20a%20machine.">◉ WhatsApp: +91 93361 27037</a><a href="https://www.google.com/maps/dir//Soni+Machinery+Stores,+Shop+No:77,+156-G,+Latouche+Rd,+near+Hanumaan+Mandir,+Mulganj+Crossing,+Mulganj,+Kanpur,+Uttar+Pradesh+208001/@26.4785737,80.3101676,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x399c475e062c557d:0x830ec0d68990b8e2!2m2!1d80.3470055!2d26.4659775?entry=ttu" target="_blank" rel="noreferrer">↗ {lang === "en" ? "Get directions" : "दिशा-निर्देश पाएँ"}</a><a href={`${assetBase}/soni-machinery-brochure.pdf`} download>↓ {lang === "en" ? "Download brochure" : "ब्रोशर डाउनलोड करें"}</a></div></div><iframe title="Soni Machinery Stores location" src="https://www.google.com/maps?q=Soni%20Machinery%20Stores%2077%2F156-G%20Latouche%20Road%20Mulganj%20Kanpur%20208001&output=embed" loading="lazy"/></section>

    <footer><img src={`${assetBase}/logo.png`} alt="Soni Machinery Stores"/><div><b>SONI MACHINERY STORES</b><span>{lang === "en" ? "Powering Progress, Serving with Integrity." : "मशीनों में मज़बूती, सेवा में सच्चाई।"}</span></div><p>© 2026 · A legacy business since 1974</p></footer>
    <div className="floating"><a href="https://wa.me/919336127037?text=Hello%20Soni%20Machinery%20Stores%2C%20I%20would%20like%20to%20enquire%20about%20a%20machine." aria-label="WhatsApp">◉</a><a href="tel:+919336127037" aria-label="Call">☎</a></div>
    <button className="edit-toggle" onClick={()=>setEdit(!edit)}>{edit ? "✓ Finish editing" : "✎ Edit page"}</button>
    {edit && <div className="edit-note">Editing mode is on — click any highlighted text to change it. This preview keeps changes until refresh.</div>}
  </main>;
}
