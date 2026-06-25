document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');

    // State Variables
    let activeImages = [];
    let currentIndex = 0;

    // --- Category Filter Logic ---
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Update Active Button Style
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            
            updateActiveImagePool();
        });
    });

    // Sync active image array with what's visible on screen
    function updateActiveImagePool() {
        activeImages = Array.from(galleryItems)
            .filter(item => !item.classList.contains('hidden'))
            .map(item => item.querySelector('.gallery-img'));
    }

    // --- Lightbox Functionality ---
    function openLightbox(imgElement) {
        currentIndex = activeImages.indexOf(imgElement);
        if (currentIndex === -1) return;

        updateLightboxContent();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const currentImg = activeImages[currentIndex];
        lightboxImg.src = currentImg.src;
        lightboxImg.alt = currentImg.alt;
        
        // Grab descriptive text from structural siblings
        const title = currentImg.closest('.image-wrapper').querySelector('h3').textContent;
        lightboxCaption.textContent = title;
    }

    function navigateLightbox(direction) {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % activeImages.length;
        } else if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
        }
        updateLightboxContent();
    }

    // --- Event Listeners ---
    
    // Open on image wrapper tap/click
    galleryItems.forEach(item => {
        item.querySelector('.image-wrapper').addEventListener('click', () => {
            const img = item.querySelector('.gallery-img');
            openLightbox(img);
        });
    });

    // Control triggers
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', () => navigateLightbox('next'));
    prevBtn.addEventListener('click', () => navigateLightbox('prev'));

    // Modal Background Click dismiss
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Professional Accessibility: Keyboard Navigation Bindings
    window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') navigateLightbox('next');
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
    });

    // Runtime Initialization
    updateActiveImagePool();
});