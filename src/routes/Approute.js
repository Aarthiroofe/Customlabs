import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SegmentPage from '../components/SegmentTable';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SegmentPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
