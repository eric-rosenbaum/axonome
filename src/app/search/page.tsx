import { Container } from "@/components/container";
import { SearchClient } from "./search-client";

export const metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <Container size="narrow" className="py-12">
      <h1 className="display-md mb-6">Search</h1>
      <SearchClient />
    </Container>
  );
}
