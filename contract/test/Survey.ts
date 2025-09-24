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
  // const s = await ethers.deployContract("Survey",[ //0번 계좌가 default로 배포
  //   title,
  //   description,
  //   questions
  // ]);
  // const _title = await s.title();
  // const _desc = await s.description();
  // const _question = (await s.getQuestions()) as Question[];
  // expect(_title).eq(title);
  // expect(_desc).eq(description);
  // expect(_question[0].options).deep.eq(questions[0].options)

  // const signers = await ethers.getSigners();
  // const respondent = signers[1];
  // await s.connect(respondent);
  // await s.submitAnswer({
  //   respondent:respondent.address,
  //   answers:[1],
  // });
  
  // console.log(await s.getAnswers());
  const factory = await ethers.deployContract("SurveyFactory",[
    ethers.parseEther("50"),
    ethers.parseEther("0.1")
  ]);
  const tx = await factory.createSurvey({
    title,
    description,
    targetNumber:100,
    questions
  },{
    value:ethers.parseEther("100")
  });
  const receipt = await tx.wait();

  let surveyAddress;
  receipt?.logs.forEach(log=>{
    const event = factory.interface.parseLog(log);
    if(event?.name == "SurveyCreated"){
      surveyAddress = event.args[0];
    }
  })

  // const surveys = await factory.getSurveys();
  const surveyC = await ethers.getContractFactory("Survey");
  const signers = await ethers.getSigners();
  const respondent = signers[0];
  const survey = surveyC.attach(surveyAddress!);
  await survey.connect(respondent);
  console.log(ethers.formatEther(await ethers.provider.getBalance(respondent)));
  const submitTx = await survey.submitAnswer({
    respondent,
    answers:[1]
  });
  await submitTx.wait();
  await ethers.provider.getBalance(respondent);
  console.log(ethers.formatEther(await ethers.provider.getBalance(respondent)));
}); 

