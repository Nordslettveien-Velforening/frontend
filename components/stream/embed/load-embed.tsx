import { useEffect, useState } from "react";

export const LoadEmbed = ({url, children}) => {

    const [data, setData] = useState("");

    const fetchEmbed = (url) => {
        const param = encodeURIComponent(url);
        const options = {
            headers: {
                "x-api-key": "33a3c39f-7cb3-46c3-b73d-dc6cec1ffe24"
            }
        };
        return fetch(`https://api.embed.rocks/api/?url=${param}`, options).then(response => response.json())
    }

    useEffect(() => {
        fetchEmbed(url)
            .then(content => setData(content))
            .catch(e => console.log("Retrieving embed failed", e))
    },[url])

    return children(data)
}

export default LoadEmbed

