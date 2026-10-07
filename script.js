/* =========================================
   PARFUMS MG - FUNCIONES
   ========================================= */

let carrito = [];


/* =========================================
   FORMATO DE PESOS
   ========================================= */

function formatoPrecio(numero) {

    return "$" + numero.toLocaleString("es-CO");

}


/* =========================================
   AGREGAR AL CARRITO
   ========================================= */

function agregarCarrito(nombre, precio) {

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }

    actualizarCarrito();

    abrirCarrito();

}


/* =========================================
   ACTUALIZAR CARRITO
   ========================================= */

function actualizarCarrito() {

    const contenedor = document.getElementById("carrito-productos");

    const contador = document.getElementById("contador-carrito");

    const totalElemento = document.getElementById("total-carrito");


    contenedor.innerHTML = "";

    let cantidadTotal = 0;
    let total = 0;


    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <p style="text-align:center;color:#777;padding:40px 10px;">
                Tu carrito está vacío.
            </p>
        `;

    }


    carrito.forEach((producto, indice) => {

        cantidadTotal += producto.cantidad;

        total += producto.precio * producto.cantidad;


        const item = document.createElement("div");

        item.className = "item-carrito";

        item.innerHTML = `

            <strong>${producto.nombre}</strong>

            <span>
                ${formatoPrecio(producto.precio)}
                × ${producto.cantidad}
            </span>

            <div style="
                display:flex;
                gap:8px;
                margin-top:10px;
            ">

                <button
                    onclick="cambiarCantidad(${indice}, -1)"
                    style="padding:5px 10px;"
                >
                    −
                </button>

                <button
                    onclick="cambiarCantidad(${indice}, 1)"
                    style="padding:5px 10px;"
                >
                    +
                </button>

                <button
                    onclick="eliminarProducto(${indice})"
                    style="
                        padding:5px 10px;
                        margin-left:auto;
                    "
                >
                    Eliminar
                </button>

            </div>
        `;

        contenedor.appendChild(item);

    });


    contador.textContent = cantidadTotal;

    totalElemento.textContent = formatoPrecio(total);

}


/* =========================================
   CAMBIAR CANTIDAD
   ========================================= */

function cambiarCantidad(indice, cambio) {

    carrito[indice].cantidad += cambio;


    if (carrito[indice].cantidad <= 0) {

        carrito.splice(indice, 1);

    }


    actualizarCarrito();

}


/* =========================================
   ELIMINAR PRODUCTO
   ========================================= */

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}


/* =========================================
   ABRIR CARRITO
   ========================================= */

function abrirCarrito() {

    document
        .getElementById("carrito")
        .classList
        .add("abierto");

    document
        .getElementById("carrito-fondo")
        .classList
        .add("activo");

}


/* =========================================
   CERRAR CARRITO
   ========================================= */

function cerrarCarrito() {

    document
        .getElementById("carrito")
        .classList
        .remove("abierto");

    document
        .getElementById("carrito-fondo")
        .classList
        .remove("activo");

}


/* =========================================
   ENVIAR PEDIDO POR WHATSAPP
   ========================================= */

function enviarPedido() {

    if (carrito.length === 0) {

        alert("Agrega al menos un perfume al carrito.");

        return;

    }


    let mensaje = "Hola Parfums MG 👋%0A%0A";

    mensaje += "Quiero realizar el siguiente pedido:%0A%0A";


    let total = 0;


    carrito.forEach(producto => {

        const subtotal =
            producto.precio * producto.cantidad;

        total += subtotal;


        mensaje +=
            `• ${producto.nombre} x${producto.cantidad} - ${formatoPrecio(subtotal)}%0A`;

    });


    mensaje += `%0ATotal: ${formatoPrecio(total)}`;

    mensaje += `%0A%0AQuedo atento/a. Gracias.`;


    const numero = "573103211876";

    const url =
        `https://wa.me/${numero}?text=${mensaje}`;


    window.open(url, "_blank");

}


/* =========================================
   BUSCADOR
   ========================================= */

function buscarProductos() {

    const texto =
        document
            .getElementById("buscador")
            .value
            .toLowerCase()
            .trim();


    const productos =
        document.querySelectorAll(".producto");


    let encontrados = 0;


    productos.forEach(producto => {

        const nombre =
            producto
                .dataset
                .nombre
                .toLowerCase();


        if (nombre.includes(texto)) {

            producto.style.display = "";

            encontrados++;

        } else {

            producto.style.display = "none";

        }

    });


    document.getElementById("sin-resultados").style.display =
        encontrados === 0
            ? "block"
            : "none";

}


/* =========================================
   FILTROS
   ========================================= */

function filtrarProductos(categoria, boton) {

    const productos =
        document.querySelectorAll(".producto");


    document
        .querySelectorAll(".filtro")
        .forEach(filtro => {

            filtro.classList.remove("activo");

        });


    boton.classList.add("activo");


    let encontrados = 0;


    productos.forEach(producto => {

        if (
            categoria === "todos" ||
            producto.dataset.categoria === categoria
        ) {

            producto.style.display = "";

            encontrados++;

        } else {

            producto.style.display = "none";

        }

    });


    document.getElementById("sin-resultados").style.display =
        encontrados === 0
            ? "block"
            : "none";

}


/* =========================================
   ANIMACIÓN AL CARGAR
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    actualizarCarrito();

});
