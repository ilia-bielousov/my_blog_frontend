export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer pb-3">
      <span className="block text-center text-lg">
        &#169; {year}
      </span>
    </footer>
  );
} 