import SurveyCard from '../components/survey-card';
import { createPublicClient, http, getContract } from 'viem';
import { hardhat } from 'viem/chains';
import { SURVEY_FACTORY, SURVEY_FACTORY_ABI, SURVEY_ABI } from '../constant';
import { useEffect, useState } from 'react';
import type { Route } from './+types/all-surveys';
import { supabase } from '~/postgres/supaclient';
interface SurveyMeta {
  title: string;
  description: string;
  count: number;
  view: number | null;
  image: string | null;
  address: string;
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { data, error } = await supabase.from('all_survey_overview').select('*');
  if (!error) {
    return data.map((s) => {
      return {
        title: s.title!,
        description: s.description!,
        view: s.view,
        count: s.count!,
        image: s.image,
        address: s.id!,
      };
    });
  } else {
    return [];
  }
};
export default function Allsurvey({ loaderData }: Route.ComponentProps) {
  // const { data } = useReadContract({
  //   address: SURVEY_FACTORY,
  //   abi: SURVEY_FACTORY_ABI,
  //   functionName: 'getSurveys',
  //   args: [],
  // });
  const [surveys, setSurveys] = useState<SurveyMeta[]>(loaderData);
  const onChainLoader = async () => {
    const client = createPublicClient({
      chain: hardhat,
      transport: http(),
    });
    const surveyFactoryContract = getContract({
      address: SURVEY_FACTORY,
      abi: SURVEY_FACTORY_ABI,
      client,
    });
    const surveys = await surveyFactoryContract.read.getSurveys();
    const surveyMetaData = await Promise.all(
      surveys.map(async (surveyAddress) => {
        const surveyContract = getContract({
          address: surveyAddress,
          abi: SURVEY_ABI,
          client,
        });
        const title = await surveyContract.read.title();
        const description = await surveyContract.read.description();
        const answers = await surveyContract.read.getAnswers();
        return {
          title,
          description,
          count: answers.length,
          view: null,
          image: null,
          address: surveyAddress,
        };
      })
    );
    return surveyMetaData;
  };

  // useEffect(() => {
  //   const onChainData = async () => {
  //     const onchainSurveys = await onChainLoader();
  //     await new Promise((resolve) => setTimeout(resolve, 3000));
  //     setSurveys(onchainSurveys);
  //   };
  //   onChainData();
  // }, []);
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-extrabold">Live Surveys</h1>
        <span className="font-light">Join the surveys</span>
      </div>
      {surveys.map((s) => (
        <SurveyCard
          title={s.title}
          description={s.description}
          view={150}
          count={s.count}
          image={s.image!}
          address={s.address}
        />
      ))}
    </div>
  );
}
