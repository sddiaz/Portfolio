import React from "react";
export default function Error(props) {
  const { message } = props;

  if (!message) {
    return null; // Don't render anything if the message is empty or undefined
  }

  return (<div className="errorDiv">
            <div>{message}</div>
        </div>);
}