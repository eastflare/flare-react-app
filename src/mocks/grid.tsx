export const retrieveCars = () => {
  return {
    columns: [
      { headerName: "제조사", field: "make", sortable: true, filter: true, width: 200 },
      { headerName: "모델", field: "model", sortable: true, filter: true, width: 200 },
      { headerName: "가격", field: "price", sortable: true, filter: true, width: 200 },
    ],
    rows: [
      { make: "Porsche", model: "Cayenne", price: 27529 },
      { make: "BMW", model: "X3", price: 59612 },
      { make: "Ford", model: "Focus", price: 52887 },
      { make: "Mercedes", model: "GLA", price: 36784 },
      { make: "Chevrolet", model: "Impala", price: 45038 },
      { make: "Chevrolet", model: "Malibu", price: 64127 },
      { make: "Volkswagen", model: "Passat", price: 64720 },
      { make: "Volkswagen", model: "Passat", price: 65461 },
      { make: "Mercedes", model: "GLA", price: 44882 },
      { make: "Volkswagen", model: "Passat", price: 54578 },
      { make: "Chevrolet", model: "Camaro", price: 42921 },
      { make: "Mercedes", model: "E-Class", price: 58266 },
      { make: "Honda", model: "Fit", price: 60997 },
      { make: "Mercedes", model: "GLA", price: 16046 },
      { make: "Nissan", model: "Altima", price: 23636 },
      { make: "Toyota", model: "Corolla", price: 40726 },
      { make: "Porsche", model: "911", price: 20328 },
      { make: "Chevrolet", model: "Camaro", price: 33125 },
      { make: "Volkswagen", model: "Passat", price: 18509 },
      { make: "Honda", model: "Civic", price: 46238 },
      { make: "BMW", model: "X3", price: 33144 },
      { make: "Nissan", model: "Altima", price: 30430 },
      { make: "Audi", model: "A6", price: 44983 },
    ],
  };
};
