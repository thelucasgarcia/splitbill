'use client'

import { Box, Flex, Text } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

export default function Template({ children }: PropsWithChildren) {
  return (
    <Flex className='min-h-screen flex-col md:flex-row'>
      <Box className="w-full xl:w-8/12 bg-gradient-to-r from-primary-200 to-background flex items-center">
        <div className='p-10 xs:px-10 md:px-20 lg:px-60 flex flex-col'>
          <h1 className='text-3xl md:text-6xl font-bold mb-5'>Simple way to sharing bill with friends</h1>
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </Text>
        </div>
      </Box>
      <Box className='w-full xl:w-4/12 flex flex-col justify-center'>
        <div className='p-10 xl:p-14 w-full'>
          {children}
        </div>
      </Box>
    </Flex>
  )
}
