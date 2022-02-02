import React, { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAxios } from '../../services';
import { LocationSelectorProps, Country, Region, City } from './types';
import { Loader } from '..';

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onCitySelected }: LocationSelectorProps): React.ReactElement => {
    const [cityData, setCityData] = React.useState<any[]>([]);

    const [{ data: locationResponse, loading }, locationExecute] = useAxios({
        url: '/locations/country/code/IN/regions',
        method: 'GET',
    }, { manual: false });

    useEffect(() => {
        const cities: any[] = [];
        if (locationResponse?.success) {
            for (const region of locationResponse?.response?.regions) {
                for (const city of region.cities) {
                    cities.push({
                        regionId: region.id,
                        cityId: city.id,
                        cityName: city.name,
                        regionName: region.name,
                        coordinate: city.coordinate.coordinates,
                        label: `${city.name} in ${region.name}`,
                    });
                }
            }
            setCityData([...cities]);
        }
    }, [locationResponse]);

    const handleLocationSelect = (e: any) => {
        if (cityData.length && e.target.textContent) {
            const cityObj = cityData.find((city) => city.label === e.target.textContent);
            onCitySelected({
                city: cityObj.cityId,
                region: cityObj.regionId,
                country: locationResponse?.response?.id,
                coordinate: cityObj.coordinate,
            });
        }
    }

    return (
        <>
            {loading ? <Loader show={loading} /> : (<Autocomplete
                sx={{ width: '100%' }}
                id="location-selector"
                options={cityData.map(city => city.label)}
                renderInput={(params) => (<TextField {...params} label="Location" />)}
                onChange={handleLocationSelect}
            />)}
        </>
    );
}