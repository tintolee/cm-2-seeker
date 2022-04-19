import {theme} from '../components/Theme';

export const reportTypes = [
  {value: '1', label: 'Steps'},
  {value: '2', label: 'Opportunity'},
  {value: '3', label: 'Opportunity Comment'},
  {value: '4', label: 'Seeker Profile'},
  {value: '5', label: 'OP Profile'},
  {value: '6', label: 'Collaboration'},
  {value: '7', label: 'Collaboration Comment'},
  {value: '8', label: 'Direct Message'},
  {value: '9', label: 'Discover'},
  {value: '10', label: 'Seeker Post'},
];

export const selectReportType = (label) =>
  reportTypes.find((report) => report.label === label);

export const collaborationStatus = {
  registered: 1,
  invited: 2,
  applied: 3,
  unsuccessful: 4,
};

export const opportunityAttendeeStatus = {
  registered: 1,
  invited: 2,
  applied: 3,
  unsuccessful: 4,
};

export const getAttandeeState = ({status, applicationRequired}) => {
  switch (status) {
    case 1:
      return {
        status,
        title: applicationRequired ? 'Registered' : 'Attending',
        disabled: true,
        bgColor: theme.colors.buttonDisabled,
      };
    case 2:
      return {
        status,
        title: 'Invited',
        disabled: true,
        bgColor: theme.colors.buttonDisabled,
      };
    case 3:
      return {
        status,
        title: 'Applied',
        disabled: true,
        bgColor: theme.colors.buttonDisabled,
      };
    case 4:
      return {
        status,
        title: 'Unregistered',
        disabled: true,
        bgColor: theme.colors.buttonDisabled,
      };
    default:
      return {
        status,
        title: applicationRequired ? 'Apply Now' : 'RSVP',
        disabled: false,
        bgColor: null,
      };
  }
};
