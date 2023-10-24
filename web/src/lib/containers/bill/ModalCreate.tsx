'use client'

import FormGroup from '@/components/Form/FormGroup';
import { useUrl } from '@/lib/hooks/useUrl';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, useDisclosure } from '@nextui-org/react';
import { Grid } from '@radix-ui/themes';
import { debounce } from 'lodash';
import React, { useMemo, useState } from 'react';
import { Form, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { FaPlus, FaSearch } from 'react-icons/fa';

const ModalCreateBill: React.FC = () => {
  const { replace, remove } = useUrl()

  const formMethods = useForm({
    mode: 'all',
    progressive: true,
    values: {
      description: '',
      category: 'outros',
      date: "2011-09-29"
    }
  })

  const { isOpen, onOpenChange } = useDisclosure({
    defaultOpen: true,
    onClose() {
      replace(remove(['mode']))
    },
  })

  return (
    <FormProvider {...formMethods}>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        size='2xl'
      >
        <ModalContent>
          {(onClose) => (
            <Form onSubmit={({ data }) => console.log(data)}>
              <ModalHeader>
                Criar nova despesa
              </ModalHeader>
              <ModalBody>
                <FormGroup
                  name='description'
                  label="Descrição"
                  autoFocus
                  required
                />

                <FormGroup
                  name='category'
                  label="Categoria"
                  component={CategoryInput}
                  required
                />

                <FormGroup
                  name='date'
                  label="Data"
                  type="date"
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" type='submit' isDisabled={!formMethods.formState.isValid}>
                  Criar despesa
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </FormProvider>
  );
}

const CategoryInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(function CategoryInput(props, ref) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [search, setSearch] = useState("")
  const [selected, setSelected] = React.useState("outros");
  const [data, setData] = useState([
    "Alimentação",
    "Assinaturas e serviços",
    "Bares e restaurantes",
    "Casa",
    "Compras",
    "Cuidados pessoais",
    "Dívidas e empréstimos",
    "Educação",
    "Família e filhos",
    "Impostos e Taxas",
    "Investimentos",
    "Lazer e hobbies",
    "Mercado",
    "Outros",
    "Pets",
    "Presentes e doações",
    "Roupas",
    "Saúde",
    "Trabalho",
    "Transporte",
    "Viagem",
  ])
  const handleSearchDebouce = debounce(setSearch)
  const categories = useMemo(() => (data.filter(el => el.toLowerCase().includes(search))), [data, search])
  const { setValue } = useFormContext()
  return (
    <>
      <Input
        ref={ref}
        placeholder=' '
        isReadOnly
        onClick={onOpen}
        {...props}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size='xl' scrollBehavior="inside" backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Categoria</ModalHeader>
              <ModalBody>
                <Input
                  type="search"
                  inputMode='search'
                  placeholder="Pesquisar ..."
                  endContent={<FaSearch className="text-foreground-400" />}
                  value={search}
                  onChange={e => handleSearchDebouce(e.currentTarget.value)}
                />
                {categories.length ? (
                  <RadioGroup value={selected} onValueChange={setSelected}>
                    <Grid columns="2">
                      {categories.map(el => (
                        <Radio key={el} value={el.toLowerCase()}>{el}</Radio>
                      ))}
                    </Grid>
                  </RadioGroup>
                ) : search && (
                  <Button startContent={<FaPlus />} onClick={() => setData(state => ([...state, search]))}>Criar categoria {`"${search}"`}</Button>
                )}
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => {
                  setValue(props.name!, selected, {
                    shouldDirty: true,
                  })
                  onClose()
                }} isDisabled={!selected}>Salvar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
})

export default ModalCreateBill;