import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

type Props = {
  size: 'small' | 'large'
  icon: FontAwesomeIconProps.icon
}

export default function Icon() {
  return <div><FontAwesomeIcon icon={} size={size}></div>;
}
