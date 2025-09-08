let currentLanguage = 'fr';

const flagImages = {
    fr: new Image(),
    en: new Image()
};

flagImages.fr.src = 'images/FR.svg';
flagImages.en.src = 'images/USUK.svg';

const cvUrls = {
    fr: 'https://drive.google.com/file/d/1e2rouL1f6sGtolIy88TSh77ZffeCzXvV/view',
    en: 'https://drive.google.com/file/d/1Nyg-jKrza7pqOEhJjLF3ScE-voQ38Rke/view?usp=sharing'
};

function toggleLanguage() {
    const body = document.body;
    
    updateLanguageToggleIcon();
    body.classList.add('language-transition-out');
    
    setTimeout(() => {
        currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
        updatePageLanguage();
        updateCvLink();
        updateDocumentLang();
        
        body.classList.remove('language-transition-out');
        body.classList.add('language-transition-in');
        
        setTimeout(() => {
            body.classList.remove('language-transition-in');
        }, 250);
        
    }, 250);
}

// Mettre à jour tous les textes selon la langue
function updatePageLanguage() {
    document.querySelectorAll('[data-lang-fr][data-lang-en]').forEach(element => {
        const text = element.getAttribute(`data-lang-${currentLanguage}`);
        if (text) {
            element[element.tagName === 'TITLE' ? 'textContent' : 'innerHTML'] = text;
        }
    });
    
    ['title', 'alt'].forEach(attr => {
        const prefix = attr === 'title' ? 'data-title-' : 'data-lang-';
        document.querySelectorAll(`[${prefix}fr][${prefix}en]`).forEach(element => {
            const value = element.getAttribute(`${prefix}${currentLanguage}`);
            if (value) element.setAttribute(attr, value);
        });
    });
}

function updateLanguageToggleIcon() {
    const languageToggle = document.getElementById('language-toggle');
    const img = languageToggle.querySelector('img');
    
    img.classList.add('flag-spinning');
    
    setTimeout(() => {
        if (currentLanguage === 'fr') {
            img.src = flagImages.fr.src;
        } else {
            img.src = flagImages.en.src;
        }
    }, 250);
    
    setTimeout(() => {
        img.classList.remove('flag-spinning');
        img.style.transform = '';
        img.style.opacity = '';
    }, 500);
}

function updateCvLink() {
    const cvLink = document.getElementById('cv-link');
    const cvLinkContact = document.getElementById('cv-link-contact');
    
    if (currentLanguage === 'en') {
        if (cvLink) {
            cvLink.href = 'https://drive.google.com/file/d/1Nyg-jKrza7pqOEhJjLF3ScE-voQ38Rke/view';
        }
        if (cvLinkContact) {
            cvLinkContact.href = 'https://drive.google.com/file/d/1Nyg-jKrza7pqOEhJjLF3ScE-voQ38Rke/view?usp=sharing';
        }
    } else {
        if (cvLink) {
            cvLink.href = 'https://drive.google.com/file/d/1e2rouL1f6sGtolIy88TSh77ZffeCzXvV/view';
        }
        if (cvLinkContact) {
            cvLinkContact.href = 'https://drive.google.com/file/d/1e2rouL1f6sGtolIy88TSh77ZffeCzXvV/view?usp=sharing';
        }
    }
}

function updateDocumentLang() {
    document.documentElement.lang = currentLanguage;
}

// Configuration des breakpoints pour l'iframe
const iframeSettings = {
    768: { height: '190px', maxWidth: '800px' },
    945: { height: '200px', maxWidth: '600px' },
    default: { height: '220px', maxWidth: '800px', width: '800px' }
};

function adaptContributionsIframe() {
    const iframe = document.getElementById('iframe');
    if (!iframe) return;
    
    const width = window.innerWidth;
    const settings = width <= 768 ? iframeSettings[768] : 
                    width <= 945 ? iframeSettings[945] : 
                    iframeSettings.default;
    
    Object.assign(iframe.style, {
        height: settings.height,
        maxWidth: settings.maxWidth,
        width: settings.width || '100%'
    });
}

function initProjectTabs() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            switchProject(button.dataset.project);
        });
    });
    
    showProject('DM_Web');
}

function switchProject(projectId) {
    document.querySelectorAll('.tab-button, .project-panel').forEach(el => 
        el.classList.remove('active')
    );
    
    const activeButton = document.querySelector(`[data-project="${projectId}"]`);
    const activePanel = document.getElementById(projectId);
    
    activeButton?.classList.add('active');
    activePanel?.classList.add('active');
}

function showProject(projectId) {
    document.getElementById(projectId)?.classList.add('active');
}

function handleSectionVisibility() {
    const sections = document.querySelectorAll('.projects, .education');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            section.classList.add('visible');
        }
    });
}

function initializeFlagImages() {
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = 'position:absolute;left:-9999px;opacity:0';
    
    const frFlag = document.createElement('img');
    frFlag.src = flagImages.fr.src;
    const enFlag = document.createElement('img');
    enFlag.src = flagImages.en.src;
    
    tempContainer.append(frFlag, enFlag);
    document.body.appendChild(tempContainer);
    
    setTimeout(() => document.body.removeChild(tempContainer), 100);
}

document.addEventListener('DOMContentLoaded', () => {
    adaptContributionsIframe();
    initProjectTabs();
    initializeFlagImages();
    
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLanguage();
        });
    }
    
    setTimeout(() => document.querySelector('.projects')?.classList.add('visible'), 1000);
    setTimeout(() => document.querySelector('.education')?.classList.add('visible'), 1200);
});

window.addEventListener('resize', adaptContributionsIframe);
window.addEventListener('scroll', handleSectionVisibility);
