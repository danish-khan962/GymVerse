import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

import doc from '../media/doctors-appointment-mental-health.png';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

const AppointmentHero = () => {
  const {isSignedIn } = useUser();
  const navigate = useNavigate();
  
  const handleBooking = () => {
    if (isSignedIn) {
      navigate('/profile/home');
    } else {
      navigate('/login');
    }
  };

  // Adjust responsive behavior for text and image sizes
  const textAlign = useBreakpointValue({ base: 'center', md: 'left' });


  return (
    <Box 
      minH="100vh"
    //   bg={useColorModeValue('gray.800', 'gray.900')}
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        maxW="1200px"
        mx="auto"
        spacing={6}
      >
       
        <Stack
          flex={1}
          spacing={6}
          textAlign={textAlign}
          p={{ base: 4, md: 6 }}
          justify="center"
        >
          <Heading as="h1" size="2xl" >
            Book Your Appointment Today
          </Heading>
          <Text fontSize="xl" className='doc-text text-blue-200 special-heading '>
            Discover the convenience of booking appointments online. Schedule your visit now and enjoy a hassle-free experience.
          </Text>
          <Button
            className=' inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-blue-950 focus:ring-4 focus:ring-gray-100 '
            size="lg"
            onClick={handleBooking}
            alignSelf={{ base: 'center', md: 'start' }}
          >
            Book Appointment
          </Button>
        </Stack>
        <Box flex={1}>
        <img
            src={doc}
            alt="doc"
          className='rounded-l-full'
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default AppointmentHero;
