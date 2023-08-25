import * as React from "react";
// assets
import EditIcon from "@mui/icons-material/Edit";
import { Box, BoxProps, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

export type UploadAvatarProps = BoxProps & {
  name: string,
  file?: any;
  title?: string;
  titleComponent?: React.ReactNode;
  width?: string;
  height?: string;
};

export default function UploadAvatar({
  file,
  name, 
  width = "115px",
  height = "115px",
  title,
  onChange,
  ...boxProps
}: UploadAvatarProps) {
  const imgRef = React.useRef<any>();
  const [preview, setPreview] = React.useState<any>(null);
  const { setValue, watch } = useFormContext();

  const onSelectImage = async (e: any) => {
    const file = e.target.files[0];
    setValue(name, file)
    const imgData = URL.createObjectURL(file);
    setPreview(imgData);
  };

  const openFilePicker = () => {
    if (imgRef.current) imgRef.current.click();
  };

  return (
    <Box {...boxProps}>
      <Typography>{title}</Typography>

      <Box sx={uploadContainer} onClick={openFilePicker}>
        <EditIcon />
        <img
          src={preview ? preview : watch(name) ? watch(name) : "/team-member.png"}
          style={{ height: "115px", width: "115px", borderRadius: "10px" }}
          alt=""
        />
        <input
          type="file"
          accept="image/*"
          hidden
          ref={imgRef}
          onChange={onSelectImage}
        />
      </Box>
    </Box>
  );
}

const uploadContainer = {
  position: "relative",
  display: "inline-block",
  cursor: "pointer",
  height: "115px",
  width: "115px",
  "& svg": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "none"
  },
  "&:hover": {
    opacity: 0.5,
    "& svg": {
      display: "block"
    }
  }
};
