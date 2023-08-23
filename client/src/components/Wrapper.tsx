import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

 interface IWraperProps {
  children: ReactNode
 }

 import React from 'react'
 
 const Wrapper = ({children} : IWraperProps ) => {
   return (
    <Box maxW = '400px' w= '100%' mt ={8} mx= 'auto' >
      {children}
    </Box>
   )
 }
 
 export default Wrapper
 