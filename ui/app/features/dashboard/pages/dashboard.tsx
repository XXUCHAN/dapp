//[number]
// visitors, live surveys, archive

import TrendCard from '../components/trend-card';
import { TrendChart } from '../components/trend-chart';
import type { ChartData } from '../interface/interface';
const data: ChartData[] = [
  { date: '2025-10-01', data: 186 },
  { date: '2025-10-02', data: 192 },
  { date: '2025-10-03', data: 178 },
  { date: '2025-10-04', data: 201 },
  { date: '2025-10-05', data: 195 },
  { date: '2025-10-06', data: 188 },
  { date: '2025-10-07', data: 199 },
  { date: '2025-10-08', data: 205 },
  { date: '2025-10-09', data: 183 },
  { date: '2025-10-10', data: 190 },
  { date: '2025-10-11', data: 174 },
  { date: '2025-10-12', data: 208 },
  { date: '2025-10-13', data: 193 },
  { date: '2025-10-14', data: 200 },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-3 gap-5 mt-1 w-full">
        <TrendCard
          title={'Total Visitors'}
          value={'123,123,123'}
          trendValue={'200%'}
          trendMessage={'Trending up'}
          periodMessage={'6 months'}
        />
        <TrendCard
          title={'Live Surveys'}
          value={'123'}
          trendValue={'200%'}
          trendMessage={'Trending up'}
          periodMessage={'6 months'}
        />
        <TrendCard
          title={'Archived Surveys'}
          value={'123,123'}
          trendValue={'200%'}
          trendMessage={'Trending up'}
          periodMessage={'6 months'}
        />
      </div>
      <div className="grid grid-cols-2 mt-5 gap-5 w-full">
        <TrendChart
          title={'Live Surveys'}
          description={'Daily live survey count'}
          trendMessage={''}
          periodMessage={''}
          chartData={data}
        />
        <TrendChart
          title={'Archived Surveys'}
          description={'Daily Archived survey count'}
          trendMessage={''}
          periodMessage={''}
          chartData={data}
        />
      </div>
    </div>
  );
}
