import React, { ReactElement, useState } from 'react';
import './NotePicker.css';

interface NotePickerProps {
    onSelect: Function;
    value: string;
    notes: string[];
}

export function NotePicker(props: NotePickerProps): ReactElement {
    const { onSelect, value, notes } = props;
    const [isOpen, openClose] = useState(false);
    const open = () => openClose(true);
    const close = () => openClose(false);
    const handleSelect = (selection: string) => {
        onSelect(selection);
        close();
    };

    return (
        <div className="outer">
            <div className="note-picker">
                <div className="trigger" onClick={() => open()}>
                    {value}
                </div>
            </div>
            <div onClick={() => close()} className={`dimmer ${isOpen && 'active'}`}></div>
            <div className={`expanded-container ${isOpen && 'active'}`}>
                <div className="boxes">
                    {notes.map((note, i) => (
                        <div key={i} onClick={() => handleSelect(note)} className="box">
                            {note}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
