import homeImg from '../images/home-img.png'
import guarantee from '../images/guarantee.png'
import heart from '../images/heart.png'
import agent from '../images/agent.png'
import support from '../images/support.png'
import CardGroupTour from '../component/cardGroupTour'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Home = () => {
    return (
        <>
            <div >
                <img src={homeImg} className='absolute -z-10 top-0'  />
                <div className='ml-20 mt-10'>
                    <p className='text-white text-5xl font-bold'>EXPLORE</p>
                    <p className='text-white text-3xl'>your amazing city together</p>
                    <p className='text-white mt-14'>find great places to holiday</p>
                    <div className="form-control">
                        <div className="input-group mt-1">
                            <input type="text" placeholder="Search…" className="input input-bordered bg-white w-[1000px]" />
                            <button className="btn btn-square px-10 bg-yellow-500 border-none text-white">
                            search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-5 mt-36 bg-slate-50'>
                <div className="card w-56 bg-white shadow-xl absolute top-96 left-[150px] h-72">
                    <figure><img src={guarantee} className='pt-5' /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-black text-center">Best Price Guarantee</h2>
                        <p className='text-center'>A small river named Duren Flows by their place and supplies </p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                <div className="card w-56 bg-white shadow-xl absolute top-96 left-[400px] h-72">
                    <figure><img src={heart} className='pt-5' /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-center text-black">Travellers love Us</h2>
                        <p className='text-center'>A small river named Duren Flows by their place and supplies</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                <div className="card w-56 bg-white shadow-xl absolute top-96 left-[650px] h-72">
                    <figure><img src={agent} className='pt-5' /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-center  text-black">Best Travel Agent</h2>
                        <p className='text-center'>A small river named Duren Flows by their place and supplies</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                <div className="card w-56 bg-white shadow-xl absolute top-96 left-[900px] h-72">
                    <figure><img src={support} className='pt-5' /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-center text-black">Our Dedicated Supported</h2>
                        <p className='text-center'>A small river named Duren Flows by their place and supplies</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
            </div>
            <CardGroupTour />
        </>
    )
}


export default Home