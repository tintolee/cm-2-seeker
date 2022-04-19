import React from 'react';
import {
  LineCheckmark,
  LineClose,
  LineCornerUpRight,
  LineFlag,
  LineFileText,
  LineVideo,
  LineCamera,
  LinePeople,
  LineEdit,
  LineShare,
  LineEye,
  LineCopy,
  LineMessageCircle,
  LinePin,
  LinePersonAdd,
  LineBell,
  LineAlertCircle,
  LineSettings,
  LineLogout,
  LineBriefcase,
} from '../../svg/icons';
export function renderIcon(icon, iconColor) {
  switch (icon) {
    case 'checkmark':
      return <LineCheckmark width="24" height="24" color={iconColor} />;
    case 'close':
      return <LineClose width="24" height="24" color={iconColor} />;
    case 'cornerUpRight':
      return <LineCornerUpRight width="24" height="24" color={iconColor} />;
    case 'flag':
      return <LineFlag width="24" height="24" color={iconColor} />;
    case 'fileText':
      return <LineFileText width="24" height="24" color={iconColor} />;
    case 'video':
      return <LineVideo width="24" height="24" color={iconColor} />;
    case 'camera':
      return <LineCamera width="24" height="24" color={iconColor} />;
    case 'people':
      return <LinePeople width="24" height="24" color={iconColor} />;
    case 'edit':
      return <LineEdit width="24" height="24" color={iconColor} />;
    case 'share':
      return <LineShare width="24" height="24" color={iconColor} />;
    case 'eye':
      return <LineEye width="24" height="24" color={iconColor} />;
    case 'copy':
      return <LineCopy width="24" height="24" color={iconColor} />;
    case 'messageCircle':
      return <LineMessageCircle width="24" height="24" color={iconColor} />;
    case 'pin':
      return <LinePin width="24" height="24" color={iconColor} />;
    case 'personAdd':
      return <LinePersonAdd width="24" height="24" color={iconColor} />;
    case 'bell':
      return <LineBell width="24" height="24" color={iconColor} />;
    case 'alertCircle':
      return <LineAlertCircle width="24" height="24" color={iconColor} />;
    case 'settings':
      return <LineSettings width="20" height="20" color={iconColor} />;
    case 'logout':
      return <LineLogout width="24" height="24" color={iconColor} />;
    case 'briefcase':
      return <LineBriefcase width="24" height="24" color={iconColor} />;
    default:
      return null;
  }
}
