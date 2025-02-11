import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./update2.css";
function Proceed() {
    const nav = useNavigate();
    const [oldname, setOldName] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const[state,setState]=useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

   

    const handle = async (e) => {
        e.preventDefault();

        if (!name || !city || !address||!state) {
            setError("All fields are required!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3000/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, city, address ,state}),
            });

            const result = await response.json();

            if (result.success) {
                alert("Data updated successfully!");
                localStorage.removeItem("oldname");
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Update </h1>
            <div className="create1">
                <form onSubmit={handle} className="create2">
                    <h2>Update Information</h2>
                   
                    
                    <input 
                        type="text" 
                        placeholder="Enter New Name" 
                        onChange={(e) => setName(e.target.value)} 
                       spellCheck="false"
                        value={name} 
                        required 
                    />
                     <input 
                        type="text" 
                        placeholder="Enter New State" 
                        onChange={(e) => setState(e.target.value)} 
                        spellCheck="false"
                        value={state} 
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Enter New City" 
                        onChange={(e) => setCity(e.target.value)} 
                        spellCheck="false"
                        value={city} 
                        required 
                    />
                    
                    <input 
                        type="text" 
                        placeholder="Enter New Address " 
                        onChange={(e) => setAddress(e.target.value)} 
                        spellCheck="false"
                        value={address} 
                        required 
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Submit"}
                    </button>
            

                </form>
            </div>
            <button onClick ={()=>nav("/")}className="b3">Home</button> 
            </div>
        
    );
}

export default Proceed;
