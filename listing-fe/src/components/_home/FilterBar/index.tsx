import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import styles from "src/styles/FilterBar.module.css";

export interface IFilters {
    price_min?: number;
    price_max?: number;
    beds?: number;
    baths?: number;
    property_type?: string;
    suburb?: string;
    keyword?: string;
    page?: number;
    limit?: number;
}

interface IFilterBarProps {
    onFilter: (filters: IFilters) => void;
}

const FilterBar = ({ onFilter }: IFilterBarProps) => {
    const [filters, setFilters] = useState<IFilters>({});
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value === "" ? undefined : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(filters);
        setOpen(false);
    };

    const handleReset = () => {
        setFilters({});
        onFilter({});
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.toggleRow}>
                <button
                    type="button"
                    className={styles.toggleBtn}
                    onClick={() => setOpen((prev) => !prev)}
                    aria-expanded={open}
                >
                    <span>Filters</span>
                    <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>▾</span>
                </button>
            </div>

            <div className={`${styles.collapsible} ${open ? styles.collapsibleOpen : ""}`}>
                 <hr className={styles.divider} />
                <form onSubmit={handleSubmit}>
                    <Row className="g-3 align-items-end" style={{ paddingTop: "16px" }}>
                        <Col xs={12} md={6} xl={2}>
                            <Form.Group>
                                <Form.Label className={styles.label}>Min Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price_min"
                                    placeholder="e.g. 300000"
                                    value={filters.price_min ?? ""}
                                    onChange={handleChange as any}
                                    className={styles.input}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} xl={2}>
                            <Form.Group>
                                <Form.Label className={styles.label}>Max Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price_max"
                                    placeholder="e.g. 1000000"
                                    value={filters.price_max ?? ""}
                                    onChange={handleChange as any}
                                    className={styles.input}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={3} xl={1}>
                            <Form.Group>
                                <Form.Label className={styles.label}>Beds</Form.Label>
                                <Form.Select name="beds" value={filters.beds ?? ""} onChange={handleChange} className={styles.input}>
                                    <option value="">Any</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5+</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={6} md={3} xl={1}>
                            <Form.Group>
                                <Form.Label className={styles.label}>Baths</Form.Label>
                                <Form.Select name="baths" value={filters.baths ?? ""} onChange={handleChange} className={styles.input}>
                                    <option value="">Any</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} xl={2}>
                            <Form.Group>
                                <Form.Label className={styles.label}>Type</Form.Label>
                                <Form.Select name="property_type" value={filters.property_type ?? ""} onChange={handleChange} className={styles.input}>
                                    <option value="">Any</option>
                                    <option value="house">House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="townhouse">Townhouse</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} xl={2}>
                            <Form.Group>
                                <Form.Label className={styles.label}>Suburb</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="suburb"
                                    placeholder="e.g. Northside"
                                    value={filters.suburb ?? ""}
                                    onChange={handleChange as any}
                                    className={styles.input}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} xl={2}>
                            <Form.Group>
                                <Form.Label className={styles.label}>Keyword</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="keyword"
                                    placeholder="e.g. pool, garden"
                                    value={filters.keyword ?? ""}
                                    onChange={handleChange as any}
                                    className={styles.input}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            <div className={styles.actions}>
                                <Button type="submit" variant="primary" className={styles.searchBtn}>
                                    Search
                                </Button>
                                <Button type="button" variant="outline-secondary" className={styles.resetBtn} onClick={handleReset}>
                                    Reset
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
};

export default FilterBar;