import { fireEvent, render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Routes,
  Route,
  Outlet,
  Link,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";

const Nav = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="dashboard">Dashboard</Link>
  </nav>
);

const Home = () => (
  <>
    <Nav />
    <h2>Home</h2>
    <Outlet />
  </>
);

const Dashboard = () => <h3>Dashboard</h3>;

it("can render multiple routes with MemoryRouter", () => {
  let { container } = render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByRole("heading", { name: "Home" })).toBeVisible();
  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<nav><a href="/">Home</a><a href="/dashboard">Dashboard</a></nav><h2>Home</h2>"`
  );

  fireEvent.click(screen.getByRole("link", { name: "Dashboard" }));

  expect(screen.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<nav><a href="/">Home</a><a href="/dashboard">Dashboard</a></nav><h2>Home</h2><h3>Dashboard</h3>"`
  );
});

it("can render multiple routes with createMemoryRouter", () => {
  let router = createMemoryRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ]);
  let { container } = render(<RouterProvider router={router} />);

  expect(screen.getByRole("heading", { name: "Home" })).toBeVisible();
  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<nav><a href="/">Home</a><a href="/dashboard">Dashboard</a></nav><h2>Home</h2>"`
  );

  fireEvent.click(screen.getByRole("link", { name: "Dashboard" }));

  expect(screen.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<nav><a href="/">Home</a><a href="/dashboard">Dashboard</a></nav><h2>Home</h2><h3>Dashboard</h3>"`
  );
});
