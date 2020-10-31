import { stringify } from 'querystring';
import * as React from 'react'

interface SquareProps {
    value: any;
    onClick: (i: number) => void;
}

interface SquareState {
}

export class Square extends React.Component<SquareProps, SquareState> {

    constructor(props: SquareProps) {
        super(props);
        this.state = {
            value: ""
        }
    }

    render() {
        return (
            <button className="square" onClick={() => {this.props.onClick(this.props.value)}}>
                {this.props.value}
            </button>
        );
}}
