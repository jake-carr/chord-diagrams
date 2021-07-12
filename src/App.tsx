import React, { FC, useEffect, useState } from 'react';
import './App.css';

const App: FC = () => {
    const [note, selectNote] = useState('D');
    const [major, toggleQuality] = useState(true);
    const [diagram, setDiagram] = useState('');

    // const parser = (uberChord: string) => {
    //     // comes as: "1 3 3 2 1 1" [6th to 1st str]
    // };

    useEffect(() => {
        console.log(note, major);
        fetch(`https://api.uberchord.com/v1/chords/${note}${major ? '' : '_m'}`)
            .then((response) => response.json())
            .then((data) => {
                if (data[0]) {
                    console.log(data[0]);
                    // setDiagram(parser(data[0].strings));
                }
            });
    }, [note, major]);

    useEffect(() => {
        console.log(diagram);
    }, [diagram]);

    return (
        <div className="App">
            <button onClick={() => selectNote('D')}>D</button>
            <button onClick={() => selectNote('F')}>F</button>
            <button onClick={() => toggleQuality(!major)}>{major ? 'major' : 'minor'}</button>
        </div>
    );
};

export default App;
