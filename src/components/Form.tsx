import React from "react"

export interface FormProps {
    getRec: () => void;
}

//regex to remove the string in the begging
const Form = ({getRec}: FormProps) => (
    <form onSubmit={getRec}>
        <input type="text" name="song" placeholder="Enter Spotify URI code..."/>
        <button>Get New Playlist</button>
    </form>
)

export default Form
