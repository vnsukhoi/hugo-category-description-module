category-description/
├── layouts/
│   └── partials/
│       └── assets/
│           └── category-description.html
├── assets/
│   └── js/
│       └── modules/
│           └── category-description/
│               └── index.js
└── README.md

# File: layouts/partials/assets/category-description.html
<div class="category-description-container">
    <div class="category-description" id="categoryDescription">
        {{ .Content }}
    </div>
    <div class="text-center mt-3">
        <button class="btn btn-primary" id="toggleDescriptionBtn">Xem Chi Tiết</button>
    </div>
</div>

<style>
    .category-description-container {
        position: relative;
    }
    .category-description {
        max-height: 300px;
        overflow: hidden;
        transition: max-height 0.5s ease;
    }
    .read-more-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
        pointer-events: none;
    }
    .category-description.expanded {
        max-height: none;
    }
    .category-description.expanded + .text-center .btn {
        margin-top: 20px;
    }
</style>

# File: assets/js/modules/category-description/index.js
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

# File: README.md
# Category Description Module

This module provides a collapsible category description for Hugo websites.

## Installation

1. Copy the `layouts` and `assets` folders into your Hugo project.
2. Update your `params.toml` file:

   ```toml
   [modules]
       optional = ["category-description"]
       [modules.category-description]
           state = "defer"

   [js]
       custom = ["js/category-description.js"]
   ```

3. In your `layouts/_default/list.html`, add the following front matter:

   ```yaml
   ---
   modules:
     - category-description
   ---
   ```

4. Include the partial in your `list.html`:

   ```html
   {{ partial "assets/category-description.html" . }}
   ```

## Usage

The module will automatically add a "Read More" button to category descriptions that exceed the max-height.

## Customization

You can customize the styles in the `category-description.html` file.