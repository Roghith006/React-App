
import ReactDOM from 'react-dom/client';

const Arraylist = ['React', 'Node.js', 'Express.js'];

const myList = Arraylist.map((item) => <li>{item}</li>)

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(myList);


export default myList;