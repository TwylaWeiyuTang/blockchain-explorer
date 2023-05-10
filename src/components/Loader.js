import styled from "styled-components";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div``;

const Wrapper = styled.div``;

const Loader = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default Loader;
