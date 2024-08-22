import { render, fireEvent, screen } from "@testing-library/react";
import UrlForm from "../pages/Main/UrlForm/UrlForm";

test("renders UrlForm", () => {
  render(<UrlForm urls={[]} setUrls={() => {}} onSubmit={() => {}} />);
  expect(screen.getByText("Add URLs")).toBeInTheDocument();
});

test("adds URL input", () => {
  const setUrls = jest.fn();
  render(<UrlForm urls={[]} setUrls={setUrls} onSubmit={() => {}} />);
  fireEvent.click(screen.getByText("Add URL"));
  expect(setUrls).toHaveBeenCalled();
});

test("removes URL input", () => {
  const setUrls = jest.fn();
  render(
    <UrlForm urls={["", "", "", ""]} setUrls={setUrls} onSubmit={() => {}} />
  );
  fireEvent.click(screen.getAllByText("Delete")[0]);
  expect(setUrls).toHaveBeenCalled();
});

test("submits form", () => {
  const onSubmit = jest.fn((e) => e.preventDefault());
  render(<UrlForm urls={[]} setUrls={() => {}} onSubmit={onSubmit} />);
  fireEvent.click(screen.getByText("Submit URLs"));
  expect(onSubmit).toHaveBeenCalled();
});

test("handles URL input changes", () => {
  const setUrls = jest.fn();
  render(<UrlForm urls={["", ""]} setUrls={setUrls} onSubmit={() => {}} />);

  const inputs = screen.getAllByRole("textbox");
  fireEvent.change(inputs[0], { target: { value: "https://example.com" } });

  expect(setUrls).toHaveBeenCalledWith(["https://example.com", ""]);
  expect(inputs[0]).toHaveValue("https://example.com");
  expect(inputs[1]).toHaveValue("");
});
