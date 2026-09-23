// 日系風格個人履歷與作品集網站互動腳本

document.addEventListener('DOMContentLoaded', function() {
    // 技能進度條動畫
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillProgresses.forEach(progress => {
            const targetWidth = progress.style.width;
            // 重置寬度以觸發過渡
            progress.style.width = '0';
            // 重新流動以重置動畫
            void progress.offsetWidth;
            // 設置目標寬度
            progress.style.width = targetWidth;
        });
    }
    
    // 滾動時顯示區塊
    const sections = document.querySelectorAll('.about, .portfolio, .skills');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }
    
    // 初始化
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 檢查初始狀態
    
    // 延遲啟動技能動畫，確保用戶已看到該區塊
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateSkills, 300); // 延遲300ms啟動動畫
                    observer.disconnect(); // 觀察只需執行一次
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
    
    // 平滑滾動 для錨點連結（如果有的話）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // 頁面載入時的淡入效果（已在CSS中處理，但這裡確保JS不報錯）
    console.log('網站載入完成 - 日系風格個人履歷與作品集');
});