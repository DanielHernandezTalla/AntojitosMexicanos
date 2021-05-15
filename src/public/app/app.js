'use strict'

import menu from "./moldule/menu.js"
import scroll from "./moldule/scroll.js"
import darkTeme from "./moldule/darkTeme.js"

const d = document
var timer;

let car = {}

d.addEventListener("DOMContentLoaded", e => {

    getCar()

    menu("#nav", "#nav__button", ".nav__a")

    scroll("#scroll")

    darkTeme("dark-teme")

})

d.addEventListener("click", e => {
    addCar(e)

    // if (e.target.matches(".notification__button"))
    //     clearTimeout(timer)
})

const addCar = e => {

    if (e.target.classList.contains('article__button')) setCar(e.target.parentElement)

}

const setCar = item => {

    getCar()

    const producto = {
        id: item.querySelector(".article__button").dataset.id,
        src: item.querySelector(".article__img").getAttribute("src"),
        alt: item.querySelector(".article__img").getAttribute("alt"),
        name: item.querySelector(".article__h3").textContent,
        text: item.querySelector(".article__p").textContent,
        cost: item.querySelector(".article__span").textContent.replace("$", ""),
        quantity: parseInt(item.querySelector(".article__input").value)
    }

    item.querySelector(".article__input").value = 1 //Quitamos el valor de el input

    if (car.hasOwnProperty(producto.id))
        producto.quantity = car[producto.id].quantity + 1

    car[producto.id] = {
        ...producto
    }

    addCorrect("notification")

    localStorage.setItem('car', JSON.stringify(car))
}

const getCar = () => {
    if (localStorage.getItem('car'))
        car = JSON.parse(localStorage.getItem('car'))
}



const addCorrect = function (notification) {
    const $notification = d.getElementById(notification)

    clearTimeout(timer)

    $notification.classList.remove("notification-hidden")

    timer = setTimeout(function () {
        $notification.classList.add("notification-hidden")
    }, 2000)
}