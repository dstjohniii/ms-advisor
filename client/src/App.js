import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AdvisorRouter from "./components/AdvisorRouter";
import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";
import {
  Link as RouterLink,
  useRouteMatch,
  useLocation,
} from "react-router-dom";

function formatTitle(title) {
  if (!title) return "Dashboard";
  return title.charAt(0).toUpperCase() + title.slice(1);
}

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default function App() {
  const match = useRouteMatch("/:route");
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Container>
      <Paper
        sx={{
          marginTop: (theme) => theme.spacing(1),
          padding: (theme) => theme.spacing(1),
          backgroundColor: (theme) => theme.palette.grey[700],
        }}
      >
        <Paper
          sx={{
            marginTop: (theme) => theme.spacing(1),
            padding: (theme) => theme.spacing(1),
            marginBottom: (theme) => theme.spacing(1),
            backgroundColor: (theme) => theme.palette.background.umslRed,
          }}
        >
          <Typography variant="h1">MS Advisor TEST</Typography>
        </Paper>
        <Breadcrumbs>
          <LinkRouter
            underline="hover"
            to="/"
            sx={{ color: (theme) => theme.text.secondary }}
          >
            Questions
          </LinkRouter>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return last ? (
              <Typography
                color="text.primary"
                key={to}
                sx={{ color: (theme) => theme.text.secondary }}
              >
                {formatTitle(value)}
              </Typography>
            ) : (
              <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                {formatTitle(value)}
              </LinkRouter>
            );
          })}
        </Breadcrumbs>

        <Paper
          sx={{
            marginTop: (theme) => theme.spacing(1),
            padding: (theme) => theme.spacing(1),
            marginBottom: (theme) => theme.spacing(1),
          }}
        >
          <AdvisorRouter />
        </Paper>
      </Paper>
    </Container>
  );
}
