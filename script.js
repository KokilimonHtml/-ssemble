const browsers = [
    {name:"Brave", img:"brave.png", security:8, speed:7, privacy:10, desc:"Фокус върху поверителността"},
    {name:"Firefox", img:"firefox.png", security:8, speed:7, privacy:9, desc:"Баланс и свобода"},
    {name:"Chrome", img:"chrome.png", security:7, speed:10, privacy:4, desc:"Най-бързият"},
    {name:"Safari", img:"safari.png", security:8, speed:8, privacy:7, desc:"Apple оптимизация"},
    {name:"Edge", img:"edge.png", security:8, speed:9, privacy:6, desc:"Chromium база"}
];

const searchEngines = [
    {name:"Google", img:"google.png", privacy:4, accuracy:10, features:10, desc:"Най-точни резултати"},
    {name:"DuckDuckGo", img:"duckduckgo.png", privacy:10, accuracy:8, features:7, desc:"Без проследяване"},
    {name:"Bing", img:"bing.png", privacy:5, accuracy:9, features:8, desc:"Microsoft екосистема"},
    {name:"Startpage", img:"startpage.png", privacy:9, accuracy:9, features:6, desc:"Google без следене"},
    {name:"Ecosia", img:"ecosia.png", privacy:7, accuracy:8, features:6, desc:"Екологична"}
];

function startBrowsers() {
    hideIntro();
    document.getElementById("filters").style.display = "block";
    document.getElementById("results").style.display = "block";
    document.getElementById("browserBackBtn").style.display = "block";
    renderBrowsers(browsers);
}

function startSearchEngines() {
    hideIntro();
    document.getElementById("searchFilters").style.display = "block";
    document.getElementById("searchResults").style.display = "block";
    document.getElementById("searchBackBtn").style.display = "block";
    renderSearch(searchEngines);
}

function hideIntro() {
    document.querySelectorAll(".intro").forEach(e => e.style.display = "none");
}

function goBack() {
    document.getElementById("filters").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("searchFilters").style.display = "none";
    document.getElementById("searchResults").style.display = "none";
    document.getElementById("browserBackBtn").style.display = "none";
    document.getElementById("searchBackBtn").style.display = "none";
    document.querySelectorAll(".intro").forEach(e => e.style.display = "block");
}

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
                <p>Сигурност: ${b.security}/10 | Бързина: ${b.speed}/10 | Поверителност: ${b.privacy}/10</p>
            </div>
        </div>`;
    });
}

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
                <p>Поверителност: ${s.privacy}/10 | Точност: ${s.accuracy}/10 | Функции: ${s.features}/10</p>
            </div>
        </div>`;
    });
}

function filterBrowsers(type) {
    renderBrowsers(type === "all" ? browsers : [...browsers].sort((a,b)=>b[type]-a[type]));
}

function filterSearch(type) {
    renderSearch(type === "all" ? searchEngines : [...searchEngines].sort((a,b)=>b[type]-a[type]));
}

const themeBtn = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

themeBtn.onclick = () => {
    document.body.classList.toggle("dark");
    icon.src = document.body.classList.contains("dark") ? "slance.png" : "luna.png";
};