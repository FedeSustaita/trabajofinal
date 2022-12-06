let  carrito= JSON.parse(sessionStorage.getItem("carrito"))||[]
const vercarrito = document.getElementById("icon-shop")
const ticket = document.getElementById("ticket")
const divC=document.getElementById("Dcomida")
const divB=document.getElementById("Dbebida")
const divG=document.getElementById("Dguarnicion")
const contadorprod=document.getElementById("contador")

function cargarjson() {
    fetch( `./js/menu.JSON`)
    .then(function(res){
        return res.json()
    })
    .then(function(menu){
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
                const repeat=carrito.some((repeatproducto)=>repeatproducto.id===comida.id)
                if (repeat) {
                    carrito.map((prod)=>{
                        if(prod.id===comida.id){
                            prod.cantidad++
                        }
                    })
                } else {
                    carrito.push({
                        id: comida.id,
                        nombre: comida.nombre,
                        precio: comida.precio,
                        cantidad: comida.cantidad,
                    })
                }
                    save()
                    contador()
        
                    comprar.innerHTML=`            
                    <div class="spinner-border text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>`
                    setTimeout(() => {
                        comprar.innerHTML=`  
                        ✔
                        `
                    }, 500);
                    setTimeout(() => {
                        comprar.innerText="comprar"
                    }, 1500);
                    
                    Toastify({
                        text: "Se agrego al carrito",
                        duration: 1500,
                        style: {
                            background: "linear-gradient(to right, #ad0d38, #940f54)",
                        }
                    }).showToast()
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
                    const repeatid=carrito.some((repeatproducto)=>repeatproducto.id===bebidas.id)
                    if (repeatid) {
                        carrito.map((prod)=>{
                            if(prod.id===bebidas.id){
                                prod.cantidad++
                            }
                        })
                    } else {
                        carrito.push({
                            id: bebidas.id,
                            nombre: bebidas.nombre,
                            precio: bebidas.precio,
                            cantidad: bebidas.cantidad,
                        })
                    }
                    save()
                    contador()
                    comprar.innerHTML=`            
                    <div class="spinner-border text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>`
                    setTimeout(() => {
                        comprar.innerHTML=`  
                        ✔
                        `
                    }, 500);
                    setTimeout(() => {
                        comprar.innerText="comprar"
                    }, 1500);
        
                    Toastify({
                        text: "Se agrego al carrito",
                        duration: 1500,
                        style: {
                            background: "linear-gradient(to right, #ad0d38, #940f54)",
                        }
                    }).showToast()
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
                    const repeatid=carrito.some((repeatproducto)=>repeatproducto.id===guarnicion.id)
                    if (repeatid) {
                        carrito.map((prod)=>{
                            if(prod.id===guarnicion.id){
                                prod.cantidad++
                            }
                        })
                    } else {
                        carrito.push({
                            id: guarnicion.id,
                            nombre: guarnicion.nombre,
                            precio: guarnicion.precio,
                            cantidad: guarnicion.cantidad,
                        })
                    }
                    save()
                    contador()
                    comprar.innerHTML=`            
                    <div class="spinner-border text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>`
                    setTimeout(() => {
                        comprar.innerHTML=`  
                        ✔
                        `
                    }, 500);
                    setTimeout(() => {
                        comprar.innerText="comprar"
                    }, 1500);

                    Toastify({
                        text: "Se agrego al carrito",
                        duration: 1500,
                        style: {
                            background: "linear-gradient(to right, #ad0d38, #940f54)",
                        }
                    }).showToast()
                }
        })
        }

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
        let numerador=0
            carrito.forEach((producto)=>{
        
                    // console.log(carrito.length);
        
                // console.log(producto);
                let main = document.createElement("div")    //parte de medio del ticket con los productos y sus respectivos precios
                main.className="main-ticket"
                main.innerHTML=`
                <div class="A-main">
                    <h3 class="CG nombre-precio" id="caja-producto">${producto.nombre} $${producto.precio}</h3>
                </div>
                `
                total = total + producto.precio*producto.cantidad     //calculo del monto total a pagar
                ticket.append(main)
                numerador++
                let sumador =document.createElement("div")
                sumador.className="operador"
                sumador.innerHTML=`
                <p id="menos${numerador}" class="menos">-</p>
                <p class="cantidad">${producto.cantidad}</p>
                <p id="mas${numerador}" class="mas">+</p>
                `
                main.append(sumador)
                const menos=document.getElementById(`menos${numerador}`)
                menos.onclick=()=>{
                    if (producto.cantidad!==1) {
                        producto.cantidad--
                        pintarcarrito()
                    }
                }
        
                const mas=document.getElementById(`mas${numerador}`)
                mas.onclick=()=>{
                    producto.cantidad++
                    pintarcarrito()
                }
        
            let eliminar =document.createElement("span")
            eliminar.innerText="❌"
            eliminar.className="delete"
            main.append(eliminar)
                eliminar.onclick=()=>{
                    eliminarproducto(producto.id)
                    save()
                    contador()
                    Toastify({
                        text: "Se elimino el producto",
                        duration: 1500,
                        style: {
                            background: "linear-gradient(to right, #ad0d38, #940f54)",
                        }
                    }).showToast()
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
        pintarcarrito()
        }

        const subir= document.getElementById("subir")
        subir.onclick=()=>{
            window.scrollTo({
                top:0,
                behavior:"smooth"
            })
        }  
        const savecontar=()=>{
            sessionStorage.setItem("contar",JSON.stringify(contar))
            }

        const contador =()=>{
            contadorprod.innerText=carrito.length
        }
        contador()
    })
    .catch(function(error){
        console.log("hubo un error al cargar el json" + error);
    } )
}

cargarjson()
