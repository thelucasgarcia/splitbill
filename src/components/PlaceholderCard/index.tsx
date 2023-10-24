
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Box, Grid, Heading, Text } from '@radix-ui/themes';
import React from 'react';

interface Props {
  title?: string
  description?: string
  image?: string
  showAction?: boolean
  action?: React.ReactElement
}
const PlaceholderCard: React.FC<Props> = ({ title, description, image, showAction = true, action }) => {
  return (
    <Card className='my-5'>
      <CardBody>
        <Grid columns="2" align="center">
          <Box className='m-10'>
            <Image
              alt="Placeholder card"
              className="object-cover"
              height={300}
              shadow="md"
              src={image || 'https://placehold.co/600x300'}
              fallbackSrc='https://placehold.co/600x300'
              width="100%"
            />
          </Box>
          <Box>
            <div className='mb-5'>
              <Heading>{title}</Heading>
              <Text>{description}</Text>
            </div>
            {showAction && action}
          </Box>
        </Grid>
      </CardBody>
    </Card>
  );
}

export default PlaceholderCard;