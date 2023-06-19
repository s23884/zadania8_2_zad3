import * as React from 'react';
import './style.css';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
import * as React from 'react';
import Meal from './components/Meal';
import Rating from './components/Rating';
import './style.css';

export default function App() {
  const [meals, setMeals] = React.useState(null);
  const [areas, setAreas] = React.useState(null);

  const getMeals = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
      .then((res) => res.json())
      .then(({ meals }) => setMeals(meals));
  };
  const getAreas = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((res) => res.json())
      .then(({ meals }) => setAreas(meals));
  };

  React.useEffect(() => {
    getMeals();
    getAreas();
  }, []);

  const handleNameSearch = (e) => {
    e.preventDefault();
    fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=' +
        e.target.elements.name.value
    )
      .then((res) => res.json())
      .then(({ meals }) => setMeals(meals));
  };
  const handleCountrySearch = (e: React.ChangeEvent) => {
    fetch(
      'https://www.themealdb.com/api/json/v1/1/filter.php?a=' + e.target.value
    )
      .then((res) => res.json())
      .then(({ meals }) => setMeals(meals));
  };
  return (
    <div>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}
      >
        <form onSubmit={handleNameSearch}>
          <input name="name" placeholder="Wyszukaj po nazwie" />
        </form>
        <select
          onChange={(e) => handleCountrySearch(e)}
          name="country"
          id="country"
        >
          <option selected disabled value="">
            Wybierz kraj
          </option>
          {areas?.map(({ strArea }) => (
            <option value={strArea}>{strArea}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        {meals?.map((item) => (
          <Meal key={item.idMeal} {...item} />
        ))}
      </div>
    </div>
  );
}
