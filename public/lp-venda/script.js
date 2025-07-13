// Função para scroll suave para o formulário
function scrollToForm() {
    const formSection = document.getElementById('form-section');
    formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Função para redirecionar para o checkout
function goToCheckout() {
    // Aqui você deve substituir pela URL do seu checkout
    const checkoutUrl = 'https://seu-checkout.com/ebook-diabetes';
    
    // Tracking do clique
    trackEvent('checkout_click', {
        button_text: event.target.textContent.trim(),
        section: getCurrentSection()
    });
    
    // Redirecionar para o checkout
    window.open(checkoutUrl, '_blank');
}

// Função para animar elementos quando entram na viewport
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos para animar
    const elementsToAnimate = document.querySelectorAll('.problem-card, .difference-card, .bonus-card, .credential-item, .feature-item, .pricing-card');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Função para adicionar contador de urgência
function addUrgencyCounter() {
    const ctaButtons = document.querySelectorAll('.cta-button, .header-button');
    
    ctaButtons.forEach(button => {
        const originalText = button.innerHTML;
        
        // Adicionar efeito de pulso
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 1s infinite';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animation = 'none';
        });
    });
}

// Função para validação do formulário
function validateForm() {
    const form = document.getElementById('leadForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Por favor, insira seu nome');
            return;
        }
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Por favor, insira seu e-mail');
            return;
        }
        
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Por favor, insira um e-mail válido');
            return;
        }
        
        // Simular envio do formulário
        showSuccess();
        
        // Aqui você pode adicionar a integração com seu sistema de captura de leads
        console.log('Formulário enviado:', {
            name: nameInput.value,
            email: emailInput.value,
            phone: document.getElementById('phone').value
        });
    });
}

// Função para mostrar erro
function showError(input, message) {
    const formGroup = input.parentElement;
    const existingError = formGroup.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
    input.style.borderColor = '#ff6b6b';
    
    setTimeout(() => {
        input.style.borderColor = '#e9ecef';
    }, 3000);
}

// Função para mostrar sucesso
function showSuccess() {
    const form = document.getElementById('leadForm');
    const submitButton = form.querySelector('.submit-button');
    
    submitButton.innerHTML = '<i class="fas fa-check"></i> Enviado com sucesso!';
    submitButton.style.background = 'linear-gradient(45deg, #4ade80, #22c55e)';
    submitButton.disabled = true;
    
    // Mostrar mensagem de agradecimento
    const thankYouMessage = document.createElement('div');
    thankYouMessage.style.background = 'linear-gradient(45deg, #4ade80, #22c55e)';
    thankYouMessage.style.color = 'white';
    thankYouMessage.style.padding = '1rem';
    thankYouMessage.style.borderRadius = '10px';
    thankYouMessage.style.marginTop = '1rem';
    thankYouMessage.style.textAlign = 'center';
    thankYouMessage.innerHTML = `
        <h3>🎉 Obrigado!</h3>
        <p>Seu e-book será enviado para seu e-mail em instantes.</p>
        <p><strong>Verifique sua caixa de entrada e spam!</strong></p>
    `;
    
    form.appendChild(thankYouMessage);
}

