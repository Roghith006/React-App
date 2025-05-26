
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import myList from './Array-list.jsx'
import MyButton from './update-me.jsx'
import { Blog, Contact, Home, Navbar } from './Home-page.jsx';





function App() {


  return (
    <>
      <h1>Arraylist</h1>
      {myList}
      <hr />
      <MyButton />
      <hr />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
            <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
