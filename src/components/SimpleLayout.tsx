import React from "react";
import Container from "./Container";

const SimpleLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container className="w-full">
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  );
};

export default SimpleLayout;
