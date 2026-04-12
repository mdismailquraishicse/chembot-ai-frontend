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
        <div className="sidebar">
            <h2>ChemBot-AI</h2>
            <button className="logout-btn" type="button" onClick={logout}>LOGOUT</button>
        </div>
        <div className="main-content">
            <div className="card">
                <h3>Upload PDF</h3>
                <input type="file" accept="application/pdf" onChange={handleFileChange}/>
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
        <div className="card">
            <h3>Ask Question</h3>
            <div className="ask-box">
                <input type="text" name="query" placeholder="Write your query here..."
                value={query} onChange={(e)=> setQuery(e.target.value)}/>
                <button onClick={handleAsk}>ASK</button>
            </div>
        </div>
        <div className="card answer-card">
            <h3>Answer</h3>
            <p>{submittedText}</p>
        </div>
    </div>
    )
}

export default Home