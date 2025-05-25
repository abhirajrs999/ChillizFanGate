import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Progress,
  useToast,
  Alert,
  AlertIcon,
  Icon,
  Link,
  Code,
} from '@chakra-ui/react';
import { 
  FaExternalLinkAlt, 
  FaCoins, 
  FaChartLine,
  FaEthereum,
  FaSync,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { useDemo } from '../contexts/DemoContext';
import { CONTRACT_ADDRESSES } from '../config/contracts';

const Dashboard: React.FC = () => {
  const { address } = useAccount();
  const { balance, contentCreated, totalEarned, claimDailyReward, transactions } = useDemo();
  const toast = useToast();
  const [isClaimingReward, setIsClaimingReward] = useState(false);

  // Calculate access level based on balance
  const getAccessLevel = () => {
    if (balance >= 1000) return 'VIP';
    if (balance >= 100) return 'Premium';  
    if (balance >= 10) return 'Standard';
    return 'Basic';
  };

  const getAccessLevelProgress = () => {
    const currentLevel = getAccessLevel();
    let progress = 0;
    let nextTarget = 0;
    let nextLevel = '';

    switch (currentLevel) {
      case 'Basic':
        progress = (balance / 10) * 100;
        nextTarget = 10;
        nextLevel = 'Standard';
        break;
      case 'Standard':
        progress = (balance / 100) * 100;
        nextTarget = 100;
        nextLevel = 'Premium';
        break;
      case 'Premium':
        progress = (balance / 1000) * 100;
        nextTarget = 1000;
        nextLevel = 'VIP';
        break;
      case 'VIP':
        progress = 100;
        nextTarget = 0;
        nextLevel = 'Maximum Level';
        break;
    }

    return { progress: Math.min(progress, 100), nextTarget, nextLevel, currentLevel };
  };

  const accessProgress = getAccessLevelProgress();

  const handleClaimDailyReward = async () => {
    if (contentCreated === 0) {
      toast({
        title: 'Activity Required',
        description: 'Create content first to unlock daily rewards',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsClaimingReward(true);

    try {
      toast({
        title: '⛓️ Submitting to Chiliz Blockchain...',
        description: 'Real MetaMask transaction will appear - approve it!',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });

      const txHash = await claimDailyReward();

      toast({
        title: 'Daily Reward Claimed on Blockchain! 🎉',
        description: 'Real transaction submitted! Check ChilizScan for verification.',
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

    } catch (error: any) {
      toast({
        title: 'Transaction Failed',
        description: error.message?.includes('rejected') 
          ? 'Transaction rejected in MetaMask' 
          : 'Blockchain transaction failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsClaimingReward(false);
    }
  };

  const getAccessBadgeColor = (level: string) => {
    switch (level) {
      case 'VIP': return 'purple';
      case 'Premium': return 'gold';
      case 'Standard': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <VStack spacing={8} align="stretch">
      <HStack justify="space-between" align="center">
        <Heading 
          bgGradient="linear(45deg, red.400, orange.400)"
          bgClip="text"
          fontSize="3xl"
        >
          Your Fan Dashboard
        </Heading>
        
        <Button
          colorScheme="blue"
          variant="outline"
          leftIcon={<FaSync />}
          size="sm"
        >
          Live Data
        </Button>
      </HStack>

      {contentCreated === 0 && (
        <Alert 
          status="info"
          bg="rgba(59, 130, 246, 0.1)"
          border="1px solid rgba(59, 130, 246, 0.3)"
          borderRadius="lg"
        >
          <AlertIcon color="blue.400" />
          <Box>
            <Text fontWeight="bold" color="white">📝 Create Content to Unlock Daily Rewards</Text>
            <Text fontSize="sm" color="gray.300">
              Go to "Create Content" tab and publish something to enable daily reward claims!
            </Text>
          </Box>
        </Alert>
      )}

      

      {/* Blockchain Integration Status */}
      <Card 
        bg="rgba(59, 130, 246, 0.1)"
        border="2px solid rgba(59, 130, 246, 0.3)"
        backdropFilter="blur(20px)"
      >
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Heading size="md" color="white">⛓️ Live Chiliz Blockchain Integration</Heading>
              <Badge colorScheme="green" fontSize="sm">CONNECTED</Badge>
            </HStack>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Box textAlign="center" p={3} bg="rgba(255,255,255,0.05)" borderRadius="lg">
                <Text fontSize="sm" color="gray.400">Network</Text>
                <Text color="green.400" fontWeight="bold">Chiliz Spicy</Text>
                <Text fontSize="xs" color="gray.500">Chain ID: 88882</Text>
              </Box>
              
              <Box textAlign="center" p={3} bg="rgba(255,255,255,0.05)" borderRadius="lg">
                <Text fontSize="sm" color="gray.400">CFG Token Contract</Text>
                <Code fontSize="xs" colorScheme="green">
                  {CONTRACT_ADDRESSES.FAN_TOKEN?.slice(0, 10)}...
                </Code>
                <Link
                  href={`https://testnet.chiliscan.com/address/${CONTRACT_ADDRESSES.FAN_TOKEN}`}
                  isExternal
                  fontSize="xs"
                  color="blue.400"
                >
                  View on ChilizScan <Icon as={FaExternalLinkAlt} />
                </Link>
              </Box>
              
              <Box textAlign="center" p={3} bg="rgba(255,255,255,0.05)" borderRadius="lg">
                <Text fontSize="sm" color="gray.400">Your Wallet</Text>
                <Code fontSize="xs" colorScheme="blue">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </Code>
                <Link
                  href={`https://testnet.chiliscan.com/address/${address}`}
                  isExternal
                  fontSize="xs"
                  color="blue.400"
                >
                  View Transactions <Icon as={FaExternalLinkAlt} />
                </Link>
              </Box>
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>

      {/* Token Balance & Stats */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Card 
          bg="rgba(255,255,255,0.05)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255,255,255,0.1)"
          _hover={{ transform: 'translateY(-5px)', boxShadow: '0 10px 25px rgba(230, 0, 0, 0.2)' }}
          transition="all 0.3s"
        >
          <CardBody>
            <Stat>
              <StatLabel color="gray.300">Demo Balance</StatLabel>
              <StatNumber color="white" fontSize="2xl">
                <Icon as={FaCoins} color="yellow.400" mr={2} />
                {balance.toLocaleString()} CFG
              </StatNumber>
              <StatHelpText color="gray.400">Updated via real transactions</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card 
          bg="rgba(255,255,255,0.05)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255,255,255,0.1)"
          _hover={{ transform: 'translateY(-5px)', boxShadow: '0 10px 25px rgba(230, 0, 0, 0.2)' }}
          transition="all 0.3s"
        >
          <CardBody>
            <Stat>
              <StatLabel color="gray.300">Access Level</StatLabel>
              <StatNumber>
                <Badge 
                  colorScheme={getAccessBadgeColor(accessProgress.currentLevel)}
                  fontSize="lg"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {getAccessLevel()}
                </Badge>
              </StatNumber>
              <StatHelpText color="gray.400">
                {accessProgress.nextLevel !== 'Maximum Level' 
                  ? `${Math.max(0, accessProgress.nextTarget - balance)} CFG to ${accessProgress.nextLevel}`
                  : 'Maximum level reached!'
                }
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card 
          bg="rgba(255,255,255,0.05)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255,255,255,0.1)"
          _hover={{ transform: 'translateY(-5px)', boxShadow: '0 10px 25px rgba(230, 0, 0, 0.2)' }}
          transition="all 0.3s"
        >
          <CardBody>
            <Stat>
              <StatLabel color="gray.300">Content Created</StatLabel>
              <StatNumber color="white">{contentCreated}</StatNumber>
              <StatHelpText color="gray.400">Real blockchain verified</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card 
          bg="rgba(255,255,255,0.05)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255,255,255,0.1)"
          _hover={{ transform: 'translateY(-5px)', boxShadow: '0 10px 25px rgba(230, 0, 0, 0.2)' }}
          transition="all 0.3s"
        >
          <CardBody>
            <Stat>
              <StatLabel color="gray.300">Total Earned</StatLabel>
              <StatNumber color="white">
                <Icon as={FaChartLine} color="green.400" mr={2} />
                {totalEarned.toLocaleString()} CFG
              </StatNumber>
              <StatHelpText color="gray.400">Real blockchain rewards</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Access Level Progress */}
      <Card 
        bg="rgba(255,255,255,0.05)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255,255,255,0.1)"
      >
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold" color="white">Access Level Progress</Text>
              <Badge colorScheme={getAccessBadgeColor(accessProgress.currentLevel)} fontSize="md">
                {getAccessLevel()}
              </Badge>
            </HStack>
            <Progress 
              value={accessProgress.progress} 
              colorScheme="red"
              size="lg" 
              borderRadius="md"
              bg="rgba(255,255,255,0.1)"
            />
            <Text fontSize="sm" color="gray.400" textAlign="center">
              {accessProgress.nextLevel === 'Maximum Level' 
                ? '🎉 You\'ve reached the maximum VIP level!' 
                : `${Math.max(0, accessProgress.nextTarget - balance)} more CFG needed for ${accessProgress.nextLevel} level`
              }
            </Text>
          </VStack>
        </CardBody>
      </Card>

      {/* Daily Reward */}
      <Card 
        bg="rgba(255,255,255,0.05)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255,255,255,0.1)"
      >
        <CardBody>
          <VStack spacing={4}>
            <Heading size="md" color="white">🎁 Daily Blockchain Reward</Heading>
            <Text textAlign="center" color="gray.300">
              Claim your daily reward for being an active fan! 
              Get 10 CFG tokens every 24 hours via <Text as="span" color="red.400" fontWeight="bold">REAL</Text> smart contract transaction.
            </Text>
            <Button
              colorScheme="red"
              size="lg"
              onClick={handleClaimDailyReward}
              isDisabled={contentCreated === 0}
              isLoading={isClaimingReward}
              loadingText="Processing Real Transaction..."
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.3s"
            >
              {contentCreated === 0 ? (
                <>📝 Create Content First</>
              ) : (
                <>🎁 Claim Daily Reward (10 CFG) - REAL TX</>
              )}
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Real + Demo Transaction History */}
      <Card 
        bg="rgba(255,255,255,0.05)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255,255,255,0.1)"
      >
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Heading size="md" color="white">📊 Blockchain Transaction History</Heading>
              <Badge colorScheme="blue" variant="outline">
                Real + Demo Transactions
              </Badge>
            </HStack>
            {transactions.length === 0 ? (
              <Text color="gray.400" textAlign="center" py={4}>
                No transactions yet. Create content or claim rewards to see real blockchain activity!
              </Text>
            ) : (
              <VStack spacing={3} align="stretch" maxH="300px" overflowY="auto">
                {transactions.slice(0, 10).map((tx, index) => (
                  <HStack key={index} justify="space-between" p={3} bg="rgba(255,255,255,0.02)" borderRadius="lg">
                    <VStack align="start" spacing={1}>
                      <HStack>
                        <Icon as={tx.isReal ? FaCheckCircle : FaClock} color={tx.isReal ? "green.400" : "yellow.400"} />
                        <Text color="white" fontWeight="bold">+{tx.amount} CFG</Text>
                        <Badge colorScheme={tx.isReal ? "green" : "yellow"} size="sm">
                          {tx.isReal ? "Real Blockchain" : "Demo Mode"}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" color="gray.400">{tx.reason}</Text>
                      {tx.isReal && (
                        <Text fontSize="xs" color="green.300">
                          ✅ Verified on Chiliz blockchain
                        </Text>
                      )}
                    </VStack>
                    <VStack align="end" spacing={1}>
                      <Link
                        href={`https://testnet.chiliscan.com/tx/${tx.hash}`}
                        isExternal
                        color="blue.400"
                        fontSize="xs"
                        fontFamily="mono"
                      >
                        {tx.hash.slice(0, 8)}... <Icon as={FaExternalLinkAlt} />
                      </Link>
                      <Text fontSize="xs" color="gray.500">
                        {tx.timestamp.toLocaleTimeString()}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            )}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default Dashboard;