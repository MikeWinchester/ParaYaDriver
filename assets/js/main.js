const HOST = 'localhost';
const PORT = '3000';
const URL = `http://${HOST}:${PORT}`;

const infoMotorista = JSON.parse(localStorage.getItem('usuario-actual')).motorista;

function loadNotTakenOrders(){
    document.getElementById('main-view').innerHTML = '';
    fetch(`${URL}/pedidos/espera`)
    .then((result) => result.json())
    .then((response) => {
    response.forEach((element) => {
      const orderCard = document.createElement('div');
      orderCard.className = 'order-card';

      const orderTitle = document.createElement('div');
      orderTitle.className = 'order-title';
      orderTitle.textContent = element.nombre;

      const orderInfoClient = document.createElement('div');
      orderInfoClient.className = 'order-info';
      orderInfoClient.textContent = `Cliente: ${element.cliente.nombre} ${element.cliente.apellido}`;

      const orderInfoDate = document.createElement('div');
      orderInfoDate.className = 'order-info';
      orderInfoDate.textContent = `Fecha: ${element.fecha}`;

      const orderInfoTime = document.createElement('div');
      orderInfoTime.className = 'order-info';
      orderInfoTime.textContent = `Hora: ${element.hora}`;

      const orderProducts = document.createElement('div');
      orderProducts.className = 'order-products';
      const productsList = document.createElement('ul');
      element.productos.forEach((producto) => {
        const productItem = document.createElement('li');
        productItem.textContent = producto;
        productsList.appendChild(productItem);
      });
      orderProducts.appendChild(productsList);

      const orderTotal = document.createElement('div');
      orderTotal.className = 'order-total';
      orderTotal.textContent = `Total a Pagar: L.${element.total.toFixed(2)}`;

      const orderAddress = document.createElement('div');
      orderAddress.className = 'order-address';
      orderAddress.textContent = `Dirección: ${element.direccion.descripcion}`;

      const orderLat = document.createElement('div');
      orderLat.className = 'order-address';
      orderLat.textContent = `Latitud: ${element.direccion.latitud}`;

      const orderLong = document.createElement('div');
      orderLong.className = 'order-address';
      orderLong.textContent = `Longitud: ${element.direccion.longitud}`;

      const takeOrderButton = document.createElement('button');
      takeOrderButton.className = 'take-order-button';
      takeOrderButton.textContent = 'Tomar Pedido';
      takeOrderButton.addEventListener('click', () => handleTakeOrder(element));

      orderCard.appendChild(orderTitle);
      orderCard.appendChild(orderInfoClient);
      orderCard.appendChild(orderInfoDate);
      orderCard.appendChild(orderInfoTime);
      orderCard.appendChild(orderProducts);
      orderCard.appendChild(orderTotal);
      orderCard.appendChild(orderAddress);
      orderCard.appendChild(orderLat);
      orderCard.appendChild(orderLong);
      orderCard.appendChild(takeOrderButton);

      document.getElementById('main-view').appendChild(orderCard);
    });
  });
};

let pedidoSeleccionado = null;

function handleTakeOrder(element) {
  pedidoSeleccionado = {
    nombre: element.nombre,
    cliente: `${element.cliente.nombre} ${element.cliente.apellido}`,
    fecha: element.fecha,
    hora: element.hora,
    productos: element.productos,
    total: element.total,
    direccion: element.direccion,
    motorista: infoMotorista.nombreCompleto
  };

  console.log('Pedido seleccionado:', pedidoSeleccionado);

  fetch(`${URL}/motoristas/aceptar-orden`, {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(pedidoSeleccionado)
  })
  .then((result)=>result.json())
    .then((response)=>{
        console.log(response);
    });
};