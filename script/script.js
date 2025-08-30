// Script simplifié pour le portfolio

// Configuration des breakpoints pour l'iframe
const iframeSettings = {
    768: { height: '190px', maxWidth: '800px' },
    945: { height: '200px', maxWidth: '600px' },
    default: { height: '220px', maxWidth: '800px', width: '800px' }
};

// Adaptation responsive de l'iframe GitHub
function adaptContributionsIframe() {
    const iframe = document.getElementById('iframe');
    if (!iframe) return;
    
    const width = window.innerWidth;
    let settings = iframeSettings.default;
    
    // Utiliser les settings selon la largeur d'écran
    if (width <= 768) {
        settings = iframeSettings[768];
    } else if (width <= 945) {
        settings = iframeSettings[945];
    }
    
    // Appliquer les styles
    Object.assign(iframe.style, {
        height: settings.height,
        maxWidth: settings.maxWidth,
        width: settings.width || '100%'
    });
}

// Gestion des onglets de projets
function initProjectTabs() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            switchProject(button.dataset.project);
        });
    });
    
    // Activer le premier projet
    showProject('DM_Web');
}

function switchProject(projectId) {
    // Désactiver tous les éléments actifs
    document.querySelectorAll('.tab-button, .project-panel').forEach(el => 
        el.classList.remove('active')
    );
    
    // Activer les éléments sélectionnés
    const activeButton = document.querySelector(`[data-project="${projectId}"]`);
    const activePanel = document.getElementById(projectId);
    
    activeButton?.classList.add('active');
    activePanel?.classList.add('active');
}

function showProject(projectId) {
    document.getElementById(projectId)?.classList.add('active');
}

// Animation des sections au scroll
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

// Event listeners et initialisation
document.addEventListener('DOMContentLoaded', () => {
    adaptContributionsIframe();
    initProjectTabs();
    
    // Animations retardées pour les sections
    setTimeout(() => document.querySelector('.projects')?.classList.add('visible'), 1000);
    setTimeout(() => document.querySelector('.education')?.classList.add('visible'), 1200);
});

window.addEventListener('resize', adaptContributionsIframe);
window.addEventListener('scroll', handleSectionVisibility);
