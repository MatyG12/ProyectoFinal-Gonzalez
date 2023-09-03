const json = 'productos.json';
const cantidadCarrito = document.getElementById("cantidadCarrito");
const verCarrito = document.getElementById("verCarrito");
let lista = document.getElementById("carrito-cartel")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
    fetch(json)
      .then((response) => {
        return response.json();
      })
      .then((productos) => {
        const cardsRepuestos = document.getElementById('cards');
        productos.forEach((producto) => {
          const repuestos = document.createElement('div');
          repuestos.className = "card"
          repuestos.innerHTML = `
            <h2 class="titulo">${producto.nombre}</h2>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <img src="${producto.imagen}" />
          `;
          cardsRepuestos.appendChild(repuestos);

          let comprar = document.createElement("button");
          comprar.innerText = "comprar";
          comprar.className = "comprar";
        
          repuestos.append(comprar);
        
          comprar.addEventListener("click", () => {
            const agregar = carrito.some((agregado) => agregado.id === producto.id);
        
            if (agregar) {
              carrito.map((prod) => {
                if (prod.id === producto.id) {
                  prod.cantidad++;
                }
              });
            } else {
              carrito.push({
                id: producto.id,
                imagen: producto.imagen,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
              });
              console.log(carrito);
              console.log(carrito.length);
              carritoContador();
              saveLocal();
            }
          });
        });
      })
  }
      mostrarProductos();


const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

     
      const mostrarCarrito = () => {
        lista.innerHTML = "";
        lista.style.display = "flex";
        const carritoHeader = document.createElement("div");
        carritoHeader.className = "carrito-header";
        carritoHeader.innerHTML = `
            <h1 class="carrito-header-title">Carrito.</h1>
          `;
        lista.append(carritoHeader);
      
        const botonEliminar = document.createElement("h1");
        botonEliminar.innerText = "x";
        botonEliminar.className = "carrito-header-button";
      
        botonEliminar.addEventListener("click", () => {
          lista.style.display = "none";
        });
      
        carritoHeader.append(botonEliminar);
      
        carrito.forEach((producto) => {
          let carritoContenido = document.createElement("div");
          carritoContenido.className = "carrito-content";
          carritoContenido.innerHTML = `
              <img src="${producto.imagen}">
              <h3>${producto.nombre}</h3>
              <p>${producto.precio} $</p>
              <span class="restar"> - </span>
              <p>${producto.cantidad}</p>
              <span class="sumar"> + </span>
              <p>Total: ${producto.cantidad * producto.precio} $</p>
              <span class="delete-product"> ✖️ </span>
            `;
      
         lista.append(carritoContenido);
      
          let restar = carritoContenido.querySelector(".restar");
      
          restar.addEventListener("click", () => {
            if (producto.cantidad !== 1) {
              producto.cantidad--;
            }
            saveLocal();
            mostrarCarrito();
          });
      
          let sumar = carritoContenido.querySelector(".sumar");
          sumar.addEventListener("click", () => {
            producto.cantidad++; 
            saveLocal();
            mostrarCarrito();
          });
      
          let eliminar = carritoContenido.querySelector(".delete-product");
      
          eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
          });
        });
      
        const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
      
        const precioTotal = document.createElement("div");
        precioTotal.className = "total-content";
        precioTotal.innerHTML = `Total a pagar: ${total} $`;
        lista.append(precioTotal);
      };
      
      verCarrito.addEventListener("click", mostrarCarrito);
      
      const eliminarProducto = (id) => {
        const foundId = carrito.find((element) => element.id === id);
      
        console.log(foundId);
      
        carrito = carrito.filter((carritoId) => {
          return carritoId !== foundId;
        });
      
        carritoContador();
        saveLocal();
        mostrarCarrito();
      };
      
      const carritoContador = () => {
        cantidadCarrito.style.display = "block";
      
        const carritoLength = carrito.length;
      
        localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
      
        cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
      };
      
      carritoContador();

    