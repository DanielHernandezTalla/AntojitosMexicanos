'use strict'

import darkTeme from "./moldule/darkTeme.js"

const d = document
const contentArticles = d.querySelector(".content__article")
const template = d.getElementById("template__article").content
const fragment = d.createDocumentFragment()
let car = {}
let nameClient = ""
let noteClient = ""

d.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem('car')) {
        car = JSON.parse(localStorage.getItem('car'))
    }

    paintCar()

    darkTeme("dark-teme")
})

d.addEventListener("click", e => {
    if (e.target.classList.contains("article__delete")) {
        const producto = car[e.target.dataset.id]
        producto.quantity = 0

        // console.log(`delete ${producto.quantity} y ${producto.quantity === 0}`)
        if (producto.quantity === 0)
            delete car[e.target.dataset.id]
        else
            car[e.target.dataset.id] = {
                ...producto
            }

        localStorage.setItem('car', JSON.stringify(car))

        paintCar()
    }

    if (e.target.matches("#button__static")) {
        nameClient = d.getElementById('static__input').value
        noteClient = d.getElementById('static__textarea').value
        if (nameClient) {
            d.getElementById('content-static').classList.add('static-none')
            sendData()
        } else {
            d.getElementById('static__input').classList.add("static-required")
            d.getElementById('static__input').focus()
        }
    }

    if (e.target.matches("#button-enviar")) {

        if (!nameClient) {
            d.getElementById('content-static').classList.remove('static-none')
            return
        }

        // Enviamos los datos al server
        sendData()
    }
})

d.addEventListener("change", e => {
    if (e.target.classList.contains("article__input")) {

        const producto = car[e.target.dataset.id]
        producto.quantity = e.target.value
        console.log(e.target.value)

        if (producto.quantity == 0)
            delete car[e.target.dataset.id]
        else
            car[e.target.dataset.id] = {
                ...producto
            }

        localStorage.setItem('car', JSON.stringify(car))

        paintCar()
    }
})

const paintCar = () => {

    contentArticles.innerHTML = ``

    let total = 0

    // console.log(car)

    for (const index in car) {

        template.querySelector(".article__img").setAttribute("src", car[index].src)
        template.querySelector(".article__img").setAttribute("alt", car[index].alt)
        template.querySelector(".article__delete").dataset.id = car[index].id
        template.querySelector(".article__input").dataset.id = car[index].id

        template.querySelector(".article__h3").textContent = car[index].name
        template.querySelector(".article__p").textContent = car[index].text
        template.querySelector(".article__input").value = car[index].quantity
        template.querySelector(".article__span-cantidad").textContent = `${car[index].quantity} * $${car[index].cost}`
        template.querySelector(".article__span-total").textContent = `$ ${car[index].quantity * car[index].cost}.00`

        car[index].quantity

        total += car[index].quantity * car[index].cost

        const clone = d.importNode(template, true)
        fragment.appendChild(clone)
    }

    d.querySelector(".footer-article__span").textContent = `$ ${total}.00`

    contentArticles.appendChild(fragment)
}

const sendData = () => {
    // Doing the send orden to backend
    // Hacemos aparecer el primer loader
    d.getElementById('content-loader').classList.remove("content-none")

    // Arreglamos el array que vamos a enviar
    let dataCar = {
        nameClient,
        noteClient,
        products: car,
        specifications: "Sin Especificaciones"
    }
    // Enviamos los datos
    fetch('/car', {
        method: 'POST',
        body: JSON.stringify(dataCar),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log(data.status)

        // Limpiamos el carrito despues de que se hace el envio de datos
        if (data.status == 'OK') {
            car = {}
            localStorage.setItem('car', JSON.stringify(car))
            paintCar()

            // Hacemos que funciones los loaders en la pag
            loaders("Pedido enviado correctamente!!")
        }

    }).catch(err => {
        // Accionamos loaders y mandamos mensaje de error 
        loaders("A ocurrido un error, hablar al mesero por favor!!")
        // console.log(err.json())
    })
}

const loaders = (res) => {
    setTimeout(() => {
        d.getElementById('content-loader').classList.add("content-none")
        d.getElementById('content-res').classList.remove("content-none")
        d.getElementById('res-text').textContent = res
    }, 1000);

    location.href = '/'
}