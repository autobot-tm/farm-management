import { Typography } from 'antd';
import './styles.scss';
const { Text } = Typography;
/**
 * SubHeading component
 * Inherit from Ant Design Typography, please refer to https://ant.design/components/typography/
 * @param {Object} props - The properties passed to the component
 * @param {string} props.classNames - The CSS classes to apply to the component
 * @param {(230|260)} props.size - The size of the text. Should be either '110' or '140'
 */
export const SubHeading = ({ classNames, size = 230, ...props }) => {
  const classes = classNames ? `subHeading subHeading-${size} ${classNames}` : `subHeading subHeading-${size}`;
  return <Text {...props} className={classes} />;
};
