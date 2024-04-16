// import React, {useState} from 'react';
// import './RestaurantPage.css';
// import CardRestaurant from 'react-tinder-card'

// export default function RestaurantPage() {

//     const [restaurant] = useState([
//         {
//             name: 'Restaurant 1',
//             url: 'https://source.unsplash.com/random/1000x1000?restaurant',
//         },
//         {
//             name: 'Restaurant 2',
//             url: 'https://source.unsplash.com/random/1000x1000?food',
//         },
//     ]);

//     return (
//         <div className='CardRestaurant'>

//             <div className='cardRestaurant_container'>
//                 {restaurant.map(restaurant => (

//                     <CardRestaurant
//                     className='swipe'
//                     key={restaurant.name}
//                     preventSwipe={['up', 'down']}
//                     >

//                         <div 
//                         className='card'
//                         style={{backgroundImage: `url(${restaurant.url}`}}
//                         >

//                             <h2>{restaurant.name}</h2>

//                         </div>

//                     </CardRestaurant>


//                 ))}
//             </div>

//         </div>
//     );
//   }