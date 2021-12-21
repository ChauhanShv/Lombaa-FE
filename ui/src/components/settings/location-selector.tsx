import React, { useEffect } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { useAxios } from '../../services';
import { LocationSelectorProps } from './types';

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onCitySelected }: LocationSelectorProps): React.ReactElement => {
    const [countryData, setCountryData] = React.useState<any[]>([]);
    const [regionData, setRegionData] = React.useState<any[]>([]);
    const [cityData, setCityData] = React.useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = React.useState<string>('');
    const [selectedRegion, setSelectedRegion] = React.useState<string>('');
    const { register, formState: { errors } } = useFormContext();

    const [{ data: locationResponse }, locationExecute] = useAxios({
        url: '/locations/countries',
        method: 'GET',
    });

    const [{ data: regionResponse }, regionExecute] = useAxios({
        url: `/locations/country/${selectedCountry}/regions`,
        method: 'GET'
    });

    const [{ data: cityResponse }, cityExecute] = useAxios({
        url: `/locations/region/${selectedRegion}/cities`,
        method: 'GET'
    });

    useEffect(() => {
        locationExecute({});
    }, []);

    useEffect(() => {
        if (locationResponse?.success) {
            setCountryData(locationResponse.response);
        }
    }, [locationResponse]);

    useEffect(() => {
        if (regionResponse?.success) {
            setRegionData(regionResponse.response);
        }
    }, [regionResponse]);

    useEffect(() => {
        if (cityResponse?.success) {
            setCityData(cityResponse.response);
        }
    }, [cityResponse]);

    useEffect(() => {
        regionExecute({});
    }, [selectedCountry]);

    useEffect(() => {
        cityExecute({});
    }, [selectedRegion]);

    const getErrorText = (field: string): React.ReactElement | null => {
        const errorMessages: any = {
            ...errors,
        };
        if (errorMessages[field]) {
            return (
                <Form.Text className="text-danger">
                    {errorMessages[field]?.message}
                </Form.Text>
            );
        }
        return null;
    };

    const getErrorClassName = (field: string): string => {
        const errorMessages: any = {
            ...errors,
        };
        return errorMessages[field] ? 'is-invalid' : '';
    };

    const handleCitySelected = (event: any) => {
        onCitySelected({
            country: selectedCountry,
            region: selectedRegion,
            city: event.target.value,
        });
    }

    return (
        <>
            <FloatingLabel label="Select Country" className="mb-3">
                <Form.Select
                    {...register('country')}
                    className={getErrorClassName('country')}
                    onChange={(e: any) => setSelectedCountry(e.target.value)}>
                    <option value="">Select Country</option>
                    {!!countryData.length && (
                        countryData.map((country: any) =>
                            <option value={country.id} key={country?.id}>
                                {country.name}
                            </option>
                        )
                    )}
                </Form.Select>
                {getErrorText('country')}
            </FloatingLabel>
            {selectedCountry && (
                <>
                    <FloatingLabel label="Select Region" className="mb-3">
                        <Form.Select
                            {...register('region')}
                            className={getErrorClassName('region')}
                            onChange={(e: any) => setSelectedRegion(e.target.value)}>
                            <option value="">Select Region</option>
                            {!!regionData.length && (
                                regionData.map((region: any) =>
                                    <option value={region.id} key={region?.id}>
                                        {region.name}
                                    </option>
                                )
                            )}
                        </Form.Select>
                        {getErrorText('region')}
                    </FloatingLabel>
                </>
            )}
            {selectedRegion && (
                <>
                    <FloatingLabel label="Select City" className="mb-3">
                        <Form.Select
                            {...register('city')}
                            className={getErrorClassName('city')}
                            onChange={handleCitySelected}>
                            <option value="">Select City</option>
                            {!!cityData.length && (
                                cityData.map((city: any) =>
                                    <option value={city.id} key={city?.id}>
                                        {city.name}
                                    </option>
                                )
                            )}
                        </Form.Select>
                        {getErrorText('city')}
                    </FloatingLabel>
                </>
            )}
        </>
    );
}