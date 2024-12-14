import { useState } from "react";

export const toggleClass = (element,className) => {
    let ele = document.querySelector(element);
    ele.classList.toggle(className);
}

export const removeClass = (element,className) => {
    let ele = document.querySelector(element);
    ele.classList.remove(className);
}


export const api_base_url = "http://localhost:3000"