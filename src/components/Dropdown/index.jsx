import React from 'react';

import styles from './dropdown.module.css';

function Dropdown({
  options = [],
  value,
  title = '',
  titleColor = '#EDF2F4',
  onChange = () => {},
  style,
}) {
  return (
    <div className={styles.container}>
      <p style={{
        color: titleColor,
        width: '50%',
      }}
      >
        {title}
      </p>
      <select
        style={style}
        className={styles.dropdown}
        onChange={(e) => onChange(e.target.value)}
        name={title}
        value={value}
      >
        {
        options.map((op) => <option key={op.id} value={op.value}>{op.label}</option>)
      }
      </select>
    </div>
  );
}

export default Dropdown;
