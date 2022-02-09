import React, { useEffect } from 'react';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { FaLocationArrow } from 'react-icons/fa';
import { useFormContext } from 'react-hook-form';
import { useAxios } from '../../../services';
import { LocationSelectorProps, LocationData } from './types';
import { Loader } from '../..';
import { CURRENT_COUNTRY } from '../../../config';

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onCitySelected }: LocationSelectorProps): React.ReactElement => {
    const [cityData, setCityData] = React.useState<LocationData[]>([]);
    const navigate = useHistory();

    const [{ data: locationResponse, loading }, locationExecute] = useAxios({
        url: `/locations/country/code/${CURRENT_COUNTRY}/regions`,
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        const cities: LocationData[] = [];
        if (locationResponse?.success) {
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
            onCitySelected({
                city: cityObj.cityId,
                region: cityObj.regionId,
                country: locationResponse?.response?.id,
                coordinate: cityObj.coordinate,
            });
            navigate.push('/product-listing/6c574ff2-03ef-4501-84ee-cabea11cb6e2');
        }
    }

    return (
        <>
            {loading ? <Loader show={loading} /> : (
                <Autocomplete
                    sx={{ width: '100%' }}
                    autoComplete={true}
                    id="location-selector"
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