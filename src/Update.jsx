import { useNavigate } from "react-router-dom";
import "./update.css";
import { useState } from "react";

function Update() {
    const nav = useNavigate();
    const [name, setName] = useState("");

    const handle = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch("http://localhost:3000/proceed", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ oldname: name })
            });

            const result = await response.json(); // Get response from server

            if (result.success) {
                nav("/proceed"); // Navigate if oldname exists
            } else {
                alert("Error: Name does not exist! Please check and try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error! Please try again later.");
        }
    };

    return (<div>
        <h1>Update</h1>

        <div className="update-container">
        <h2>Enter Existing Name :</h2>

            <form onSubmit={handle} className="form">
                <input 
                    type="text" 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter The Name"
                    spellCheck="false"
                    value={name}
                    required
                />
                <button className="b2"type="submit">Proceed</button>
            </form>
        </div>
        <p>Note: Enter the existing name to update his/her record </p>
        </div>
    );
}

export default Update;
