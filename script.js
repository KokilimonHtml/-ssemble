// ============================================
// FIREBASE КОНФИГУРАЦИЯ (ЗАМЕНИ С ТВОЯТА от таба CDN)
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyBGKZfVTKqbJzSV42zUMvsW4Awl8dEiP5w",
    authDomain: "browserrecommender.firebaseapp.com",
    projectId: "browserrecommender",
    storageBucket: "browserrecommender.firebasestorage.app",
    messagingSenderId: "232445772502",
    appId: "1:232445772502:web:462fd3c344957cf9c83f77"
};

// Инициализиране на Firebase
const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// Променлива за текущия потребител
let currentUser = null;

// Проверка за текущ потребител
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        document.getElementById('authButtons').style.display = 'none';
        document.getElementById('userInfo').style.display = 'block';
        document.getElementById('userEmail').textContent = user.email;
    } else {
        currentUser = null;
        document.getElementById('authButtons').style.display = 'block';
        document.getElementById('userInfo').style.display = 'none';
    }
});

// ============================================
// АУТЕНТИКАЦИОННИ ФУНКЦИИ
// ============================================

// Модални функции
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function showRegister() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.getElementById(modalId + 'Error').textContent = '';
}

// Функции за аутентикация
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorElement = document.getElementById('loginError');
    
    if (!email || !password) {
        errorElement.textContent = 'Моля, попълнете всички полета';
        return;
    }
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            closeModal('loginModal');
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                errorElement.textContent = 'Потребител с този имейл не съществува';
            } else if (error.code === 'auth/wrong-password') {
                errorElement.textContent = 'Грешна парола';
            } else {
                errorElement.textContent = error.message;
            }
        });
}

function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('registerError');
    
    if (!email || !password || !confirmPassword) {
        errorElement.textContent = 'Моля, попълнете всички полета';
        return;
    }
    
    if (password !== confirmPassword) {
        errorElement.textContent = 'Паролите не съвпадат';
        return;
    }
    
    if (password.length < 6) {
        errorElement.textContent = 'Паролата трябва да е поне 6 символа';
        return;
    }
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            closeModal('registerModal');
            document.getElementById('registerEmail').value = '';
            document.getElementById('registerPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                errorElement.textContent = 'Този имейл вече е регистриран';
            } else if (error.code === 'auth/invalid-email') {
                errorElement.textContent = 'Невалиден имейл адрес';
            } else {
                errorElement.textContent = error.message;
            }
        });
}

function logout() {
    auth.signOut()
        .then(() => {
            currentUser = null;
        })
        .catch((error) => {
            console.error('Грешка при изход:', error);
        });
}

// Затваряне на модали при клик извън тях
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (event.target === loginModal) {
        closeModal('loginModal');
    }
    if (event.target === registerModal) {
        closeModal('registerModal');
    }
}

// ============================================
// ОРИГИНАЛНИ ФУНКЦИИ (СТАР КОД)
// ============================================

// Анимационни функции
function fadeIn(id) {
    const el = document.getElementById(id);
    setTimeout(() => el.classList.add("show"), 20);
}
function fadeOut(id) {
    document.getElementById(id).classList.remove("show");
}

// Навигационни функции
function startBrowsers() {
    document.querySelector('.info-card').style.display = 'none';
    document.querySelectorAll('.choice-card').forEach(card => card.style.display = 'none');
    
    setTimeout(() => {
        document.getElementById("filters").style.display = "flex";
        document.getElementById("results").style.display = "block";
        fadeIn("filters");
        fadeIn("results");
        renderBrowsers(browsers);
    }, 300);
}

function startSearchEngines() {
    document.querySelector('.info-card').style.display = 'none';
    document.querySelectorAll('.choice-card').forEach(card => card.style.display = 'none');
    
    setTimeout(() => {
        document.getElementById("searchFilters").style.display = "flex";
        document.getElementById("searchResults").style.display = "block";
        fadeIn("searchFilters");
        fadeIn("searchResults");
        renderSearchEngines(searchEngines);
    }, 300);
}

function goBack() {
    fadeOut("filters");
    fadeOut("results");
    fadeOut("searchFilters");
    fadeOut("searchResults");
    setTimeout(() => {
        document.getElementById("filters").style.display = "none";
        document.getElementById("results").style.display = "none";
        document.getElementById("searchFilters").style.display = "none";
        document.getElementById("searchResults").style.display = "none";
        
        document.querySelector('.info-card').style.display = 'block';
        document.querySelectorAll('.choice-card').forEach(card => card.style.display = 'block');
        fadeIn("info-card");
        document.querySelectorAll('.choice-card').forEach(card => fadeIn(card));
    }, 300);
}

