import React from 'react'
import Contact from './Contact';
import Lottie from "lottie-react";
import gif from "../media/Animation - 1720638512048.json"
import giff from "../media/Animation - 1719504456561.json"
import { GoHeartFill } from "react-icons/go";
import News from './News';
import '../App.css';
import Fit from "./Fit"
import Card from '../components/Card';
import { Link, useNavigate } from 'react-router-dom';
import Games from './Games';
import { SimpleGrid, Box, Heading, Text, Button, useBreakpointValue, Flex, Spinner as Loader } from '@chakra-ui/react';
import { useUser } from '@clerk/clerk-react';
import { useAuthStore } from '../context/store';
import AppointmentHero from '../components/AppointmentHero';
import Navbar from '../components/Navbar';
import yog from '../photos/depositphotos_85221854-stock-photo-group-of-happy-friends-exercising.jpg'
import bot from '../photos/1714394648414.jpg'
import qtt from '../photos/29363-Fred-DeVito-Quote-If-it-doesn-t-challenge-you-it-doesn-t-change.jpg'

export default function Home() {
  const { setUser } = useAuthStore();
  const { user, isLoaded, isSignedIn } = useUser();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate()





  const handleBooking = () => {
    if (isSignedIn) {
      navigate('/Tracker/dashboard');
    } else {
      navigate('/login');
    }
  };



  if (isLoaded) {
    // setUser(user);
    if (user) {
      setUser(user, user.publicMetadata?.role)
      if (user?.publicMetadata.role === "admin") {
        navigate('/admin-dashboard/inbox')
      }
    }

    if (!user) {
      console.log("not auth")
      localStorage.removeItem('userState');
    }
  }



  return (
    <>
      {!isLoaded ? <Flex
        align="center"  // Center items vertically
        justify="center" // Center items horizontally
        h="100vh"
        background={'gray.900'}       // Full viewport height for vertical centering
      >
        <Loader color='white' />
      </Flex> :
        (
          <div className="App overflow-hidden ">


            <section className=" bg-gradient-to-br from-gray-700 via-gray-900 to-gray-950">


              <Navbar />

              <AppointmentHero />



              <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12" id='fitnessTracker'>

                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">

                  <img
                    src={yog} className='rounded-e-full'
                  />
                </div>
                <div className="mr-auto place-self-center lg:col-span-7 ml-6">
                  <h1 className="max-w-2xl text-white  text-xl font-extrabold text-left  md:text-5xl xl:text-5xl mb-8 ">Elevate Your Fitness Experience with Advanced Tracking</h1>
                  <p className="max-w-2xl mb-6 font-light text-blue-200 lg:mb-8 text-left md:text-lg lg:text-xl italic special-heading  ">"Unlock Your Potential and Achieve Optimal Fitness Levels Through Cutting-Edge Data-Driven Tracking"


                  </p>
                  <button onClick={handleBooking} className="inline-flex items-center mb-4 lg:mb-0 justify-center px-5 py-3 mr-3 text-base font-medium text-center border border-white text-white rounded-lg bg-primary-700 hover:bg-primary-800 " >
                    Fitness Tracker
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                  <Link to="/Bmi" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border  rounded-lg  focus:ring-4  border-gray-700 hover:bg-gray-700 focus:ring-gray-800">
                    BMI Calculator
                  </Link>
                </div>

              </div>
            </section>




            {/* <div className="text-center  hidden lg:block"> 
        <Spinner />
      </div> */}

            <div id='virtualGym'>
              <Fit />
            </div>
{/* 
            <div className=' ' id='games'>
              <Games />
            </div> */}
            <SimpleGrid

              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
              spacing={8}
              p={8}
              bg="gray.50"
              borderRadius="lg"
              boxShadow="md"
              bgColor="blue.50"
            >
              <a href="#games">
                <Card
                  title="Games"
                  text="Explore fun and interactive games to stay active and engaged."
                />
              </a>
              <a href="#virtualGym">
                <Card
                  title="Virtual Gym"
                  text="Access virtual gym sessions for personalized workouts."
                />
              </a>
              <a href="#fitnessTracker">
                <Card
                  title="Fitness Tracker"
                  text="Track your fitness progress and set goals with our integrated tracker."
                />
              </a>
              <a href="#chatBot">
                <Card
                  title="AI Bot"
                  text="Interact with our AI bot for personalized health and fitness advice."
                />
              </a>
            </SimpleGrid>


            <Flex
              direction={isMobile ? 'column' : 'row'}
              align="center"
              justify="center"
              gap={8}
              p={8}
              bg="gray.50"
              borderRadius="md"
              boxShadow="md"
              minH="400px"
              id='chatBot'
              bgColor="blue.50"
            >
              <Box textAlign={isMobile ? 'center' : 'left'}>
                <Heading as="h2" size="xl" color="gray.800" mb={4}>
                  Access AI-Driven Medical Consultations
                </Heading>
                <Text fontSize="lg" color="gray.600" mb={6}>
                  Get expert medical advice anytime, anywhere. Fast, reliable, and secure medical consultations at your fingertips.
                </Text>
                <Link to="/Aibot">
                  <Button
                    colorScheme="blue"
                    size="lg"
                    variant="solid"
                    borderRadius="full"
                    px={6}
                    py={3}
                    fontWeight="bold"
                    _hover={{ bg: 'blue.600' }}
                  >
                    Chat with the AI Bot Now
                  </Button>
                </Link>
              </Box>
              <Box w="full" maxW="md" mx="auto">
                <img src={bot} className='rounded-xl' />
              </Box>
            </Flex>

            <div>
              <News />
            </div>


            <div>
              <footer className="  py-6">
                <div className="container mx-auto text-center">
                  {/* <p className="mb-4 text-black">© 2024 OnlySolution. All rights reserved.</p> */}
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="hover:text-gray-400 text-black">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-400 text-black">Terms of Service</a>
                    <a href="/Contact" className="hover:text-gray-400 text-black">Contact Us</a>
                  </div>

                </div>
                <div className='ml-auto lg:ml-[58rem]'>
                  <p className=' flex items-center text-black'>
                    Made with <GoHeartFill className="mr-[0.2rem] ml-[0.2rem] text-red-700" /> by Kunal Khandelwal, Danish Khan and Kshitij Jindal
                  </p>
                </div>
              </footer>
            </div>

          </div>
        )
      }
    </>
  )
}
