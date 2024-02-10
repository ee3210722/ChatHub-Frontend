import React from 'react';

function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") word = "error";
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      {props.alert && (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
