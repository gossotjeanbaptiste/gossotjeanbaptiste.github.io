// Script simplifié pour le portfolio

// Configuration des breakpoints pour l'iframe
const iframeSettings = {
    210: { height: '80px', maxWidth: '140px' },
    320: { height: '100px', maxWidth: '250px' },
    520: { height: '120px', maxWidth: '300px' },
    768: { height: '150px', maxWidth: '350px' },
    945: { height: '170px', maxWidth: '600px' },
    default: { height: '190px', maxWidth: '800px', width: '800px' }
};

// Adaptation responsive de l'iframe GitHub
function adaptContributionsIframe() {
    const iframe = document.getElementById('iframe');
    if (!iframe) return;
    
    const width = window.innerWidth;
    let settings = iframeSettings.default;
    
    // Trouver les bonnes settings selon la largeur
    for (const breakpoint in iframeSettings) {
        if (breakpoint !== 'default' && width <= parseInt(breakpoint)) {
            settings = iframeSettings[breakpoint];
            break;
        }
    }
    
    // Appliquer les styles
    Object.assign(iframe.style, {
        height: settings.height,
        maxWidth: settings.maxWidth,
        width: settings.width || '100%'
    });
    
    // Ajustement spécial pour 481-520px
    if (width >= 481 && width <= 520) {
        iframe.style.height = '125px';
        iframe.style.maxWidth = '310px';
    }
}

// Gestion des onglets de projets
function initProjectTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.project;
            switchProject(projectId);
        });
    });
    
    // Activer le premier projet
    showProject('DM_Web');
}

function switchProject(projectId) {
    // Désactiver tous les boutons et panneaux
    document.querySelectorAll('.tab-button').forEach(btn => 
        btn.classList.remove('active')
    );
    document.querySelectorAll('.project-panel').forEach(panel => 
        panel.classList.remove('active')
    );
    
    // Activer le bouton et panneau sélectionnés
    const activeButton = document.querySelector(`[data-project="${projectId}"]`);
    const activePanel = document.getElementById(projectId);
    
    if (activeButton) activeButton.classList.add('active');
    if (activePanel) activePanel.classList.add('active');
}

function showProject(projectId) {
    const panel = document.getElementById(projectId);
    if (panel) panel.classList.add('active');
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

// Event listeners
window.addEventListener('resize', adaptContributionsIframe);
window.addEventListener('scroll', handleSectionVisibility);

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    adaptContributionsIframe();
    initProjectTabs();
    
    // Animations retardées pour les sections
    setTimeout(() => {
        const projectsSection = document.querySelector('.projects');
        if (projectsSection) projectsSection.classList.add('visible');
    }, 1000);
    
    setTimeout(() => {
        const educationSection = document.querySelector('.education');
        if (educationSection) educationSection.classList.add('visible');
    }, 1200);
});
