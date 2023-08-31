import Card from "../Card/Card";
import './Content.css';

//в карточки возможно можно будет довабить дату создания
const data = [
  {
    id: 1,
    title: 'card 1',
    description: 'description card 1'
  },
  {
    id: 2,
    title: 'card 2',
    description: 'description card 2'
  },
  {
    id: 3,
    title: 'card 3',
    description: 'description card 3'
  },
  {
    id: 4,
    title: 'card 4',
    description: 'description card 4'
  },
  {
    id: 5,
    title: 'card 5',
    description: 'description card 5'
  },
  {
    id: 6,
    title: 'card 6',
    description: 'description card 6'
  }];

const CreateThecards = data.map(card => {
  return (
    <Card
      id={card.id}
      title={card.title}
      description={card.description}
    />
  )
});


export default function Content() {
  return (
    <main className="main__content">
      <div className="container">
        <div className="cards">
          {CreateThecards}
        </div>
      </div>
    </main>
  )
}