'use strict'

export default function darkTeme(darkTeme) {
    const d = document,
        $darkTeme = d.getElementById(darkTeme),
        root = d.documentElement

    if (localStorage.getItem('modeDark'))
        if (localStorage.getItem('modeDark') === 'true') {
            toSun()
        } else
            toMoon()



    d.addEventListener("click", e => {
        if (e.target.matches(`#${darkTeme}`) || e.target.matches(`#${darkTeme} *`)) {
            if ($darkTeme.querySelector("i").classList.contains("fa-moon")) {
                toSun()
                localStorage.setItem('modeDark', 'true')
                // console.log('tosun')
            } else {
                toMoon()
                localStorage.setItem('modeDark', 'false')
                // localStorage.removeItem('modeDark'))
                // console.log("toMoon")
            }
        }
    })

    function toSun() {
        $darkTeme.querySelector("i").classList.add("fa-sun")
        $darkTeme.querySelector("i").classList.remove("fa-moon")
        root.style.setProperty("--main-color-gray", "#ddd")
        root.style.setProperty("--main-color-white", "#333")
    }

    function toMoon() {
        $darkTeme.querySelector("i").classList.add("fa-moon")
        $darkTeme.querySelector("i").classList.remove("fa-sun")
        root.style.setProperty("--main-color-gray", "#333")
        root.style.setProperty("--main-color-white", "#fff")
    }
}