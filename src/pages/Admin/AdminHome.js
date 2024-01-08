const AdminHome = () => {
  const getToken = localStorage.getItem('test'); // самая минимальная защита от входа в админ панель, ну а че делать

  console.log(getToken);

  return (
    <main className="flex-1 pl-72">
      <article className="p-5">
        {getToken ?
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus officia magni hic doloremque, soluta debitis iure necessitatibus accusantium, earum id esse voluptatum cumque minima! Vero est expedita eius a similique error atque molestias ipsam quos delectus illo quo rem, mollitia sequi sit in cum autem, perspiciatis quia consequatur ipsa ab. Animi dolores tempore cum magni aut quae molestias vitae commodi incidunt optio consequatur, nam distinctio culpa minima ipsa, modi natus fugit. Molestiae, molestias minima necessitatibus eos excepturi aliquam iure tempora laboriosam quisquam quidem a sit praesentium blanditiis distinctio, quo nisi corporis. Beatae earum natus aspernatur dicta sapiente ab alias placeat.
          </p>
          :
          <p>
            выаодвалвыоалвдаолдв
          </p>
        }
      </article>
    </main>
  );
};

export default AdminHome;