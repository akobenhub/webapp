import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/vision")({
  component: () => <Navigate to="/our-story" />,
});
