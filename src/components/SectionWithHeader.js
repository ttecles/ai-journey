import React from 'react';

import EditedHeader from './EditedHeader';

export default function SectionWithHeader({ children, subtext = 'default' }) {
  return (
    <>
      <EditedHeader subtext={subtext} />
      <div className="app-container">{children}</div>
      <hr />
    </>
  );
}
