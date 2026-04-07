import styles from 'src/styles/HomePage.module.css';
import { client } from "src/axios/client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PropertyListingCard from "src/components/cards/PropertyListingCard";
import { IProperty } from './index.d';
import { useRouter } from "next/router";
import FilterBar, { IFilters } from "src/components/_home/FilterBar";

const HomePage: NextPage = () => {
    const [propertyToDisplay, setPropertyToDisplay] = useState<IProperty[]>([]);

    const { push, query, isReady } = useRouter();

    const getAllPropertiesWithFilters = async (filters: IFilters) => {
        await push({ pathname: "/home", query: { ...filters } }, undefined, { shallow: true });
        const { data } = await client.get('/listings', {
            params: filters
        });
        setPropertyToDisplay(data.data.data);
    }

    useEffect(() => {
        if (!isReady) return;
        const getAllProperties = async (): Promise<void> => {
            await getAllPropertiesWithFilters(query as IFilters);
        };
        getAllProperties();
    }, [isReady]);

    return (
        <div className={styles.page}>
            <Container>
                <FilterBar onFilter={getAllPropertiesWithFilters} />
                <div className={styles.grid}>
                    {propertyToDisplay.length && propertyToDisplay.map((property: IProperty) => (
                        <PropertyListingCard
                            key={property.id}
                            id={property.id}
                            title={property.title}
                            description={property.description}
                            price={property.price}
                            beds={property.beds}
                            baths={property.baths}
                            property_type={property.property_type}
                            suburb={property.suburb}
                            address={property.address}
                            status={property.status}
                            onClick={() => push(`/property/${property.id}`)}
                        />
                    ))}

                </div>
            </Container>
        </div>
    );
};

export default HomePage;