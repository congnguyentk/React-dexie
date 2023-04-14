import { render, screen, fireEvent, findByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

test("Add item and update table", async () => {
  const { container } = render(<App />);
  const nameInput = container.querySelector('[name="name"]');
  const telInput = container.querySelector('[name="tel"]');
  const addButton = screen.getByText(/add/i);
  const table = container.querySelector(".MuiTable-root");
  const name = `Test Name ${Math.floor(Math.random() * 100)}`;
  const tel = String(Math.floor(Math.random() * 100000000000)).padStart(
    11,
    "0"
  );
  fireEvent.change(nameInput, { target: { value: name } });
  fireEvent.change(telInput, { target: { value: tel } });
  await userEvent.click(addButton);
  expect(await findByText(table, name)).toBeInTheDocument();
  expect(await findByText(table, tel)).toBeInTheDocument();
});
