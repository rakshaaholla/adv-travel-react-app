import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img1.jpg'
              text='Explore the Mt. Fuji in Japan'
              label='Adventure'
              path='/services'
            />
            <CardItem
              src='images/img2.jpg'
              text='Travel through the Shrines of Japan'
              label='Luxury'
              path='/services'
            />
            <CardItem
              src='images/img7.jpg'
              text='Explore the Gifu prefecture in Japan'
              label='Mystery'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img5.jpg'
              text='Experience the spring season in Ibaraki'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src='images/img9.jpeg'
              text='Explore through the Bamboo forest by walk in Kyoto, Japan'
              label='Adrenaline'
              path='/sign-up'
            />
            <CardItem
              src='images/img4.jpg'
              text='Visit the anime center of Japan - Akihabara'
              label='Adrenaline'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
