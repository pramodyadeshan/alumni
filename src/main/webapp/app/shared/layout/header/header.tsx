import './header.scss';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';
import { FaBell } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getEventEntities } from 'app/entities/event/event.reducer';
import { getEntities as getDonationEntities } from 'app/entities/donation/donation.reducer';
import { getEntities as getJobEntities } from 'app/entities/job/job.reducer';
import { getEntities as getNewsEntities } from 'app/entities/news/news.reducer';
import { Link } from 'react-router-dom';
import { getEntities as getVoEntities } from 'app/entities/volunteer-op/volunteer-op.reducer';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dispatch = useAppDispatch();

  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Fetch the latest entities
  const eventEntities = useAppSelector(state => state.event.entities);
  const donationEntities = useAppSelector(state => state.donation.entities);
  const jobEntities = useAppSelector(state => state.job.entities);
  const newsEntities = useAppSelector(state => state.news.entities);
  const voEntities = useAppSelector(state => state.volunteerOP.entities);

  useEffect(() => {
    if (props.isAuthenticated) {
      dispatch(getEventEntities({}));
      dispatch(getDonationEntities({}));
      dispatch(getJobEntities({}));
      dispatch(getNewsEntities({}));
      dispatch(getVoEntities({}));
    }
  }, [dispatch, props.isAuthenticated]);

  const lastEvent = eventEntities?.[eventEntities.length - 1];
  const lastDonation = donationEntities?.[donationEntities.length - 1];
  const lastJob = jobEntities?.[jobEntities.length - 1];
  const lastNews = newsEntities?.[newsEntities.length - 1];
  const lastVo = voEntities?.[voEntities.length - 1];

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="bg-gray-900 py-3">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto" navbar>
            {props.isAuthenticated && (
              <div className="relative text-white cursor-pointer pt-2 mx-4" onClick={toggleNotification}>
                <FaBell className="text-2xl" />
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg">
                    <div className="p-4">
                      <h3 className="font-bold text-lg">Notifications</h3>
                      <ul className="space-y-2 mt-2">
                        {lastEvent && (
                          <li className="border-b border-gray-200 pb-2">
                            <Link to={`/event/${lastEvent.id}`} className="font-normal text-black">
                              <strong className="font-semibold">New event added: </strong>
                              <br />
                              {lastEvent.eventName}
                            </Link>
                          </li>
                        )}
                        {lastDonation && (
                          <li className="border-b border-gray-200 pb-2">
                            <Link to={`/donation`} className="font-normal text-black">
                              <strong className="font-semibold">New donation added:</strong> <br />
                              {lastDonation.donationName}
                            </Link>
                          </li>
                        )}
                        {lastJob && (
                          <li className="border-b border-gray-200 pb-2">
                            <Link to={`/job`} className="font-normal text-black">
                              <strong className="font-semibold">New job added:</strong> <br />
                              {lastJob.jobName}
                            </Link>
                          </li>
                        )}
                        {lastNews && (
                          <li className="border-b border-gray-200 pb-2">
                            <Link to={`/news`} className="font-normal text-black">
                              <strong className="font-semibold">New news added:</strong> <br />
                              {lastNews.title}
                            </Link>
                          </li>
                        )}
                        {lastVo && (
                          <li className="border-b border-gray-200 pb-2">
                            <Link to={`/volunteer-op`} className="font-normal text-black">
                              <strong className="font-semibold">New volunteer oppertunity added</strong>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Home />
            {props.isAuthenticated && <EntitiesMenu />}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
