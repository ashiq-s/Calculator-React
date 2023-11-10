import React, { useEffect, useRef } from "react";

import './Header.css'

function Header(props) {
    const resultRef = useRef();
    const expressionRef = useRef();

    useEffect(() => {
        resultRef.current.scrollIntoView()
    }, [props.history])

    useEffect(() => {
        expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
    }, [props.expression])

    return (
        <div className="header custom-scroll">
            {/* <h1>Header</h1> */}
            <div className="header_history">
                {   props.history &&
                    props.history?.map((item)=><p key={item+""+Math.random()*44}>{item}</p>)
                }
            </div>

            <br></br>

            <div ref={expressionRef} className="header_expr custom-scroll">
                <p>{props.expression}</p>
            </div>

            <div className="header_result custom-scroll">
                <p ref={resultRef} className="header_result custom-scroll">{props.result}</p>
            </div>
        </div>
    );
}

export default Header