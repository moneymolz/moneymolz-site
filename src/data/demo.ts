// SAMPLE DATA. not anmol's real numbers.
// feeds the demo molz life dashboard on /work-with-me. the widget shows a "sample data" chip
// whenever `isSample` is true, so keep that flag on anything made up.
// figures carried over from the old hand-built mockup: take-home 5,850, net spend 1,470 and its
// categories, holdings 139.5k, net worth 148.2k toward a 180k goal, emergency + travel 22.4k.
import type { MolzData } from '../components/MolzLifeWidget';

export const demoData: MolzData = {
  isSample: true,
  periods: [
    {
      id: 'monthly',
      label: 'monthly',
      income: 5850,
      spending: 1470,
      prevRate: 71.9,
      topSpend: [
        { label: 'nomz', value: 385.2 },
        { label: 'living', value: 342.1 },
        { label: 'hobbies', value: 298.45 },
        { label: 'house', value: 244.8 },
        { label: 'transportation', value: 96.3 },
      ],
      months: [
        { label: 'may', income: 5850, spending: 1910 },
        { label: 'jun', income: 5850, spending: 2240 },
        { label: 'jul', income: 5850, spending: 2680 },
        { label: 'aug', income: 5850, spending: 1720 },
        { label: 'sep', income: 5850, spending: 1645 },
        { label: 'oct', income: 5850, spending: 1470 },
      ],
    },
  ],
  allocation: [
    { key: 'retirement', label: 'retirement accounts', value: 81900, series: [70100, 72400, 74000, 76800, 79300, 81900] },
    { key: 'hsa', label: 'hsa', value: 5400, series: [4100, 4400, 4600, 4900, 5100, 5400] },
    { key: 'sgov', label: 'sgov', value: 25200, series: [21000, 22100, 22900, 23600, 24400, 25200] },
    { key: 'brokerage', label: 'brokerage', value: 19800, series: [17200, 17900, 18100, 18800, 19300, 19800] },
    { key: 'cash', label: 'cash', value: 7200, series: [6900, 7400, 6800, 7100, 7000, 7200] },
  ],
  goals: [
    { id: 'net-worth', label: '180k goal', current: 148200, target: 180000, due: 'dec 2027', note: 'on track' },
    { id: 'emergency', label: 'emergency fund', current: 15000, target: 18000, due: 'mar 2027', note: '3 weeks behind' },
    { id: 'wedding', label: 'wedding bucket', current: 9000, target: 20000, due: 'jun 2028', note: 'on track' },
  ],
  buckets: [
    { id: 'travel', label: 'solo travel', icon: 'plane', balance: 7400, target: 10000, topUp: 400, lastSpent: 'flights' },
    { id: 'gifts', label: 'gifts', icon: 'gift', balance: 650, target: 1000, topUp: 75, lastSpent: 'a birthday dinner' },
    { id: 'home', label: 'home', icon: 'home', balance: 2100, target: 5000, topUp: 150, lastSpent: 'a new lamp' },
    { id: 'fun', label: 'fun money', icon: 'sparkles', balance: 320, target: 400, topUp: 200, lastSpent: 'concert tickets' },
  ],
};

// SAMPLE DATA for the four-card peek on /work-with-me (DashboardPeek). not anmol's real numbers.
// goal figures match the 180k sample goal above.
import type { PeekData } from '../components/DashboardPeek';

export const peekData: PeekData = {
  isSample: true,
  today: {
    bills: [
      { name: 'renters insurance', amount: 14, due: 'fri' },
      { name: 'phone', amount: 45, due: 'sat' },
      { name: 'gym', amount: 89, due: 'mon' },
    ],
  },
  week: {
    cats: [
      { label: 'nomz', week: 92, typical: 110 },
      { label: 'living', week: 64, typical: 80 },
      { label: 'hobbies', week: 118, typical: 75 },
      { label: 'transportation', week: 21, typical: 24 },
    ],
    daysLeft: 3,
  },
  month: {
    label: 'october',
    contributions: 2410,
    market: 770,
    needs: 905,
    wants: 565,
  },
  goal: {
    label: '180k goal',
    current: 148200,
    target: 180000,
    due: 'dec 2027',
    monthsLeft: 14,
    addedPerMonth: 2540,
  },
};
