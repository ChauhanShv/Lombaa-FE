import React, { useState, useEffect, ReactNode } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import { Spinner } from 'react-bootstrap';
import { SelectChangeEvent, FormHelperText } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useAxios } from '../../services';
import { CURRENT_COUNTRY } from '../../config';
import { Region, City } from './types';
import { LocationSelectorProps } from '../settings/types';
import { useAppContext } from '../../contexts';
import './styles.scss';

export const LocationDropdown: React.FC<LocationSelectorProps> = ({ onCitySelected }: LocationSelectorProps): React.ReactElement => {

    const [regionData, setRegionData] = useState<Region[]>([]);
    const [location, setLocation] = useState<any>('');
    const { register, formState: { errors } } = useFormContext();
    const { state } = useAppContext();
    const userData = state.user.metaData;

    const [{ data: regionResponse, loading: regionLoading }, regionExecute] = useAxios({
        url: `/locations/country/${CURRENT_COUNTRY}/regions`,
        method: 'GET'
    });

    useEffect(() => {
        regionExecute({});
    }, []);
    useEffect(() => {
        if (regionResponse?.success) {
            setRegionData(regionResponse.response);
        }
    }, [regionResponse]);

    const getRegions = (region: Region) => {
        return (
            <ListSubheader key={region.id}>
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
        const regionObject = regionData.find((region, index) =>
            region.cities.find((city: any) => city.id === cityId)
        );
        return regionObject?.id;
    }

    const handleLocationChange = (event: SelectChangeEvent<HTMLSelectElement>, child: ReactNode) => {
        setLocation(event.target.value);
        onCitySelected({
            city: event.target.value,
            country: CURRENT_COUNTRY,
            region: getRegionIdFromCityId(event.target.value),
        })
    };

    return (
        <>
            <FormControl
                sx={{ width: '100%', marginBottom: '1rem' }}
                error={!!errors.location}>
                {regionLoading || !regionData ? <Spinner animation={'grow'} /> : (
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
                            {regionData?.map((region, index) => [
                                getRegions(region),
                                !!regionData[index]?.cities?.length && getCities(regionData[index]?.cities)
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