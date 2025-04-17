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
    Text,
    useToast,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import { createActivity, getActivity } from '../utils/fetchData'; 
import { useUser } from '@clerk/clerk-react';

// Utility function to get the start and end dates of the current week
const getCurrentWeekRange = () => {
    const today = new Date();
    const start = new Date(today);
    const end = new Date(today);

    // Get the current day of the week (0 for Sunday, 1 for Monday, etc.)
    const dayOfWeek = today.getDay();

    // Adjust for the start of the week (Monday)
    start.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    end.setDate(start.getDate() + 6); // End of the week (Sunday)

    return { start, end };
};

const Activity = () => {
    const { user } = useUser();
    const toast = useToast();
    const [distance, setDistance] = useState(0);
    const [steps, setSteps] = useState(0);
    const [activityDate, setActivityDate] = useState(new Date());
    const [pastActivities, setPastActivities] = useState([]);

    const { start: weekStart } = getCurrentWeekRange();
    const today = new Date(); 

    const fetchActivities = useCallback(async () => {
        try {
            const response = await getActivity(user?.id);
            setPastActivities(response.activities);
        } catch (error) {
            toast({
                title: 'Error',
                description: error?.response?.data?.message || 'Failed to fetch activities',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error(error.response?.data || error);
        }
    }, [user?.id, toast]);

    const handleSubmit = useCallback(async () => {
        const data = { userId: user?.id, distance, steps, activityDate };

        const loadingToastId = toast({
            title: 'Posting activity...',
            description: 'Your activity is being posted.',
            status: 'loading',
            duration: null,
            isClosable: true,
        });

        try {
            await createActivity(data);
            
            // Success toast
            toast({
                title: 'Activity posted successfully!',
                description: 'Your activity has been posted.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            // Refresh activities after posting
            fetchActivities();
        } catch (error) {
            // Error toast
            toast({
                title: 'Failed to post activity',
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
    }, [activityDate, distance, steps, toast, user?.id, fetchActivities]);

    useEffect(() => {
        fetchActivities();
    }, [user?.id, fetchActivities]);

    return (
        <Box p={8} color="white">
            <Heading mb={8} textAlign="center">
                Activity
            </Heading>
            <Flex direction={['column', 'row']} justify="space-between">
                {/* Left side: Form */}
                <Box flex={1} mr={[0, 8]} mb={[8, 0]}>
                    <Heading size="md" mb={4}>
                        Post New Activity
                    </Heading>
                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel>Distance (km)</FormLabel>
                            <Input
                                type="number"
                                value={distance}
                                onChange={(e) => {
                                    if (e.target.value < 0) {
                                        setDistance(0)
                                        
                                    }else{
                                        setDistance(e.target.value)
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Steps</FormLabel>
                            <Input
                                type="number"
                                value={steps}
                                onChange={(e) => {
                                    if (e.target.value < 0) {
                                        setSteps(0)
                                    }else{
                                        setSteps(e.target.value)
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Date</FormLabel>
                            <Box
                                bg="gray.900"
                                borderRadius="md"
                                p={2}
                            >
                                <DatePicker
                                    selected={activityDate}
                                    onChange={(date) => setActivityDate(date)}
                                    dateFormat="yyyy/MM/dd"
                                    minDate={weekStart}
                                    maxDate={today}
                                    customInput={<Input bg="gray.900" color="white" />}
                                />
                            </Box>
                        </FormControl>
                        <Button colorScheme="teal" onClick={handleSubmit}>
                            Post Activity
                        </Button>
                    </VStack>
                </Box>

                {/* Right side: Past Activities */}
                <Box flex={1} bg="gray.700" p={6} borderRadius="md">
                    <Heading size="md" mb={4}>
                        Past Activities
                    </Heading>
                    <Box maxHeight={'500px'} overflowY={'scroll'}>
                        {pastActivities ? (
                            pastActivities.length > 0 ? (
                                pastActivities.map((activity, index) => (
                                    <Box
                                        key={index}
                                        bg="gray.600"
                                        p={4}
                                        mb={4}
                                        borderRadius="md"
                                        boxShadow="md"
                                    >
                                        <Text>Date: {activity.date.split('T')[0]}</Text>
                                        <Text>Distance: {activity.distance} km</Text>
                                        <Text>Steps: {activity.steps}</Text>
                                    </Box>
                                ))
                            ) : (
                                <Text>No past activities</Text>
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

export default Activity;
