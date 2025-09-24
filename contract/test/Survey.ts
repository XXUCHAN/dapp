import {expect} from "chai"
import {network} from "hardhat"
interface Question{
  question:string;
  options:string[];
}
it("Survey init", async()=>{
  const {ethers} = await network.connect();
  const title ="설문조사";
  const description = "@@조사@@";
  const questions : Question[]= [
    {
      question:"questions",
      options:["옵션","11"],
    }
  ]
  const s = await ethers.deployContract("Survey",[ //0번 계좌가 default로 배포
    title,
    description,
    questions
  ]);
  const _title = await s.title();
  const _desc = await s.description();
  const _question = (await s.getQuestions()) as Question[];
  expect(_title).eq(title);
  expect(_desc).eq(description);
  expect(_question[0].options).deep.eq(questions[0].options)

  const signers = await ethers.getSigners();
  const respondent = signers[1];
  await s.connect(respondent);
  await s.submitAnswer({
    respondent:respondent.address,
    answers:[1],
  });
  
  console.log(await s.getAnswers());
}); 

