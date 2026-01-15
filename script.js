// Масив с обекти, описващи различни браузъри и техните характеристики
const browsers = [
    {name:"Brave", img:"brave.png", security:8, speed:7, privacy:10, desc:"Браузър с вградени ad/tracker блокери и силен фокус върху privacy, ориентиран към потребители, които искат повече защита без допълнителни разширения."},
    {name:"Firefox", img:"firefox.png", security:8, speed:7, privacy:9, desc:"Независим браузър с добър баланс между поверителност, контрол и съвместимост, предпочитан от потребители, които не искат Chromium монопол."},
    {name:"Chrome", img:"chrome.png", security:7, speed:10, privacy:4, desc:"Най-масовият браузър с отлична съвместимост, висока бързина и дълбока интеграция с Google услуги, за сметка на поверителността."},
    {name:"Safari", img:"safari.png", security:8, speed:8, privacy:7, desc:"Бърз и енергийно ефективен браузър, оптимизиран за Apple устройства, с добър privacy контрол, но ограничена персонализация и екосистемна затвореност."},
    {name:"Edge", img:"edge.png", security:8, speed:9, privacy:6, desc:"Браузър на Microsoft с добър UX, силна интеграция с Windows и AI функции, предлагащ повече функционалност от Chrome с подобна основа."}
];

// Масив с обекти, описващи различни търсачки и техните характеристики
const searchEngines = [
    {name:"Google", img:"google.png", privacy:4, accuracy:10, features:10, desc:"Предоставя най-добрите опции, според търсенето и изкарва всичко по същество, чрез нововграденият AI-Gemini."},
    {name:"DuckDuckGo", img:"duckduckgo.png", privacy:10, accuracy:8, features:7, desc:"Изолира всички тракери, блокира бисквитки и скрива pop-up елементите. Цели се поверителност."},
    {name:"Bing", img:"bing.png", privacy:5, accuracy:9, features:8, desc:"Bing е търсачка на Microsoft с добър визуален UX, стабилни резултати, вградени AI функции и умерена персонализация. Насочена е към потребители без фокус върху крайна поверителност."},
    {name:"Startpage", img:"startpage.png", privacy:9, accuracy:9, features:6, desc:"Най-добрата алтернатива на Google-също като него предоставя най-точните резултати, на добра поверителност."},
    {name:"Ecosia", img:"ecosia.png", privacy:7, accuracy:8, features:6, desc:"Търсачка, създадена с цел екология. От приходите от рекламите се засаждат дървета по света. Сървърите им работят с възобновяема енергия (на теория дори “carbon negative”)."}
];

// Стартира секцията с браузъри
function startBrowsers() {
    hideIntro();
    document.getElementById("filters").style.display = "block";
    document.getElementById("results").style.display = "block";
    document.getElementById("browserBackBtn").style.display = "block";
    renderBrowsers(browsers);
}

// Стартира секцията с търсачки
function startSearchEngines() {
    hideIntro();
    document.getElementById("searchFilters").style.display = "block";
    document.getElementById("searchResults").style.display = "block";
    document.getElementById("searchBackBtn").style.display = "block";
    renderSearch(searchEngines);
}

// Скрива всички елементи с клас "intro"
function hideIntro() {
    document.querySelectorAll(".intro").forEach(e => e.style.display = "none");
}

// Връща потребителя обратно към началния екран
function goBack() {
    document.getElementById("filters").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("searchFilters").style.display = "none";
    document.getElementById("searchResults").style.display = "none";
    document.getElementById("browserBackBtn").style.display = "none";
    document.getElementById("searchBackBtn").style.display = "none";
    document.querySelectorAll(".intro").forEach(e => e.style.display = "block");
}

// Рендерира списък с браузъри в HTML
function renderBrowsers(list) {
    const box = document.getElementById("results");
    box.innerHTML = "";
    list.forEach(b => {
        box.innerHTML += ` 
        <div class="item">
            <img src="${b.img}">
            <div>
                <h3>${b.name}</h3>
                <p>${b.desc}</p>
                <p>Сигурност: ${b.security}/10 | Бързина: ${b.speed}/10 | Персонализация: ${b.privacy}/10</p>
            </div>
        </div>`;
    });
}

// Рендерира списък с търсачки в HTML
function renderSearch(list) {
    const box = document.getElementById("searchResults");
    box.innerHTML = "";
    list.forEach(s => {
        box.innerHTML += `
        <div class="item">
            <img src="${s.img}">
            <div>
                <h3>${s.name}</h3>
                <p>${s.desc}</p>
                <p>Персонализация: ${s.privacy}/10 | Точност: ${s.accuracy}/10 | Функции: ${s.features}/10</p>
            </div>
        </div>`;
    });
}

// Филтрира и сортира браузърите по избран критерий
function filterBrowsers(type) {
    renderBrowsers(type === "all" ? browsers : [...browsers].sort((a,b)=>b[type]-a[type]));
}

// Филтрира и сортира търсачките по избран критерий
function filterSearch(type) {
    renderSearch(type === "all" ? searchEngines : [...searchEngines].sort((a,b)=>b[type]-a[type]));
}

// Взима бутона за смяна на тема
const themeBtn = document.getElementById("themeToggle");

// Взима иконата за темата
const icon = document.getElementById("themeIcon");

// Слуша за клик върху бутона за тема
themeBtn.onclick = () => {
    document.body.classList.toggle("dark");
    icon.src = document.body.classList.contains("dark") ? "slance.png" : "luna.png";
};