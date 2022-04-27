import React from "react";
import { useState, useEffect } from "react";
import { MetamaskContext } from "./hook/connectMetamask";
import { useContext } from "react";
import {
  Flex,
  Box,
  Image,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  Divider,
  Link,
  ListItem,
  OrderedList,
  Tag,
  TagLabel,
  TagRightIcon,
  HStack,
  Button,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { CheckIcon, LockIcon } from '@chakra-ui/icons';
import { StarIcon } from "@chakra-ui/icons";

const App = () => {
  const {
    connectWallet,
    defaultAccount,
    userBalance,
    usdcBalance,
    usdtBalance,
    usdcAllowance,
    usdtAllowance,
    tbioBalance,
    totalInvest,
    totalSupply,
    userInvestBalance,
    approve,
    deposit,
    permission,
    withdraw,
    registerToWhitelist,
    banFromWhiteList,
    approveTx,
    loading
  } = useContext(MetamaskContext);

  // const [userBalance, setUserbalance] = useState(null);

  const [currency, setCurrency] = useState('x');
  const toast = useToast();

  const spinnerStyle = {
    margin: "10px",
  };
  const [width, setWidth] = useState(0);
  const [value, setValue] = useState(10);
  const handleChangeValue = (value) => setValue(value);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    handleResize();
  });
  window.addEventListener("resize", handleResize);

  const handleCurrencyChange = (e) => {
    setCurrency(Number(e.target.value));
  };

  // smartContracts functions
  const handleClickBuy = async () => {
    toast({
      title: 'Achat de $TBIO',
      description: 'Veuillez approuver la transaction dans metamask',
      status: 'info',
      position: 'top',
      duration: 9000,
      isClosable: true,
    });
    try {
      let tmp = value * 10 ** 6;
      await deposit(tmp, currency);
    } catch (e) {
      toast({
        title: 'La transaction a échouée',
        status: 'error',
        position: 'top',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleClickApprove = async () => {
    toast({
      title: currency === 0 ? 'Approuver USDC': 'Approuver USDT',
      description: 'Veuillez approuver la transaction dans metamask',
      status: 'info',
      position: 'top',
      duration: 9000,
      isClosable: true,
    });
    try {
      let tmp = value * 10 ** 6;
      await approve(tmp, currency);
    } catch (e) {
      toast({
        title: 'La transaction a échouée',
        status: 'error',
        position: 'top',
        duration: 9000,
        isClosable: true,
      });
    }

  };

  const handleClickRegisterToWhitelist = async (address) => {
    console.log("handleClickRegisterToWhitelist");
    try {
      await registerToWhitelist(0x5Bf3d6D785Ce543AcA6c8A328Fb0EA41001c08F7);
    } catch (e) {
    }
  };


  return (
    <>

      <Box p="20px" bg="rgba(79,79,79,0.38)" borderRadius="30" m="20px">
        <Text fontSize={22} fontWeight="extrabold" color="#fff">
          Tu t'apprêtes à t'embarquer dans l'aventure TerraBioDAO !
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          En participant à cette prévente tu as l'occasion d'acquérir notre
          jeton au prix avantageux de 0,06$ (0,04$ si tu t'es inscrit à la
          whitelist avant le 31 Mars 2022).
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Assure-toi d'avoir correctement paramétré ton wallet Metamask{' '}
          <Link fontSize={16} fontWeight="bold" color="teal" href='https://terrabiodao.gitbook.io/terrabiodao/mainnet/presale' target='_blank'>comme indiqué dans ce tutoriel.</Link>
        </Text>
        <br />
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Les jetons acceptés lors de cette levée de fonds sont l'USDT, et l'USDC.
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Avant d'effectuer ta transaction assure-toi d'avoir suffisament d'ASTR pour payer les frais de transaction.
        </Text>
        <Text fontSize={16} fontWeight="medium" color="#fff">
          Tu n'en a pas ? Pas d'inquiétudes{' '}
          <Link fontSize={16} fontWeight="bold" color="teal" href="https://portal.astar.network/#/balance/wallet" target="_blank">tu trouveras ici un faucet pour en
            obtenir.
          </Link>
        </Text>
        <br />
        <Text fontSize={16} fontWeight="medium" color="#fff">
          En utilisant un wallet non-custodial, vous êtes le seul responsable de vos cryptomonnaies.
          Toute erreur peut entrainer la perte irrémédiable de votre argent.
        </Text>
        <Text fontSize={16} fontWeight="extrabold" color="#fff">
          Nous vous remercions par avance de votre soutien !
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyItems="start"
          w="100%"
        >
          <Image src='https://terrabiodao.org/wp-content/uploads/2022/03/iconelogo-terrabiodao.svg' boxSize='80px' mr='10px' />
          <Text fontSize={16} fontWeight="extrabold" color="#fff">
            La Team TerrabioDAO
          </Text>

        </Box>
      </Box>

      <Flex
        bg="rgba(79,79,79,0.38)"
        borderRadius="30"
        m="20px"
        p="20px"
        direction={width <= 1150 ? "column" : "row"}
        alignItems='center'
        grow='1'

      >

        <Flex direction='column' grow='1' w="100%" pr="7px">
          <Flex pt="10px" pb="10px">
            <Box
              display="flex"
              alignItems="center"
              borderRadius="30"
              bg="rgba(79, 79, 79, 0.38)"
              border="5px"
              borderColor="#fff"
              p="20px"
              justifyItems="center"
              w="100%"
            >
              <Image src='https://terrabiodao.org/wp-content/uploads/2022/03/metamask.svg' boxSize='30px' mr='10px' />
              <Text fontSize={16} fontWeight="medium" color="#fff" pr='10px'>
                Metamask :
              </Text>
              <Text fontSize={13} fontWeight="medium" color="#fff" pr='10px' overflow='hidden'>{defaultAccount}</Text>
            </Box>
          </Flex>

          <Flex pt="10px" pb="10px">
            <Box
              display="flex"
              alignItems="center"
              borderRadius="30"
              bg="rgba(79, 79, 79, 0.38)"
              border="5px"
              borderColor="#fff"
              p="20px"
              justifyItems="center"
              w="100%"
            >
              <Text fontSize={16} fontWeight="medium" color="#fff" pr='10px'>
                Balance USDC : {usdcBalance}
              </Text>
              <Image src='https://terrabiodao.org/logo/usd-coin-usdc-logo.svg' boxSize="30px" objectFit='cover' alt='USDC' />
            </Box>
          </Flex>

          <Flex pt="10px" pb="10px">
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              borderRadius="30"
              bg="rgba(79, 79, 79, 0.38)"
              border="5px"
              borderColor="#fff"
              p="20px"
              justifyItems="center"
              w="100%"
            >
              <Text fontSize={16} fontWeight="medium" color="#fff" pr='10px'>
                Balance USDT : {usdtBalance}
              </Text>
              <Image src='https://terrabiodao.org/logo/tether-usdt-logo.svg' boxSize="30px" objectFit='cover' alt='USDT' />
            </Box>
          </Flex>

          <Flex pt="10px" pb="10px" grow="1">
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              borderRadius="30"
              bg="rgba(79, 79, 79, 0.38)"
              border="5px"
              borderColor="#fff"
              p="20px"
              justifyItems="center"
              w="100%"
            >
              <Text fontSize={16} fontWeight="medium" color="#fff" mr='15px'>
                Balance $TBIO : {tbioBalance}
              </Text>
              <Image src='https://terrabiodao.org/logo/tbio-logo.svg' boxSize="30px" objectFit='cover' alt='TBIO' />
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column" grow='1' w="100%" p="20px" borderRadius="30" bg="rgba(79,79,79,0.38)">
          <Box
            display="flex"
            alignItems="center"
            justifyItems="start"
            w="100%"
          >
            <Text fontSize={22} fontWeight="extrabold" color="#fff">
              Achetez vos $TBIO
            </Text>
            <HStack spacing={4} ml='8px'>
              {['md'].map((size) => (
                <Tag size={size} key={size} variant='solid' colorScheme='green'>
                  <TagLabel>Disponible</TagLabel>
                  <TagRightIcon as={CheckIcon} />
                </Tag>
              ))}
            </HStack>
          </Box>
          <Link fontSize={16} fontWeight="bold" color="teal" href='https://terrabiodao.gitbook.io/terrabiodao/mainnet/presale' target='_blank'>
            Assurez-vous d'être sur le réseau Astar.
          </Link>

          <Button mt='10px' mb='10px' colorScheme='teal' variant='solid' onClick={connectWallet} >
            <Image src='https://terrabiodao.org/wp-content/uploads/2022/03/metamask.svg' boxSize='30px' mr='10px' /> connect Wallet
          </Button>

          <OrderedList>
            <ListItem fontSize={16} fontWeight="medium" color="#fff">Cliquez sur <i>"approuver la transaction"</i> <b>ET ATTENDEZ QUE LA TRANSACTION SOIT TERMINÉE</b></ListItem>
            <ListItem fontSize={16} fontWeight="medium" color="#fff">Une fois votre première opération effectuée, appuyez sur <i>"acheter du $TBIO"</i></ListItem>
            <ListItem fontSize={16} fontWeight="medium" color="#fff">Actualisez votre Metamask en cliquant à nouveau sur <i>"connect wallet"</i></ListItem>
          </OrderedList>

          <Flex mt="15px" alignItems="baseline" direction="column">
            <Text
              fontSize={16}
              fontWeight="medium"
              color="#fff"
              mr="20px"
              mb="10px"
            >
              Choisissez votre devise :
            </Text>
            <Select onChange={handleCurrencyChange} placeholder="Select a stable coin" color="#fff">
              <option value={0}>USDC</option>
              <option value={1}>USDT</option>
            </Select>
          </Flex>
          <Flex mt="10px" maxW="98%">
            <NumberInput
              maxW="100px"
              color="#fff"
              mr="2rem"
              value={value}
              min={10}
              max={(50000 - userInvestBalance)}
              onChange={
                handleChangeValue
              }

            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              flex="1"
              focusThumbOnChange={false}
              value={value}
              onChange={handleChangeValue}
              min={10}
              max={(50000 - userInvestBalance)}
              colorScheme="teal"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb
                fontSize="sm"
                fontWeight="bold"
                boxSize="32px"
                width="50px"
                children={value}
              />
            </Slider>
          </Flex>
          <Box
            direction="column"
            borderRadius="30"
            bg="rgba(79, 79, 79, 0.38)"
            border="5px"
            borderColor="#fff"
            mt="20px"
            p="20px"
            w="100%"
            //alignItems="center"
          >
         

            <Button onClick={!approveTx ? handleClickApprove : handleClickBuy } colorScheme='teal' variant='solid' w='100%'  disabled = {currency == "x"}>
            {!approveTx
              ? currency === 0
                ? "Approuver la transaction en $USDC"
                : currency === 1
                ? "Approuver la transaction en $USDT"
                : currency == "x" && "Choisissez un stable"
              : "Acheter du $TBIO"}
              {
                loading && <Spinner
                    style={spinnerStyle}
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='sm'
                  />
            }
            </Button>
        
          </Box>

        </Flex>
      </Flex>

      <Flex
        borderRadius="30"
        bg="rgba(79,79,79,0.38)"
        p="20px"
        m="20px"
        direction="column"
        grow="1"
        jutsify='start'
      >
        <Box
          display="flex"
          alignItems="center"
          justifyItems="start"
          w="100%"
        >
          <Text fontSize={22} fontWeight="extrabold" color="#fff">
            Calendrier de libération des $TBIO
          </Text>
          <HStack spacing={4} ml='8px'>
            {['md'].map((size) => (
              <Tag size={size} key={size} variant='solid' colorScheme='orange'>
                <TagLabel>Vesting</TagLabel>
                <TagRightIcon as={LockIcon} />
              </Tag>
            ))}
          </HStack>
        </Box>
        <Text fontSize={18} fontWeight="medium" color="#fff" mb='15px'>
          Retrouvez ci-dessous le calendrier de libération de vos jetons $TBIO. Une fois le jeton émis, vous recevrez automatiquement le montant indiqué à chaque échéance. Pour rappel, un vesting de 5 mois est appliqué pour garantir la croissance du $TBIO.
          Votre montant vous sera automatiquement crédité sur votre wallet Metamask. :)
        </Text>
        <br />
        <Text fontSize={18} fontWeight="medium" color="#fff" mb='15px'>
          Vos jetons libérés chaque mois, à compter de l'émission du jeton :
        </Text>

        <Flex
          alignItems="start"
          direction="column"
        >
          <Box borderRadius="30" bg="rgba(79,79,79,0.38)" p="20px" display='flex' direction='row' width="100%" alignItems='center'>
            <Text fontSize={16} fontWeight="medium" color="#fff">
              {(tbioBalance / 5)}
            </Text>
            <Image src='https://terrabiodao.org/logo/tbio-logo.svg' ml='5px' mr='8px' boxSize="30px" objectFit='cover' alt='TBIO' />
            <Text fontSize={15} fontWeight="medium" color="#fff">
              libérés à l'émission
            </Text>
          </Box>

          <Divider orientation='horizontal' mt='10px' mb='10px' />

          <Box borderRadius="30" bg="rgba(79,79,79,0.38)" p="20px" display='flex' direction='row' width="100%" alignItems='center'>
            <Text fontSize={16} fontWeight="medium" color="#fff">
              {(tbioBalance / 5)}
            </Text>
            <Image src='https://terrabiodao.org/logo/tbio-logo.svg' ml='5px' mr='8px' boxSize="30px" objectFit='cover' alt='TBIO' />
            <Text fontSize={15} fontWeight="medium" color="#fff">
              libérés au 2ème mois
            </Text>
          </Box>

          <Divider orientation='horizontal' mt='10px' mb='10px' />

          <Box borderRadius="30" bg="rgba(79,79,79,0.38)" p="20px" display='flex' direction='row' width="100%" alignItems='center'>
            <Text fontSize={16} fontWeight="medium" color="#fff">
              {(tbioBalance / 5)}
            </Text>
            <Image src='https://terrabiodao.org/logo/tbio-logo.svg' ml='5px' mr='8px' boxSize="30px" objectFit='cover' alt='TBIO' />
            <Text fontSize={15} fontWeight="medium" color="#fff">
              libérés au 3ème mois
            </Text>
          </Box>

          <Divider orientation='horizontal' mt='10px' mb='10px' />

          <Box borderRadius="30" bg="rgba(79,79,79,0.38)" p="20px" display='flex' direction='row' width="100%" alignItems='center'>
            <Text fontSize={16} fontWeight="medium" color="#fff">
              {(tbioBalance / 5)}
            </Text>
            <Image src='https://terrabiodao.org/logo/tbio-logo.svg' ml='5px' mr='8px' boxSize="30px" objectFit='cover' alt='TBIO' />
            <Text fontSize={15} fontWeight="medium" color="#fff">
              libérés au 4ème mois
            </Text>
          </Box>

          <Divider orientation='horizontal' mt='10px' mb='10px' />

          <Box borderRadius="30" bg="rgba(79,79,79,0.38)" p="20px" display='flex' direction='row' width="100%" alignItems='center'>
            <Text fontSize={16} fontWeight="medium" color="#fff">
              {(tbioBalance / 5)}
            </Text>
            <Image src='https://terrabiodao.org/logo/tbio-logo.svg' ml='5px' mr='8px' boxSize="30px" objectFit='cover' alt='TBIO' />
            <Text fontSize={15} fontWeight="medium" color="#fff">
              libérés au 5ème mois
            </Text>
          </Box>

        </Flex>
      </Flex>
    </>
  );
};

export default App;
