import React, { useEffect, useState } from "react";
import "./CricketScore.css";

const CricketScore = () => {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [fillInput, setFillInput] = useState("");

    const getData = async () => {

        try {

            const response = await fetch("https://api.cricapi.com/v1/cricScore?apikey=ee044d49-d9a5-419a-a598-f35681bc07d0");
            const data = await response.json();
            // console.log(data);
            setData(data.data);

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        getData();
    }, []);

    const handleInput = (e) => {
        console.log(e.target.value);
        setFillInput(e.target.value);
    };

    const handleBtn = () => {
        setSearch(fillInput);
        getData();

    };


    return (
        <>

            <header className="Header">
                <h1>Live Cricket Score !!</h1>
            </header>

            <div className="input-container">
                <input type="text" placeholder="Search Your Team" onChange={handleInput} />
                <button type="button" onClick={handleBtn}>Search</button>
            </div>

            <div className="score-box">
                {data ? data.map((curVal) => {
                    if (curVal.status !== "Match not started") {
                        if (curVal.series.includes(search) || curVal.t1.includes(search) || curVal.t2.includes(search)) {
                            return (
                                <div className="score" key={curVal.id}>
                                    <h3>{curVal.series}</h3>
                                    <p>{curVal.dateTimeGMT}</p>
                                    <p>{curVal.matchType}</p>
                                    <div className="team">
                                        <div>
                                            <img src={curVal.t1img} alt="team1" />
                                            <p>{curVal.t1}</p>
                                            <p>{curVal.t1s}</p>
                                        </div>
                                        <div>
                                            <img src={curVal.t2img} alt="team2" />
                                            <p>{curVal.t2}</p>
                                            <p>{curVal.t2s}</p>
                                        </div>
                                    </div>
                                    <div className="result">
                                        <p>{curVal.result}</p>
                                        <p>{curVal.status}</p>
                                    </div>
                                </div>
                            );
                        }
                        if (search === "") {
                            return (
                                <div className="score" key={curVal.id}>
                                    <h3>{curVal.series}</h3>
                                    <p>{curVal.dateTimeGMT}</p>
                                    <p>{curVal.matchType}</p>
                                    <div className="team">
                                        <div>
                                            <img src={curVal.t1img} alt="team1" />
                                            <p>{curVal.t1}</p>
                                            <p>{curVal.t1s}</p>
                                        </div>
                                        <div>
                                            <img src={curVal.t2img} alt="team2" />
                                            <p>{curVal.t2}</p>
                                            <p>{curVal.t2s}</p>
                                        </div>
                                    </div>
                                    <p>{curVal.result}</p>
                                    <p>{curVal.status}</p>
                                </div>
                            );
                        };
                    };

                    {/* console.log(curVal); */ }

                })
                    :
                    <p>Score not found</p>}
            </div>

        </>
    );
};

export default CricketScore;