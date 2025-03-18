const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth;
canvas.height = innerHeight;
window.onresize = function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

class Boundary {
    static width = 40;
    static height = 40;
    constructor({ position }) {
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

}

class Player {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 10
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}




const boundaries = []
const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})



const keys = {
    w: {
        pressed: false
    }
    a: {
        pressed: false
    }
    s: {
        pressed: false
    }
    d: {
        pressed: false
    }
}

let lastKey = ''


const map = [
    ['-', '-', '-', '-', '-', '-',],
    ['-', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', '-', '-', ' ', '-',],
    ['-', ' ', ' ', ' ', ' ', '-',],
    ['-', '-', '-', '-', '-', '-',]
]



map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        }
                    })
                )
                break
        }
    })
})



function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas)
    boundaries.forEach((boundary) => {
    boundary.draw()
    })

    player.update()
    player.velocity.x = 0
    player.velocity.y = 0

    if (keys.w.pressed) {
        player.velocity.y = -5
    } else if (keys.a.pressed) {
        player.velocity.x = -5
    } else if (keys.s.pressed) {
        player.velocity.y = 5
    } else if (keys.d.pressed) {
        player.velocity.x = 5
    }
}

animate()

window.addEventListener('keydown', ({ key }) => {
    console.log('key')
    switch (key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
    }

    console.log(keys.d.pressed)
    console.log(keys.s.pressed)

    
window.addEventListener('keyup', ({ key }) => {
    console.log('key')
    switch (key) {
        case 'w':
            keys.s.pressed = True
            break
        case 'a':
            keys.s.pressed = True
            break
        case 's':
            keys.s.pressed = True
            break
        case 'd':
            keys.s.pressed = True
            break
    }

    console.log(keys.s.pressed)
    console.log(keys.d.pressed)

})