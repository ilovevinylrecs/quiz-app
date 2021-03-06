import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SolidLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 3
    }}
  />
);

const Button = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,400;1,400&display=swap');
  font-family: 'Josefin Sans', sans-serif;
  background: tan;
  font-size: 2.5rem;
  margin: 2rem .5rem 3rem 1rem;
  padding: 1rem;
  color: black;
  text-align: center;
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function Trivia() {
  const [triviaData, setTriviaData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch('http://jservice.io/api/random')
      setTriviaData(await data.json())
    }
    fetchData();
  }, [])

  function toggle() {
    setTriviaData(!triviaData);
  }

  return (

    <div className="page">
      <div className="title">jeopardy!</div>
      <SolidLine color="black" />
      {triviaData.map((data) => (
        <div className="container" key={data.id}>
          <div className="value"> value: ${data.value}</div>
          <div className="category">category:<br />{data.category.title}</div>
          <div className="answer">answer:<br />{data.question}</div>

          <Button onClick={toggle}>What/Who is ...?</Button>
          {/* will toggle between question revealed and hidden when button is clicked */}
          <div style={{
            display: triviaData ? "block" : "none"
          }}>
            <div className="question">question:<br />{data.answer}</div>
            <div className="date">airdate: {data.airdate.substring(0, 10)}</div>
          </div>
        </div>
      ))}
      <Image src="/alex-trebek-b-w.png" alt="Alex Trebek" width="885" height="590" />
      <SolidLine color="black" />
      <div className="quote">"We’re trying to build a kinder and gentler society, and if we all pitch in just a little bit, we’re going to get there.”</div>

      <style jsx>{`
      .page {
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,400;1,400&display=swap');
        font-family: 'Josefin Sans', sans-serif;
        background: white;
        padding: 1rem;
        margin: 1rem;
        max-width: 885px;
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
      .category {
        font-size: 2.5rem;
        margin: 2rem 1rem 1rem 1rem;
      }
      .answer {
        font-size: 2.5rem;
        line-height: 3rem;
        margin: 1rem 1rem 1rem 1rem;
      }
      .question {
        font-size: 2.5rem;
        margin: 1.5rem .5rem .5rem 1rem;
      }
      .date {
        font-size: 1.5rem;
        margin: 1rem;
      }
      .container {
        background: tan;
        padding: .5rem;
        min-height: 300px;
        max-width: 885px;
      }
      .quote {
        font-size: 1rem;
        background: tan;
        padding: 1rem;
      }
      `}</style>
    </div>
  );
}