// Função para validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para adicionar efeitos de hover nos cards
function addHoverEffects() {
    const cards = document.querySelectorAll('.problem-card, .difference-card, .bonus-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Função para adicionar scroll progressivo
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-accent-500 to-accent-600 z-50 transition-all duration-300';
    progressBar.style.width = '0%';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Função para adicionar contador de tempo limitado (opcional)
function addCountdownTimer() {
    const countdownContainer = document.createElement('div');
    countdownContainer.className = 'fixed top-20 right-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white p-4 rounded-xl shadow-2xl z-40 text-center max-w-xs';
    
    // Definir tempo limite (30 minutos)
    const timeLimit = 30 * 60;
    let timeLeft = timeLimit;
    
    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        countdownContainer.innerHTML = `
            <div class="font-bold mb-2">⏰ Oferta por tempo limitado!</div>
            <div class="text-2xl font-bold">
                ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
            </div>
        `;
        
        if (timeLeft <= 0) {
            countdownContainer.innerHTML = `
                <div class="font-bold text-yellow-300">⚠️ Oferta expirada!</div>
            `;
            return;
        }
        
        timeLeft--;
        setTimeout(updateCountdown, 1000);
    }
    
    updateCountdown();
    document.body.appendChild(countdownContainer);
}

// Função para adicionar notificação de última compra
function addLastPurchaseNotification() {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 left-4 bg-gradient-to-r from-success-500 to-success-600 text-white p-4 rounded-xl shadow-2xl z-40 max-w-xs animate-pulse';
    
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-user text-xl"></i>
            <div>
                <div class="font-bold">Maria acabou de adquirir!</div>
                <div class="text-sm opacity-90">"Finalmente vou poder cozinhar sem medo!"</div>
            </div>
        </div>
    `;
    
    // Mostrar após 5 segundos
    setTimeout(() => {
        document.body.appendChild(notification);
        
        // Remover após 8 segundos
        setTimeout(() => {
            notification.remove();
        }, 8000);
    }, 5000);
}

// Função para adicionar CSS de animações
function addAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutLeft {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(-100%); opacity: 0; }
        }
        
        .cta-button:hover,
        .header-button:hover {
            animation: pulse 1s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Função para adicionar tracking de eventos
function addEventTracking() {
    // Track clicks nos CTAs
    const ctaButtons = document.querySelectorAll('.cta-button, .header-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('CTA clicked:', button.textContent.trim());
            // Aqui você pode adicionar Google Analytics, Facebook Pixel, etc.
            
            // Exemplo de tracking para Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': button.textContent.trim()
                });
            }
            
            // Exemplo de tracking para Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'InitiateCheckout', {
                    content_name: 'E-book Receitas Diabetes',
                    value: 47.00,
                    currency: 'BRL'
                });
            }
        });
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.pageYOffset / (document.body.offsetHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0) { // Track a cada 25%
                console.log('Scroll depth:', maxScroll + '%');
                
                // Track no Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', {
                        'event_category': 'Engagement',
                        'event_label': maxScroll + '%'
                    });
                }
            }
        }
    });
}

// // Função para otimizar performance
// function optimizePerformance() {
//     // Lazy loading para imagens
//     const images = document.querySelectorAll('img');
//     if ('IntersectionObserver' in window) {
//         const imageObserver = new IntersectionObserver((entries, observer) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     const img = entry.target;
//                     img.src = img.dataset.src;
//                     img.classList.remove('lazy');
//                     imageObserver.unobserve(img);
//                 }
//             });
//         });
        
//         images.forEach(img => imageObserver.observe(img));
//     }

    // Preload de recursos críticos
    // const criticalResources = [
    //     'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    //     'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    // ];
    
//     criticalResources.forEach(resource => {
//         const link = document.createElement('link');
//         link.rel = 'preload';
//         link.href = resource;
//         link.as = 'style';
//         document.head.appendChild(link);
//     });
// }

// Função para adicionar loading state nos botões
function addLoadingStates() {
    const buttons = document.querySelectorAll('button[onclick*="goToCheckout"]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.disabled) {
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
                this.disabled = true;
                this.classList.add('opacity-75');
                
                // Reset após 3 segundos
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.disabled = false;
                    this.classList.remove('opacity-75');
                }, 3000);
            }
        });
    });
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamento baseado no dispositivo
window.addEventListener('resize', () => {
    if (isMobile()) {
        // Ajustes específicos para mobile
        console.log('Dispositivo móvel detectado');
    }
});

// Inicializar todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Landing page otimizada carregada!');
    
    // Inicializar todas as funcionalidades
    animateOnScroll();
    addUrgencyCounter();
    addHoverEffects();
    addScrollProgress();
    addAnimationCSS();
    addEventTracking();
    // optimizePerformance();
    addLoadingStates();
    
    // Descomente as linhas abaixo se quiser adicionar essas funcionalidades
    // addCountdownTimer();
    // addLastPurchaseNotification();
    
    // Adicionar smooth scroll para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Função para adicionar efeito de destaque nos preços
function highlightPricing() {
    const prices = document.querySelectorAll('.text-success-500');
    prices.forEach(price => {
        price.classList.add('animate-pulse');
    });
}

// Função para adicionar contador de vendas (opcional)
function addSalesCounter() {
    const salesContainer = document.createElement('div');
    salesContainer.className = 'fixed bottom-4 right-4 bg-gradient-to-r from-success-500 to-success-600 text-white p-4 rounded-xl shadow-2xl z-40 text-center max-w-xs';
    
    let salesCount = 127;
    
    function updateSales() {
        salesCount += Math.floor(Math.random() * 3) + 1;
        salesContainer.innerHTML = `
            <div class="font-bold mb-1">🔥 Últimas vendas</div>
            <div class="text-xl font-bold">${salesCount} pessoas já adquiriram!</div>
        `;
    }
    
    updateSales();
    document.body.appendChild(salesContainer);
    
    // Atualizar a cada 30 segundos
    setInterval(updateSales, 30000);
}

// Função para adicionar scroll tracking
function addScrollTracking() {
    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set();
    
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.pageYOffset / (document.body.offsetHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track scroll milestones
            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    trackEvent('scroll_depth', {
                        depth: threshold + '%',
                        section: getCurrentSection()
                    });
                }
            });
        }
    });
}

// Função para detectar seção atual
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            return section.className || 'unknown';
        }
    }
    return 'unknown';
}

// Função para otimizações específicas para mobile
function optimizeForMobile() {
    if (isMobile()) {
        // Reduzir animações em dispositivos móveis para melhor performance
        document.body.classList.add('mobile-optimized');
        
        // Ajustar tamanho dos botões para touch
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.add('min-h-12');
        });
    }
}

// Função para adicionar analytics de tempo na página
function addTimeTracking() {
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', {
            seconds: timeSpent,
            section: getCurrentSection()
        });
    });
}

// Função para adicionar heatmap tracking (simplificado)
function addHeatmapTracking() {
    const clickableElements = document.querySelectorAll('button, a, .cursor-pointer');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', (e) => {
            const rect = element.getBoundingClientRect();
            trackEvent('element_click', {
                element: element.tagName,
                text: element.textContent.trim().substring(0, 50),
                position: {
                    x: Math.round(rect.left + rect.width / 2),
                    y: Math.round(rect.top + rect.height / 2)
                }
            });
        });
    });
}

// Função para adicionar otimizações de SEO
function addSEOOptimizations() {
    // Adicionar meta tags dinâmicas
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', 'Descubra receitas seguras e saborosas para diabetes com contagem exata de carboidratos. E-book exclusivo da nutricionista Cinthia Fontes. Apenas R$ 47,00!');
    }
    
    // Adicionar structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "E-book Receitas com Contagem de Carboidratos",
        "description": "Receitas seguras e saborosas para diabetes com contagem exata de carboidratos",
        "brand": {
            "@type": "Brand",
            "name": "Cinthia Fontes"
        },
        "offers": {
            "@type": "Offer",
            "price": "47.00",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock"
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Função para adicionar otimizações de acessibilidade
function addAccessibilityFeatures() {
    // Adicionar focus visible para navegação por teclado
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    focusableElements.forEach(element => {
        element.classList.add('focus:outline-none', 'focus:ring-2', 'focus:ring-accent-500', 'focus:ring-offset-2');
    });
    
    // Adicionar aria-labels para elementos importantes
    const buttons = document.querySelectorAll('button[onclick*="goToCheckout"]');
    buttons.forEach((button, index) => {
        button.setAttribute('aria-label', `Comprar e-book - botão ${index + 1}`);
    });
}

// Adicionar acessibilidade
addAccessibilityFeatures(); 