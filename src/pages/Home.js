import Card from "../components/Card";

const menuContent = [
  {
    name: 'programming',
    description: 'To zajęcie pomaga mi rozwijać myślenie logiczne i kreatywność, a także pozwala rozwiązywać ciekawe problemy.',
    image: 'programming-main.jpeg'
  },
  {
    name: 'projects',
    description: 'Tworzę różne urządzenia elektroniczne, co pomaga mi w praktyce uczyć się programowania.',
    image: 'arduino-main.png'
  },
  {
    name: 'modeling',
    description: 'Hobby rozwija myślenie przestrzenne, a także daje możliwość skupiać się na szczegółach.',
    image: 'modeling-main.png'
  },
]

const Home = () => {
  return (
    <main className="flex flex-col justify-center flex-1">
      <div className="flex content-center justify-center gap-8 max-md:gap-4 max-xl:flex-col max-xl:items-center px-24 py-3 max-md:px-3 flex-wrap">
        {menuContent.map((card, i) => {
          return (
            <Card
              key={i}
              description={card.description}
              choose={card.name}
              image={card.image}
            />
          )
        })}
      </div>
    </main>
  )
}

export default Home;