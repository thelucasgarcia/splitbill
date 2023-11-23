import { useCreateBill } from '@/bff/queries/bill';
import ScreenContainer from '@Components/ScreenContainer';
import { useFormik } from 'formik';
import { Alert } from 'react-native';
import { Button, LoaderScreen, TextField, View } from 'react-native-ui-lib';

export default function Calculator() {
  const { mutateAsync } = useCreateBill()
  const { handleChange, handleBlur, handleSubmit, isSubmitting, isValid, values } = useFormik({
    initialValues: {
      name: '',
      description: '',
      tags: []
    },
    onSubmit: (values) => {
      return mutateAsync(values).catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
    }
  })
  return <LoaderScreen message={'Message goes here'}/>
  return (
    <ScreenContainer centerV>
      <View>
        <TextField
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          label='Nome da despesa'
          placeholder={'Barzinho'}
          enableErrors
          showCharCounter
        />
        <TextField
          onChangeText={handleChange('description')}
          onBlur={handleBlur('description')}
          value={values.description}
          label="Descrição"
          enableErrors
          showCharCounter
        />

        <Button
          marginT-20
          onPress={() => handleSubmit()}
          label={isSubmitting ? "Loading ..." : "Submit"}
          fullWidth
          disabled={!isValid}
        />

      </View>
    </ScreenContainer>
  );
}
