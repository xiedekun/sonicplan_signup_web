// 英雄区域轮播功能
class HeroCarousel {
    constructor(container) {
        this.container = container;
        this.slides = Array.from(container.querySelectorAll('.carousel-slide'));
        this.indicators = Array.from(container.querySelectorAll('.indicator'));
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');

        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        // 绑定事件
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // 指示器点击事件
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // 键盘导航
        document.addEventListener('keydown', (e) => {
            const heroRect = document.querySelector('.hero').getBoundingClientRect();
            if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            }
        });

        // 触摸滑动支持
        this.addTouchSupport();

        // 自动轮播
        this.startAutoPlay();

        // 当用户与轮播交互时暂停自动播放
        this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());

        // 标签页切换时暂停/恢复自动播放
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else {
                this.resumeAutoPlay();
            }
        });
    }

    updateSlide() {
        // 隐藏所有幻灯片
        this.slides.forEach(slide => slide.classList.remove('active'));

        // 显示当前幻灯片
        this.slides[this.currentIndex].classList.add('active');

        // 更新指示器
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        this.indicators[this.currentIndex].classList.add('active');
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateSlide();
        this.resetAutoPlay();
    }

    prev() {
        this.currentIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
        this.updateSlide();
        this.resetAutoPlay();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentIndex = index;
            this.updateSlide();
            this.resetAutoPlay();
        }
    }

    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        const minSwipeDistance = 50;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > minSwipeDistance) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), 4000);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resumeAutoPlay() {
        if (!this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }

    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }
}

// 平滑滚动
function initSmoothScroll() {
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
}

// 导航栏滚动效果
function initNavbarScroll() {
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// 邮件订阅表单处理
function initSubscribeForm() {
    const form = document.getElementById('subscribe-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // 模拟订阅成功
            alert(`感谢订阅！我们会在声压计划上线时通知 ${email}`);
            this.reset();
        });
    }
}

// 页面加载动画
function initPageAnimations() {
    const elements = document.querySelectorAll('.feature-card, .step, .download-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';

        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function () {
    // 初始化轮播
    const heroCarouselElement = document.querySelector('.hero-carousel');
    if (heroCarouselElement) {
        new HeroCarousel(heroCarouselElement);
    }

    // 初始化其他功能
    initSmoothScroll();
    initNavbarScroll();
    initSubscribeForm();
    initPageAnimations();

    console.log('🎸 声压计划网站加载完成！');
});