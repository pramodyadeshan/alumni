import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/event">
        Event
      </MenuItem>
      <MenuItem icon="asterisk" to="/donation">
        Donation
      </MenuItem>
      <MenuItem icon="asterisk" to="/monitor">
        Monitor
      </MenuItem>
      <MenuItem icon="asterisk" to="/job">
        Job
      </MenuItem>
      <MenuItem icon="asterisk" to="/news">
        News
      </MenuItem>
      <MenuItem icon="asterisk" to="/volunteer-op">
        Volunteer OP
      </MenuItem>
      <MenuItem icon="asterisk" to="/report">
        Report
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
