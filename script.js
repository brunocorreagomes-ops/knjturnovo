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

    // Global Share Functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const url = window.location.href;
            const title = document.title;

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: title,
                        url: url
                    });
                } catch (err) {
                    console.log('Share cancelled or failed:', err);
                }
            } else {
                // Fallback: Copy to clipboard
                try {
                    await navigator.clipboard.writeText(url);
                    const originalContent = btn.innerHTML;
                    btn.innerHTML = '<i data-lucide="check" size="14"></i> URL Copiada!';
                    if (window.lucide) window.lucide.createIcons();
                    setTimeout(() => {
                        btn.innerHTML = originalContent;
                        if (window.lucide) window.lucide.createIcons();
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            }
        });
    });

    // Blog Pagination Logic
    const blogPosts = document.querySelectorAll('.blog-post');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageNumbersContainer = document.getElementById('page-numbers');
    
    const POSTS_PER_PAGE = 3;
    let currentPage = 1;

    if (blogPosts.length > 0 && pageNumbersContainer) {
        const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

        function showPage(page) {
            const start = (page - 1) * POSTS_PER_PAGE;
            const end = start + POSTS_PER_PAGE;

            blogPosts.forEach((post, index) => {
                if (index >= start && index < end) {
                    post.classList.remove('hidden');
                    // Ensure reveal animation works
                    setTimeout(() => post.classList.add('active'), 50);
                } else {
                    post.classList.add('hidden');
                    post.classList.remove('active');
                }
            });

            updatePaginationUI();
            
            // Scroll to top of posts grid if not on initial load
            if (window.scrollY > 500) {
                const grid = document.getElementById('blog-posts-grid');
                if (grid) grid.scrollIntoView({ behavior: 'smooth' });
            }
        }

        function updatePaginationUI() {
            // Update buttons
            if (prevBtn) prevBtn.disabled = currentPage === 1;
            if (nextBtn) nextBtn.disabled = currentPage === totalPages;

            // Update page numbers
            pageNumbersContainer.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                btn.className = `w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold transition-all ${
                    currentPage === i ? 'bg-primary text-white border-primary' : 'text-on-surface-variant hover:border-primary/50'
                }`;
                btn.onclick = () => {
                    currentPage = i;
                    showPage(currentPage);
                };
                pageNumbersContainer.appendChild(btn);
            }
        }

        if (prevBtn) {
            prevBtn.onclick = () => {
                if (currentPage > 1) {
                    currentPage--;
                    showPage(currentPage);
                }
            };
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    showPage(currentPage);
                }
            };
        }

        // Initialize
        showPage(1);
    }
});
