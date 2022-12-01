const menu =[   //arreglo de menu con todos los alimentos
    {
        id:1,
        nombre:"Hamburguesa",
        precio:10,
        categoria: "comida",
        cantidad:1
    },
    {
        id:2,
        nombre:"Pizza",
        precio:8,
        categoria: "comida",
        cantidad:1
    },
    {
        id:3,
        nombre:"Pasta",
        precio:15,
        categoria: "comida",
        cantidad:1
    },
    {
        id:4,
        nombre:"Agua",
        precio:5,
        categoria: "bebida",
        cantidad:1
    },
    {
        id:5,
        nombre:"Jugo",
        precio:6,
        categoria: "bebida",
        cantidad:1
    },
    {
        id:6,
        nombre:"Gaseosa",
        precio:6,
        categoria: "bebida",
        cantidad:1
    },
    {
        id:7,
        nombre:"Cerveza",
        precio:8,
        categoria: "bebida",
        cantidad:1
    },
    {
        id:8,
        nombre:"Papas fritas",
        precio:8,
        categoria: "guarnicion",
        cantidad:1
    },
    {
        id:9,
        nombre:"Pure de papa",
        precio:8,
        categoria: "guarnicion",
        cantidad:1
    },
    {
        id:10,
        nombre:"Ensalada",
        precio:6,
        categoria: "guarnicion",
        cantidad:1
    }

]
let contador =JSON.parse(sessionStorage.getItem("contador"))||[]
let  carrito= JSON.parse(sessionStorage.getItem("carrito"))||[]
const vercarrito = document.getElementById("icon-shop")
const ticket = document.getElementById("ticket")
const divC=document.getElementById("Dcomida")
const divB=document.getElementById("Dbebida")
const divG=document.getElementById("Dguarnicion")
const contadorprod=document.getElementById("contador")
// funcionalidad de agregar elementos dentro del carrito con un + y un - tambien agregar pelota con numero de productos que lleva el cliente

const botonC=document.getElementById("btn-comida")
botonC.onclick=()=>{    //boton comida para que aparezcan los productos en pantalla con su boton de compra
    divC.innerHTML=""
    divC.style.display="block"
    divB.style.display="none"
    divG.style.display="none"
    const categoriacomida=menu.filter((el)=>el.categoria==="comida")
    categoriacomida.forEach((comida)=>{
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
        comprar.className="caja-producto add btn btn-outline-light"
        divC.append(comprar)

        comprar.onclick=()=>{
            carrito.push({
                id: comida.id,
                nombre: comida.nombre,
                precio: comida.precio,
                cantidad: comida.cantidad,
            })
            save()
            contador.push(1)
            savecontador()
            const totalc= contador.reduce((acumulador, elemento)=>acumulador + elemento, 0)
            console.log(totalc);
            console.log(contador);
            contadorprod.innerText=`${totalc}`

        }
})
}

const botonB=document.getElementById("btn-bebida")
botonB.onclick=()=>{    //boton bebida para que aparezcan los productos en pantalla con su boton de compra
    divB.innerHTML=""
    divC.style.display="none"
    divB.style.display="block"
    divG.style.display="none"
    const categoriabebida=menu.filter((el)=>el.categoria==="bebida")
    categoriabebida.forEach((bebidas)=>{
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
        comprar.className="caja-producto add btn btn-outline-light"
        divB.append(comprar)
        comprar.onclick=()=>{
            carrito.push({
                id: bebidas.id,
                nombre: bebidas.nombre,
                precio: bebidas.precio,
                cantidad: bebidas.cantidad,
            })
            save()
            contador.push(1)
            savecontador()
            const totalc= contador.reduce((acumulador, elemento)=>acumulador + elemento, 0)
            console.log(totalc);
            contadorprod.innerText=`${totalc}`

        }
})
}

const botonG=document.getElementById("btn-guarnicion")
botonG.onclick=()=>{    //boton guarnicion para que aparezcan los productos en pantalla con su boton de compra
    divG.innerHTML=""
    divC.style.display="none"
    divB.style.display="none"
    divG.style.display="block"
    const categoriaguarnicion=menu.filter((el)=>el.categoria==="guarnicion")
    categoriaguarnicion.forEach((guarnicion)=>{
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
        comprar.className="caja-producto add btn btn-outline-light"
        divG.append(comprar)
        comprar.onclick=()=>{
            carrito.push({
                id: guarnicion.id,
                nombre: guarnicion.nombre,
                precio: guarnicion.precio,
                cantidad: guarnicion.cantidad,
            })
            save()
            contador.push(1)
            savecontador()
            const totalc= contador.reduce((acumulador, elemento)=>acumulador + elemento, 0)
            console.log(totalc);
            contadorprod.innerText=`${totalc}`
        }
})
}

console.log(contador);
const totalc= contador.reduce((acumulador, elemento)=>acumulador + elemento, 0)
console.log(totalc);
contadorprod.innerText=`${totalc}`

// carrito.forEach(element => {

// });

const pintarcarrito =()=>{
    let total =0
    ticket.innerHTML=""
    ticket.style.display="block"
    let main = document.getElementById("main")
    main.style.display="none"

    let head = document.createElement("div")    //parte de arriba del ticket con el titulo y el boton de cierre del ticket
    head.className="head-ticket"
    head.innerHTML=`
    <div>
        <header class="header-ticket">
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
        </div>
        `
        total = total + producto.precio     //calculo del monto total a pagar
        ticket.append(main)

        let sumador =document.createElement("div")
        sumador.innerHTML=`
            <span id="menos">-</span>
            <p>${producto.cantidad}</p>
            <span id="mas">+</span>
        `
        main.append(sumador)
        const menos=document.getElementById("menos")
        menos.onclick=()=>{
            producto.cantidad=producto.cantidad-1
            pintarcarrito()
        }



        const mas=document.getElementById("mas")
        mas.onclick=()=>{
            producto.cantidad=producto.cantidad+1
            pintarcarrito()
        }



    let eliminar =document.createElement("span")
    eliminar.innerText="❌"
    eliminar.className="delete"
    main.append(eliminar)
        eliminar.onclick=()=>{
            eliminarproducto(producto.id)
            save()
        }
    })

    let footer = document.createElement("div")  //parte de abajo del ticket con el total
    footer.className="footer-ticket-div"
    footer.innerHTML=`
    <div>
        <h3 class="footer-ticket"> TOTAL A PAGAR: $${total}</h3>
    </div>
    `
    ticket.append(footer)

    const botonX = document.getElementById("button-X")
    botonX.onclick=()=>{    //boton para cerrar el ticket
        ticket.style.display="none"
        let main = document.getElementById("main")
        main.style.display="block"
    }
}

vercarrito.onclick=()=>{    //boton para ver carrito
   pintarcarrito()
}
const save=()=>{
sessionStorage.setItem("carrito",JSON.stringify(carrito))
}
const eliminarproducto=(id)=>{
    const foundid =carrito.find((element)=>element.id ===id)
    carrito=carrito.filter((carritoid)=>{
        return carritoid !==foundid
    })
    contador.push(-1)
    savecontador()
    console.log(contador);
    const totalc= contador.reduce((acumulador, elemento)=>acumulador + elemento, 0)
    console.log(totalc);
    contadorprod.innerText=`${totalc}`
    pintarcarrito()
}
const savecontador=()=>{
    sessionStorage.setItem("contador",JSON.stringify(contador))
    }

const subir= document.getElementById("subir")

subir.onclick=()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}  
