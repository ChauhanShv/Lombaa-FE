import React, { useState, useEffect, ReactNode } from 'react';
import {
    InputLabel,
    Select,
    MenuItem,
    ListSubheader,
    FormControl,
    SelectChangeEvent,
    FormHelperText
} from '@mui/material';
import { Spinner } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { useAxios } from '../../services';
import { Country, Region, City, LocationSelectorProps } from './types';
import { Country as CurrentCountry } from '../../types';
import { useAppContext } from '../../contexts';
import './styles.scss';

export const LocationDropdown: React.FC<LocationSelectorProps> = ({
    onCitySelected,
    defaultValue,
}: LocationSelectorProps): React.ReactElement => {

    const { state } = useAppContext();
    const userData = state.user.metaData;
    const currentCountry: CurrentCountry = state.session?.country || {};
    const [countryData, setCountryData] = useState<Country>({
        id: '',
        name: '',
        code: '',
        coordinate: {
            type: '',
            coordinates: [],
        },
        phoneCode: '',
        currencySymbol: '',
        currencyCode: '',
        regions: [],
    });
    const [location, setLocation] = useState<any>(defaultValue || '');
    const { register, formState: { errors } } = useFormContext();

    const [{ data: locationResponse, loading: regionLoading }, regionExecute] = useAxios({
        url: `/locations/country/code/${currentCountry.code}/regions`,
        method: 'GET'
    });

    useEffect(() => {
        regionExecute({});
    }, []);

    useEffect(() => {
        if (locationResponse?.success) {
            setCountryData(locationResponse.response);
        }
    }, [locationResponse]);

    const getRegions = (region: Region) => {
        return (
            <ListSubheader sx={{ color: '#000', fontWeight: '600' }} key={region.id}>
                {region.name}
            </ListSubheader>
        );
    };
    const getCities = (cities: City[]) => {
        return cities.map((city: City) =>
            <MenuItem key={city?.id} value={city?.id}>
                {city?.name}
            </MenuItem>
        )
    }

    const getRegionIdFromCityId = (cityId: string | HTMLSelectElement): string | undefined => {
        const regionObject = countryData.regions.find((region, index) =>
            region.cities.find((city: any) => city.id === cityId)
        );
        return regionObject?.id;
    }

    const handleLocationChange = (event: SelectChangeEvent<HTMLSelectElement>, child: ReactNode) => {
        setLocation(event.target.value);
        onCitySelected({
            city: event.target.value,
            country: countryData.id,
            region: getRegionIdFromCityId(event.target.value),
        })
    };

    return (
        <>
            <FormControl
                sx={{ width: '100%', marginBottom: '1rem' }}
                error={!!errors.location}>
                {regionLoading || !countryData.regions ? <Spinner animation={'grow'} /> : (
                    <>
                        <InputLabel id="location-select">Select Location</InputLabel>
                        <Select
                            {...register('location')}
                            labelId="location-select"
                            value={location}
                            label="Select Location"
                            onChange={handleLocationChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {countryData.regions?.map((region: Region, index) => [
                                !!countryData.regions[index]?.cities?.length && getRegions(region),
                                !!countryData.regions[index]?.cities?.length && getCities(countryData.regions[index]?.cities)
                            ])}
                        </Select>
                        <FormHelperText className='formHelperText'>
                            {!!errors.location && 'Location is required'}
                        </FormHelperText>
                    </>
                )}
            </FormControl>
        </>
    );
}