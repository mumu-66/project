import _ from 'lodash';
import he from 'he';
import QuizFetcher from '../data_fetchers/QuizFetcher';

class Quiz{
  constructor({question, correctAnswer, incorrectAnswers}) {
    this._question = question;
    this._correctAnswer = correctAnswer;
    this._incorrectAnswers = [...incorrectAnswers];
  }

  get question() {
    return this._question;
  }
  get correctAnswer(){
    return this._correctAnswer;
  }

  shuffleAnswers() {
    return _.shuffle([
      this._correctAnswer,
      ...this._incorrectAnswers
    ]);
  }

  judgeCorrectAnswer(answer) {
    return answer === this._correctAnswer;
  }

  static async fetchAndCreateQuizzes() {
    const quizDataList = await QuizFetcher.fetch();

    return quizDataList.results.map(result => {
      return {
        question: he.decode(result.question),
        correctAnswer: he.decode(result.correct_answer),
        incorrectAnswer: result.incorrect_answers.map(str => he.decode(str))
      };
    })
    .map(quizData => {
      return new Quiz(quizData);
    })
  }
}



export default Quiz;
