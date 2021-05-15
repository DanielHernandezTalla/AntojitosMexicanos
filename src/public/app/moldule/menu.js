'use strict'

const d = document
export default function menu(menu, button, link) {

    d.addEventListener("click", e => {
        if (e.target.matches(button) || e.target.matches(`${button} *`)) {
            d.querySelector(menu).classList.toggle("nav-hidden");
        }
        if (e.target.matches(link)) {
            d.querySelector(menu).classList.toggle("nav-hidden");
        }
    });

}