import { FlightSearchProvider } from "@/context/FlightSearchContext";
import { SearchHero, SearchForm, SearchResults } from "@/components";
import { PageWrapper } from "@/pages/SearchPage/styled";

const SearchPage = () => {
    return (
        <FlightSearchProvider>
            <PageWrapper>
                <SearchHero />
                <SearchForm />
                <SearchResults />
            </PageWrapper>
        </FlightSearchProvider>
    );
};

export default SearchPage;

