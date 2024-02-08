import React from 'react';

const EditedHeader = ({ subtext }) => {
  return (
    <h1 className="edited-header">
      EDITED <span className="header-subtext">{subtext}</span>
    </h1>
  );
};

export default EditedHeader;
