import React, { useEffect, useState } from 'react';
import { getCalApi } from '@calcom/embed-react'
import axios from 'axios';
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Grid,
  GridItem,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  console.log(window.location.pathname)

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "doctor" });
      cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])

  useEffect(() => {
    axios
      .get('https://gymverseassignment.onrender.com/getalldoctors')
      .then((res) => {
        setDoctors(res.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Also stop loading in case of an error
      });
  }, []);

  const bgColor = useColorModeValue('gray.900', 'gray.800');
  const textColor = 'white';

  return (
    <Box bg={bgColor} p={5} minH="100vh">
      <Text fontSize="4xl" mb={6} color={textColor} textAlign="center">
        Doctors List
      </Text>
      {loading ? (
        // Spinner while loading
        <Flex justifyContent="center" alignItems="center" height="200px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          {doctors.map((doctor) => (
            <GridItem key={doctor._id}>
              <Flex
                direction="column"
                align="center"
                bg="gray.700"
                p={4}
                borderRadius="lg"
                shadow="md"
                _hover={{ shadow: 'lg' }}
              >
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={doctor.doctorId.profileImg}
                  alt={doctor.doctorId.name}
                  mb={4}
                />
                <VStack spacing={2} align="start">
                  <Text fontSize="xl" color={textColor} fontWeight="bold">
                    {doctor.doctorId.name}
                  </Text>
                  <Text fontSize="md" color={textColor}>
                    <strong>Qualifications:</strong> {doctor.doctorId.qualifications}
                  </Text>
                  <Text fontSize="md" color={textColor}>
                    <strong>Experience:</strong> {doctor.doctorId.experience}
                  </Text>
                  <Text fontSize="md" color={textColor}>
                    <strong>Specialization:</strong> {doctor.doctorId.specialization}
                  </Text>
                  <Text fontSize="md" color={textColor}>
                    <strong>Phone:</strong> {doctor.phone}
                  </Text>


                  <button className='text-white bg-gray-900 px-6 py-2 rounded-lg' data-cal-namespace="doctor"
                    data-cal-link={doctor?.doctorId?.calId || 'kunal-khandelwal-j9kyxl/doctor'}

                    data-cal-config='{"layout":"month_view"}'
                  >Book Appointment</button>
                </VStack>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Doctors;
