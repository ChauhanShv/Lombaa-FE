import React, { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAxios } from '../../../services';
import { ActionTypes, useAppContext } from '../../../contexts';
import { Country } from '../../../types';
import { LocationSelectorProps, LocationData } from './types';
import { Loader } from '../..';

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onCitySelected }: LocationSelectorProps): React.ReactElement => {
    const { dispatch, state } = useAppContext();
    const [cityData, setCityData] = React.useState<LocationData[]>([]);
    const [currentCity, setCurrentCity] = React.useState<string>();
    const lastUsedLocation = state?.user?.metaData?.lastUsedLocation;
    const currentLocation = state?.user?.metaData?.location;
    const currentCountry: Country = state.session?.country || {};
    const currentCityCoordinates = state.user?.metaData?.location?.city?.coordinate?.coordinates;

    const [{ data: locationResponse, loading }] = useAxios({
        url: `/locations/country/code/${currentCountry.code}/regions`,
        method: 'GET',
    }, { manual: false });
    const [{ }, lastActiveLocationExecute] = useAxios({
        url: `/user/location`,
        method: 'POST',
    });

    useEffect(() => {
        if (lastUsedLocation?.city && lastUsedLocation) {
            dispatch({
                type: ActionTypes.SETLATLNG,
                payload: {
                    lat: lastUsedLocation?.city?.coordinate?.coordinates[1],
                    lng: lastUsedLocation?.city?.coordinate?.coordinates[0],
                }
            })
            setCurrentCity(`${lastUsedLocation?.city?.name}, ${lastUsedLocation?.region?.name}`);
        } else if (currentLocation) {
            dispatch({
                type: ActionTypes.SETLATLNG,
                payload: {
                    lat: currentLocation?.city?.coordinate?.coordinates[1],
                    lng: currentLocation?.city?.coordinate?.coordinates[0],
                }
            });
            setCurrentCity(`${currentLocation?.city?.name}, ${currentLocation?.region?.name}`);
        } else { }
    }, []);

    useEffect(() => {
        const cities: LocationData[] = [];
        if (locationResponse?.success && locationResponse?.response?.regions) {
            for (const region of locationResponse?.response?.regions) {
                for (const city of region.cities) {
                    cities.push({
                        regionId: region.id,
                        cityId: city.id,
                        cityName: city.name,
                        regionName: region.name,
                        coordinate: city?.coordinate?.coordinates,
                        label: `${city.name}, ${region.name}`,
                    });
                }
            }
            setCityData([...cities]);
        }
    }, [locationResponse]);

    const handleLocationSelect = (e: any) => {
        if (cityData.length && e.target.textContent) {
            setCurrentCity(e.target.textContent);
            const cityObj: any = cityData.find((city) => city.label === e.target.textContent);
            if (onCitySelected) {
                onCitySelected({
                    city: cityObj.cityId,
                    region: cityObj.regionId,
                    country: locationResponse?.response?.id,
                    coordinate: cityObj.coordinate,
                });
            }
            dispatch({
                type: ActionTypes.SETLATLNG,
                payload: {
                    lat: cityObj.coordinate[1],
                    lng: cityObj.coordinate[0],
                }
            });
            lastActiveLocationExecute({
                data: {
                    location: {
                        city: cityObj.cityId,
                        region: cityObj.regionId,
                        country: locationResponse?.response?.id,
                    }
                }
            });
        }
    }
    const handleLocationInputChange = (event: any, value: string, reason: string) => {
        if (!(reason === 'reset')) {
            dispatch({
                type: ActionTypes.SETLATLNG,
                payload: {
                    lat: state?.session?.lat ? currentCityCoordinates?.[1] : "",
                    lng: state?.session?.lng ? currentCityCoordinates?.[0] : "",
                }
            });
            setCurrentCity(`${currentLocation?.city?.name}, ${currentLocation?.region?.name}`);
            if (!state.session?.token) {
                setCurrentCity('');
            }
        }
    };

    return (
        <>
            {loading ? <Loader show={loading} /> : (
                <Autocomplete
                    sx={{ width: '100%' }}
                    autoComplete={true}
                    value={currentCity}
                    options={cityData.map(city => city.label)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Location"
                        />)
                    }
                    onChange={handleLocationSelect}
                    onInputChange={handleLocationInputChange}
                />
            )}
        </>
    );
}