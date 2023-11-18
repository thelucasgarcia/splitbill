import { Link } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { usePosts, useUser } from '../bff/queries/user';
import { useUsers } from '../bff/queries/user';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
import { useEffect } from 'react';

const storage = new MMKV({ id: 'splitbill' })

export default function HomeScreen() {

  const fetchUsers = () => axios.get('https://jsonplaceholder.typicode.com/users')
  const { data, isSuccess, error } = useUsers({
    id: 'string'
  })

  useEffect(() => {
    if (data) {
      storage.set('user', JSON.stringify(data))
    }
  }, [data])

  useEffect(() => {
    const listener = storage.addOnValueChangedListener(( changeKey ) => {
      storage.getString('user')
        console.log(changeKey)
    })

    return () => listener.remove()
  }, [])
  return (
    <View style={{ flex: 1 }}>
      { isSuccess && (

        <FlatList
        data={data}
        style={{ padding: 10 }}
        renderItem={({item, index}) => <Text>[{index}] {item.id} - {item.name}</Text>}
        />
        ) }

<FlatList
        data={[{ email: 'lucas@gmai.com'}]}
        renderItem={({item}) => <Text>{item.email}</Text>}
        />
      <Text>Tab Two</Text>
      <Link href={'/(not-auth)/sign-in'}>Login screen</Link>
    </View>
  );
}
