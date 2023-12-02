const ventas = [
  {
      "id": 7,
      "amount": 24000,
      "user": "camilo",
      "id_user": 2,
      "date": "2023-12-01 17:35",
      "products": [
          {
              "amount": 18000,
              "product": "mora",
              "category": "jugos",
              "quantity": 3
          },
          {
              "amount": 6000,
              "product": "lulo",
              "category": "jugos",
              "quantity": 1
          }
      ]
  },
  {
      "id": 8,
      "amount": 24000,
      "user": "camilo",
      "id_user": 2,
      "date": "2023-12-01 17:35",
      "products": [
          {
              "amount": 3000,
              "product": "pasteles",
              "category": "otros",
              "quantity": 2
          },
          {
              "amount": 10000,
              "product": "almohabana",
              "category": "otros",
              "quantity": 5
          }
      ]
  },
  {
      "id": 9,
      "amount": 24000,
      "user": "camilo",
      "id_user": 2,
      "date": "2023-12-01 17:37",
      "products": [
          {
              "amount": 30000,
              "product": "mango",
              "category": "jugos",
              "quantity": 5
          },
          {
              "amount": 6000,
              "product": "borojo",
              "category": "jugos",
              "quantity": 1
          }
      ]
  }
];

const detailsSales = [];
ventas.forEach((venta) => {
  venta.products.forEach((v) => {
    detailsSales.push(v)
  } )
});

let totalJugos = 0;

detailsSales.forEach((venta) => {
  if (venta.category === "jugos") {
    totalJugos += venta.amount;
  }
})

console.log(totalJugos)