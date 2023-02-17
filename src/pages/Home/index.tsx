import React, {useState} from 'react';
import "./index.css";
import Navbar from "../../components/Navbar";
import Button from "../../components/Form/Button";
import {useNavigate} from "react-router-dom";
import SearchInput from "../../components/Form/SearchInput";
import {useUserDetails} from "../../hooks/api";

function HomePage() {

    const [inputValue, setInputValue] = useState("");

    const {data} = useUserDetails();

    const navigate = useNavigate();

    const onSubmit = () => {
        navigate("/search/" + inputValue + "/" + 1);
    }

    return (
        <main onSubmit={onSubmit} className="homePage">
            <Navbar />
            <h1 role="lol">{data?.username}</h1>
            <form onSubmit={onSubmit}>
                <h1>Search for your favorite shows</h1>
                <SearchInput setInputValue={setInputValue} />
                <Button width={"100%"} buttonType={"submit"} disabled={false}>Search</Button>
            </form>
        </main>
    );
}

export default HomePage;