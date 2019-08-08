/**
 * Asana Title validation
 * @description Script enforce user to add brand name (shortcut) before the task title
 */
((window) => {
    const app = window.asanaQaExtension = window.asanaQaExtension || {};

    app.validateTitle = (req, retries = 1) => {
        if (retries > 5) return;

        const moreInfoLink = "https://telegra.ph/The-title-does-not-contain-a-brand-name-07-23";
        const BRANDS = [
            'N', 'N-UK', 'NUK', 'N-ES', 'NUS', 'N-US', 'NSUK', 'DC', 'DC-UK', 'NDC', 'DCUS/NUS', 'DCUK', 'N&DC', 'DC-US',
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
                console.log("Extension: Title does not have brand prefix.")
            }
        } else {
            retries++;
            setTimeout(() => (app.validateTitle(req, retries)), 1000);
            console.log("Extension: Asana title input not found. Retry in 1 sec...");
        }
    };

    document.addEventListener("validateTitle", window.asanaQaExtension.validateTitle);
})(window);

/**
 * Asana Template button
 */
((window) => {
    const app = window.asanaQaExtension = window.asanaQaExtension || {};

    app.initTemplateButton = (req, retries = 1) => {
        if (retries > 5) return;

        const taskPaneToolbar = document.querySelector(".SingleTaskPaneToolbar-leftItems");
        if (taskPaneToolbar) {
            const templateButton = document.querySelector('.ResidentTemplateButton');
            if (templateButton) {
                return console.log("Extension: Template button already exist.");
            }

            const templateButtonElement = document.createElement('div');
            templateButtonElement.setAttribute('tabindex', '0');
            templateButtonElement.setAttribute('role', 'button');
            templateButtonElement.setAttribute('style', 'margin-right: 5px;');
            templateButtonElement.classList.add( 'Button', 'Button--small', 'Button--secondary', 'ResidentTemplateButton' );
            templateButtonElement.innerHTML = `
                <svg 
                    class="Icon DescriptionIcon SingleTaskPane-descriptionIcon" 
                    focusable="false" 
                    viewBox="0 0 32 32" 
                    style="margin-right: 5px;"
                >
                    <path d="M31,8H1C0.4,8,0,7.6,0,7s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,8,31,8z M23,14H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,14,23,14z M27,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h26c0.6,0,1,0.4,1,1S27.6,20,27,20z M19,26H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S19.6,26,19,26z"></path>
                </svg>Use Template
            `;
            templateButtonElement.addEventListener('click', () => {
                document.querySelector(".TaskDescription .ql-editor").innerHTML =
                    `<b>Summary</b>
Update BX banner background color

<b>Steps to Reproduce</b>
1. Open home page
2. Wait 5sec until BX banner will appear (see attached screenshot)

<b>Expected Results</b>
BX banner bg color should be #FFFFF

<b>Actual Results</b>
BX banner bg color is #FBFBFB

`;
            });

            taskPaneToolbar.parentNode.insertBefore(templateButtonElement, taskPaneToolbar.nextSibling);
        } else {
            retries++;
            setTimeout(() => (app.initTemplateButton(req, retries)), 1000);
            console.log("Extension: Asana task pane toolbar not found. Retry in 1 sec...");
        }
    };

    document.addEventListener("validateTitle", window.asanaQaExtension.initTemplateButton);
})(window);

console.log("Extension: Asana QA script successfully loaded.");
