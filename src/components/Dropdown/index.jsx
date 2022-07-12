import React from 'react';

import styles from './dropdown.module.css';

function Dropdown({
  options = [],
  value,
  title = '',
  onChange = () => {},
}) {
  return (
    <div className={styles.container}>
      <p style={{
        color: '#2B2D42',
      }}
      >
        {title}
      </p>
      <select
        className={styles.select}
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
