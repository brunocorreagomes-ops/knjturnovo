/* KNJ TUR - Global Scripts */

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('KNJ TUR Static Site Initialized');
    
    // Lucide Icons Initialization
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Scroll Header Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('bg-surface/95', 'shadow-2xl', 'h-16');
                header.classList.remove('bg-surface/80', 'h-20');
            } else {
                header.classList.remove('bg-surface/95', 'shadow-2xl', 'h-16');
                header.classList.add('bg-surface/80', 'h-20');
            }
        });
    }

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenu.classList.remove('hidden'); // Ensure it's not hidden if we're using transition
            
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                    document.body.style.overflow = 'hidden';
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                    document.body.style.overflow = '';
                }
                window.lucide.createIcons();
            }
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    window.lucide.createIcons();
                }
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button visibility
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.remove('opacity-0', 'invisible', 'translate-y-10');
                backToTop.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                backToTop.classList.add('opacity-0', 'invisible', 'translate-y-10');
                backToTop.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });
    }

    // Scroll Reveal Animation Logic
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing after reveal if desired, or keep for re-triggering
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // Blog "Load More" Logic
    const loadMoreBtn = document.getElementById('load-more-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    const POSTS_PER_PAGE = 3;
    let currentShown = POSTS_PER_PAGE;

    if (loadMoreBtn && blogPosts.length > 0) {
        // Initial state is already set in HTML (posts 4+ have 'hidden' class)
        
        loadMoreBtn.addEventListener('click', () => {
            let newlyShown = 0;
            const hiddenPosts = Array.from(blogPosts).filter(post => post.classList.contains('hidden'));
            
            hiddenPosts.slice(0, POSTS_PER_PAGE).forEach((post, index) => {
                // Remove hidden class with a small delay for staggered effect
                setTimeout(() => {
                    post.classList.remove('hidden');
                    // Trigger reveal animation manually if it's already in viewport or let observer handle it
                    if (window.lucide) window.lucide.createIcons();
                }, index * 150);
                newlyShown++;
            });

            currentShown += newlyShown;

            // Hide button if no more posts
            if (currentShown >= blogPosts.length) {
                loadMoreBtn.parentElement.classList.add('opacity-0', 'invisible');
                setTimeout(() => {
                    loadMoreBtn.parentElement.style.display = 'none';
                }, 500);
            }
        });
        
        // Final hide check on load (if posts are less than limit)
        if (blogPosts.length <= POSTS_PER_PAGE) {
            loadMoreBtn.parentElement.style.display = 'none';
        }
    }
});
