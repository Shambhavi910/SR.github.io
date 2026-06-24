// ── NAVBAR scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }, { passive: true });
}

// ── CONTACT FORM ──
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            const existingMsg = contactForm.parentNode.querySelector('.form-success-message, .form-error-message');
            if (existingMsg) existingMsg.remove();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Sending…';
            submitBtn.disabled = true;

            fetch('https://formsubmit.co/ajax/shambhavi10231@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name, email,
                    _subject: `Portfolio enquiry: ${subject}`,
                    message,
                    _captcha: 'false'
                })
            })
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(() => {
                const div = document.createElement('div');
                div.className = 'form-success-message';
                div.innerHTML = `<strong>Message sent, ${name}!</strong> I'll get back to you soon.`;
                contactForm.parentNode.appendChild(div);
                contactForm.reset();
            })
            .catch(() => {
                const div = document.createElement('div');
                div.className = 'form-error-message';
                div.innerHTML = `Something went wrong. Email me directly at <a href="mailto:shambhavi10231@gmail.com">shambhavi10231@gmail.com</a>.`;
                contactForm.parentNode.appendChild(div);
            })
            .finally(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            });
        });
    }

    // ── SCROLL ANIMATIONS ──
    const fadeEls = document.querySelectorAll('.fade-up');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        fadeEls.forEach((el, i) => {
            el.style.transitionDelay = `${(i % 4) * 80}ms`;
            obs.observe(el);
        });
    } else {
        fadeEls.forEach(el => el.classList.add('visible'));
    }
});
