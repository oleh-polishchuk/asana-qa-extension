((window) => {
    const app = window.asanaQaExtension = window.asanaQaExtension || {};

    app.validateTitle = req => {
        const moreInfoLink = "https://telegra.ph/The-title-does-not-contain-a-brand-name-07-23";
        const BRANDS = [
            'N', 'N-UK', 'NUK', 'N-ES', 'NUS', 'N-US', 'NSUK', 'DC', 'DC-UK', 'NDC', 'DCUS/NUS',
        ];

        const titleInput = document.querySelector(".simpleTextarea.autogrowTextarea-input");
        const title = titleInput && titleInput.innerHTML;
        if (title) {
            const includeBrand = brand => title.includes(`[${brand}]`) || title.includes(`(${brand})`);
            if (!BRANDS.some(includeBrand)) {
                const elem = titleInput.parentElement;
                if (elem && !elem.classList.contains("tooltip")) {
                    elem.classList.add("tooltip");

                    const info = document.createElement('div');
                    info.classList.add('tooltiptext');
                    info.innerHTML = `
                    <div>Title does not have brand prefix</div>
                    <a href="${moreInfoLink}" target="_blank">Learn more</a>
                `;
                    elem.insertBefore(info, elem.firstChild);
                }
                console.log("Error: Title does not have brand prefix.")
            }
        }
    };

    document.addEventListener("validateTitle", window.asanaQaExtension.validateTitle);

    console.log("Extension: Asana QA script successfully loaded.");
})(window);