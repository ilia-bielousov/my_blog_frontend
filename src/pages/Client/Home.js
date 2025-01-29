import PageForCards from "../PageForCards";

const Home = () => {
  return (
    <main className="flex flex-col justify-center flex-1">
      <div className="flex content-center justify-center gap-8 max-md:gap-4 max-xl:flex-col max-xl:items-center px-16 py-3 max-md:px-3 flex-wrap">
        <PageForCards />
      </div>
    </main>
  )
}

export default Home;