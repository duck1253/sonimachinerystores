(() => {
  const ga = (name, params = {}) => {
    if (typeof window.gtag === "function") window.gtag("event", name, params);
  };
  const quote = document.querySelector("#quote-modal");
  const detail = document.querySelector("#product-detail");
  let currentProduct = "General machinery enquiry";

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
      openQuote(getQuote.dataset.productName);
      return;
    }
    const card = event.target.closest("[data-product-card]");
    if (card && !event.target.closest("a,button")) {
      currentProduct = card.dataset.productName;
      ga("product_view", { product_name: currentProduct });
      detail.querySelector("[data-detail-content]").innerHTML = `<img src="${card.dataset.image}" alt="${currentProduct} ${card.dataset.capacity} - Soni Machinery Stores Kanpur"><div><button class="detail-cta" data-get-quote data-product-name="${currentProduct}">Yes! I am interested</button><p class="section-kicker">${card.dataset.capacity}</p><h2>${currentProduct}</h2><p>${card.dataset.description}</p></div>`;
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
    const hindi = document.body.classList.toggle("hindi-mode");
    languageButton.textContent = hindi ? "English" : "हिंदी";
    document.documentElement.lang = hindi ? "hi" : "en";
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
