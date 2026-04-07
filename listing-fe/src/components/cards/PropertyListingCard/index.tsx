import styles from 'src/styles/PropertyListingCard.module.css';

import { Badge, Card } from 'react-bootstrap';
type CardVariant = "grid" | "detail";

interface IPropertyListingCardProps {
    id: number;
    title: string;
    description: string;
    price: number;
    beds: number;
    baths: number;
    property_type: string;
    suburb: string;
    address: string;
    status: string;
    onClick?: () => void;
    variant?: CardVariant;
}

const PropertyListingCard = (props: IPropertyListingCardProps) => {
    const { title, description, price, beds, baths, property_type, suburb, address, status, variant = "grid", onClick } = props;

    const isDetail = variant === "detail";

    return (
        <Card className={isDetail ? styles.cardDetail : styles.card} onClick={() => onClick && onClick()}>
            <div className={isDetail ? styles.imageWrapperDetail : styles.imageWrapper}>
                <Card.Img
                    variant="top"
                    src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80"
                    alt={title}
                    className={isDetail ? styles.imageDetail : styles.image}
                />
            </div>

            <Card.Body className={isDetail ? styles.bodyDetail : styles.body}>
                <div className={styles.titleRow}>
                    <Card.Title className={isDetail ? styles.titleDetail : styles.title}>{title}</Card.Title>
                    <span className={isDetail ? styles.priceDetail : styles.price}>${price}</span>
                </div>
                <Card.Subtitle className={styles.address}>{address}</Card.Subtitle>
                <Card.Text className={styles.description}>{description}</Card.Text>
                <div className={styles.footer}>
                    <span className={styles.footerItem}>🛏 {beds} beds</span>
                    <span className={styles.footerItem}>🚿 {baths} baths</span>
                    <span className={`${styles.footerItem} ${styles.suburb}`}>📍 {suburb}</span>
                </div>
            </Card.Body>
        </Card>
    );

}

export default PropertyListingCard;