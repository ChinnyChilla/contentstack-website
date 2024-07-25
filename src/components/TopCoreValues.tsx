import React from 'react';

interface Value {
  name: string;
  icon: string;
  count: number;
}

interface TopValuesCardProps {
  values: Value[];
}

const TopValuesCard: React.FC<TopValuesCardProps> = ({ values }) => {
  return (
    <div className="top-values-card">
      <h3>Top Used Values</h3>
      <div className="values-container">
        {values.map((value, index) => (
          <div key={index} className="value-item">
            <img src={value.icon} alt={value.name} className="value-icon" />
            <p>{value.name}</p>
            <p>Count: {value.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopValuesCard;
