import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from "./Home";
import ImageDetail from "./ImageDetail";
import ImageEditForm from "./ImageEditForm";
import ImageList from "./ImageList";
import NewImageForm from "./NewImageForm";

/**
 * Route list component
 * renders all the routes
 *
 * Props:
 * - images, [image, ... ] where image: *
 *  { file_name, uploaded_at, aws_image_src, caption, description, exif_data }
 *  and exif_data is JSON of variable length like { <exif-tag-name>: <value> }
 *
 * App -> RouteList -> {NewImageForm, ImageEditForm, ImageList, ImageDetail, Home}
 */
function RouteList({ images, addImage }) {

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<Home />} />
        <Route
          path="/new"
          element={<NewImageForm />} />
        <Route
          path="/images"
          element={<ImageList images={images} />} />
        <Route
          path="/images/:name"
          element={<ImageDetail />} />
        <Route
          path="/images/:name/edit"
          element={<ImageEditForm />} />
        <Route
          path="*"
          element={<Navigate to='/' />} />
      </Routes>
    </main>
  );
}


export default RouteList;