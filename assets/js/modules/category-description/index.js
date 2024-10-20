export default () => {
    const container = document.querySelector(".category-description-container");
    if (!container) return;

    const description = document.getElementById("categoryDescription");
    const toggleBtn = document.getElementById("toggleDescriptionBtn");
    if (!description || !toggleBtn) return;

    const overlay = document.createElement('div');
    overlay.classList.add('read-more-overlay');

    function checkOverflow() {
        const isOverflowing = description.scrollHeight > description.offsetHeight;
        toggleBtn.style.display = isOverflowing ? "inline-block" : "none";
        overlay.style.display = isOverflowing ? "block" : "none";
        if (isOverflowing && !container.contains(overlay)) {
            container.insertBefore(overlay, container.lastElementChild);
        }
    }

    toggleBtn.addEventListener("click", function() {
        description.classList.toggle('expanded');
        toggleBtn.textContent = description.classList.contains('expanded') ? "Thu gọn" : "Xem Chi Tiết";
        overlay.style.display = description.classList.contains('expanded') ? "none" : "block";
    });

    // Wrap checkOverflow in a try-catch block
    function safeCheckOverflow() {
        try {
            checkOverflow();
        } catch (error) {
            console.error("Error in checkOverflow:", error);
        }
    }

    safeCheckOverflow();
    window.addEventListener('resize', safeCheckOverflow);
};