import React from 'react';
import { Box, Heading, Text, Button, Link, useBreakpointValue, Flex, VStack } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import gif from '../media/Animation - 1720634938561.json';
import game from '../media/kisscc0-board-game-drinking-game-video-games-logo-mono-roll-5d384038b206b6.7603827115639675447292.png';
import { FaGamepad, FaCrown } from 'react-icons/fa';
import gam from "../photos/group-children-teacher-playing-rainbow-600nw-2039359091.webp"

const Games = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <div className='flex flex-col lg:flex-row gap-[2rem] mt-[4rem] justify-center mb-8'>
    <div className='bg-gradient-to-br from-gray-700 to-gray-950 p-3 items-center rounded-lg '>
      <img
            src={gam}
            alt="Game"
            width="550px"
            
            className=" rounded-xl shadow-lg "
          />
          </div>
    <Flex
      direction={'column'}
      align="center"
      justify="center"
      p={8}
      bg="blue.50"
      borderRadius="lg"
      boxShadow="lg"
      spacing={8}
    >
      <VStack
        spacing={6}
        textAlign="center"
        maxW="lg"
        p={6}
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        border="1px"
        borderColor="blue.200"
      >
        <Heading as="h1" size="2xl" color="blue.800" mb={4}>
          Let's Play Games!
        </Heading>
     
        <Text fontSize="lg" fontStyle="italic"color="gray.700" mb={6} >
          Discover our fun and exciting games designed to keep you entertained for hours. Choose your game and start playing now!
        </Text>
        <Flex direction={isMobile ? 'column' : 'row'} gap={4} align="center">
          <Link href="/Memory" isExternal target='_self'>
            <Button
              colorScheme="yellow"
              size="lg"
              borderRadius="full"
              px={8}
              py={4}
              fontWeight="bold"
              _hover={{ bg: 'yellow.500' }}
              transition="background-color 0.3s"
              leftIcon={<FaGamepad />}
            >
              Memory Game
            </Button>
          </Link>
          <Link href="/Catch" isExternal>
            <Button
              colorScheme="teal"
              size="lg"
              borderRadius="full"
              px={8}
              py={4}
              fontWeight="bold"
              _hover={{ bg: 'teal.500' }}
              transition="background-color 0.3s"
              leftIcon={<FaCrown />}
            >
              Free Fall
            </Button>
          </Link>
       
        </Flex>
      </VStack>
      {!isMobile && (
        <Box
          position="relative"
          w="full"
          maxW="700px"
          h="auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
         
          mt={8}
        >
        
        </Box>
      )}
     
    </Flex>
  
    </div>
      
      
  );
};

export default Games;
