import * as React from 'react';
import Rating from './Rating';

const Meal = ({ idMeal, strMealThumb, strTags, strMeal, ...rest }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [ingredients, setIngredients] = React.useState(
    [...Array(20)]
      .map((_, index) => rest['strIngredient' + (index + 1)])
      .filter((i) => i)
  );
  const [instructions, setInstructions] = React.useState(rest.strInstructions);
  console.log(rest);

  React.useEffect(() => {
    if (!rest.hasOwnProperty('strArea')) {
      fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + idMeal)
        .then((res) => res.json())
        .then(({ meals }) => {
          setIngredients(
            [...Array(20)]
              .map((_, index) => meals[0]['strIngredient' + (index + 1)])
              .filter((i) => i)
          );
          setInstructions(meals[0].strInstructions);
        });
    }
  }, [idMeal]);

  return (
    <div>
      <div
        onClick={() => setShowDetails((prev) => !prev)}
        style={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={strMealThumb} alt={strMeal} width={150} />
        <h3 style={{ alignText: 'center', margin: 0 }}>{strMeal}</h3>
        <p style={{ margin: 0 }}>{strTags}</p>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Rating />
        {showDetails && (
          <div>
            <div>
              <p>
                Ingredients:
                {ingredients.join(', ')}
              </p>
              <p>
                Instructions:
                {instructions}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meal;
