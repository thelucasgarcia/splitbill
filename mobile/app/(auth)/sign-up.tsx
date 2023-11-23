import { Formik } from 'formik';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SingUpScreen() {
  return (
    <View>
      <Text>Register</Text>
      <Formik
        initialValues={{
          name: "Lucas Garcia",
          email: "lucas2@gmail.com",
          username: "lucas2",
          password: "12"
      }}
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <TextInput
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              keyboardType='visible-password'
              secureTextEntry
            />
            <Button onPress={() => handleSubmit()} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
}
