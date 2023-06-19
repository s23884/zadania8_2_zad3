import * as React from 'react';

const Rating = () => {
  const [rating, setRating] = React.useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div style={{ display: 'flex' }}>
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          onClick={() => handleRating(index + 1)}
          style={{
            fontSize: '24px',
            color: index < rating ? 'green' : 'gray',
            backgroundColor: 'transparent',
            outline: 'none',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {index < rating ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
};

export default Rating;
