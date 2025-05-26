import { Link } from 'react-router-dom';


function Home() {
  return <p>This is Home page</p>;
}

function Blog() {
  return <p>This is Blog page</p>;
}

function Contact() {
  return <p>This is Contact Us page</p>;
}

function Navbar() {
  return (
    <nav style={{ marginBottom: 20 }}>
      <Link to="/home" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/blog" style={{ marginRight: 10 }}>Blog</Link>
      <Link to="/contact">Contact Us</Link>
    </nav>
  );
}


export {Home,Blog, Contact,Navbar};
