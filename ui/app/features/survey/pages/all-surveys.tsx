import SurveyCard from '../components/survey-card';
import { createPublicClient, http, getContract } from 'viem';
import { hardhat } from 'viem/chains';
import { SURVEY_FACTORY, SURVEY_FACTORY_ABI, SURVEY_ABI } from '../constant';
import { useEffect, useState } from 'react';
interface SurveyMeta {
  title: string;
  description: string;
  count: number;
  view: number | null;
  image: string | null;
  address: string;
}
export default function Allsurvey() {
  // const { data } = useReadContract({
  //   address: SURVEY_FACTORY,
  //   abi: SURVEY_FACTORY_ABI,
  //   functionName: 'getSurveys',
  //   args: [],
  // });
  const [surveys, setSurveys] = useState<SurveyMeta[]>([]);
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

  const offChainLoader = async (): Promise<SurveyMeta[]> => {
    return [
      {
        title: 'New Survey',
        description: 'override test',
        count: 10,
        view: 1500,
        image:
          'https://avatars.githubusercontent.com/u/141641630?s=400&u=b94b2dd8aa16729e8fd0ccce1567e2588cb9eb0d&v=4',
        address: '',
      },
    ];
  };

  useEffect(() => {
    const onChainData = async () => {
      const onchainSurveys = await onChainLoader();
      setSurveys(onchainSurveys);
    };
    onChainData();
    // const offChainData = async () => {
    //   const onchainSurveys = await offChainLoader();
    //   setSurveys(onchainSurveys);
    // };
    // offChainData();
  }, []);
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
          image={
            'https://avatars.githubusercontent.com/u/141641630?s=400&u=b94b2dd8aa16729e8fd0ccce1567e2588cb9eb0d&v=4'
          }
          address={s.address}
        />
      ))}
    </div>
  );
}
