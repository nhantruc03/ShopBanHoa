import Loader from 'react-loader-spinner';
import React  from 'react';
import { usePromiseTracker } from "react-promise-tracker";
export const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    let color = "#b0b435"
    color = props.color ? props.color : color;
    return (
        promiseInProgress &&
        <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Loader type="ThreeDots" color={color} height="100" width="100" />
        </div>
    );
}
