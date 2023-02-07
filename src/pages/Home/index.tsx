import React, {useState} from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import {AiOutlineSearch} from "react-icons/ai";
import Button from "../../components/Form/Button";
import {useNavigate} from "react-router-dom";

function HomePage() {

    const [inputValue, setInputValue] = useState("");

    const navigate = useNavigate();

    const onSubmit = () => {
        navigate("/search/" + inputValue);
    }

    return (
        <main onSubmit={onSubmit} className="homePage">
            <Navbar />
            <form>
                <h1>Search for your favorite shows</h1>
                <div className="searchInputContainer">
                    <AiOutlineSearch id="searchIcon" />
                    <input onChange={(e) => setInputValue(e.target.value)}
                           placeholder={"example: Game of Thrones"} type="search" />
                </div>
                <Button width={"100%"} buttonType={"submit"} disabled={false}>Search</Button>
            </form>
        </main>
    );
}

export default HomePage;