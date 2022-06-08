import React, { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAxios } from '../../../services';
import { ActionTypes, useAppContext } from '../../../contexts';
import { Country } from '../../../types';
import { LocationSelectorProps, LocationData } from './types';
import { Loader } from '../..';

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onCitySelected }: LocationSelectorProps): React.ReactElement => {
    const { dispatch, state } = useAppContext();
    const currentCityName = state?.user?.metaData?.location?.city?.name;
    const currentRegionName = state?.user?.metaData?.location?.region?.name;
    const [cityData, setCityData] = React.useState<LocationData[]>([]);
    const [currentCity, setCurrentCity] = React.useState<string>(
        state?.user?.metaData?.location ? `${currentCityName}, ${currentRegionName}` : ''
    );
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
        currentCityName ?
            setCurrentCity(`${currentCityName}, ${currentRegionName}`) :
            setCurrentCity('');
    }, [currentCityName]);

    useEffect(() => {
        if ((state.session.lat === currentCityCoordinates?.[1] ||
            state.session.lng === currentCityCoordinates?.[0]) &&
            state.session.lat && state.session.lng) {
            setCurrentCity(`${currentCityName}, ${currentRegionName}`);
        }
    }, [state.session.lat, state.session.lng]);

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