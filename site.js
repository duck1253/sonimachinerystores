(() => {
  document.documentElement.removeAttribute("hidden");
  const ga = (name, params = {}) => {
    if (typeof window.gtag === "function") window.gtag("event", name, params);
  };
  const quote = document.querySelector("#quote-modal");
  const detail = document.querySelector("#product-detail");
  let currentProduct = "General machinery enquiry";
  let hindiMode = false;
  const translations = new Map(Object.entries({
    "Home":"होम","Products":"उत्पाद","Services":"सेवाएँ","Legacy":"विरासत","Gallery":"गैलरी","Contact":"संपर्क","Enquire now":"अभी पूछताछ करें",
    "KANPUR'S TRUSTED MACHINERY HOUSE • ESTD. 1974":"कानपुर का विश्वसनीय मशीनरी केंद्र • स्थापना 1974","OUR RANGE ·":"हमारी रेंज ·","WHAT WE DO ·":"हमारी सेवाएँ ·","OUR LEGACY ·":"हमारी विरासत ·","INSIDE SONI MACHINERY ·":"सोनी मशीनरी की झलक ·","HELP CENTRE ·":"सहायता केंद्र ·","VISIT OUR STORE ·":"हमारे स्टोर आएँ ·","PRODUCT CATEGORY ·":"उत्पाद श्रेणी ·","CONTACT US ·":"संपर्क करें ·","SEND AN ENQUIRY ·":"पूछताछ भेजें ·","TRUSTED BRANDS ·":"विश्वसनीय ब्रांड ·","GET A QUOTE":"कीमत पूछें",
    "A legacy of trust since 1974":"1974 से विश्वास की विरासत","Mulganj, Kanpur":"मूलगंज, कानपुर","Search Products/Services":"उत्पाद/सेवाएँ खोजें","Search":"खोजें","Usually replies within 2 hours":"आमतौर पर 2 घंटे के भीतर जवाब मिलता है",
    "Dairy Equipment":"डेयरी उपकरण","Water Pumps":"वॉटर पंप","Electric Motors":"इलेक्ट्रिक मोटर","Agricultural Machinery":"कृषि मशीनरी","Cleaning Equipment":"सफाई उपकरण",
    "Machinery that works as hard as you do.":"मशीनरी जो आपके जितनी मेहनत करे।","Powering Progress, Serving with Integrity.":"प्रगति को शक्ति, सेवा में सच्चाई।","Dependable agricultural, dairy and general-purpose machinery—supported by practical advice and honest service across generations.":"भरोसेमंद कृषि, डेयरी और सामान्य उपयोग की मशीनरी—पीढ़ियों के अनुभव, सही सलाह और ईमानदार सेवा के साथ।","Get the right machine →":"सही मशीन चुनें →","Explore all 32 machinery products":"सभी 32 मशीनरी उत्पाद देखें",
    "Machinery for every requirement":"हर जरूरत के लिए मशीनरी","Explore 32 products with catalogue-matched brands, capacities and photographs.":"कैटलॉग से मिलाए गए ब्रांड, क्षमता और तस्वीरों सहित 32 उत्पाद देखें।","Browse the complete machinery catalogue →":"पूरी मशीनरी सूची देखें →",
    "Service beyond the sale":"बिक्री के बाद भी सेवा","Requirement guidance":"जरूरत के अनुसार सलाह","Product demonstration":"उत्पाद प्रदर्शन","Genuine spares":"असली स्पेयर पार्ट्स","After-sales support":"बिक्री के बाद सहायता","We listen first, then recommend machinery suited to your work and budget.":"हम पहले आपकी जरूरत समझते हैं, फिर आपके काम और बजट के अनुसार मशीनरी सुझाते हैं।","Clear guidance on operation, care and practical use before purchase.":"खरीद से पहले संचालन, देखभाल और व्यावहारिक उपयोग की स्पष्ट जानकारी।","Support with compatible accessories and essential replacement parts.":"अनुकूल एक्सेसरी और जरूरी बदलने वाले पुर्जों के लिए सहायता।","Dependable help and direction when your machine needs attention.":"मशीन को देखभाल की जरूरत होने पर भरोसेमंद सहायता और मार्गदर्शन।",
    "Built in Kanpur. Trusted across generations.":"कानपुर में शुरुआत। पीढ़ियों का विश्वास।","THE LEGACY CONTINUES":"विरासत जारी है","SECOND GENERATION ·":"दूसरी पीढ़ी ·","FOUNDER ·":"संस्थापक ·","Sell the right machine, at the right price, and stand behind what you sell.":"सही मशीन, सही मूल्य पर दें और जो बेचें उसके साथ पूरी जिम्मेदारी से खड़े रहें।","Understand what the customer needs, offer dependable machinery at a fair price, and build relationships that last.":"ग्राहक की जरूरत समझें, उचित मूल्य पर भरोसेमंद मशीन दें और ऐसे रिश्ते बनाएँ जो पीढ़ियों तक चलें।","The most trusted machinery partner for farmers, businesses and communities across Uttar Pradesh.":"उत्तर प्रदेश के किसानों, व्यवसायों और समुदायों का सबसे भरोसेमंद मशीनरी साथी बनना।","The right machine for the right job, at a fair price—backed by genuine guidance and dependable service.":"सही काम के लिए सही मशीन, उचित मूल्य पर—सच्ची सलाह और भरोसेमंद सेवा के साथ।","Generations of experience. Practical advice. Dependable machinery. Honest service.":"पीढ़ियों का अनुभव। व्यावहारिक सलाह। भरोसेमंद मशीनरी। ईमानदार सेवा।",
    "Soni Machinery Stores is a trusted machinery and equipment dealer in Kanpur, serving customers since 1974. For over 50 years, we have built our reputation on fair business practices, dependable service, genuine guidance and long-standing relationships with generations of customers.":"सोनी मशीनरी स्टोर्स 1974 से कानपुर में ग्राहकों की सेवा करने वाला विश्वसनीय मशीनरी और उपकरण विक्रेता है। पाँच दशकों से अधिक समय में हमने निष्पक्ष व्यापार, भरोसेमंद सेवा, सच्ची सलाह और पीढ़ियों से चले आ रहे ग्राहक संबंधों पर अपनी प्रतिष्ठा बनाई है।","Representing the second generation of Soni Machinery Stores, Sumit Singh Soni carries the business forward with decades of practical knowledge across agricultural machinery, pumps, motors, dairy equipment and general-purpose machinery.":"सोनी मशीनरी स्टोर्स की दूसरी पीढ़ी का प्रतिनिधित्व करते हुए, सुमित सिंह सोनी कृषि मशीनरी, पंप, मोटर, डेयरी उपकरण और सामान्य उपयोग की मशीनरी के दशकों के व्यावहारिक ज्ञान के साथ व्यवसाय को आगे बढ़ा रहे हैं।","From Kanpur’s historic Latouche Road machinery market, he laid the foundation for a family enterprise built on practical knowledge, honest guidance and responsibility beyond the sale.":"कानपुर के ऐतिहासिक लाटूश रोड मशीनरी बाजार से उन्होंने व्यावहारिक ज्ञान, ईमानदार सलाह और बिक्री के बाद भी जिम्मेदारी निभाने वाले पारिवारिक व्यवसाय की नींव रखी।",
    "A working legacy, captured over the years.":"वर्षों से चलती आ रही विरासत की झलक।","Real moments from our Latouche Road store—our people, machinery, customers and the everyday work behind five decades of trust.":"हमारे लाटूश रोड स्टोर के वास्तविक पल—हमारे लोग, मशीनरी, ग्राहक और पाँच दशकों के विश्वास के पीछे का रोज़मर्रा का काम।","Frequently asked questions":"अक्सर पूछे जाने वाले सवाल","Can’t find your answer? Call us and we’ll guide you.":"जवाब नहीं मिला? हमें कॉल करें, हम आपकी मदद करेंगे।",
    "How do I choose the right machine?":"सही मशीन कैसे चुनें?","Tell us the job, land size, frequency of use and budget. Our team will suggest suitable options.":"काम, जमीन का आकार, उपयोग की आवृत्ति और बजट बताएं। हमारी टीम उपयुक्त विकल्प सुझाएगी।","Do you provide demonstrations?":"क्या आप उत्पाद प्रदर्शन देते हैं?","Demonstrations and operating guidance can be arranged for selected products.":"चुनिंदा उत्पादों के लिए प्रदर्शन और संचालन मार्गदर्शन की व्यवस्था की जा सकती है।","Are spare parts available?":"क्या स्पेयर पार्ट्स उपलब्ध हैं?","We help source compatible spares and accessories for the machinery categories we sell.":"हम बेची जाने वाली मशीनरी श्रेणियों के अनुकूल स्पेयर और एक्सेसरी उपलब्ध कराने में मदद करते हैं।","Do you deliver outside Kanpur?":"क्या कानपुर के बाहर डिलीवरी होती है?","Delivery options depend on product and destination. Contact us for a quick confirmation.":"डिलीवरी विकल्प उत्पाद और स्थान पर निर्भर करते हैं। शीघ्र पुष्टि के लिए हमसे संपर्क करें।",
    "Let’s find the right machine for your work.":"आपके काम के लिए सही मशीन चुनते हैं।","Call now":"अभी कॉल करें","Book appointment":"अपॉइंटमेंट लें","Get directions":"दिशा-निर्देश पाएँ","Download brochure":"ब्रोशर डाउनलोड करें","View all 32 machinery products":"सभी 32 मशीनरी उत्पाद देखें","← Back to Home":"← होम पर वापस जाएँ",
    "Machinery Products in Kanpur":"कानपुर में मशीनरी उत्पाद","Search the machinery catalogue":"मशीनरी सूची खोजें","Explore catalogue-matched products, capacities and photographs from Soni Machinery Stores.":"सोनी मशीनरी स्टोर्स के कैटलॉग से मिलाए गए उत्पाद, क्षमता और तस्वीरें देखें।","Dairy Equipment in Kanpur":"कानपुर में डेयरी उपकरण","Water Pumps in Kanpur":"कानपुर में वॉटर पंप","Electric Motors in Kanpur":"कानपुर में इलेक्ट्रिक मोटर","Agricultural Machinery in Kanpur":"कानपुर में कृषि मशीनरी","Cleaning Equipment in Kanpur":"कानपुर में सफाई उपकरण",
    "Contact Soni Machinery Stores in Kanpur":"कानपुर में सोनी मशीनरी स्टोर्स से संपर्क करें","Call, WhatsApp or send your enquiry for machinery prices, availability and guidance.":"मशीनरी की कीमत, उपलब्धता और मार्गदर्शन के लिए कॉल, व्हाट्सऐप या पूछताछ भेजें।","Tell us what machine you need":"हमें बताएं आपको कौन-सी मशीन चाहिए","Name":"नाम","Phone":"फोन","Product or requirement":"उत्पाद या आवश्यकता","Message":"संदेश","Send enquiry":"पूछताछ भेजें","Machinery Store Gallery in Kanpur":"कानपुर में मशीनरी स्टोर गैलरी","Contact us about":"इसके बारे में संपर्क करें","Call":"कॉल","SMS/Text":"एसएमएस/टेक्स्ट","Enquiry form":"पूछताछ फॉर्म","Yes! I am interested":"हाँ! मुझे रुचि है","Get Quote":"कीमत पूछें"
  }));
  const categoryInfo = {
    dairy:["Dairy Equipment","डेयरी उपकरण","dairy-equipment.html","image1.png"],
    pumps:["Water Pumps","वॉटर पंप","water-pumps.html","image16.png"],
    motors:["Electric Motors","इलेक्ट्रिक मोटर","electric-motors.html","image12.png"],
    agriculture:["Agricultural Machinery","कृषि मशीनरी","agricultural-machinery.html","image26.png"],
    cleaning:["Cleaning Equipment","सफाई उपकरण","cleaning-equipment.html","image7.png"]
  };
  const translateTextNodes = hindi => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: node => node.parentElement.closest("script,style,[data-product-card]") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    for (let node; (node = walker.nextNode());) {
      if (!node._englishText) node._englishText = node.nodeValue;
      const source = node._englishText;
      const key = source.trim();
      let translated = translations.get(key);
      if (!translated && /^View \d+ products$/.test(key)) translated = key.replace("View ","").replace(" products"," उत्पाद देखें");
      if (!translated && /^Showing \d+ products?$/.test(key)) translated = key.replace("Showing ","").replace(/ products?/," उत्पाद दिखाए जा रहे हैं");
      node.nodeValue = hindi && translated ? source.replace(key, translated) : source;
    }
    document.querySelectorAll("input[placeholder],textarea[placeholder]").forEach(input => {
      if (!input.dataset.placeholderEn) input.dataset.placeholderEn = input.placeholder;
      input.placeholder = hindi ? translations.get(input.dataset.placeholderEn) || input.dataset.placeholderEn : input.dataset.placeholderEn;
    });
  };
  const categorySwitcher = active => `<a class="back-home" href="/sonimachinerystores/index.html">${hindiMode ? "← होम पर वापस जाएँ" : "← Back to Home"}</a><div class="category-panel">${Object.entries(categoryInfo).map(([id,c]) => `<a class="category-tile${id===active?" active":""}" href="/sonimachinerystores/products/${c[2]}"><img src="/sonimachinerystores/products-catalogue/${c[3]}" alt="${c[0]} - Soni Machinery Stores Kanpur"><span>${hindiMode?c[1]:c[0]}</span></a>`).join("")}</div>`;

  function openQuote(name) {
    currentProduct = name || currentProduct;
    quote.querySelector("[data-quote-name]").textContent = currentProduct;
    const message = `Hello Soni Machinery Stores, I am interested in ${currentProduct}. Please share price and availability.`;
    quote.querySelector("[data-quote-call]").href = "tel:+919336127037";
    quote.querySelector("[data-quote-whatsapp]").href = `https://wa.me/919336127037?text=${encodeURIComponent(message)}`;
    quote.querySelector("[data-quote-sms]").href = `sms:+919336127037?body=${encodeURIComponent(message)}`;
    quote.querySelector("[data-quote-form]").href = "/sonimachinerystores/contact.html#enquiry-form";
    quote.querySelectorAll(".quote-options a").forEach(a => a.dataset.productName = currentProduct);
    quote.showModal();
    ga("quote_popup_open", { product_name: currentProduct });
  }

  document.addEventListener("click", event => {
    const getQuote = event.target.closest("[data-get-quote]");
    if (getQuote) {
      event.preventDefault();
      event.stopPropagation();
      const card = getQuote.closest("[data-product-card]");
      openQuote(hindiMode && card ? card.dataset.productNameHi : getQuote.dataset.productName);
      return;
    }
    const card = event.target.closest("[data-product-card]");
    if (card && !event.target.closest("a,button")) {
      currentProduct = hindiMode ? card.dataset.productNameHi : card.dataset.productName;
      ga("product_view", { product_name: currentProduct });
      detail.querySelector("[data-detail-category]").innerHTML = categorySwitcher(card.dataset.category);
      detail.querySelector("[data-detail-content]").innerHTML = `<img src="${card.dataset.image}" alt="${currentProduct} ${card.dataset.capacity} - Soni Machinery Stores Kanpur"><div><button class="detail-cta" data-get-quote data-product-name="${currentProduct}">${hindiMode ? "हाँ! मुझे रुचि है" : "Yes! I am interested"}</button><p class="section-kicker">${card.dataset.capacity}</p><h2>${currentProduct}</h2><p>${hindiMode ? card.dataset.descriptionHi : card.dataset.description}</p></div>`;
      detail.showModal();
      return;
    }
    const action = event.target.closest(".quote-options a");
    if (action) ga("quote_action_click", { product_name: action.dataset.productName, action_type: action.textContent.trim() });
    const tracked = event.target.closest("[data-track-action]");
    if (tracked) ga("contact_action_click", { action_type: tracked.dataset.trackAction });
  });

  document.querySelectorAll("dialog .modal-close").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
  document.addEventListener("keydown", event => {
    if (event.key === "Enter" && event.target.matches("[data-product-card]")) event.target.click();
  });

  const search = document.querySelector("#catalogue-search");
  if (search) {
    search.value = new URLSearchParams(location.search).get("q") || "";
    const filter = () => {
      const query = search.value.trim().toLowerCase();
      let count = 0;
      document.querySelectorAll("[data-product-card]").forEach(card => {
        card.hidden = Boolean(query && !card.dataset.search.includes(query));
        if (!card.hidden) count++;
      });
      document.querySelector(".search-status").textContent = `Showing ${count} product${count === 1 ? "" : "s"}`;
      if (query) ga("catalogue_search", { search_term: query });
    };
    search.addEventListener("input", filter);
    filter();
  }

  const enquiryProduct = document.querySelector("[data-enquiry-product]");
  if (enquiryProduct) {
    const name = new URLSearchParams(location.search).get("product");
    if (name) enquiryProduct.value = name;
  }

  const hero = document.querySelector("[data-carousel-images]");
  if (hero) {
    const images = hero.dataset.carouselImages.split("|");
    const dots = [...hero.querySelectorAll("[data-slide]")];
    let slide = 0;
    const show = index => {
      slide = index;
      hero.style.backgroundImage = `linear-gradient(90deg,rgba(5,28,16,.88),rgba(5,28,16,.18)),url('${images[index]}')`;
      dots.forEach((dot, n) => dot.classList.toggle("active", n === index));
    };
    dots.forEach(dot => dot.addEventListener("click", () => show(Number(dot.dataset.slide))));
    setInterval(() => show((slide + 1) % images.length), 5000);
  }

  const languageButton = document.querySelector("[data-language-toggle]");
  if (languageButton) languageButton.addEventListener("click", () => {
    hindiMode = document.body.classList.toggle("hindi-mode");
    document.documentElement.lang = hindiMode ? "hi" : "en";
    translateTextNodes(hindiMode);
    document.querySelectorAll("[data-product-card]").forEach(card => {
      card.querySelector(".product-copy h2,.product-copy h3").textContent = hindiMode ? card.dataset.productNameHi : card.dataset.productName;
      card.querySelector(".product-description").textContent = hindiMode ? card.dataset.descriptionHi : card.dataset.description;
      card.querySelector(".get-quote").textContent = hindiMode ? "कीमत पूछें" : "Get Quote";
      card.querySelector(".product-enquiry").textContent = hindiMode ? `${card.dataset.productNameHi} के बारे में पूछताछ करें` : `Enquire about this ${card.dataset.productName.split(" ").slice(1).join(" ").toLowerCase()}`;
      card.querySelector(".product-image em").textContent = hindiMode ? categoryInfo[card.dataset.category][1] : categoryInfo[card.dataset.category][0];
    });
    languageButton.textContent = hindiMode ? "English" : "हिंदी";
  });

  let maxDepth = 0;
  addEventListener("scroll", () => {
    const depth = Math.min(100, Math.round((scrollY + innerHeight) / document.documentElement.scrollHeight * 100));
    for (const mark of [25, 50, 75, 90]) if (depth >= mark && maxDepth < mark) {
      maxDepth = mark;
      ga("scroll_depth", { percent_scrolled: mark, page_path: location.pathname });
    }
  }, { passive: true });
  const exit = () => {
    const sections = [...document.querySelectorAll("section[id]")];
    const current = sections.filter(section => section.getBoundingClientRect().top < innerHeight / 2).at(-1)?.id || document.querySelector("h1")?.textContent || "page";
    ga("page_exit", { page_path: location.pathname, current_section: current, scroll_depth: maxDepth, transport_type: "beacon" });
  };
  addEventListener("pagehide", exit);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") exit(); });
})();
