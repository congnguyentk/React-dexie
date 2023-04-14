import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "./db";

import AddItemForm from "./AddItemForm";

function App() {
  const items = useLiveQuery(() => db.items.toArray()) || [];

  return (
    <div className="App">
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" component="div" gutterBottom>
          DexieとReactでIndexedDB
        </Typography>
        <AddItemForm />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            {items.length > 0 && (
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Tel</TableCell>
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {items.length ? (
                items.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.tel}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell colSpan={3}>データがありません</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default App;
