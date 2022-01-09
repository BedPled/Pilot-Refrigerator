const SIZE = 4

function gridCreator() {
 let grid = document.querySelector('.grid__wrapper');
 let lock = document.querySelector('.lock')

    for (let i = 0; i < SIZE; i++) {
        let locker = document.createElement("div")
        locker.classList.add('locker')
        locker.setAttribute("id", '' + i)
        locker.classList.add('locked')
        lock.appendChild(locker)
    }

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            let valve = document.createElement("div");
            valve.classList.add('valve')
            valve.setAttribute("column", '' + j)
            valve.setAttribute("row", '' + i)

            grid.appendChild(valve);
            // console.log(i + "  " + j)

            if (Math.floor(Math.random() * 2) === 1) {
                valve.classList.add('horizontal');
            } else {
                valve.classList.add('vertical');
            }
        }
    }
    changeLock ()
}

// поворот вентилей
window.addEventListener("click", (e) => {

    let target = e.target;

    if (target.className === 'valve horizontal' || e.target.className === 'valve vertical') {
        let row = target.getAttribute('row');
        let col = target.getAttribute('column');

        for (let i = 0; i < SIZE; i++)  {
            // console.log(document.querySelector('[column="' + i + '"][row="' + row + '"]'))
            rotate(document.querySelector('[column="' + i + '"][row="' + row + '"]'));
        }

        for (let j = 0; j < SIZE; j++) {
            // console.log(document.querySelector('[column="' + col + '"][row="' + j + '"]'))
            rotate(document.querySelector('[column="' + col + '"][row="' + j + '"]'));
        }

        rotate(target);
        changeLock ()

        // конец игры
        if (document.querySelectorAll('.horizontal').length === 0 || document.querySelectorAll('.vertical').length === 0) {
            setTimeout(() => {

                setTimeout(() => {
                    document.querySelector(".grid__wrapper").innerHTML = '';
                    document.querySelector(".lock").innerHTML = ''

                    let button = document.createElement("button");
                    button.textContent = "restart";

                    button.onclick = restart;

                    document.querySelector('.grid__wrapper').appendChild(button);
                }, 500);
            }, 500);
        }
    }
}, false)

function restart () {
    const clearG = document.querySelector(".grid__wrapper");
    const clearL = document.querySelector(".lock")
    clearG.innerHTML = '';
    clearL.innerHTML = '';
    gridCreator()
}

function rotate(element) {
    if (element.className === 'valve horizontal') {
        element.classList.remove('horizontal');
        element.classList.add('vertical');
    } else {
        element.classList.remove('vertical');
        element.classList.add('horizontal');
    }
}

function changeLock () {
    let l
    let count

    for (let i = 0; i < SIZE; i++) {
        l = document.getElementById('' + (i))
        count = 0
        for (let j = 0; j < SIZE; j++) {

            if (document.querySelector('[column="' + i + '"][row="' + j + '"]').className === 'valve horizontal') {
                count++
            }
        }

        if (count === 4 && l.className === 'locker locked') {
            console.log(l)
            l.classList.remove('locked')
            l.classList.add('unlocked')
        } else if (l.className === 'locker unlocked') {
            l.classList.add('locked')
            l.classList.remove('unlocked')
        }
    }
}

gridCreator()

