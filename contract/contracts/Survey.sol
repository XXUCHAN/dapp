// SPDX-License-Identifier:MIT
pragma solidity ^0.8.28;

struct Question{
  string question;
  string[] options;
}
struct Answer{
  address respondent;
  uint8[] answers;
}
contract Survey{
  string public title;
  string public description;
  Question[] questions;
  Answer[] answers;

  constructor(string memory _title,string memory _description, Question[] memory _questions){
    title = _title;
    description = _description;
    for(uint i =0;i<_questions.length;i++){
      questions.push(
        Question({
          question:_questions[i].question,
          options:_questions[i].options
        })
      );

      // Question storage q = questions.push();
      // q.question = _questions[i].question;
      // q.options = _questions[i].options;
    }
  }
  function getQuestions() external view returns (Question[] memory){
    return questions;
  }
  function submitAnswer(Answer calldata _answer) external {
    require(_answer.answers.length == questions.length,"Mismatched answers len");

    answers.push(Answer({
      respondent:_answer.respondent,
      answers:_answer.answers
    }));
  }
  function getAnswers() external view returns (Answer[] memory){
    return answers;
  }
}