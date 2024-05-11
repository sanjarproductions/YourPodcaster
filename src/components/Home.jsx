import { useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/', {
        params: {
          url: url
        },
        headers: {
          'X-RapidAPI-Key': 'b89d170c4bmsh19d6fdb30f32c9dp1ea851jsn9dd15567b775',
          'X-RapidAPI-Host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
      });
    //   console.log(response.data)

      setDownloadLink(response.data.dlink);
      setErrorMessage("");
    } catch (error) {
      if (error.response) {
        setErrorMessage("Error: " + error.response.data.message);
      } else if (error.request) {
        setErrorMessage("Error: No response from the server. Please try again later.");
      } else {
        setErrorMessage("Error: " + error.message);
      }
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="app-content">
          <div className="app-top">
            <form onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Enter the URL here" value={url} onChange={(e) => setUrl(e.target.value)} />
              <div className="btn-form">
                <button type="submit" className="btn-1">Download</button>
              </div>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
          <div className="app-bottom">
            {downloadLink && <a href={downloadLink} download>Click here to download</a>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
