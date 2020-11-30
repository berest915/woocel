import styled from "styled-components";
import Button from '@material-ui/core/Button'

// avoid transition
export const NoTransitionDiv = styled.div`
  transition: none !important;
`;
// a btn style
export const ReButton = styled(Button)`
  color: lightblue;
  margin-top: 10px;
  display: block;
  width: 100%;
  transition: all 0.4s ease;
  :hover {
    color: black;
    background-color: lavender;
    transition: all 0.4s ease;
  }
`;
// not displaying crops if none 
export const NoneCropDiv = styled.div`
  ${props => !props.completedCrop && `display: none`};
`;