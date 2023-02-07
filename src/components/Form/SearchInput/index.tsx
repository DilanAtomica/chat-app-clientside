import React from 'react';
import "./index.css";
import {AiOutlineSearch} from "react-icons/ai";

type searchInputProps = {
    setInputValue: (inputValue: string) => void,
}

function SearchInput({setInputValue}: searchInputProps) {

    return (
            <div className="searchInputContainer">
                <AiOutlineSearch id="searchIcon" />
                <input required={true} onChange={(e) => setInputValue(e.target.value)}
                       placeholder={"example: Game of Thrones"} type="search" />
            </div>
    );
}

export default SearchInput;