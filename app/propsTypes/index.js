import PropTypes from "prop-types";
import Card from "./Card";
import Tag from "./Tag";
import Icon from "./Icon";

export const CardPropType = Card(PropTypes, {Tag});
export const TagPropType = Tag(PropTypes, {});
export const IconPropType = Icon(PropTypes, {});
