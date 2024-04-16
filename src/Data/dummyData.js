
const categories = [
    { id: 1, name: "Sandwiches" },
    { id: 2, name: "Seafood" },
    { id: 3, name: "Mexican" },
    { id: 4, name: "Italian" },
    { id: 5, name: "Sides" },
    { id: 6, name: "Desserts" },
    { id: 7, name: "Drinks" },
  ];
  
  const restaurants = [
    { id: 1, name: "Restaurant 1", category: "Sandwiches", price: 10 },
    { id: 2, name: "Restaurant 2", category: "Seafood", price: 30 },
    { id: 3, name: "Restaurant 3", category: "Mexican" },
    { id: 4, name: "Restaurant 4", category: "Italian" },
    { id: 5, name: "Restaurant 5", category: "Sides" },
    { id: 6, name: "Restaurant 6", category: "Desserts" },
    { id: 7, name: "Restaurant 7", category: "Sandwiches" },
  ];
  
  const menuItems = [
    { id: 1, name: "Item 1", price: 10, restaurantId: 1 },
    { id: 2, name: "Item 2", price: 12, restaurantId: 2 },
    { id: 3, name: "Item 3", price: 8, restaurantId: 3 },
    { id: 4, name: "Item 4", price: 15, restaurantId: 4 },
    { id: 5, name: "Item 5", price: 6, restaurantId: 5 },
    { id: 6, name: "Item 6", price: 9, restaurantId: 6 },
    { id: 7, name: "Item 7", price: 11, restaurantId: 7 },
  ];
  
  export { categories, restaurants, menuItems };


  // DELETE AND ADD YELP DATA