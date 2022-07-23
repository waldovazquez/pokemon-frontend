import React, {
  useState,
  useEffect,
  useContext,
} from 'react';

import AuthContext from '../../context/authContext';

import Input from '../../components/Input';
import Toast from '../../components/Toast';
import Screen from '../../components/Screen';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

import {
  getRandomImage,
  createPokemon,
} from '../../libs/pokemon';

import {
  getTypes,
} from '../../libs/type';

import styles from './pokemoncreate.module.css';

function PokemonCreate() {
  const {
    data,
  } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [hp, setHp] = useState(0);
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [image, setImage] = useState('');
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getImage() {
    try {
      setLoading(true);
      const response = await getRandomImage();
      if (response && response.ok) {
        setImage(response.image);
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      setLoading(false);
    }
  }

  async function makePokemon() {
    try {
      setLoading(true);
      const dataToSave = {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        types: selectedTypes,
        image,
        userId: data.userData._id,
      };

      const response = await createPokemon(dataToSave);
      if (response && response.ok) {
        setAlert({
          severity: 'success',
          message: 'Pokemon Successfully Created',
        });
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      setName('');
      setHp(0);
      setAttack(0);
      setDefense(0);
      setSpeed(0);
      setHeight(0);
      setWeight(0);
      setSelectedTypes([]);
      setLoading(false);
    }
  }

  async function getAllTypes() {
    try {
      setLoading(true);
      const response = await getTypes();
      if (response && response.ok) {
        setTypes(response.data);
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      setLoading(false);
    }
  }

  const handleTypes = (type) => {
    setSelectedTypes((currentState) => {
      const newState = [...currentState];
      if (newState.filter((item) => item._id === type._id).length > 0) {
        return newState.filter((item) => item._id !== type._id);
      }
      newState.push({
        name: type.name,
        _id: type._id,
      });
      return newState;
    });
  };

  useEffect(() => {
    Promise.all([
      getImage(),
      getAllTypes(),
    ]);
  }, []);

  return (
    <Screen>
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <div className={styles.container__left}>
            <Button
              onClick={() => getImage()}
              disabled={loading}
            >
              Generate Pokemon
            </Button>
            {image && (
              <img
                src={image}
                alt="pokemonImage"
                className={styles.image}
              />
            )}
          </div>
          <div className={styles.container__stats}>
            <div className={styles.container__input}>
              <Input
                type="text"
                value={name}
                label="Name"
                labelColor="#2B2D42"
                placeholder="Name *"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                value={hp}
                label="Health"
                labelColor="#2B2D42"
                onChange={(e) => setHp(e.target.value)}
              />
              <Input
                type="number"
                value={attack}
                label="Attack"
                labelColor="#2B2D42"
                onChange={(e) => setAttack(e.target.value)}
              />
              <Input
                type="number"
                value={defense}
                label="Defense"
                labelColor="#2B2D42"
                onChange={(e) => setDefense(e.target.value)}
              />
              <Input
                type="number"
                value={speed}
                label="Speed"
                labelColor="#2B2D42"
                onChange={(e) => setSpeed(e.target.value)}
              />
              <Input
                type="number"
                value={height}
                label="Height"
                labelColor="#2B2D42"
                onChange={(e) => setHeight(e.target.value)}
              />
              <Input
                type="number"
                value={weight}
                label="Weigth"
                labelColor="#2B2D42"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className={styles.container__types}>
              {types && types.map((t) => (
                <div
                  key={t._id}
                  className={styles.container__checkbox}
                >
                  <label
                    htmlFor={t.name}
                    style={{
                      color: '#2B2D42',
                    }}
                  >
                    {t.name}
                  </label>
                  <input
                    id={t.name}
                    type="checkbox"
                    checked={selectedTypes.filter((item) => item._id === t._id).length > 0}
                    onChange={() => handleTypes(t)}
                  />
                </div>
              ))}
            </div>
            <div className={styles.container__save}>
              <Button
                onClick={() => makePokemon()}
                disabled={loading}
              >
                Save Pokemon
              </Button>
            </div>
          </div>
        </div>
      </div>
      {alert && (
        <Toast
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      {loading && <Loading />}
    </Screen>
  );
}

export default PokemonCreate;
