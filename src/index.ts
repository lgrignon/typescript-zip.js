"use strict";

zip.workerScriptsPath = "zip.js/";

import { ZipExtractor, ZipContent } from './modules/ZipExtractor';
console.info('ZipExtractor loaded');

let fileInput: HTMLInputElement = <HTMLInputElement>document.getElementById("file-input");
let fileList: HTMLElement = document.getElementById("file-list");
let contentDialog: HTMLElement = document.getElementById("content-dialog");

fileInput.addEventListener('change', async () => {
    fileInput.disabled = true;

    let file: File = fileInput.files[0];
    console.info('reading zip file', file);

    // extract and read zip content
    let extractor: ZipExtractor = new ZipExtractor();
    let zipContent: ZipContent = await extractor.extract(file);

    // display zip content
    for (let filename of Object.keys(zipContent)) {
        let item: HTMLLIElement = document.createElement("li");
        let itemLink: HTMLAnchorElement = document.createElement("a");
        itemLink.textContent = filename;
        itemLink.href = "#";
        itemLink.addEventListener("click", (event: MouseEvent) => {

            // display selected entry content
            contentDialog.textContent = zipContent[filename].content;
            contentDialog.classList.add('shown');

            event.preventDefault();
            event.stopPropagation();
            return false;
        }, false);
        item.appendChild(itemLink);
        fileList.appendChild(item);
    }

}, false);

// hide file content dialog on click anywhere
document.querySelector('body').addEventListener('click', () => {
    let openedDialog: Element = document.querySelector('#content-dialog.shown');
    if (openedDialog != null) {
        console.info('close dialog content');
        openedDialog.classList.remove('shown');
    }
});
