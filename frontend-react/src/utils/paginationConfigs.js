// Pagination Configuration Templates
// Usage: Import and use with switch case

export const paginationConfigs = {

    // Style 1: Page numbers only with ellipsis
    style1: {
        enabled: true,
        type: "FIXED_PAGINATION",
        el: document.getElementById("pagination-container"),
        pageClass: "page-btn",
        selectedPageClass: "page-btn-active",
        pageLimit: 5,
        action: "click",

        template: function (paginationData, pagination) {
            if (!paginationData) return '';

            const { currentPage, noOfPages, numberOfProducts, productsLn, rows } = paginationData;
            const { pageClass, selectedPageClass, pageLimit } = pagination;

            if (numberOfProducts <= productsLn) return '';

            // Page numbers
            let pageNumbers = '';
            let pages = Math.min(noOfPages, pageLimit);
            let startPoint = Math.max(1, currentPage - Math.floor(pageLimit / 2));

            if (startPoint + pages - 1 > noOfPages) {
                startPoint = Math.max(1, noOfPages - pages + 1);
            }

            for (let i = startPoint; i < startPoint + pages && i <= noOfPages; i++) {
                const isActive = i === currentPage ? selectedPageClass : '';
                pageNumbers += `<button data-page-action="paginate" data-page-no="${(i - 1) * rows}" class="${pageClass} ${isActive}">${i}</button>`;
            }

            // Ellipsis and last page
            let ellipsis = '';
            if (startPoint + pages - 1 < noOfPages - 1) {
                ellipsis = `<span class="page-ellipsis">...</span>`;
                ellipsis += `<button data-page-action="paginate" data-page-no="${(noOfPages - 1) * rows}" class="${pageClass}">${noOfPages}</button>`;
            }

            return `
          <div class="custom-pagination style-5">
            <div class="page-numbers">
              ${pageNumbers}
              ${ellipsis}
            </div>
          </div>
        `;
        }
    },

    // Style 2: Previous/Next with Page Info text
    style2: {
        enabled: true,
        type: "FIXED_PAGINATION",
        el: document.getElementById("pagination-container"),
        pageClass: "page-btn",
        selectedPageClass: "page-btn-active",
        pageLimit: 7,
        action: "click",

        template: function (paginationData, pagination) {
            if (!paginationData) return '';

            const { currentPage, isNext, isPrev, noOfPages, numberOfProducts, productsLn } = paginationData;
            const { pageClass } = pagination;

            if (numberOfProducts <= productsLn) return '';

            // Previous button (left end)
            let prevBtn = isPrev
                ? `<button class="${pageClass} nav-btn prev-btn" data-page-action="prev">← Previous</button>`
                : `<button class="${pageClass} nav-btn prev-btn" disabled>← Previous</button>`;

            // Next button (right end)
            let nextBtn = isNext
                ? `<button class="${pageClass} nav-btn next-btn" data-page-action="next">Next →</button>`
                : `<button class="${pageClass} nav-btn next-btn" disabled>Next →</button>`;

            // Page info only (no buttons)
            let pageInfo = `<span class="page-info">Page ${currentPage} of ${noOfPages}</span>`;

            return `
          <div class="custom-pagination style-3">
            ${prevBtn}
            <div class="pagination-center">
              ${pageInfo}
            </div>
            ${nextBtn}
          </div>
        `;
        }
    },

    // Style 3: First/Back/Next/Last with page numbers
    style3: {
        enabled: true,
        type: "FIXED_PAGINATION",
        el: document.getElementById("pagination-container"),
        pageClass: "page-btn",
        selectedPageClass: "page-btn-active",
        pageLimit: 7,
        action: "click",

        template: function (paginationData, pagination) {
            if (!paginationData) return '';

            const { currentPage, isNext, isPrev, noOfPages, numberOfProducts, productsLn, rows } = paginationData;
            const { pageClass, selectedPageClass, pageLimit } = pagination;

            if (numberOfProducts <= productsLn) return '';

            // First button
            let firstBtn = isPrev
                ? `<button class="${pageClass}" data-page-action="firstPage">« First</button>`
                : `<button class="${pageClass}" disabled>« First</button>`;

            // Previous button (changed to "Back")
            let prevBtn = isPrev
                ? `<button class="${pageClass}" data-page-action="prev">‹ Back</button>`
                : `<button class="${pageClass}" disabled>‹ Back</button>`;

            // Next button
            let nextBtn = isNext
                ? `<button class="${pageClass}" data-page-action="next">Next ›</button>`
                : `<button class="${pageClass}" disabled>Next ›</button>`;

            // Last button
            let lastBtn = isNext
                ? `<button class="${pageClass}" data-page-action="lastPage">Last »</button>`
                : `<button class="${pageClass}" disabled>Last»</button>`;

            // Page numbers
            let pageNumbers = '';
            let pages = Math.min(noOfPages, pageLimit);
            let startPoint = Math.max(1, currentPage - Math.floor(pageLimit / 2));

            if (startPoint + pages - 1 > noOfPages) {
                startPoint = Math.max(1, noOfPages - pages + 1);
            }

            for (let i = startPoint; i < startPoint + pages && i <= noOfPages; i++) {
                const isActive = i === currentPage ? selectedPageClass : '';
                pageNumbers += `<button data-page-action="paginate" data-page-no="${(i - 1) * rows}" class="${pageClass} ${isActive}">${i}</button>`;
            }

            // Ellipsis and last page
            let ellipsis = '';
            if (startPoint + pages - 1 < noOfPages - 1) {
                ellipsis = `<span class="page-ellipsis">...</span>`;
                ellipsis += `<button data-page-action="paginate" data-page-no="${(noOfPages - 1) * rows}" class="${pageClass}">${noOfPages}</button>`;
            }

            return `
          <div class="custom-pagination">
            ${firstBtn}
            ${prevBtn}
            <div class="page-numbers">
              ${pageNumbers}
              ${ellipsis}
            </div>
            ${nextBtn}
            ${lastBtn}
          </div>
          `;
        }
    },

    // Style 5: Product count + All page numbers
    style5: {
        enabled: true,
        type: "FIXED_PAGINATION",
        el: document.getElementById("pagination-container"),
        pageClass: "page-btn",
        selectedPageClass: "page-btn-active",
        action: "click",

        //   onPaginate: function(numberOfProducts, start, productsLn, rows, noOfPages, currentPage, isNext, isPrev) {
        //     window.scrollTo({ top: 0, behavior: "smooth" });
        //   },

        template: function (paginationData, pagination) {
            if (!paginationData) return '';

            const { currentPage, noOfPages, numberOfProducts, productsLn, rows, start } = paginationData;
            const { pageClass, selectedPageClass } = pagination;

            if (numberOfProducts <= productsLn) return '';

            // Product count text
            const startNum = start + 1;
            const endNum = Math.min(start + productsLn, numberOfProducts);
            let productInfo = `<span class="product-info">Showing ${startNum} to ${endNum} of ${numberOfProducts} products</span>`;

            // ALL page numbers (no limit)
            let pageNumbers = '';
            for (let i = 1; i <= noOfPages; i++) {
                const isActive = i === currentPage ? selectedPageClass : '';
                pageNumbers += `<button data-page-action="paginate" data-page-no="${(i - 1) * rows}" class="${pageClass} ${isActive}">${i}</button>`;
            }

            return `
          <div class="custom-pagination style-6">
            ${productInfo}
            <div class="page-numbers">
              ${pageNumbers}
            </div>
          </div>
        `;
        }
    }
};

// Helper function to get pagination config by style
export const getPaginationConfig = (style) => {
    switch (style) {
        case 1:
            return paginationConfigs.style1;
        case 2:
            return paginationConfigs.style2;
        case 3:
            return paginationConfigs.style3;
        case 5:
            return paginationConfigs.style5;
        default:
            return paginationConfigs.style1;
    }
};