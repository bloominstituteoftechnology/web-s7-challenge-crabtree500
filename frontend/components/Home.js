import React, { Link } from 'react'
import pizza from './images/pizza.jpg'
function Home() {
  return (
    <div>
      <h2>
        Welcome to Bloom Pizza!
      </h2>
      {/* clicking on the img should navigate to "/order" */}
      <Link to= "/Form">
      <img alt="order-pizza" style={{ cursor: 'pointer' }} src={pizza} />
      </Link>
    </div>
  )
}

export default Home
