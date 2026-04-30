(function() {
    let config = {
        position: 'top-right',
        duration: 3000,
        maxToasts: 5,
        theme: 'light'
    };

    const ICONS = {
        success: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
        error: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
        warning: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        info: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    };

    function createContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            // Set initial position class
            container.className = `toast-container-${config.position} theme-${config.theme}`;
            document.body.appendChild(container);
        }
        return container;
    }

    window.Toastify = {
        init: function(options) {
            config = { ...config, ...options };
            const container = document.getElementById('toast-container');
            if (container) {
                container.className = `toast-container-${config.position} theme-${config.theme}`;
            }
        }
    };

    window.showToast = function({ type = 'info', message, title, duration = config.duration }) {
        const container = createContainer();
        
        // Limit max toasts
        if (container.children.length >= config.maxToasts) {
            container.removeChild(container.firstChild);
        }

        // Prevent exact duplicates
        const existingMessages = Array.from(container.querySelectorAll('.toast-message')).map(m => m.innerText);
        if (existingMessages.includes(message)) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let remainingTime = duration;
        let startTime = Date.now();
        let timeoutId;
        let isPaused = false;

        toast.innerHTML = `
            <div class="toast-icon">${ICONS[type] || ICONS.info}</div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">&times;</button>
            <div class="toast-progress">
                <div class="toast-progress-bar"></div>
            </div>
        `;

        const progressBar = toast.querySelector('.toast-progress-bar');
        const closeBtn = toast.querySelector('.toast-close');

        function removeToast() {
            toast.classList.add('removing');
            toast.addEventListener('animationend', () => {
                toast.remove();
            }, { once: true });
        }

        function startTimer() {
            startTime = Date.now();
            timeoutId = setTimeout(removeToast, remainingTime);
            progressBar.style.transitionDuration = `${remainingTime}ms`;
            progressBar.style.transform = 'scaleX(0)';
        }

        function pauseTimer() {
            clearTimeout(timeoutId);
            const elapsed = Date.now() - startTime;
            remainingTime -= elapsed;
            isPaused = true;
            
            const computedStyle = window.getComputedStyle(progressBar);
            const matrix = new WebKitCSSMatrix(computedStyle.transform);
            progressBar.style.transitionDuration = '0ms';
            progressBar.style.transform = `scaleX(${matrix.a})`;
        }

        closeBtn.onclick = (e) => {
            e.stopPropagation();
            removeToast();
        };

        toast.onmouseenter = pauseTimer;
        toast.onmouseleave = () => {
            isPaused = false;
            if (remainingTime > 0) startTimer();
        };

        container.appendChild(toast);
        
        requestAnimationFrame(() => {
            startTimer();
        });
    };

    window.showToasts = function(messages) {
        messages.forEach(msg => {
            let type = 'info';
            if (msg.level.includes('success')) type = 'success';
            if (msg.level.includes('error') || msg.level.includes('danger')) type = 'error';
            if (msg.level.includes('warning')) type = 'warning';
            
            window.showToast({
                type: type,
                message: msg.text
            });
        });
    };
})();
