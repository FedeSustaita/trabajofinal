const comida = [    //arreglo de comidas disponibles
    {
        id:1,
        nombre:"Hamburguesa",
        precio:10,
    },
    {
        id:2,
        nombre:"Pizza",
        precio:8
    },
    {
        id:3,
        nombre:"Pasta",
        precio:15
    }
]
const bebidas = [   //arreglo de bebidas disponibles
    {
        id:4,
        nombre:"Agua",
        precio:5
    },
    {
        id:5,
        nombre:"Jugo",
        precio:6
    },
    {
        id:6,
        nombre:"Gaseosa",
        precio:6
    }
]
const guarnicion = [    //arreglo de guarniciones disponibles
    {
        id:7,
        nombre:"Papas fritas",
        precio:8
    },
    {
        id:8,
        nombre:"Pure de papa",
        precio:8
    },
    {
        id:9,
        nombre:"Ensalada",
        precio:6
    }
]
let  carrito= JSON.parse(sessionStorage.getItem("carrito"))||[]
const vercarrito = document.getElementById("icon-shop")
const ticket = document.getElementById("ticket")
const divC=document.getElementById("Dcomida")
const divB=document.getElementById("Dbebida")
const divG=document.getElementById("Dguarnicion")



const botonC=document.getElementById("comida")
botonC.onclick=()=>{    //boton comida para que aparezcan los productos en pantalla con su boton de compra
    divC.innerHTML=""
    divC.style.display="block"
    divB.style.display="none"
    divG.style.display="none"
    comida.forEach((comida)=>{
        let div = document.createElement("div")
        div.innerHTML=`
        <div id="caja">  
            <p id="caja-producto nombre">${comida.nombre}</p>
            <p id="caja-producto precio">$${comida.precio}</p>
        </div>
        `
        divC.append(div)

        let comprar = document.createElement("button")
        comprar.innerText="comprar"
        comprar.className="caja-producto add"
        divC.append(comprar)

        comprar.onclick=()=>{
            carrito.push({
               id: comida.id,
               nombre: comida.nombre,
               precio: comida.precio
            })
            save()
        }
})
}

const botonB=document.getElementById("bebida")
botonB.onclick=()=>{    //boton bebida para que aparezcan los productos en pantalla con su boton de compra
    divB.innerHTML=""
    divC.style.display="none"
    divB.style.display="block"
    divG.style.display="none"
    bebidas.forEach((bebidas)=>{
        let div = document.createElement("div")
        div.innerHTML=`
        <div id="caja">  
            <p id="caja-producto nombre">${bebidas.nombre}</p>
            <p id="caja-producto precio">$${bebidas.precio}</p>
        </div>
        `
        divB.append(div)

        let comprar = document.createElement("button")
        comprar.innerText="comprar"
        comprar.className="caja-producto add"
        divB.append(comprar)
        comprar.onclick=()=>{
            carrito.push({
               id: bebidas.id,
               nombre: bebidas.nombre,
               precio: bebidas.precio
            })
            save()
        }
})
}

const botonG=document.getElementById("guarnicion")
botonG.onclick=()=>{    //boton guarnicion para que aparezcan los productos en pantalla con su boton de compra
    divG.innerHTML=""
    divC.style.display="none"
    divB.style.display="none"
    divG.style.display="block"
    guarnicion.forEach((guarnicion)=>{
        let div = document.createElement("div")
        div.innerHTML=`
        <div id="caja">  
            <p id="caja-producto nombre">${guarnicion.nombre}</p>
            <p id="caja-producto precio">$${guarnicion.precio}</p>
        </div>
        `
        divG.append(div)

        let comprar = document.createElement("button")
        comprar.innerText="comprar"
        comprar.className="caja-producto add"
        divG.append(comprar)
        comprar.onclick=()=>{
            carrito.push({
               id: guarnicion.id,
               nombre: guarnicion.nombre,
               precio: guarnicion.precio
            })
            save()
        }
})
}


const pintarcarrito =()=>{
    let total =0
    ticket.innerHTML=""
    ticket.style.display="block"

    let head = document.createElement("div")    //parte de arriba del ticket con el titulo y el boton de cierre del ticket
    head.className="head-ticket"
    head.innerHTML=`
    <div>
        <header class="header-ticket CG">
            <h2>Carrito</h2> 
            <div class= "X">  
                <button id="button-X" >❌</button>
            </div> 
        </header>
    </div>
    `
    ticket.append(head)

    carrito.forEach((producto)=>{
        let main = document.createElement("div")    //parte de medio del ticket con los productos y sus respectivos precios
        main.className="main-ticket"
        main.innerHTML=`
        <div class="A-main">
            <h3 class="CG nombre-precio" id="caja-producto">${producto.nombre} $${producto.precio}</h3>
            <button id="button-trash"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        `
        total = total + producto.precio     //calculo del monto total a pagar
        ticket.append(main)

        const trash = document.getElementById("button-trash")
        trash.onclick=()=>{
            eliminarcarrito(producto.id)
            console.log(carrito)
            save()
        }
    })

    let footer = document.createElement("div")  //parte de abajo del ticket con el total
    footer.className="footer-ticket"
    footer.innerHTML=`
    <div>
        <h3 class="footer-ticket CG"> TOTAL A PAGAR: $${total}</h3>
    </div>
    `
    ticket.append(footer)

    const botonX = document.getElementById("button-X")
    botonX.onclick=()=>{    //boton para cerrar el ticket
        ticket.style.display="none"
    }
}
const eliminarcarrito = (id)=>{
    let foundid=carrito.find((element)=>element.id === id)
    carrito=carrito.filter((carritoId)=>{
        return carritoId!==foundid
    })
    pintarcarrito()
}

vercarrito.onclick=()=>{    //boton para ver carrito
   pintarcarrito()
}
const save=()=>{
sessionStorage.setItem("carrito",JSON.stringify(carrito))
}