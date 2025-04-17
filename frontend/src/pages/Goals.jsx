import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  VStack,
  Checkbox,
  Text,
  useToast,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createGoal, getGoals, updateGoal } from '../utils/fetchData'; // Mock API calls
import { useUser } from '@clerk/clerk-react';

const Goals = () => {
  const { user } = useUser();
  const toast = useToast();
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [pastGoals, setPastGoals] = useState([]);

  const fetchGoals = useCallback(async () => {
    try {
      const response = await getGoals(user?.id);
      setPastGoals(response);
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to fetch goals',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      console.error(error.response?.data || error);
    }
  }, [user?.id, toast]);

  const handleSubmit = useCallback(async () => {
    const data = { userId: user?.id, description, startDate, endDate };

    const loadingToastId = toast({
      title: 'Posting goal...',
      description: 'Your goal is being posted.',
      status: 'loading',
      duration: null,
      isClosable: true,
    });

    try {
      await createGoal(data);
      
      // Success toast
      toast({
        title: 'Goal posted successfully!',
        description: 'Your goal has been posted.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      // Refresh goals after posting
      fetchGoals();
    } catch (error) {
      // Error toast
      toast({
        title: 'Failed to post goal',
        description: error?.response?.data?.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      console.error(error.response?.data || error);
    } finally {
      // Close loading toast
      toast.close(loadingToastId);
    }
  }, [description, endDate, startDate, toast, user?.id, fetchGoals]);

  const handleAchievedChange = async (goalId) => {
    const loadingToastId = toast({
      title: 'Updating goal...',
      description: 'Marking goal as achieved.',
      status: 'loading',
      duration: null,
      isClosable: true,
    });

    try {
      await updateGoal(goalId); // Mock function for marking goal as achieved
      
      // Success toast
      toast({
        title: 'Goal marked as achieved!',
        description: 'Your goal has been updated.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      // Refresh goals after marking one as achieved
      fetchGoals();
    } catch (error) {
      // Error toast
      toast({
        title: 'Failed to mark goal as achieved',
        description: error?.response?.data?.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      console.error(error.response?.data || error);
    } finally {
      // Close loading toast
      toast.close(loadingToastId);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return (
    <Box p={8} color="white">
      <Heading mb={8} textAlign="center">
        Goals
      </Heading>
      <Flex direction={['column', 'row']} justify="space-between">
        {/* Left side: Form */}
        <Box flex={1} mr={[0, 8]} mb={[8, 0]}>
          <Heading size="md" mb={4}>
            Post New Goal
          </Heading>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter goal description"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Box
                bg="gray.900"
                borderRadius="md"
                p={2}
              >
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy/MM/dd"
                  minDate={new Date()}
                  customInput={<Input bg="gray.900" color="white" />}
                />
              </Box>
            </FormControl>

            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Box
                bg="gray.900"
                borderRadius="md"
                p={2}
              >
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy/MM/dd"
                  minDate={new Date()} // Disable past dates
                  customInput={<Input bg="gray.900" color="white" />}
                />
              </Box>
            </FormControl>

            <Button colorScheme="teal" onClick={handleSubmit}>
              Post Goal
            </Button>
          </VStack>
        </Box>

        {/* Right side: Past Goals */}
        <Box flex={1} bg="gray.700" p={6} borderRadius="md">
          <Heading size="md" mb={4}>
            Past Goals
          </Heading>
          <Box maxHeight={'500px'} overflowY={'scroll'}>
            {pastGoals ? (
              pastGoals.length > 0 ? (
                pastGoals.map((goal, index) => (
                  <Box
                    key={index}
                    bg="gray.600"
                    p={4}
                    mb={4}
                    borderRadius="md"
                    boxShadow="md"
                  >
                    <Text>Description: {goal.description}</Text>
                    <Text>Start Date: {goal.startDate.split('T')[0]}</Text>
                    <Text>End Date: {goal.endDate.split('T')[0]}</Text>
                    <Checkbox
                      isChecked={goal.isAchieved}
                      onChange={() => handleAchievedChange(goal._id)}
                      isDisabled={goal.isAchieved}
                    >
                      Mark as Achieved
                    </Checkbox>
                  </Box>
                ))
              ) : (
                <Text>No past goals</Text>
              )
            ) : (
              <Text>Loading...</Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Goals;
