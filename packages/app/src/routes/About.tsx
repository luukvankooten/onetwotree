import React from "react";

function About() {
  return (
    <React.Fragment>
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
            Token
            <ul className="list-disc">
              <li>expiresAt: int</li>
              <li>refreshToken: int</li>
              <li>accessToken: string</li>
              <li>created: int</li>
            </ul>
          </p>
          <p className="flex-1">
            Token
            <ul className="list-disc">
              <li>expiresAt: int</li>
              <li>refreshToken: int</li>
              <li>accessToken: string</li>
              <li>created: int</li>
            </ul>
          </p>
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
          <p className="flex-1">
            Artist
            <ul className="list-disc">
              <li>artist: string</li>
            </ul>
          </p>
        </div>
        <figure className="border-2 broder-grey rounded bg-white font-color-black mb-2">
          <img alt="domain objects" src="/entities.png" />
          <figcaption>Entitieten</figcaption>
        </figure>
        <figure className="border-2 broder-grey rounded bg-white font-color-black mb-2">
          <img alt="in ci/cd" src="/cicd.png" />
          <figcaption>
            Continuous integration en continuous delivery op/door github
          </figcaption>
        </figure>
        <figure className="border-2 broder-grey rounded bg-white font-color-black mb-2">
          <img alt="in local" src="/local.png" />
          <figcaption>Al testen in de fronted</figcaption>
        </figure>
      </div>
    </React.Fragment>
  );
}

export default About;
