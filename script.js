/* ===== LINGUE =====
   Non serve più aggiungere ID a mano: basta mettere
   data-it="..." data-en="..." data-de="..." su un elemento HTML
   (o data-ph-it / data-ph-en / data-ph-de per i placeholder). */

function changeLang(lang) {
    document.querySelectorAll('[data-it]').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) el.textContent = text;
    });

    document.querySelectorAll('[data-ph-it]').forEach(el => {
        const text = el.getAttribute('data-ph-' + lang);
        if (text) el.placeholder = text;
    });

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
    });

    try { localStorage.setItem('noskyn-lang', lang); } catch (e) {}
}

/* ===== SIDEBAR ===== */
function toggleSidebar() {
    const open = document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show', open);
    document.getElementById('sidebar').setAttribute('aria-hidden', !open);
    document.body.classList.toggle('menu-open', open);
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('sidebar').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
}

/* ===== WIDGET IDEE ===== */
function toggleWidget() {
    const panel = document.getElementById('widgetPanel');
    panel.style.display = (panel.style.display === 'flex') ? 'none' : 'flex';
}

function openIdeaFromSidebar(e) {
    e.preventDefault();
    closeSidebar();
    document.getElementById('widgetPanel').style.display = 'flex';
}

/* ===== EASTER EGG CARAMEL DANSEN ASCII ===== */
const caramelFrames = [
    `<span style="color:#00ffff">,;Iii:::;;::::;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::;;;;;;;;;;i;;,</span>\n` +
    `<span style="color:#00ffaa">,;;iiiiiiiii;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;iiiiiii;;,</span>\n` +
    `<span style="color:#ffcc00">  ........,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,..  </span>\n` +
    `<span style="color:#ff66cc">  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  </span>\n` +
    `<span style="color:#ff3399">  @@@@@@@@@@@@@@@@@@@@@@@@@@@@  <span style="color:#ffffff">MANI SULLE ORECCHIE!</span>  @@@@@@@@@@@@@@@@@@@@@@@@@@@@  </span>\n` +
    `<span style="color:#ff66cc">  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  </span>\n` +
    `<span style="color:#00aaff">  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;  </span>`,

    `<span style="color:#00ffff">,;Iii:::;;::::;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::;;;;;;;;;;i;;,</span>\n` +
    `<span style="color:#00ffaa">,;;iiiiiiiii;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;iiiiiii;;,</span>\n` +
    `<span style="color:#ffcc00">  ........,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,..  </span>\n` +
    `<span style="color:#ff66cc">  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  </span>\n` +
    `<span style="color:#ff3399">  @@@@@@@@@@@@@@@@@@@@@@@@@@@@   <span style="color:#ffffff">O - A - O ! DANCE!</span>   @@@@@@@@@@@@@@@@@@@@@@@@@@@@  </span>\n` +
    `<span style="color:#ff66cc">  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  </span>\n` +
    `<span style="color:#00aaff">  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;###;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;  </span>`
];

let caramelFrameIndex = 0;
let caramelInterval = null;

function triggerCaramelEasterEgg() {
    const overlay = document.getElementById('caramel-easter-egg');
    const audio = document.getElementById('caramel-song');
    
    overlay.classList.remove('hidden');

    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(err => console.log("Riproduzione audio bloccata dal browser:", err));
    }

    if (caramelInterval) clearInterval(caramelInterval);
    caramelInterval = setInterval(() => {
        const container = document.getElementById('caramel-ascii-container');
        container.innerHTML = caramelFrames[caramelFrameIndex];
        caramelFrameIndex = (caramelFrameIndex + 1) % caramelFrames.length;
    }, 90);
}

function closeCaramelEasterEgg() {
    const overlay = document.getElementById('caramel-easter-egg');
    const audio = document.getElementById('caramel-song');

    overlay.classList.add('hidden');
    
    if (caramelInterval) {
        clearInterval(caramelInterval);
    }
    
    if (audio) {
        audio.pause();
    }
}

/* ===== AVVIO ===== */
window.addEventListener('DOMContentLoaded', () => {
    let saved = 'it';
    try { saved = localStorage.getItem('noskyn-lang') || 'it'; } catch (e) {}
    changeLang(saved);
});

/* Chiudi tutto con ESC */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeSidebar();
        document.getElementById('widgetPanel').style.display = 'none';
        closeCaramelEasterEgg();
    }
});
