import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/select_file/select_file.png";
import buttonHoverImage from "../../images/buttons/select_file/select_file_hv.png";
import buttonClickImage from "../../images/buttons/select_file/select_file_click.png";
import "./SelectFileButton.css";

interface Props {
  onClick: () => void;
}

const SelectFileButton = ({ onClick }: Props) => {
  return (
    <div className="select-file-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={buttonImage}
        hoverImagePath={buttonHoverImage}
        clickedImagePath={buttonClickImage}
        disabledImagePath={buttonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default SelectFileButton;
