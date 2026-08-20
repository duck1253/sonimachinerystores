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
    "Dairy Equipment":"डेयरी उपकरण","Water Pumps":"वॉटर पंप","Electric Motors":"इलेक्ट्रिक मोटर","Agricultural Machinery":"कृषि मशीनरी","Cleaning Equipment":"सफाई उपकरण","Pulverisers":"पल्वराइज़र","Air Compressors":"एयर कंप्रेसर",
    "Machinery that works as hard as you do.":"मशीनरी जो आपके जितनी मेहनत करे।","Powering Progress, Serving with Integrity.":"प्रगति को शक्ति, सेवा में सच्चाई।","Dependable agricultural, dairy and general-purpose machinery—supported by practical advice and honest service across generations.":"भरोसेमंद कृषि, डेयरी और सामान्य उपयोग की मशीनरी—पीढ़ियों के अनुभव, सही सलाह और ईमानदार सेवा के साथ।","Get the right machine →":"सही मशीन चुनें →","Explore all 51 machinery products":"सभी 51 मशीनरी उत्पाद देखें",
    "Machinery for every requirement":"हर जरूरत के लिए मशीनरी","Explore 51 products with catalogue-matched brands, capacities and photographs.":"कैटलॉग से मिलाए गए ब्रांड, क्षमता और तस्वीरों सहित 51 उत्पाद देखें।","Browse the complete machinery catalogue →":"पूरी मशीनरी सूची देखें →",
    "Service beyond the sale":"बिक्री के बाद भी सेवा","Requirement guidance":"जरूरत के अनुसार सलाह","Product demonstration":"उत्पाद प्रदर्शन","Genuine spares":"असली स्पेयर पार्ट्स","After-sales support":"बिक्री के बाद सहायता","We listen first, then recommend machinery suited to your work and budget.":"हम पहले आपकी जरूरत समझते हैं, फिर आपके काम और बजट के अनुसार मशीनरी सुझाते हैं।","Clear guidance on operation, care and practical use before purchase.":"खरीद से पहले संचालन, देखभाल और व्यावहारिक उपयोग की स्पष्ट जानकारी।","Support with compatible accessories and essential replacement parts.":"अनुकूल एक्सेसरी और जरूरी बदलने वाले पुर्जों के लिए सहायता।","Dependable help and direction when your machine needs attention.":"मशीन को देखभाल की जरूरत होने पर भरोसेमंद सहायता और मार्गदर्शन।",
    "Built in Kanpur. Trusted across generations.":"कानपुर में शुरुआत। पीढ़ियों का विश्वास।","THE LEGACY CONTINUES":"विरासत जारी है","SECOND GENERATION ·":"दूसरी पीढ़ी ·","FOUNDER ·":"संस्थापक ·","Sell the right machine, at the right price, and stand behind what you sell.":"सही मशीन, सही मूल्य पर दें और जो बेचें उसके साथ पूरी जिम्मेदारी से खड़े रहें।","Understand what the customer needs, offer dependable machinery at a fair price, and build relationships that last.":"ग्राहक की जरूरत समझें, उचित मूल्य पर भरोसेमंद मशीन दें और ऐसे रिश्ते बनाएँ जो पीढ़ियों तक चलें।","The most trusted machinery partner for farmers, businesses and communities across Uttar Pradesh.":"उत्तर प्रदेश के किसानों, व्यवसायों और समुदायों का सबसे भरोसेमंद मशीनरी साथी बनना।","The right machine for the right job, at a fair price—backed by genuine guidance and dependable service.":"सही काम के लिए सही मशीन, उचित मूल्य पर—सच्ची सलाह और भरोसेमंद सेवा के साथ।","Generations of experience. Practical advice. Dependable machinery. Honest service.":"पीढ़ियों का अनुभव। व्यावहारिक सलाह। भरोसेमंद मशीनरी। ईमानदार सेवा।",
    "Soni Machinery Stores is a trusted machinery and equipment dealer in Kanpur, serving customers since 1974. For over 50 years, we have built our reputation on fair business practices, dependable service, genuine guidance and long-standing relationships with generations of customers.":"सोनी मशीनरी स्टोर्स 1974 से कानपुर में ग्राहकों की सेवा करने वाला विश्वसनीय मशीनरी और उपकरण विक्रेता है। पाँच दशकों से अधिक समय में हमने निष्पक्ष व्यापार, भरोसेमंद सेवा, सच्ची सलाह और पीढ़ियों से चले आ रहे ग्राहक संबंधों पर अपनी प्रतिष्ठा बनाई है।","Representing the second generation of Soni Machinery Stores, Sumit Singh Soni carries the business forward with decades of practical knowledge across agricultural machinery, pumps, motors, dairy equipment and general-purpose machinery.":"सोनी मशीनरी स्टोर्स की दूसरी पीढ़ी का प्रतिनिधित्व करते हुए, सुमित सिंह सोनी कृषि मशीनरी, पंप, मोटर, डेयरी उपकरण और सामान्य उपयोग की मशीनरी के दशकों के व्यावहारिक ज्ञान के साथ व्यवसाय को आगे बढ़ा रहे हैं।","From Kanpur’s historic Latouche Road machinery market, he laid the foundation for a family enterprise built on practical knowledge, honest guidance and responsibility beyond the sale.":"कानपुर के ऐतिहासिक लाटूश रोड मशीनरी बाजार से उन्होंने व्यावहारिक ज्ञान, ईमानदार सलाह और बिक्री के बाद भी जिम्मेदारी निभाने वाले पारिवारिक व्यवसाय की नींव रखी।",
    "A working legacy, captured over the years.":"वर्षों से चलती आ रही विरासत की झलक।","Real moments from our Latouche Road store—our people, machinery, customers and the everyday work behind five decades of trust.":"हमारे लाटूश रोड स्टोर के वास्तविक पल—हमारे लोग, मशीनरी, ग्राहक और पाँच दशकों के विश्वास के पीछे का रोज़मर्रा का काम।","Frequently asked questions":"अक्सर पूछे जाने वाले सवाल","Can’t find your answer? Call us and we’ll guide you.":"जवाब नहीं मिला? हमें कॉल करें, हम आपकी मदद करेंगे।",
    "How do I choose the right machine?":"सही मशीन कैसे चुनें?","Tell us the job, land size, frequency of use and budget. Our team will suggest suitable options.":"काम, जमीन का आकार, उपयोग की आवृत्ति और बजट बताएं। हमारी टीम उपयुक्त विकल्प सुझाएगी।","Do you provide demonstrations?":"क्या आप उत्पाद प्रदर्शन देते हैं?","Demonstrations and operating guidance can be arranged for selected products.":"चुनिंदा उत्पादों के लिए प्रदर्शन और संचालन मार्गदर्शन की व्यवस्था की जा सकती है।","Are spare parts available?":"क्या स्पेयर पार्ट्स उपलब्ध हैं?","We help source compatible spares and accessories for the machinery categories we sell.":"हम बेची जाने वाली मशीनरी श्रेणियों के अनुकूल स्पेयर और एक्सेसरी उपलब्ध कराने में मदद करते हैं।","Do you deliver outside Kanpur?":"क्या कानपुर के बाहर डिलीवरी होती है?","Delivery options depend on product and destination. Contact us for a quick confirmation.":"डिलीवरी विकल्प उत्पाद और स्थान पर निर्भर करते हैं। शीघ्र पुष्टि के लिए हमसे संपर्क करें।",
    "Let’s find the right machine for your work.":"आपके काम के लिए सही मशीन चुनते हैं।","Call now":"अभी कॉल करें","Book appointment":"अपॉइंटमेंट लें","Get directions":"दिशा-निर्देश पाएँ","Download brochure":"ब्रोशर डाउनलोड करें","View all 51 machinery products":"सभी 51 मशीनरी उत्पाद देखें","← Back to Home":"← होम पर वापस जाएँ",
    "Machinery Products in Kanpur":"कानपुर में मशीनरी उत्पाद","Search the machinery catalogue":"मशीनरी सूची खोजें","Explore catalogue-matched products, capacities and photographs from Soni Machinery Stores.":"सोनी मशीनरी स्टोर्स के कैटलॉग से मिलाए गए उत्पाद, क्षमता और तस्वीरें देखें।","Dairy Equipment in Kanpur":"कानपुर में डेयरी उपकरण","Water Pumps in Kanpur":"कानपुर में वॉटर पंप","Electric Motors in Kanpur":"कानपुर में इलेक्ट्रिक मोटर","Agricultural Machinery in Kanpur":"कानपुर में कृषि मशीनरी","Cleaning Equipment in Kanpur":"कानपुर में सफाई उपकरण","Pulverisers in Kanpur":"कानपुर में पल्वराइज़र","Air Compressors in Kanpur":"कानपुर में एयर कंप्रेसर",
    "Contact Soni Machinery Stores in Kanpur":"कानपुर में सोनी मशीनरी स्टोर्स से संपर्क करें","Call, WhatsApp or send your enquiry for machinery prices, availability and guidance.":"मशीनरी की कीमत, उपलब्धता और मार्गदर्शन के लिए कॉल, व्हाट्सऐप या पूछताछ भेजें।","Tell us what machine you need":"हमें बताएं आपको कौन-सी मशीन चाहिए","Name":"नाम","Phone":"फोन","Product or requirement":"उत्पाद या आवश्यकता","Message":"संदेश","Send enquiry":"पूछताछ भेजें","Machinery Store Gallery in Kanpur":"कानपुर में मशीनरी स्टोर गैलरी","Contact us about":"इसके बारे में संपर्क करें","Call":"कॉल","SMS/Text":"एसएमएस/टेक्स्ट","Enquiry form":"पूछताछ फॉर्म","Yes! I am interested":"हाँ! मुझे रुचि है","Get Quote":"कीमत पूछें"
  }));
  Object.entries({
    "All":"सभी","All Products":"सभी उत्पाद","Back to Home":"होम पर वापस जाएँ","View all 51 products":"सभी 51 उत्पाद देखें","Showing all 51 products with catalogue-matched brands, capacities and photographs.":"कैटलॉग से मिलाए गए ब्रांड, क्षमता और तस्वीरों सहित सभी 51 उत्पाद दिखाए जा रहे हैं।","Search and filter the complete catalogue →":"पूरी सूची खोजें और फ़िल्टर करें →","CUSTOMER VOICES":"ग्राहकों की बात","Customer Voices":"ग्राहकों की आवाज़",
    "Reserved for verified customer feedback. Placeholder cards will be replaced when approved testimonials are supplied.":"यह स्थान सत्यापित ग्राहक अनुभवों के लिए सुरक्षित है। स्वीकृत टिप्पणियाँ मिलने पर इन्हें बदला जाएगा।",
    "Is financing or EMI available?":"क्या फाइनेंस या ईएमआई उपलब्ध है?","Financing and EMI availability can vary by product and finance provider. Please call us before purchase so we can confirm the current options.":"फाइनेंस और ईएमआई की उपलब्धता उत्पाद और वित्त प्रदाता के अनुसार बदल सकती है। वर्तमान विकल्प की पुष्टि के लिए खरीद से पहले हमें कॉल करें।",
    "What warranty comes with a machine?":"मशीन के साथ क्या वारंटी मिलती है?","Warranty terms are set by the product manufacturer and can differ by model. We will explain the applicable warranty before you buy.":"वारंटी की शर्तें निर्माता तय करता है और मॉडल के अनुसार अलग हो सकती हैं। खरीद से पहले लागू वारंटी समझा दी जाएगी।",
    "Can I check stock before visiting the store?":"क्या दुकान आने से पहले स्टॉक जांच सकता हूँ?","Yes. Call or WhatsApp us with the product name and model so we can confirm current availability before you travel.":"हाँ। आने से पहले उत्पाद का नाम और मॉडल भेजकर कॉल या व्हाट्सऐप पर उपलब्धता की पुष्टि करें।",
    "Is there a minimum order quantity?":"क्या न्यूनतम ऑर्डर मात्रा है?","Most enquiries are handled for individual machines, but order conditions may vary for parts or special items. Please confirm the required quantity with us.":"अधिकतर पूछताछ एक मशीन के लिए होती है, लेकिन पार्ट्स या विशेष वस्तुओं की शर्तें अलग हो सकती हैं। मात्रा की पुष्टि हमसे करें।",
    "How long does delivery take within Kanpur?":"कानपुर के अंदर डिलीवरी में कितना समय लगता है?","Delivery timing depends on stock, product size and the delivery location. Contact us with the product and address for a current estimate.":"डिलीवरी समय स्टॉक, उत्पाद के आकार और स्थान पर निर्भर है। वर्तमान अनुमान के लिए उत्पाद और पता भेजें।",
    "How long does delivery take outside Kanpur?":"कानपुर के बाहर डिलीवरी में कितना समय लगता है?","Outside-Kanpur delivery depends on the destination, transporter and machine. We will confirm the expected timeline before dispatch.":"कानपुर के बाहर डिलीवरी गंतव्य, ट्रांसपोर्टर और मशीन पर निर्भर है। भेजने से पहले अनुमानित समय बताया जाएगा।",
    "How can I get a product demonstration?":"उत्पाद का डेमो कैसे मिलेगा?","Demonstrations and operating guidance can be arranged for selected products. Call ahead with the model name so we can confirm arrangements.":"चुनिंदा उत्पादों के लिए डेमो और संचालन मार्गदर्शन की व्यवस्था हो सकती है। मॉडल नाम के साथ पहले कॉल करें।",
    "What is the return or exchange policy?":"रिटर्न या एक्सचेंज नीति क्या है?","Return or exchange eligibility depends on the product condition, manufacturer policy and reason for the request. Please confirm the terms before purchase.":"रिटर्न या एक्सचेंज उत्पाद की स्थिति, निर्माता की नीति और कारण पर निर्भर है। खरीद से पहले शर्तें पूछ लें।",
    "How quickly can spare parts be arranged?":"स्पेयर पार्ट्स कितनी जल्दी मिल सकते हैं?","Availability timelines depend on the machine, part number and supplier stock. Share the model and required part so we can check it accurately.":"समय मशीन, पार्ट नंबर और सप्लायर स्टॉक पर निर्भर है। सही जांच के लिए मॉडल और आवश्यक पार्ट बताएं।",
    "How quickly do you respond to after-sales requests?":"बिक्री के बाद सहायता की पूछताछ का जवाब कितनी जल्दी मिलता है?","We usually reply to calls and WhatsApp enquiries within 2 hours during business hours. Resolution time depends on the machine and support required.":"व्यावसायिक समय में कॉल और व्हाट्सऐप का जवाब सामान्यतः 2 घंटे में दिया जाता है। समाधान का समय मशीन और आवश्यक सहायता पर निर्भर है।"
  }).forEach(([english,hindi]) => translations.set(english,hindi));
  Object.entries({
    "BROCHURES ·":"ब्रोशर ·",
    "Download our product brochures":"हमारे उत्पाद ब्रोशर डाउनलोड करें",
    "Keep our dairy and agricultural machinery ranges handy for easy reference.":"आसान जानकारी के लिए हमारी डेयरी और कृषि मशीनरी की रेंज अपने पास रखें।",
    "DAIRY EQUIPMENT":"डेयरी उपकरण",
    "Dairy Products Brochure":"डेयरी उत्पाद ब्रोशर",
    "Cream separators and dairy equipment from Soni Machinery Stores.":"सोनी मशीनरी स्टोर्स के क्रीम सेपरेटर और डेयरी उपकरण।",
    "AGRICULTURAL MACHINERY":"कृषि मशीनरी",
    "Agricultural Products Brochure":"कृषि उत्पाद ब्रोशर",
    "Agricultural machines and field equipment available from our store.":"हमारे स्टोर पर उपलब्ध कृषि मशीनें और खेत के उपकरण।",
    "Open brochure":"ब्रोशर खोलें",
    "Download PDF":"पीडीएफ डाउनलोड करें",
    "Explore machinery categories":"मशीनरी श्रेणियाँ देखें",
    "Choose a machinery category to view its products on a separate page.":"उसके उत्पाद अलग पेज पर देखने के लिए मशीनरी की श्रेणी चुनें।",
    "Browse the complete machinery catalogue →":"पूरी मशीनरी सूची देखें →",
    "Relationships that last":"रिश्ते जो चलते रहें"
  }).forEach(([english,hindi]) => translations.set(english,hindi));
  const categoryInfo = {
    dairy:["Dairy Equipment","डेयरी उपकरण","dairy-equipment.html","kamdhenu-cream-separator-60-lph.svg"],
    pumps:["Water Pumps","वॉटर पंप","water-pumps.html","texmo-dms-2-water-pump.svg"],
    motors:["Electric Motors","इलेक्ट्रिक मोटर","electric-motors.html","sonee-dx-electric-motor-1-hp.svg"],
    agriculture:["Agricultural Machinery","कृषि मशीनरी","agricultural-machinery.html","power-weeder.webp"],
    cleaning:["Cleaning Equipment","सफाई उपकरण","cleaning-equipment.html","everest-scooter-washer-100-psi.svg"],
    pulverisers:["Pulverisers","पल्वराइज़र","pulverisers.html","pulveriser-1-hp.svg"],
    compressors:["Air Compressors","एयर कंप्रेसर","air-compressors.html","oil-free-air-compressor-60-l.svg"]
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
  const categorySwitcher = active => `<a class="back-home" href="/sonimachinerystores/index.html"><i class="fa-solid fa-arrow-left"></i> ${hindiMode ? "होम पर वापस जाएँ" : "Back to Home"}</a><div class="category-panel category-panel-with-all"><a class="category-tile all-products-tile" href="/sonimachinerystores/products.html"><i class="fa-solid fa-border-all"></i><span>${hindiMode?"सभी उत्पाद":"All Products"}</span></a>${Object.entries(categoryInfo).map(([id,c]) => `<a class="category-tile${id===active?" active":""}" href="/sonimachinerystores/products/${c[2]}"><img src="/sonimachinerystores/products-catalogue/${c[3]}" alt="${c[0]} - Soni Machinery Stores Kanpur"><span>${hindiMode?c[1]:c[0]}</span></a>`).join("")}</div>`;

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
      const specifications = card.querySelector(".specs-table")?.outerHTML || "";
      const detailImageClass = /submersible|सबमर्सिबल/i.test(currentProduct) ? ' class="vertical-submersible"' : "";
      detail.querySelector("[data-detail-category]").innerHTML = categorySwitcher(card.dataset.category);
      detail.querySelector("[data-detail-content]").innerHTML = `<img${detailImageClass} src="${card.dataset.image}" alt="${currentProduct} ${card.dataset.capacity} - Soni Machinery Stores Kanpur"><div><button class="detail-cta" data-get-quote data-product-name="${currentProduct}">${hindiMode ? "हाँ! मुझे रुचि है" : "Yes! I am interested"}</button><p class="section-kicker">${card.dataset.capacity}</p><h2>${currentProduct}</h2><p>${hindiMode ? card.dataset.descriptionHi : card.dataset.description}</p>${specifications ? `<h3 class="specifications-heading">${hindiMode ? "तकनीकी विवरण" : "Specifications"}</h3>${specifications}` : ""}</div>`;
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

  let selectedCategory = "all";
  const cards = [...document.querySelectorAll("[data-product-card]")];
  const editDistance = (a,b) => {
    const row = Array.from({length:b.length+1},(_,i)=>i);
    for (let i=1;i<=a.length;i++) {
      let previous=row[0]; row[0]=i;
      for (let j=1;j<=b.length;j++) { const saved=row[j]; row[j]=Math.min(row[j]+1,row[j-1]+1,previous+(a[i-1]===b[j-1]?0:1)); previous=saved; }
    }
    return row[b.length];
  };
  const fuzzyTextMatch = (query,text) => {
    const clean = value => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\u0900-\u097f]+/g," ").trim();
    const q=clean(query), hay=clean(text); if (!q || hay.includes(q)) return true;
    const hayWords=hay.split(" "), stop=new Set(["ka","ki","ke","the","for","and"]);
    return q.split(" ").filter(word=>word.length>1&&!stop.has(word)).every(word => hayWords.some(candidate => candidate.includes(word) || word.includes(candidate) || editDistance(word,candidate) <= (word.length>=7?2:1)));
  };
  const fuse = window.Fuse && cards.length ? new window.Fuse(cards.map(card => ({ card, text: card.dataset.search })), { keys:["text"], threshold:.38, ignoreLocation:true, minMatchCharLength:2 }) : null;
  const applyCatalogueFilters = () => {
    const search = document.querySelector("#catalogue-search");
    const query = search?.value.trim() || "";
    const literalMatches = query ? new Set(cards.filter(card => card.dataset.search.includes(query.toLowerCase())).map(card => card)) : null;
    const fuzzyMatches = query && fuse ? new Set(fuse.search(query).map(result => result.item.card)) : null;
    let count = 0;
    cards.forEach(card => {
      const categoryMatch = selectedCategory === "all" || card.dataset.category === selectedCategory;
      const searchMatch = !query || (literalMatches?.size ? literalMatches.has(card) : fuzzyMatches ? fuzzyMatches.has(card) : fuzzyTextMatch(query,card.dataset.search));
      card.hidden = !(categoryMatch && searchMatch);
      if (!card.hidden) count++;
    });
    const status = document.querySelector(".search-status");
    if (status) status.textContent = hindiMode ? `${count} उत्पाद दिखाए जा रहे हैं` : `Showing ${count} product${count === 1 ? "" : "s"}`;
  };
  document.querySelectorAll("[data-category-filter]").forEach(button => button.addEventListener("click", () => {
    selectedCategory = button.dataset.categoryFilter;
    document.querySelectorAll("[data-category-filter]").forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    applyCatalogueFilters();
  }));

  const search = document.querySelector("#catalogue-search");
  if (search) {
    search.value = new URLSearchParams(location.search).get("q") || "";
    search.addEventListener("input", () => { applyCatalogueFilters(); if (search.value.trim()) ga("catalogue_search", { search_term: search.value.trim() }); });
    applyCatalogueFilters();
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

  const languageButtons = [...document.querySelectorAll("[data-language-toggle]")];
  const setLanguage = () => {
    hindiMode = document.body.classList.toggle("hindi-mode");
    document.documentElement.lang = hindiMode ? "hi" : "en";
    translateTextNodes(hindiMode);
    document.querySelectorAll("[data-product-card]").forEach(card => {
      card.querySelector(".product-copy h2,.product-copy h3").textContent = hindiMode ? card.dataset.productNameHi : card.dataset.productName;
      card.querySelector(".product-description").textContent = hindiMode ? card.dataset.descriptionHi : card.dataset.description;
      card.querySelector(".get-quote").textContent = hindiMode ? "कीमत पूछें" : "Get Quote";
      card.querySelector(".product-enquiry").textContent = hindiMode ? `${card.dataset.productNameHi} के बारे में पूछताछ करें` : `Enquire about this ${card.dataset.productName.split(" ").slice(1).join(" ").toLowerCase()}`;
      card.querySelector(".product-image em").textContent = hindiMode ? categoryInfo[card.dataset.category][1] : categoryInfo[card.dataset.category][0];
      const specsSummary = card.querySelector(".product-specs summary");
      if (specsSummary) specsSummary.childNodes[0].nodeValue = hindiMode ? "तकनीकी विवरण देखें " : "View specifications ";
      card.querySelectorAll("[data-label-en]").forEach(label => { label.textContent = hindiMode ? label.dataset.labelHi : label.dataset.labelEn; });
    });
    document.querySelectorAll("[data-en][data-hi]").forEach(el => { el.textContent = hindiMode ? el.dataset.hi : el.dataset.en; });
    languageButtons.forEach(button => { button.textContent = hindiMode ? "English" : "हिंदी"; });
    applyCatalogueFilters();
  };
  languageButtons.forEach(button => button.addEventListener("click", setLanguage));

  const menu = document.querySelector("[data-mobile-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menu?.setAttribute("aria-hidden", "true");
    menuToggle?.setAttribute("aria-expanded", "false");
  };
  menuToggle?.addEventListener("click", () => {
    document.body.classList.add("menu-open");
    menu?.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
  });
  document.querySelector("[data-menu-close]")?.addEventListener("click", closeMenu);
  document.querySelector("[data-menu-backdrop]")?.addEventListener("click", closeMenu);
  menu?.querySelectorAll("a,[data-language-toggle]").forEach(item => item.addEventListener("click", () => { if (item.matches("a")) closeMenu(); }));

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
