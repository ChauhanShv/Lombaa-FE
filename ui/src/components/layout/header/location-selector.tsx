import React, { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAxios } from '../../../services';
import { ActionTypes, useAppContext } from '../../../contexts';
import { Country } from '../../../types';
import { LocationSelectorProps, LocationData } from './types';
import { Loader } from '../..';

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onCitySelected }: LocationSelectorProps): React.ReactElement => {
    const [cityData, setCityData] = React.useState<LocationData[]>([]);
    const { dispatch, state } = useAppContext();
    const currentCountry: Country = state.session?.country || {};

    const [{ data: locationResponse, loading }] = useAxios({
        url: `/locations/country/code/${currentCountry.code}/regions`,
        method: 'GET',
    }, { manual: false });

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
                        coordinate: city.coordinate.coordinates,
                        label: `${city.name}, ${region.name}`,
                    });
                }
            }
            setCityData([...cities]);
        }
    }, [locationResponse]);

    const handleLocationSelect = (e: any) => {
        if (cityData.length && e.target.textContent) {
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
            })
        }
    }

    return (
        <>
            {loading ? <Loader show={loading} /> : (
                <Autocomplete
                    sx={{ width: '100%' }}
                    autoComplete={true}
                    options={cityData.map(city => city.label)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Location"
                        />)
                    }
                    onChange={handleLocationSelect}
                />
            )}
        </>
    );
}