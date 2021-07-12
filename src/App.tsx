import React, { FC, useEffect, useState } from 'react';
import ChordJS from './chords.js';
import './App.css';

const App: FC = () => {
    const [note, selectNote] = useState('D');
    const [major, toggleQuality] = useState(true);

    const parser = {
        str: function (uberChord: string) {
            let result = uberChord.split(' ');
            for (let char of result) {
                if (char === 'X') char = char.toLowerCase();
            }
            return result.join('');
        },
        fingers: function (uberChord: string) {
            let result = uberChord.split(' ');
            for (let char of result) {
                if (char === 'X') char = '-';
            }
            return result.join('');
        },
    };

    useEffect(() => {
        let url = `https://api.uberchord.com/v1/chords/${note}`;
        if (!major) url += '_m';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data[0]) {
                    const { strings, fingering } = data[0];
                    const { str, fingers } = parser;
                    const chart = ChordJS.generate(note, str(strings), fingers(fingering), 3);
                    const container = document.getElementById('target');
                    if (container) {
                        while (container.firstChild) {
                            container.removeChild(container.firstChild);
                        }
                        container.appendChild(chart);
                    }
                }
            });
    }, [note, major]);

    return (
        <div className="App">
            <button onClick={() => selectNote('A')}>A</button>
            <button onClick={() => selectNote('D')}>D</button>
            <button onClick={() => selectNote('F')}>F</button>
            <button onClick={() => toggleQuality(!major)}>{major ? 'major' : 'minor'}</button>
            <div id="target"></div>
        </div>
    );
};

export default App;
