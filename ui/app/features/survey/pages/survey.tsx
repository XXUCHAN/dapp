import { SendIcon, User2Icon } from 'lucide-react';
import { Form } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '~/components/ui/card';
import MessageBubble from '../components/message-bubble';
import { Input } from '~/components/ui/input';
import type { Route } from './+types/survey';
import { SURVEY_ABI } from '../constant';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useEffect, useState } from 'react';

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  //answer = [2,1,0]
  const answers = Object.fromEntries(formData);
  console.log(Object.values(answers).map((str) => Number(str)));
};

interface questions {
  question: string;
  options: string[];
}

const questions: questions[] = [
  {
    question: '당신이 가장 선호하는 개발 분야는 무엇인가요?',
    options: ['프론트엔드', '백엔드', '풀스택', '데브옵스', '블록체인'],
  },
  {
    question: '코드를 작성할 때 가장 중요하다고 생각하는 요소는?',
    options: ['가독성', '성능', '확장성', '테스트 가능성', '개발 속도'],
  },
  {
    question: '가장 자주 사용하는 언어는 무엇인가요?',
    options: ['JavaScript', 'Python', 'Java', 'C', 'Go', 'Rust'],
  },
  {
    question: '작업할 때 선호하는 환경은?',
    options: ['다크모드', '라이트모드', '자동', '상황에 따라 다름'],
  },
  {
    question: '팀 프로젝트에서 맡고 싶은 역할은?',
    options: ['리더', '코어 개발자', '리뷰어', '테스터', '문서 작성자'],
  },
  {
    question: '개발 공부를 가장 많이 하는 시간대는?',
    options: ['새벽', '오전', '오후', '저녁', '밤'],
  },
  {
    question: '선호하는 버전 관리 전략은?',
    options: ['Git Flow', 'Trunk Based', 'GitHub Flow', '브랜치 전략 없음'],
  },
  {
    question: '가장 많이 사용하는 프레임워크는?',
    options: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Express'],
  },
  {
    question: '프로젝트를 시작할 때 가장 먼저 하는 일은?',
    options: ['아키텍처 설계', 'UI 스케치', '기능 목록 작성', 'DB 모델링', '일단 바로 코딩'],
  },
  {
    question: '코드 리뷰에 대한 생각은?',
    options: ['필수', '있으면 좋음', '귀찮음', '별로 필요 없음', '팀 스타일에 따라 다름'],
  },
];

export default function Survey({ params }: Route.ComponentProps) {
  const { data: questions } = useReadContract({
    address: params.surveyId as `0x{string}`,
    functionName: 'getQuestions',
    abi: SURVEY_ABI,
    args: [],
  });
  const { data: title } = useReadContract({
    address: params.surveyId as `0x{string}`,
    functionName: 'title',
    abi: SURVEY_ABI,
    args: [],
  });
  const { data: description } = useReadContract({
    address: params.surveyId as `0x{string}`,
    functionName: 'description',
    abi: SURVEY_ABI,
    args: [],
  });
  const { data: target } = useReadContract({
    address: params.surveyId as `0x{string}`,
    functionName: 'targetNumber',
    abi: SURVEY_ABI,
    args: [],
  });
  const { data: answers } = useReadContract({
    address: params.surveyId as `0x{string}`,
    functionName: 'getAnswers',
    abi: SURVEY_ABI,
    args: [],
  });
  const [counts, setCounts] = useState<Number[][]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const { address } = useAccount();
  const countAnswers = () => {
    if (!target) return;
    return questions?.map((q, i) => {
      const count = Array.from({ length: q.options.length }).fill(0) as number[];
      answers?.map((a) => count[a.answers[i]]++);
      return count.map((n) => (n / Number(target)) * 100);
    });
  };

  useEffect(() => {
    if (!answers || !questions || !address) return;
    for (const answer of answers) {
      if (answer.respondent === address) {
        setCounts(countAnswers() || []);
        setIsAnswered(true);
        return;
      }
    }
  }, [answers, address, target]);

  const { writeContract } = useWriteContract();
  const submitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    if (!address) {
      alert('please connect before submit');
      return;
    }
    const formData = new FormData(e.currentTarget);
    const answers: number[] = [];
    for (const value of formData.values()) {
      answers.push(Number(answers));
    }

    writeContract({
      address: params.surveyId as `0x{string}`,
      functionName: 'submitAnswer',
      abi: SURVEY_ABI,
      args: [
        {
          respondent: address,
          answers,
        },
      ],
    });
  };
  return (
    <div className="grid grid-cols-3 w-screen gap-3">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="font-extrabold text-3xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {isAnswered ? (
          <CardContent className="overflow-y-auto h-[70vh]">
            <h1 className="font-semibold text-xl pb-4">Survey Progress</h1>
            <div className="grid grid-cols-2 gap-5 ">
              {questions?.map((q, i) => (
                <div className="flex flex-col">
                  <h1 className="font-bold">{q.question}</h1>
                  <div className="flex flex-col gap-1 pl-2 ">
                    {q.options.map((o, j) => (
                      <div className="flex flex-row justify-center items-center relative">
                        <div className="left-2 absolute text-xs font-semibold">{o}</div>
                        <div className="w-full bg-gray-200 h-5 rounded-full">
                          <div
                            className="bg-purple-400 w-14 h-5 rounded-full overflow-hidden"
                            style={{ width: `${counts[i][j]}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <Form onSubmit={submitAnswer} className="grid grid-cols-2">
              {questions?.map((q, i) => (
                <div className="flex flex-col">
                  <span className="mt-5 mb-1">{q.question}</span>
                  {q.options.map((o, j) => (
                    <label className="flex items-center gap-1">
                      <Input
                        className="hidden peer"
                        type="radio"
                        name={i.toString()}
                        value={j.toString()}
                      ></Input>
                      <span className="w-4 h-4 rounded-full border-2 peer-checked:bg-primary"></span>
                      <span className="font-semibold">{o}</span>
                    </label>
                  ))}
                </div>
              ))}
              <Button className="w-full mt-3" type="submit">
                Submit
              </Button>
            </Form>
          </CardContent>
        )}
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 overflow-y-auto h-[70vh]">
          {Array.from({ length: 20 }).map((_, i) => (
            <MessageBubble sender={i % 2 == 0} />
          ))}
        </CardContent>
        <CardFooter className="w-full">
          <Form className="flex flex-row items-center relative w-full">
            <input
              type="text"
              placeholder="type a messsage.."
              className="border-1 w-full h-8 rounded-2xl px-2 text-xs "
            ></input>
            <Button className="flex flex-row justify-center items-center w-6 h-5 absolute right-2">
              <SendIcon />
            </Button>
          </Form>
        </CardFooter>
      </Card>
    </div>
  );
}
