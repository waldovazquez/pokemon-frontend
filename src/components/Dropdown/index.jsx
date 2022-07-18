import React from 'react';

import styles from './dropdown.module.css';

function Dropdown({
  options = [],
  value,
  title = '',
  onChange = () => {},
  className,
}) {
  return (
    <div className={styles.container}>
      <p>
        {title}
      </p>
      <select
        className={className}
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
