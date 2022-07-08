import React, {
  useState,
  useEffect,
  useContext,
} from 'react';

import axios from 'axios';

import AuthContext from '../../context/authContext';

import Input from '../../components/Input';
import Toast from '../../components/Toast';
import Screen from '../../components/Screen';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

import Heart from '../../assets/heart.png';
import Attack from '../../assets/attack.png';
import Defense from '../../assets/defense.png';
import Speed from '../../assets/speed.png';
import Height from '../../assets/height.png';
import Weight from '../../assets/weight.png';

import {
  API_URL,
} from '../../utils/constants';

import styles from './pokemoncreate.module.css';

function PokemonCreate() {
  const { data } = useContext(AuthContext);
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
      const response = await axios.get(`${API_URL}/pokemon/getimage`);
      if (response && response.data.ok) {
        setImage(response.data.image);
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      setLoading(false);
    }
  }

  async function createPokemon() {
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

      const response = await axios.post(`${API_URL}/pokemon/create`, dataToSave);
      if (response && response.data.ok) {
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

  async function getTypes() {
    try {
      const response = await axios.get(`${API_URL}/type/getalltypes`);
      if (response && response.data.ok) {
        setTypes(response.data.data);
      }
    } catch (e) {
      console.info('Error: ', e);
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
    getImage();
    getTypes();
  }, []);

  return (
    <Screen>
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <div className={styles.container__image}>
            <Button
              className={styles.component__button}
              onClick={() => getImage()}
            >
              Generate Pokemon
            </Button>
            {image && (
              <img
                src={image}
                alt="pokemonImage"
                height={400}
                width={400}
              />
            )}
          </div>
          <div className={styles.container__stats}>
            <div className={styles.container__input__top}>
              <Input
                type="text"
                value={name}
                placeholder="Name *"
                className={styles.component__input}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                value={hp}
                className={styles.component__input}
                onChange={(e) => setHp(e.target.value)}
                activeIcon
                icon={Heart}
              />
              <Input
                type="number"
                value={attack}
                className={styles.component__input}
                onChange={(e) => setAttack(e.target.value)}
                activeIcon
                icon={Attack}
              />
              <Input
                type="number"
                value={defense}
                className={styles.component__input}
                onChange={(e) => setDefense(e.target.value)}
                activeIcon
                icon={Defense}
              />
              <Input
                type="number"
                value={speed}
                className={styles.component__input}
                onChange={(e) => setSpeed(e.target.value)}
                activeIcon
                icon={Speed}
              />
              <Input
                type="number"
                value={height}
                className={styles.component__input}
                onChange={(e) => setHeight(e.target.value)}
                activeIcon
                icon={Height}
              />
            </div>
            <div className={styles.container__input__bottom}>
              <Input
                type="number"
                value={weight}
                className={styles.component__input}
                onChange={(e) => setWeight(e.target.value)}
                activeIcon
                icon={Weight}
              />
            </div>
            <div className={styles.container__types}>
              {
                types && types.map((t) => (
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
                ))
              }
            </div>
            <Button
              className={styles.component__button}
              onClick={() => createPokemon()}
            >
              Save Pokemon
            </Button>
          </div>
        </div>
      </div>
      {
        alert && (
        <Toast
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
        )
    }
      { loading && <Loading />}
    </Screen>
  );
}

export default PokemonCreate;