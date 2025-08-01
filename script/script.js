// script.js - Fonctionnalités pour le portfolio responsive

// Adaptation automatique de l'iframe des contributions GitHub selon la taille d'écran
function adaptContributionsIframe() {
    const iframe = document.getElementById('iframe');
    if (iframe) {
        const width = window.innerWidth;
        
        if (width <= 210) {
            // Pour les très petites largeurs (micro-écrans)
            iframe.style.height = '80px';
            iframe.style.maxWidth = '140px';
            iframe.style.width = '100%';
            iframe.style.fontSize = '8px';
        } else if (width <= 320) {
            // Pour les petits smartphones
            iframe.style.height = '100px';
            iframe.style.maxWidth = '250px';
            iframe.style.width = '100%';
        } else if (width <= 520) {
            // Pour tous les smartphones et petits écrans jusqu'à 520px
            iframe.style.height = '120px';
            iframe.style.maxWidth = '300px';
            iframe.style.width = '100%';
            
            // Ajustement spécial pour la zone problématique 481-520px
            if (width >= 481 && width <= 520) {
                iframe.style.height = '125px';
                iframe.style.maxWidth = '310px';
            }
        } else if (width <= 768) {
            // Pour les écrans moyens (tablettes portrait)
            iframe.style.height = '150px';
            iframe.style.maxWidth = '350px';
            iframe.style.width = '100%';
        } else if (width <= 945) {
            // Pour les écrans moyens-larges (tablettes paysage et petits desktop)
            iframe.style.height = '170px';
            iframe.style.maxWidth = '600px';
            iframe.style.width = '100%';
        } else {
            // Pour les écrans larges (desktop)
            iframe.style.height = '190px';
            iframe.style.maxWidth = '800px';
            iframe.style.width = '800px';
        }
    }
}

// Fonction pour déboguer la taille d'écran (à supprimer en production)
/*function debugScreenSize() {
    console.log(`Largeur d'écran: ${window.innerWidth}px, Hauteur: ${window.innerHeight}px`);
}*/

// Fonction pour gérer les cas extrêmes de largeur
function handleExtremeWidths() {
    const width = window.innerWidth;
    const body = document.body;
    
    if (width <= 210) {
        // Forcer un zoom approprié pour les micro-écrans
        body.style.transform = 'scale(0.8)';
        body.style.transformOrigin = 'top left';
        body.style.width = '125%';
    } else if (width <= 320) {
        // Léger ajustement pour les très petits écrans
        body.style.transform = 'scale(0.95)';
        body.style.transformOrigin = 'top left';
        body.style.width = '105%';
    } else {
        // Réinitialiser pour les écrans normaux
        body.style.transform = 'none';
        body.style.transformOrigin = 'initial';
        body.style.width = 'auto';
    }
}

// Fonction pour gérer la barre sociale selon la résolution
function handleSocialBar() {
    const width = window.innerWidth;
    const socialBar = document.querySelector('.social');
    const whoami = document.querySelector('.whoami');
    
    if (socialBar && whoami) {
        if (width >= 769 && width <= 945) {
            // Pour la plage problématique, s'assurer que la barre sociale ne chevauche pas
            socialBar.style.position = 'relative';
            socialBar.style.zIndex = '10';
            whoami.style.marginTop = '0';
        } else if (width > 945) {
            // Pour les grands écrans, remettre en position fixe
            socialBar.style.position = 'fixed';
            socialBar.style.zIndex = '1000';
            whoami.style.marginTop = '0';
        }
    }
}

// Écouter les changements de taille d'écran
window.addEventListener('resize', () => {
    adaptContributionsIframe();
    handleExtremeWidths();
    handleSocialBar();
    //debugScreenSize(); // À supprimer en production
});

// Adapter au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    adaptContributionsIframe();
    handleExtremeWidths();
    handleSocialBar();
    initProjectTabs();
    
    // Déclencher l'animation de la section projets après un délai
    setTimeout(() => {
        const projectsSection = document.querySelector('.projects');
        if (projectsSection) {
            projectsSection.classList.add('visible');
        }
    }, 1000);
    
    //debugScreenSize(); // À supprimer en production
});

// Fonctions pour la gestion des onglets de projets
function initProjectTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const projectPanels = document.querySelectorAll('.project-panel');
    
    // Ajouter les événements de clic sur les boutons d'onglets
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            switchProject(projectId);
        });
    });
    
    // Afficher le premier projet par défaut
    showProject('DM_Web');
}

function switchProject(projectId) {
    // Retirer la classe active de tous les boutons
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    // Ajouter la classe active au bouton cliqué
    document.querySelector(`[data-project="${projectId}"]`).classList.add('active');
    
    // Transition entre les panneaux
    const allPanels = document.querySelectorAll('.project-panel');
    const targetPanel = document.getElementById(projectId);
    
    // Masquer tous les panneaux
    allPanels.forEach(panel => panel.classList.remove('active'));
    
    // Afficher le panneau cible immédiatement
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

function showProject(projectId) {
    const targetPanel = document.getElementById(projectId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

// Fonction pour animer l'apparition des projets au scroll (optionnel)
function handleProjectVisibility() {
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            projectsSection.classList.add('visible');
        }
    }
}

// Écouter le scroll pour les animations (optionnel)
window.addEventListener('scroll', handleProjectVisibility);
