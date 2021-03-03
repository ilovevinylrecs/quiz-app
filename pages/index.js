import Image from 'next/image';

export const getStaticProps = async () => {
  const res = await fetch('http://jservice.io/api/random');
  const data = await res.json();

  return {
    props: { questions: data }
  }
};

const Trivia = ({ questions }) => {
  return (
    <div className="page">
      <div className="title">
        jeopardy!
      </div>
      {questions.map(trivia => (
        <div className="container">
          <div className="value">value: ${trivia.value}</div>
          <div className="question">
            cat:<br />
            {trivia.category.title}<br />
            q:<br />
            {trivia.question}
          </div>
          <div className="answer">a: {trivia.answer}</div>
          <div className="date">airdate: {trivia.airdate.substring(0, 10)}</div>
        </div>
      ))}
      <Image src="/alex-trebek.png" alt="Alex Trebek" width="885" height="590" />
      <div className="quote">"We’re trying to build a kinder and gentler society, and if we all pitch in just a little bit, we’re going to get there. See you next time.”</div>

      <style jsx>{`
      .page {
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,400;1,400&display=swap');
        font-family: 'Josefin Sans', sans-serif;
        background: white;
        padding: .5rem;
        margin: .5rem;
      }
      .title {
        font-size: 3rem;
        text-align: center;
        margin: .5rem;
        }
      .value {
        font-size: 1.5rem;
        margin: 1rem;
        text-align: center;
      }
      .question {
        font-size: 2.5rem;
        line-height: 4rem;
        margin: 1rem;
      }
      .answer {
        font-size: 1rem;
        margin: 7rem .5rem .5rem .5rem;
      }
      .date {
        font-size: 1rem;
        margin: .5rem;
      }
      .container {
        background: tan;
        padding: .5rem .5rem;
        min-height: 300px;
      }
      .image {
        image-align: center;
        margin: .5rem;
      }
      .quote {
        font-size: 1rem;
        margin: .5rem;
      }
      `}</style>
    </div>
  );
}

export default Trivia;