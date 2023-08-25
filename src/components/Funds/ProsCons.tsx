import React from "react";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext } from "react-hook-form";

type ProsConsProps = {
  label: string;
  name: string;
  title: string;
};

const ProsCons = ({ name, label, title }: ProsConsProps) => {
  const { setValue, watch } = useFormContext();
  const [input, setInput] = React.useState("");
  const [editedItem, setEditedItem] = React.useState<number | null>(null);
  const [list, setList] = React.useState<string[]>(watch(name));

  const addToList = () => {
    if (!input) return;
    const updatedList = [...list, input];
    setList(updatedList);
    setInput("");
  };

  const editItem = (item: string, index: number) => {
    setInput(item);
    setEditedItem(index);
  };

  const updateItem = () => {
    if (editedItem === undefined || editedItem === null || !input) return;
    const updatedList = list.map((item, index) => {
      if (index === editedItem) {
        return input;
      }
      return item;
    });
    setList(updatedList);
    setInput("");
    setEditedItem(null);
  };

  const removeItem = (index: number) => {
    const updatedList = list.filter((item, i) => i !== index);
    setList(updatedList);
  };

  React.useEffect(() => {
    setValue(name, list);
  }, [list, name, setValue]);

  return (
    <div>
      <Typography sx={titleStyle}>{title}</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label={label}
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        {editedItem === undefined || editedItem === null ? (
          <Button onClick={addToList}>Add</Button>
        ) : (
          <Button onClick={updateItem}>Update</Button>
        )}
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {list.map((item, index) => (
              <TableRow
                key={item}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}.
                </TableCell>
                <TableCell>{item}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={.5}>
                    <IconButton
                      size="small"
                      onClick={() => editItem(item, index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => removeItem(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const titleStyle = {
  fontSize: 20,
  lineHeight: "22.4px",
  fontWeight: "500",
  mb: 1
};

export default ProsCons;
