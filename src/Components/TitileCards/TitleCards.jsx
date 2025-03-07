import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title,category}) => {
 
  const [apiData,setApiData]=useState([])

  const cardsRef = useRef()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGE4NjA3ZmY4NjZhZjVkZGQyNjlhZDJiMjM3OTg5YSIsIm5iZiI6MTczOTM2ODAxMy43NzcsInN1YiI6IjY3YWNhNjRkZTA5ZDZjOTE5MGIwYTIyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DwIf-7MdPszrke4ukmIQzPXWh4P9Bh88PiymF6nSQ-U'
    }
  };
  
  

  const handleWheel = ( event) =>{
     event.preventDefault()
     cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect (()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
   cardsRef.current.addEventListener('wheel',handleWheel)
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="scroll-container">
      <div className="card-list"  ref={cardsRef} >
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`}className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
    </div>
  )
}

export default TitleCards
