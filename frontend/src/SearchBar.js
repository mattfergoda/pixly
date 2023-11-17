import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { fetchImages } from "./api";


/** Search Form Component
 *
 * State:
 * formData: data from search form
 *
 * Props:
 * - searchImages: a function for
 *
 * ImageList --> SearchBar
 */
function SearchBar({ searchImages }) {

    const [formData, setFormData] = useState("");
    console.log(formData);

    /** Update local state w/curr state of input elem */
    function handleChange(evt) {
        setFormData(evt.target.value);
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        const trimmedFormData = formData.trim();
        await searchImages(trimmedFormData);
        setFormData(trimmedFormData);
    }

    return (
        <Form onSubmit={handleSubmit} className="d-flex p-2 col-md-12">
            <Input className="form-control me-sm-2"
                value={formData}
                onChange={handleChange} />
            <Button className="btn btn-secondary my-2 my-sm-0">Search</Button>
        </Form>
    );
}

export default SearchBar;