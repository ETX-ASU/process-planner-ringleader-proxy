import React from 'react';
import "./ToggleSwitch.scss";

function ToggleSwitch(props) {
  return (
    <div className="toggle-switch">
      <div className="switch">
        <div>
          <input type="checkbox" id={props.id} disabled={props.disabled} checked={props.value} onChange={props.handleToggle} />
          <label htmlFor={props.id}>
            <span className={`${props.disabled ? 'isDisabled' : ''}`}></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
