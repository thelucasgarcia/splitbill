'use client'

import { useUrl } from '@/lib/hooks/useUrl';
import { Avatar, AvatarGroup, Button, ButtonGroup, Card, CardBody, CircularProgress, Input, Pagination, Select, SelectItem } from '@nextui-org/react';
import { Box, Flex, Grid, Heading } from '@radix-ui/themes';
import { debounce } from 'lodash';
import { useState } from 'react';
import { FaGripHorizontal, FaList, FaPlus, FaSearch } from 'react-icons/fa';

export default function Page() {
  const [page, setPage] = useState(1)
  const [direction, setDirection] = useState("3")
  const { replace, append, get, remove } = useUrl()

  const handleSearchDebouce = debounce((value: string) => {
    replace(value ? append(['search', value]) : remove(['search']))
  }, 500)
  
  const handleFilter = (value: string) => {
    replace(value ? append(['filter', value]) : remove(['filter']))
  }

  const handleCreate = () => {
    replace(append(['mode', 'create']))
  }

  const filter = [
    {
      label: "Recent",
      value: "recent"
    },
    {
      label: "Unfinished",
      value: "unfinished"
    },
    {
      label: "Completed",
      value: "completed"
    },
  ]

  return (
    <Box>
      {/* <Flex justify="between">
        <Heading size="8">Conta</Heading>
      </Flex> */}
      {/* <PlaceholderCard
        title='Nenhuma despesa criada ainda'
        description='Você pode criar uma despesa agora!'
        action={
          <Button color='primary' variant="shadow" startContent={<FaPlus />}>
            Criar nova despesa
          </Button>
        }
      /> */}
      <Flex className='mb-5' gap="5" direction="column">
        <Flex justify="between" align="center">
          <Heading size="8">Conta</Heading>
          <Flex gap="3" justify="end" grow="1">
            <Input
              type="search"
              defaultValue={get('search') || ''}
              placeholder="Pesquisar ..."
              className='max-w-xs'
              onChange={(e) => {
                handleSearchDebouce(e.currentTarget.value)
              }}
              endContent={<FaSearch className="text-foreground-400" />}
            />
            <Select 
              label={"Filter"}
              labelPlacement='outside-left'
              selectedKeys={[get('filter') || filter[0].value]}
              onChange={e => {
                const value = new Set([e.target.value])
                handleFilter(value.keys().next().value)
              }}
              className='w-2/12'
              required
            >
              {filter.map((el) => (
                <SelectItem key={el.value} value={el.value}>{el.label}</SelectItem>
              ))}
            </Select>
            <ButtonGroup variant='light'>
              <Button isIconOnly onClick={() => setDirection("2")}>
                <FaList />
              </Button>
              <Button isIconOnly onClick={() => setDirection("4")}>
                <FaGripHorizontal />
              </Button>
            </ButtonGroup>
            <Button color='primary' variant="shadow" startContent={<FaPlus />} onPress={handleCreate}>
              Criar nova despesa
            </Button>
          </Flex>
        </Flex>
        <Grid columns={direction} gap="4" >
          {Array.from({ length: 10 }).map((_, index) => {
            const percentage = Math.floor(Math.random() * 100)
            return (
            <Box key={index} grow="1" >
              <Card isHoverable isBlurred className='w-full' as={"a"} href={`/bill/${index}`}>
                <CardBody>
                  <Flex justify="between" gap="3">
                    <Box className='w-9/12'>
                      <p className='text-md truncate'>Mc Donalds</p>
                      <p className='text-small text-default-500 mb-2'>
                        {new Date().toLocaleDateString()}
                      </p>
                      <AvatarGroup className='justify-start' size='sm' color='primary'>
                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                      </AvatarGroup>
                    </Box>
                    <Flex direction={'column'} align="end" grow="1">
                      <p className='font-bold truncate'>R$ 22,00</p>
                      <CircularProgress
                        aria-label="Loading..."
                        size="lg"
                        className='mt-5'
                        value={percentage}
                        color="success"
                        valueLabel={<p className='leading-none text-center text-inherit'>{percentage}<small>%</small> <br /> Paid</p>}
                        showValueLabel={true}
                      />
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            </Box>
          )})}
        </Grid>
        <Flex justify="end">
          <Pagination total={3} showControls page={page} onChange={setPage} />
        </Flex>
      </Flex>
    </Box>
  )
}
