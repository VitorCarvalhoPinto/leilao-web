import axios from "axios";
import { useState, useEffect } from "react";


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tipos")
      .then((res) => setUsers(res.data))
      .catch(err => {
       console.log(err.message);
  });
  }, []);

  return (
    <div className="App">
      {users.map((data) => (
        <p>{data.tipo}</p>
      ))}
    </div>
  );
}

export default App;
