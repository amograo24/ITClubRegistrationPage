document.addEventListener('contextmenu', event => event.preventDefault());
            // Nice cheating kid!
            let questions = {
                1:["What is the full form of RAM?","random access memory"],
                2:["What is the full form of ROM?","read only memory"],
                3:["What is the full form of AI?","artificial intelligence"],
                4:["What does CPU stand for?", "central processing unit"],
                5:["What does IP stand for in IP Address?","internet protocol"],
                6:["What is the full form of USB","universal serial bus"],
                7:["Which language does a computer understand","binary"],
                8:["What does the Internet prefix WWW stand for?","world wide web"],
                9:["What does WLAN stand for?","wireless local area network"],
                10:["What is the full form of URL?","universal resource locator"],
            }
            function App() {
                function randomNumber(min, max) { 
                    return Math.random() * (max - min) + min;
                }
                const [state, setState] = React.useState({
                    // num1: Math.ceil(Math.random() * 10),
                    question: Math.floor((randomNumber(1,11))),
                    response: "", 
                    score:0,
                    incorrect:false,
                    attempts:0
                });

                function inputKeyPress(event) {
                    if (event.key==='Enter') { 
                        const answer = state.response; 
                        if (questions[state.question][1] === answer.toLowerCase()) { 
                            setState({
                                ...state,
                                // num1: Math.ceil(Math.random() * 10), 
                                question: Math.floor((randomNumber(1,11))),
                                score:state.score+1,
                                response: "", 
                                incorrect:false,
                                attempts:state.attempts+1
                            })
                        } else {
                            setState({
                                ...state,
                                //score:state.score-1,
                                response: "",
                                incorrect:true,
                                attempts:state.attempts+1
                            })
                        }
                    }
                }

                function updateResponse(event) {
                    setState({
                        ...state, 
                        response:event.target.value
                    });
                }

                function shuffleQuestion(event) {
                    location.reload()
                }

                if (state.score==1) {
                    document.querySelector('canvas').style.display="block"
                    return (
                        <div>
                            <div id="winner">You won!</div>
                            <div class="white">Total Attempts: {state.attempts}</div>
                            <div class="white"><strong>Upon submission of the Google Form given below, you will be provided with the Discord Link as well as the Whatsapp Group Link.</strong></div>
                            <br/>
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc7nW9Hg6n8D7ZAwqDzNx0Aiy7r_EzIoetsTFu5VlaclQZMxg/viewform?embedded=true" width="640" height="2000" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                        </div>
                    )
                }
                return (
                    <div>
                        <div className={state.incorrect ? "orange" : "orange"} id="question">{questions[state.question][0]}</div>
                        <input autoFocus={true} onKeyPress={inputKeyPress} onChange={updateResponse} value={state.response} className="input"/> 
                        <div className="white">Attempts: {state.attempts}</div>
                        <div className={state.incorrect ? "incorrect" : "correct"}>Incorrect Answer! Try again.</div>
                        <br/>
                        <div className="shuffle_div"><button className={state.incorrect ? "shuffle" : "correct"} onClick={shuffleQuestion}>Shuffle Question</button></div>
                    </div> 
                );
            }

            ReactDOM.render(<App />,document.querySelector('#app'));