import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { client } from "src/axios/client";
import PropertyListingCard from "src/components/cards/PropertyListingCard";
import { IProperty } from "src/pages/home/index.d";

const SinglePropertyListingPage = () => {
    const router = useRouter();
    const id = router.query.id;

    const [propertyDetails, setPropertyDetails] = useState<IProperty | undefined>(undefined);

    useEffect(() => {
        const getSinglePropertyListing = async (id: string) => {
            const { data } = await client.get(`/listings/${id}`);

            setPropertyDetails(data.data);
        }
        getSinglePropertyListing(String(id));
    }, [id, router.isReady])

    if (!propertyDetails) return <Spinner />;

    return (
        <Container>
            <Button variant="outline-secondary" size="sm" className="mb-4" onClick={() => router.push('/home')}>
                Back to listings
            </Button>
            <PropertyListingCard
                id={propertyDetails.id}
                title={propertyDetails.title}
                description={propertyDetails.description}
                price={propertyDetails.price}
                beds={propertyDetails.beds}
                baths={propertyDetails.baths}
                property_type={propertyDetails.property_type}
                suburb={propertyDetails.suburb}
                address={propertyDetails.address}
                status={propertyDetails.status}
                variant="detail"
            />
        </Container>
    )
}

export default SinglePropertyListingPage;