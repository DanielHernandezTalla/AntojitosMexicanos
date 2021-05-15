'use strict'

export default function scroll(button) {
    const d = document

    d.addEventListener("scroll", e => {
        if (window.scrollY > 50)
            d.querySelector(button).className = "button-static button-static-scroll"
        else
            d.querySelector(button).className = "button-static button-static-scroll  button-static-hidden"
    })
}