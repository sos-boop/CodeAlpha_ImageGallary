document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const heartButtons = document.querySelectorAll('.wishlist-heart-btn');

  // --- 1. Gallery Filtering Logic ---
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Remove active class from active filter and append to selection
      document.querySelector('.filter-btn.active').classList.remove('active');
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          // Bring items back into layout flow instantly, then transition visibility style
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          // Transition card away elegantly, then pull it out of layout space
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          
          // Wait for the CSS duration (400ms) before adding display none
          setTimeout(() => {
            item.classList.add('hidden');
          }, 400);
        }
      });
    });
  });

  // --- 2. Interactive Wishlist Toggle (Heart Button) ---
  heartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevents triggers if parent card actions ever exist
      btn.classList.toggle('liked');

      // Mutate the nested fontawesome classes dynamically
      const icon = btn.querySelector('i');
      if (btn.classList.contains('liked')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
      }
    });
  });
});
