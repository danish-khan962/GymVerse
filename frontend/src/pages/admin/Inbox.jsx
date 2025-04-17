import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, Thead, Tbody, Tr, Th, Td, Button, Link, useToast, Spinner, Box, Flex
} from '@chakra-ui/react';
const Inbox = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const toast = useToast();

  const fetchRequests = () => {
    setLoading(true); // Start loading
    axios.get('https://gymverseassignment.onrender.com/getallrequests')
      .then((res) => {
        setRequests(res.data);
        setLoading(false); // Stop loading once data is fetched
      }).catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even if there is an error
      });
  };



  const handleAccept = (id) => {
    toast.promise(
      axios.put(`https://gymverseassignment.onrender.com/acceptDoctor/${id}`),
      {
        loading: { title: 'Accepting...' },
        success: { title: 'Doctor accepted successfully!' },
        error: { title: 'Failed to accept doctor.' },
      }
    )
  };


  const handleReject = (id, docAdminId, docId) => {
    toast.promise(
      axios.delete(`https://gymverseassignment.onrender.com/rejectDoctor/${id}`, {
        data: { docAdminId, docId }
      }),
      {
        loading: { title: 'Rejecting...' },
        success: { title: 'Doctor rejected successfully!' },
        error: { title: 'Failed to reject doctor.' },
      }
    )
  };



  useEffect(() => {
    fetchRequests();
    // console.log(requests[0].doctorId._id, requests[0].doctorId.doctorId._id, requests[0]._id)
  }, []);

  return (
    <div className='text-white'>
      <h1 className='text-4xl mb-4'>Inbox</h1>

      {loading ? (
        // Display the Spinner while loading
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <Spinner size="xl" color="blue.500" />
        </Box>
      ) : (
        // Display the table when data is loaded
        <Table variant='striped' colorScheme='black'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Date</Th>
              <Th>Qualifications</Th>
              <Th>Experience</Th>
              <Th>Specialization</Th>
              <Th>Documents</Th>
              <Th>Operation</Th>
            </Tr>
          </Thead>
          <Tbody>
            {requests.map((request) => {
              const doctor = request.doctorId.doctorId;
              return (
                <Tr key={request._id}>
                  <Td>{doctor.name}</Td>
                  <Td>{request.doctorId.email}</Td>
                  <Td>{new Date(request.doctorId.createdAt).toLocaleDateString()}</Td>
                  <Td>{doctor.qualifications}</Td>
                  <Td>{doctor.experience}</Td>
                  <Td>{doctor.specialization}</Td>
                  <Td>
                    <Link href={doctor.documents} isExternal download>
                      Download
                    </Link>
                  </Td>
                  <Td minW={'250px'}>
                    {request.doctorId.isDoctor ? (
                      <>
                        <Flex>
                          <Button colorScheme='blue'>
                            Accepted
                          </Button>
                          <Button colorScheme='red' ml={2} onClick={() => handleReject(request._id, request?.doctorId?._id, request?.doctorId?.doctorId?._id)}>
                            Remove
                          </Button>
                        </Flex>
                      </>
                    ) : (
                      <>
                        <Button colorScheme='green' onClick={() => handleAccept(request.doctorId._id)}>
                          Accept
                        </Button>
                        <Button colorScheme='red' ml={2} onClick={() => handleReject(request._id, request?.doctorId?._id, request?.doctorId?.doctorId?._id)}>
                          Reject
                        </Button>
                      </>
                    )}

                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </div>
  );
};

export default Inbox;
