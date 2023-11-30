import { BillListSection } from '@/containers/bills/BillListSection';
import ScreenContent from '@Components/ScreenContent';

export default function BillsList() {
  return (
    <ScreenContent style={{ padding: 0 }}>
      <BillListSection />
    </ScreenContent>
  )
}