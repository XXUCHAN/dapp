//[number]
// visitors, live surveys, archive
import { DateTime } from 'luxon';
import { supabase } from '~/postgres/supaclient';
import TrendCard from '../components/trend-card';
import { TrendChart } from '../components/trend-chart';
import type { ChartData } from '../interface/interface';
import type { Route } from './+types/dashboard';
import { getNumberData } from '../query';
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
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { data, error } = await supabase.rpc('increment_daily_visitor', {
    day: DateTime.now().startOf('day').toISO({ includeOffset: false }),
  });
  const thisWeekStart = DateTime.now().startOf('week').toISO({ includeOffset: false });
  const thisWeekend = DateTime.now().toISO({ includeOffset: false });
  const lastWeekStart = DateTime.now()
    .startOf('week')
    .minus({ week: 2 })
    .toISO({ includeOffset: false });
  const { data: liveSurveyCount } = await supabase
    .from('daily_live_survey')
    .select('count, created_at')
    .order('created_at');

  const formedLivedSurveyCount = (liveSurveyCount ?? []).map(({ created_at, count }) => ({
    date: created_at ?? '',
    data: count ?? 0,
  }));

  const numberCard = await getNumberData(lastWeekStart, thisWeekStart, thisWeekend);
  return {
    ...numberCard,
    formedLivedSurveyCount,
  };
};
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-3 gap-5 mt-1 w-full">
        <TrendCard
          title={'Total Visitors'}
          value={loaderData.value}
          trendValue={loaderData.trendValue}
          trendMessage={loaderData.upAndDown ? 'Trending Up' : 'Trending Down'}
          periodMessage={'last 7 days'}
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
          chartData={loaderData.formedLivedSurveyCount}
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
