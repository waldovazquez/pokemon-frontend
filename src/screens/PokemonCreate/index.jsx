import React, {
  useState,
  useEffect,
} from 'react';

import {
  useForm,
} from 'react-hook-form';

import Input from '../../components/Input';
import Toast from '../../components/Toast';
import Screen from '../../components/Screen';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

import {
  getRandomImage,
  createPokemon,
} from '../../libs/pokemon';

import getTypes from '../../libs/type';

import styles from './pokemoncreate.module.css';

function PokemonCreate() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      hp: 1,
      attack: 1,
      defense: 1,
      speed: 1,
      height: 1,
      weight: 1,
    },
  });
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

  async function makePokemon(data) {
    try {
      setLoading(true);

      const response = await createPokemon({
        ...data,
        types: selectedTypes,
        image,
      });
      if (response && response.ok) {
        setAlert({
          severity: 'success',
          message: 'Pokemon Successfully Created',
        });
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      setSelectedTypes([]);
      setLoading(false);
    }
  }

  async function getAllTypes() {
    try {
      const response = await getTypes();
      if (response && response.ok) {
        setTypes(response.data);
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
            <div className={styles.container__image}>
              {image && (
                <img
                  src={image}
                  alt="pokemonImage"
                  className={styles.image}
                />
              )}
            </div>
          </div>
          <form className={styles.form} onSubmit={handleSubmit(makePokemon)}>
            <div className={styles.container__stats}>
              <div className={styles.container__inputs}>
                <div className={styles.container__input}>
                  <Input
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Name *"
                    register={register}
                    registerProps={{
                      maxLength: 18,
                      required: true,
                    }}
                  />
                  {
                    errors.name?.type === 'required'
                      ? <p className={styles.error}>Name is required</p>
                      : errors.name?.type === 'maxLength'
                      && <p className={styles.error}>Maximum characters 18</p>
                  }
                </div>
                <div className={styles.container__input}>
                  <Input
                    type="number"
                    name="hp"
                    label="Health"
                    register={register}
                    registerProps={{
                      min: 1,
                      required: true,
                    }}
                  />
                  {
                    errors.hp?.type === 'required'
                      ? <p className={styles.error}>Health is required</p>
                      : errors.hp?.type === 'min'
                      && <p className={styles.error}>You need a health greater than or equal to 1</p>
                  }
                </div>
                <div className={styles.container__input}>
                  <Input
                    type="number"
                    name="attack"
                    label="Attack"
                    register={register}
                    registerProps={{
                      min: 1,
                      required: true,
                    }}
                  />
                  {
                    errors.attack?.type === 'required'
                      ? <p className={styles.error}>Attack is required</p>
                      : errors.attack?.type === 'min'
                      && <p className={styles.error}>You need a attack greater than or equal to 1</p>
                  }
                </div>
                <div className={styles.container__input}>
                  <Input
                    type="number"
                    name="defense"
                    label="Defense"
                    register={register}
                    registerProps={{
                      min: 1,
                      required: true,
                    }}
                  />
                  {
                    errors.defense?.type === 'required'
                      ? <p className={styles.error}>Defense is required</p>
                      : errors.defense?.type === 'min'
                      && <p className={styles.error}>You need a defense greater than or equal to 1</p>
                  }
                </div>
                <div className={styles.container__input}>
                  <Input
                    type="number"
                    name="speed"
                    label="Speed"
                    register={register}
                    registerProps={{
                      min: 1,
                      required: true,
                    }}
                  />
                  {
                    errors.speed?.type === 'required'
                      ? <p className={styles.error}>Speed is required</p>
                      : errors.speed?.type === 'min'
                      && <p className={styles.error}>You need a speed greater than or equal to 1</p>
                  }
                </div>
                <div className={styles.container__input}>
                  <Input
                    type="number"
                    name="height"
                    label="Height"
                    register={register}
                    registerProps={{
                      min: 1,
                      required: true,
                    }}
                  />
                  {
                    errors.height?.type === 'required'
                      ? <p className={styles.error}>Height is required</p>
                      : errors.height?.type === 'min'
                      && <p className={styles.error}>You need a height greater than or equal to 1</p>
                  }
                </div>
                <div className={styles.container__input}>
                  <Input
                    type="number"
                    name="weight"
                    label="Weigth"
                    register={register}
                    registerProps={{
                      min: 1,
                      required: true,
                    }}
                  />
                  {
                    errors.weight?.type === 'required'
                      ? <p className={styles.error}>Weight is required</p>
                      : errors.weight?.type === 'min'
                      && <p className={styles.error}>You need a weight greater than or equal to 1</p>
                  }
                </div>
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
              <input
                type="submit"
                className={styles.input__submit}
                value="Save Pokemon"
              />
            </div>
          </form>
        </div>
      </div>
      {alert && (
        <Toast
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <Loading />
    </Screen>
  );
}

export default PokemonCreate;
