import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css";
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import CardData from './components/CardData';
import SlideFull from './components/SlideFull';
import SciFi from './components/SciFi';
import Footer from './components/Footer';
import WatchLater from './components/WatchLater';
import { comedyApi, documentryApi, horrorApi, romanceApi, sciApi, trendingApi, urlApi } from './utils/constant';
import Gpt from './components/Gpt';
import VedioPlay from './components/VedioPlay';

const base_url = "https://image.tmdb.org/t/p/original/" //-->PosterPath

const App = () => {

  const [data, getData] = useState([])
  const url = urlApi

  const fetchApi = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      getData(result.results)
      // console.log(result.results)
    } catch (error) {
      console.error(error);
    }
  }
  const responsive1 = { //HomePage 1-SlideShow
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={
            <>
              <Landing />
              <div className="container-fluid">
                <Footer />
              </div>
            </>
        }></Route>
          <Route exact path='/Home' element={
            <>
              <div className='container-fluid'>
                <NavBar />
              </div>
              <div className='container-fluid position-relative d-flex '>
                <VedioPlay vedioId = {550}/>
                <div className='container-fluid position-absolute top-0 start-0 my-sm-3 overflow-hidden font-monospace p-md-5 p-5 my-md-1'>
                  <Carousel swipeable={true} draggable={true} responsive={responsive1} ssr={true} infinite={true} autoPlay={false}
                    autoPlaySpeed={1000} keyBoardControl={true} customTransition="all .5" transitionDuration={1000} showArrows={true} removeArrowOnDeviceType={["tablet", "mobile", "desktop"]} >
                    {data.map((value) => {
                      return (
                        <SlideFull key={value.id} image={`${base_url}${value.poster_path}`} title={value.name} summary={value.overview} release={value.first_air_date} value={value}  trailerId = {value.id}/>
                      )
                    })}
                  </Carousel>
                </div>
              </div>
              <div className="container-fluid" id='TrendingNow'>
                <h2 className='text-uppercase fw-bold text-light fst-italic text-start mx-3'style={{fontSize:'1.5rem'}}>Trending Now </h2>
                <SciFi url={trendingApi}  title={'TrendingNow'}/>
              </div>

              <div className="container-fluid mb-5" id='SciFi'>
                <h2 className='text-uppercase fw-bold fst-italic text-light text-start mx-3'style={{fontSize:'1.5rem',marginTop:'-200px'}}>Sci-Fi</h2>
                <SciFi url={sciApi} title={'SciFi'}/>
              </div>

              <div className="container-fluid my-1 mb-5" id='SciFi'>
                <h2 className='text-uppercase fw-bold fst-italic text-light text-start  mx-3'style={{fontSize:'1.5rem'}}>Comedy</h2>
                <SciFi url={comedyApi} title={'Comedy'}/>
              </div>

              <div className="container-fluid my-1 mb-5" id='SciFi'>
                <h2 className='text-uppercase fw-bold fst-italic text-light text-start  mx-3'style={{fontSize:'1.5rem'}}>Horror</h2>
                <SciFi url={horrorApi} title={'Horror'}/>
              </div>

              <div className="container-fluid my-1 mb-5" id='SciFi'>
                <h2 className='text-uppercase fw-bold fst-italic text-light text-start  mx-3'style={{fontSize:'1.5rem'}}>Romance</h2>
                <SciFi url={romanceApi} title={'Romance'}/>
              </div>

              <div className="container-fluid my-1" id='SciFi'>
                <h2 className='text-uppercase fw-bold fst-italic text-light text-start mx-3'style={{fontSize:'1.5rem'}}>Documentry</h2>
                <SciFi url={documentryApi} title={'Documentry'}/>
              </div>

              <div className="container-fluid">
                <Footer />
              </div>
            </>}
          >
          </Route>
            {/* Getting Card details clicked By user*/}
            <Route path='/Home/:CardData' element={
              <>
              <div className='container-fluid'>
                  <NavBar />
                </div>
                <CardData />
              <div className="container-fluid">
                <Footer />
              </div>
              </>
            }>
          </Route>
          <Route path='/Home/WatchLater' element={
              <>
              <div className='container-fluid'>
                <NavBar />
              </div>
                <WatchLater />
              <div className="container-fluid">
                <Footer />
              </div>
              </>
            }>
          </Route>
          <Route path='/Home/Gpt' element={
              <>
                <div className='container-fluid'>
                  <NavBar />
                </div>
                <Gpt/>
              </>
            }>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
