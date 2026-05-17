import "./Home.css"
import { useState } from "react"
import { uploadPDF, askQuestion } from "../services/api"

function Home(){
    const [query, setQuery] = useState("");
    const [file, setFile] = useState();
    const [submittedText, setSubmittedText] = useState("Your answer will come here...");

    const handleFileChange = (e)=>{
        setFile(e.target.files[0])
    };

    function logout(){
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    function quiz(){
        window.location.href = "/quiz";
    }

    const handleUpload = async () =>{
        if (!file){
            alert("please select a file first");
            return;
        }
        try {
            const data = await uploadPDF(file);
            console.log(data);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    const handleAsk = async () => {

        try {
            const data = await askQuestion(query)
            setSubmittedText(data.answer)
            setQuery("")
        } catch (error) {
            console.error("Error:", error)
            setSubmittedText("")
        }
    };

    return (
  <div className="home-page">

    <div className="top-bar">
      <h2>ChemBot-AI</h2>

      <div className="top-buttons">
        <button onClick={quiz}>Quiz</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>

    <div className="main-card">

      <h3>Ask Question</h3>

      <div className="ask-box">
        <input
          type="text"
          name="query"
          placeholder="Write your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={handleAsk}>ASK</button>
      </div>

      <div className="answer-box">
        <h3>Answer</h3>
        <p>{submittedText}</p>
      </div>

    </div>

  </div>
)
}

export default Home