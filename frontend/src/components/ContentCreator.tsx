import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Select,
  Card,
  CardBody,
  Heading,
  Text,
  Alert,
  AlertIcon,
  useToast,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { useDemo } from '../contexts/DemoContext';
import { CONTRACT_ADDRESSES } from '../config/contracts';

const ContentCreator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [accessLevel, setAccessLevel] = useState('0');
  const [isCreating, setIsCreating] = useState(false);
  
  const toast = useToast();
  const { createContent } = useDemo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !contentUrl) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsCreating(true);

    try {
      toast({
        title: '⛓️ Submitting to Chiliz Blockchain...',
        description: 'Real MetaMask popup will appear - please approve the transaction!',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });

      const txHash = await createContent(title, description);

      toast({
        title: 'Content Created on Chiliz Blockchain! 🎉',
        description: 'Real transaction submitted! You earned 50 CFG tokens!',
        status: 'success',
        duration: 7000,
        isClosable: true,
        action: (
          <Button 
            size="sm"
            colorScheme="blue"
            onClick={() => window.open(`https://testnet.chiliscan.com/tx/${txHash}`, '_blank')}
          >
            View Real TX 🔍
          </Button>
        ),
      });

      // Reset form
      setTitle('');
      setDescription('');
      setContentUrl('');
      setAccessLevel('0');

    } catch (error: any) {
      toast({
        title: 'Blockchain Transaction Failed',
        description: error.message?.includes('rejected') 
          ? 'Transaction rejected in MetaMask' 
          : 'Smart contract call failed. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsCreating(false);
    }
  };

  const getAccessLevelInfo = (level: string) => {
    switch (level) {
      case '0': return { name: 'Public', color: 'green', desc: 'Accessible to everyone' };
      case '10': return { name: 'Standard', color: 'blue', desc: 'Requires 10+ CFG tokens' };
      case '100': return { name: 'Premium', color: 'purple', desc: 'Requires 100+ CFG tokens' };
      case '1000': return { name: 'VIP Only', color: 'red', desc: 'Requires 1000+ CFG tokens' };
      default: return { name: 'Public', color: 'green', desc: 'Accessible to everyone' };
    }
  };

  const accessInfo = getAccessLevelInfo(accessLevel);

  return (
    <Box maxW="2xl" mx="auto">
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading 
            mb={2}
            bgGradient="linear(45deg, red.400, orange.400)"
            bgClip="text"
          >
            Create Exclusive Content
          </Heading>
          <Text color="gray.300">
            Share your fan content and earn 50 CFG tokens for each post!
          </Text>
        </Box>

        <Alert 
          status="success"
          bg="rgba(16, 185, 129, 0.1)"
          border="1px solid rgba(16, 185, 129, 0.2)"
          borderRadius="lg"
        >
          <AlertIcon color="green.400" />
          <Box>
            <Text fontWeight="bold" color="white">🔗 Real + Demo Mode Active</Text>
            <Text fontSize="sm" color="gray.300">
              This will trigger a REAL MetaMask transaction to Chiliz blockchain + update demo UI instantly!
            </Text>
          </Box>
        </Alert>

        <Card 
          bg="rgba(255,255,255,0.05)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255,255,255,0.1)"
        >
          <CardBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color="white">Content Title</FormLabel>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Amazing Goal Compilation 2024"
                    maxLength={100}
                    bg="rgba(255,255,255,0.1)"
                    border="1px solid rgba(255,255,255,0.2)"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{ border: '2px solid red.400' }}
                    isDisabled={isCreating}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="white">Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your amazing content..."
                    rows={4}
                    maxLength={500}
                    bg="rgba(255,255,255,0.1)"
                    border="1px solid rgba(255,255,255,0.2)"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{ border: '2px solid red.400' }}
                    isDisabled={isCreating}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="white">Content URL or IPFS Hash</FormLabel>
                  <Input
                    value={contentUrl}
                    onChange={(e) => setContentUrl(e.target.value)}
                    placeholder="https://... or QmHash..."
                    bg="rgba(255,255,255,0.1)"
                    border="1px solid rgba(255,255,255,0.2)"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{ border: '2px solid red.400' }}
                    isDisabled={isCreating}
                  />
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    Link to your video, image, or IPFS content
                  </Text>
                </FormControl>

                <FormControl>
                  <FormLabel color="white">Access Level (Token Gate)</FormLabel>
                  <Select 
                    value={accessLevel} 
                    onChange={(e) => setAccessLevel(e.target.value)}
                    bg="rgba(255,255,255,0.1)"
                    border="1px solid rgba(255,255,255,0.2)"
                    color="white"
                    _focus={{ border: '2px solid red.400' }}
                    isDisabled={isCreating}
                  >
                    <option value="0" style={{ background: '#2D3748', color: 'white' }}>
                      Public (0 tokens required)
                    </option>
                    <option value="10" style={{ background: '#2D3748', color: 'white' }}>
                     Standard (10 CFG tokens required)
                   </option>
                   <option value="100" style={{ background: '#2D3748', color: 'white' }}>
                     Premium (100 CFG tokens required)
                   </option>
                   <option value="1000" style={{ background: '#2D3748', color: 'white' }}>
                     VIP Only (1000 CFG tokens required)
                   </option>
                 </Select>
                 
                 <HStack mt={2} spacing={2}>
                   <Badge colorScheme={accessInfo.color}>{accessInfo.name}</Badge>
                   <Text fontSize="sm" color="gray.400">{accessInfo.desc}</Text>
                 </HStack>
               </FormControl>

               <Button
                 type="submit"
                 bgGradient="linear(45deg, red.500, red.600)"
                 _hover={{ 
                   bgGradient: "linear(45deg, red.400, red.500)",
                   transform: isCreating ? 'none' : 'scale(1.02)'
                 }}
                 size="lg"
                 w="full"
                 isLoading={isCreating}
                 loadingText="Processing Real Blockchain TX..."
                 isDisabled={isCreating}
                 transition="all 0.3s"
                 color="white"
                 fontWeight="bold"
               >
                 {isCreating ? (
                   <>⛓️ Processing Real TX on Chiliz...</>
                 ) : (
                   <>🚀 Publish Content & Earn 50 CFG (REAL TX)</>
                 )}
               </Button>

               {/* Smart Contract Info */}
               <Box 
                 p={3} 
                 bg="rgba(255,255,255,0.02)" 
                 borderRadius="lg" 
                 border="1px solid rgba(255,255,255,0.1)"
                 w="full"
               >
                 <Text fontSize="xs" color="gray.400" textAlign="center">
                   Real Smart Contract: {CONTRACT_ADDRESSES.FAN_GATE?.slice(0, 10)}...
                   {' '}•{' '}
                   Network: Chiliz Spicy (88882)
                 </Text>
               </Box>

               {/* Expected Results Info */}
               <Box 
                 p={3} 
                 bg="rgba(16, 185, 129, 0.05)" 
                 borderRadius="lg" 
                 border="1px solid rgba(16, 185, 129, 0.2)"
                 w="full"
               >
                 <Text fontSize="xs" color="green.300" textAlign="center" fontWeight="bold">
                   💰 After publication: Real MetaMask TX + Demo Balance +50 CFG + Content Created +1
                 </Text>
               </Box>
             </VStack>
           </form>
         </CardBody>
       </Card>
     </VStack>
   </Box>
 );
};

export default ContentCreator;