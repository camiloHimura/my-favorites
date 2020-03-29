export default function Card(PropTypes, {Tag}){
  return {
    id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    tags: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.arrayOf(PropTypes.shape(Tag))
        ])
  }
}