// Данни за браузъри
const browsers = [
    { name: "Brave", image: "brave.png", security: 8, speed: 7, privacy: 10,
      description: "Силен фокус върху поверителност и блокиране на реклами." },
    { name: "Firefox", image: "firefox.png", security: 8, speed: 7, privacy: 9,
      description: "Силен баланс между сигурност и поверителност." },
    { name: "Chrome", image: "chrome.png", security: 7, speed: 10, privacy: 4,
      description: "Най-бързият браузър, но по-слаб в поверителността." },
    { name: "Safari", image: "safari.png", security: 8, speed: 8, privacy: 7,
      description: "Оптимизиран за Apple устройства и стабилен." },
    { name: "Edge", image: "edge.png", security: 8, speed: 9, privacy: 6,
      description: "Бърз, удобен и базиран на Chromium." }
];

// Данни за търсачки
const searchEngines = [
    { name: "Google", image: "google.png", privacy: 4, accuracy: 10, features: 10,
      description: "Най-популярната търсачка с най-добри резултати, но събира много данни." },
    { name: "DuckDuckGo", image: "duckduckgo.png", privacy: 10, accuracy: 8, features: 7,
      description: "Фокусирана върху поверителността, не проследява потребителите." },
    { name: "Bing", image: "bing.png", privacy: 5, accuracy: 9, features: 8,
      description: "Търсачката на Microsoft с добри резултати и интеграция." },
    { name: "Startpage", image: "startpage.png", privacy: 9, accuracy: 9, features: 6,
      description: "Предоставя резултати от Google, но с поверителност." },
    { name: "Ecosia", image: "ecosia.png", privacy: 7, accuracy: 8, features: 6,
      description: "Екологична търсачка, която използва приходите за засаждане на дървета." }
];

// Функции за рендиране
function renderBrowsers(list) {
    const container = document.getElementById('results');
    Array.from(container.children).forEach(child => child.style.opacity = 0);

    setTimeout(() => {
        container.innerHTML = "";
        list.forEach((b, index) => {
            const item = document.createElement("div");
            item.className = "item fade show";
            item.style.animationDelay = `${index * 0.1}s`;
            item.innerHTML = `
                <img src="${b.image}" alt="${b.name}">
                <div>
                    <h3>${b.name}</h3>
                    <p>${b.description}</p>
                    <p><strong>Сигурност:</strong> ${b.security}/10</p>
                    <p><strong>Бързина:</strong> ${b.speed}/10</p>
                    <p><strong>Поверителност:</strong> ${b.privacy}/10</p>
                </div>
            `;
            container.appendChild(item);
        });
    }, 250);
}

function renderSearchEngines(list) {
    const container = document.getElementById('searchResults');
    Array.from(container.children).forEach(child => child.style.opacity = 0);

    setTimeout(() => {
        container.innerHTML = "";
        list.forEach((s, index) => {
            const item = document.createElement("div");
            item.className = "item fade show";
            item.style.animationDelay = `${index * 0.1}s`;
            item.innerHTML = `
                <img src="${s.image}" alt="${s.name}">
                <div>
                    <h3>${s.name}</h3>
                    <p>${s.description}</p>
                    <p><strong>Поверителност:</strong> ${s.privacy}/10</p>
                    <p><strong>Точност:</strong> ${s.accuracy}/10</p>
                    <p><strong>Функции:</strong> ${s.features}/10</p>
                </div>
            `;
            container.appendChild(item);
        });
    }, 250);
}

// Филтриране
function filterResults(type) {
    if(type === "all") {
        renderBrowsers(browsers);
        return;
    }
    const sorted = [...browsers].sort((a,b)=>b[type]-a[type]);
    renderBrowsers(sorted);
}

function filterSearchResults(type) {
    if(type === "all") {
        renderSearchEngines(searchEngines);
        return;
    }
    const sorted = [...searchEngines].sort((a,b)=>b[type]-a[type]);
    renderSearchEngines(sorted);
}

// Най-добър избор
function showBestBrowser() {
    const bestBrowser = browsers.reduce((best, current) => {
        const bestScore = best.security + best.speed + best.privacy;
        const currentScore = current.security + current.speed + current.privacy;
        return currentScore > bestScore ? current : best;
    });
    renderBrowsers([bestBrowser]);
}

function showBestSearchEngine() {
    const bestSearchEngine = searchEngines.reduce((best, current) => {
        const bestScore = best.privacy + best.accuracy + best.features;
        const currentScore = current.privacy + current.accuracy + current.features;
        return currentScore > bestScore ? current : best;
    });
    renderSearchEngines([bestSearchEngine]);
}

// Превключване на тема
function toggleTheme() {
    document.body.classList.toggle("dark");
    const icon = document.getElementById("themeIcon");
    if (document.body.classList.contains("dark")) {
        icon.src = "icon1.png"; // Бяла икона за тъмен режим
    } else {
        icon.src = "icon.png"; // Черна икона за светъл режим
    }
}

// Инициализиране при зареждане (за темата)
document.addEventListener('DOMContentLoaded', function() {
    const icon = document.getElementById("themeIcon");
    if (document.body.classList.contains("dark")) {
        icon.src = "icon1.png";
    } else {
        icon.src = "icon.png";
    }
});