import { useEffect, useState } from "react";
import "./App.css";
import Error from "./Components/Error/Error";
import Loading from "./Components/Loading/Loading";
import StudentList from "./Components/StudentList/StudentList";

// TODO: Get this value from .env
const API_URL = "http://localhost:8888";

function App() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("<App /> useEffect() fired");
    async function fetchData() {
      try {
        //Remove any errors from previous attempts
        setError("");
        //Show the user we're loading
        setLoading(true);
        const response = await fetch(`${API_URL}/students`);
        const json = await response.json();
        console.log("<App /> useEffect() fetched data", json);
        const { data, error } = json;

        if (response.ok) {
          //handle success

          setStudentData(data);

          //Stop showing the user the loading UI..
          setLoading(false);
        }else {
          //handle error
          setError(error);
          setLoading(false);
        }
      } catch (err) {
        console.log(`<App/> useEffect error: ${err.message}`);
        setLoading(false);
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error error={error} />;
    } else {
      return <StudentList studentData={studentData} />;
    }
  };

  console.log(
    // `<App /> rendered! num students = ${studentData.length}`
    `<App / > rendered! error=${error} loading = ${loading} num students = ${studentData.length}`
  );
  return (
    <div className="App">
      {/* {if loading, render <Loading /> else if error, render <Error error={error} /> else render <StudentList/>} */}
      <Container center={Boolean(error || loading)} scroll={false}>
         {renderContent()}
      </Container>
     
      {/* { Loading ? <Loading /> : <StudentList studentData={studentData} />} */}
    </div>
  );
}

export default App;
