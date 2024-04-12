import React, {useState} from 'react';
import './RestaurantPage.css';
import CardRestaurant from 'react-tinder-card'

export default function RestaurantPage() {

    const [restaurant, setRestaurant] = useState([
        {
            name: 'Restaurant 1',
            url: 'https://source.unsplash.com/random/1000x1000?restaurant',
        },
        {
            name: 'Restaurant 2',
            url: 'https://source.unsplash.com/random/1000x1000?restaurant',
        },
    ]);



    return (
        <div className='CardTinder'>

            <div className='cardTinder_container'>
                {restaurant.map(restaurant => (

                    <CardRestaurant
                    className='swipe'
                    key={restaurant.name}
                    preventSwipe={['up', 'down']}
                    >

                        <div 
                        className='card'
                        style={{backgroundImage: `url(${restaurant.url}`}}
                        >

                            <h2>{restaurant.name}</h2>

                        </div>

                    </CardRestaurant>


                ))}
            </div>

        </div>
    );
  }