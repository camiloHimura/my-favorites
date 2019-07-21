import PropTypes from "prop-types";
import Link from "./Link";
import Tag from "./Tag";
import Icon from "./Icon";

export const LinkPropType = Link(PropTypes, {Tag});
export const TagPropType = Tag(PropTypes, {});
export const IconPropType = Icon(PropTypes, {});
