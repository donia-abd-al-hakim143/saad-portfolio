import React from 'react';
import styled from 'styled-components';

const Switch = ({ dark, setDark }) => {  // استقبال props
  return (
    <StyledWrapper>
      <label className="toggle-switch">
        <input 
          type="checkbox" 
          checked={dark}  // ربط الحالة
          onChange={() => setDark(!dark)}  // تغيير الحالة عند الضغط
        />
        <div className="toggle-switch-background">
          <div className="toggle-switch-handle" />
        </div>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 40px;
    cursor: pointer;
  }

  .toggle-switch input[type="checkbox"] {
    display: none;
  }

  .toggle-switch-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.dark ? "#1e1e2f" : "#ddd"};  // لون الخلفية حسب الوضع
    border-radius: 20px;
    box-shadow: inset 0 0 0 2px #ccc;
    transition: background-color 0.3s ease-in-out;
  }

  .toggle-switch-handle {
    position: absolute;
    top: 5px;
    left: ${props => props.dark ? "45px" : "5px"};  // مكان الـ handle حسب الوضع
    width: 30px;
    height: 30px;
    background-color: ${props => props.dark ? "#c9a84c" : "#fff"};  // لون ذهبي في الوضع الليلي
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: left 0.3s ease-in-out, background-color 0.3s ease;
  }

  .toggle-switch input[type="checkbox"]:checked + .toggle-switch-background {
    background-color: #1e1e2f;
  }
`;

export default Switch;