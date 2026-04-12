import axios from "axios";

const API_BASE = "http://localhost:8000";

// ✅ Login
export const login = async (email, password) => {
    const res = await axios.post(
        `${API_BASE}/login`,
        { email:email, password: password },
        { headers:{"Content-Type": "application/json"}, timeout: 600000 }
    )
    localStorage.setItem("token", res.data);
    return res.data;
};

// ✅ Register
export const registerUser = (fullname, email, password) => {
    const res = axios.post(
        `${API_BASE}/register`,
        { fullname: fullname, email:email, password: password },
        { headers:{"Content-Type": "application/json"}, timeout: 600000 }
    )

    return res.data;
};

// ✅ Upload PDF
export const uploadPDF = async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("file", file);

    const res = await axios.post(
        `${API_BASE}/upload-pdf`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
};

// ✅ Ask question
export const askQuestion = async (query) => {
    const token = localStorage.getItem("token");

    const res = await axios.post(
        `${API_BASE}/ask`,
        { question: query },
        {
            headers:{"Content-Type": "application/json",
                Authorization: `Bearer ${token}`},
        timeout: 60000
    }
    )

    return res.data;
};