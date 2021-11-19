import React from "react";
import Nav from "../components/Nav";

function About() {
  return (
    <React.Fragment>
      <Nav />
      <div className="flex flex-col max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold mb-2">About</h1>

        <p>
          In dit project moet je muziek van spotify een rating geven maar ook
          een opmerking achterlaten op een tijdstip in de track zoals
          soundcloud. Gebruikers moeten een via spotify account hebben, daarmee
          wordt ook ingelogd. Een rating bestaat uit 5 sterren 1 ster is heel
          slecht en 5 is super goed. Iedere gebruiker kan ook een opmerking
          achterlaten op een gedeelte van een track.
        </p>
        <p>
          De github url:{" "}
          <a href="https://github.com/luukvankooten/onetwotree">Github</a>
        </p>
        <p>
          De live url:{" "}
          <a href="https://lvk-2173630-12tree.herokuapp.com/">Heroku</a>
        </p>

        <div className="flex">
          <p className="flex-1">
            User
            <ul className="list-disc">
              <li>Name: string</li>
              <li>Email: string</li>
              <li>Password: string</li>
            </ul>
          </p>
          <p className="flex-1">
            Comment
            <ul className="list-disc">
              <li>Comment: string</li>
              <li>Created: Date</li>
              <li>TimeStamp: int</li>
              <li>user: User</li>
              <li>track: Track</li>
            </ul>
          </p>
          <p className="flex-1">
            Track
            <ul className="list-disc">
              <li>Artist: string</li>
              <li>Length: int</li>
              <li>SpotifyUri: string</li>
              <li>Song: string</li>
            </ul>
          </p>
          <p className="flex-1">
            Rating
            <ul className="list-disc">
              <li>user: User</li>
              <li>rating: int</li>
              <li>created: Date</li>
              <li>track: Track</li>
            </ul>
          </p>
        </div>

        <img src="/entities.png" />
      </div>
    </React.Fragment>
  );
}

export default About;
