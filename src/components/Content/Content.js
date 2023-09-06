import Card from "../Card/Card";
import './Content.css';

const Content = ({ data, name }) => {
  const CreateThecards = data.map(card => {
    return (
      <Card
        key={card.id}
        id={card.id}
        title={card.title}
        description={card.description}
        name={name}
      />
    )
  });

  return (
    <main className='main__content'>
      <div className="container">
        <div className='cards'>
          {CreateThecards}
        </div>
      </div>
    </main>
  )
}

export default Content;