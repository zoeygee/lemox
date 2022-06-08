import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
// material
import { Container, Tab, Box, Tabs, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import AccountGeneral from '../components/AccountGeneral';
import ChangePassword from '../components/ChangePassword';

// ----------------------------------------------------------------------

export default function AccountDetails() {
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon="ic:baseline-account-circle" width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: 'change_password',
      icon: <Iconify icon="fluent:password-16-filled" width={20} height={20} />,
      component: <ChangePassword />,
    },
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="Account details">
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} value={tab.value} />
            ))}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
