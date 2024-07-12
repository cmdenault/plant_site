// App component, routes to components based on url

//import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom' // using HashRouter instead of BrowserRouter 


import './App.css'

import Listings from './pages/Listings'
import Details from './pages/Details'

function App() {
  
  return (
    <>
      {/* Route to correct component based on url */}
      <HashRouter>
        <Routes>

          <Route path='/' element={<Listings />} />

          <Route path='/plants/:id' element={<Details />} /> {/* /challenges/:id takes in the challenge's id from path?*/}

          <Route path='/hello' element={<Details />} /> {/* need http://localhost:5173/#/hello ?*/}


        </Routes>
      </HashRouter>
    </>
  )
}

export default App

/*

npm create vite@latest
cd plant_site
npm install
npm run dev


npm i react-router-dom -save-dev




how did you set up the router?

  aws s3

  upload as a json file to a bucket. 
  under permissions, enable public access. and add a cors specification

  when setting up bucket, there are encryption settings to change
    uncheck disable public access
    bucket policy
    

  static website hosting option


  OR use firebase 


  Qs!

  in details page, what keeps the items from going one end to the other?
  make more divs and flex boxes for the text??


*/