import { Typography } from 'antd';
import './styles.scss';
const { Text } = Typography;
/**
 * Paragraph component
 * Inherit from Ant Design Typography, please refer to https://ant.design/components/typography/
 * @param {Object} props - The properties passed to the component
 * @param {string} props.classNames - The CSS classes to apply to the component
 */
export const Paragraph = ({ classNames, ...props }) => {
  const classes = classNames ? `paragraph ${classNames}` : `paragraph`;
  return <Text {...props} className={classes} />;
};
