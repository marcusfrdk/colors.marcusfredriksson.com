import styled from "@emotion/styled";

const ModalText = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.p`
  font-size: 1.125rem;
  color: var(--weak);
  line-height: 1.75rem;
`;

type Props = {
  children: string;
};

export default ModalText;
