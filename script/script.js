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
function debugScreenSize() {
    console.log(`Largeur d'écran: ${window.innerWidth}px, Hauteur: ${window.innerHeight}px`);
}

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
    debugScreenSize(); // À supprimer en production
});

// Adapter au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    adaptContributionsIframe();
    handleExtremeWidths();
    handleSocialBar();
    debugScreenSize(); // À supprimer en production
});
