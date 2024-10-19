// Obter os elementos do carrossel
const items = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const progressSegments = document.querySelectorAll('.progress-segment');

// Configurar o índice ativo inicial
let activeIndex = 0;
const totalItems = items.length;
items[activeIndex].classList.add('active');
progressSegments[activeIndex].classList.add('active');

// Função para atualizar a barra de progresso
function updateProgress(newIndex) {
    progressSegments.forEach((segment, index) => {
        segment.classList.toggle('active', index <= newIndex);
    });
}

// Função para mudar o item do carrossel
function updateCarousel(newIndex) {
    items[activeIndex].classList.remove('active');
    activeIndex = newIndex;
    items[activeIndex].classList.add('active');
    updateProgress(activeIndex);
}

// Navegação para a esquerda
prevButton.addEventListener('click', () => {
    const newIndex = (activeIndex - 1 + items.length) % items.length;
    updateCarousel(newIndex);
    resetAutoSlide(); // Resetar o timer ao clicar manualmente
});

// Navegação para a direita
nextButton.addEventListener('click', () => {
    const newIndex = (activeIndex + 1) % items.length;
    updateCarousel(newIndex);
    resetAutoSlide(); // Resetar o timer ao clicar manualmente
});

// Fazer as linhas de progresso clicáveis
progressSegments.forEach(segment => {
    segment.addEventListener('click', () => {
        const newIndex = parseInt(segment.getAttribute('data-index'));
        updateCarousel(newIndex);
        resetAutoSlide(); // Resetar o timer ao clicar manualmente
    });
});

// Função para mudar automaticamente após 15 segundos
let autoSlideInterval = setInterval(() => {
    const newIndex = (activeIndex + 1) % items.length;
    updateCarousel(newIndex);
}, 15000);

// Função para resetar o auto slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        const newIndex = (activeIndex + 1) % items.length;
        updateCarousel(newIndex);
    }, 15000);
}

// Inicializar a posição do progresso
updateProgress(activeIndex);