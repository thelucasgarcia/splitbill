import { BillList } from '@/containers/bills/BillList';
import ScreenContainer from '@Components/ScreenContainer';
import { View } from 'react-native-ui-lib';

export default function Index() {
  return (
    <ScreenContainer>
      <View flex-1>
        <BillList />
      </View>
    </ScreenContainer>
  );

}
